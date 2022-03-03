from flask import Flask, Response, request, render_template
from flask_cors import CORS
import requests
import json
import uuid
import yaml
import os

app = Flask(__name__)
CORS(app)

config = { }
with open("config.yaml") as f:
    config = yaml.safe_load(f)

if not os.path.exists(config['server']['storageFolder']):
    os.makedirs(config['server']['storageFolder'])

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/template/template.json")
def template():
    headers = {
        "Authorization": f"apiKey {config['cedar']['apiKey']}",
        "Content-Type": "application/json"
    }

    response = requests.get(f"https://repo.metadatacenter.org/templates/{config['cedar']['templateId']}", headers=headers)
    return Response(response.text, mimetype='application/json')

@app.route("/api/cedar/store", methods=["POST"])
def store():
    session_id = uuid.uuid4()
    fileName = os.path.join(config['server']['storageFolder'], f"{session_id}.json")
    with open(fileName, "w") as f:
        json.dump(request.get_json(), f, indent=4)
    return {"status": "OK"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
