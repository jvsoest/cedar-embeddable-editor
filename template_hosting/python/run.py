from flask import Flask, Response, request, render_template
from flask_cors import CORS
import requests
import json
import uuid
import yaml
import os
from rdflib import Graph

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
    fileNameJson = os.path.join(config['server']['storageFolder'], f"{session_id}.jsonld")
    fileNameTurtle = os.path.join(config['server']['storageFolder'], f"{session_id}.ttl")

    data_to_store = request.get_json()
    data_to_store = data_to_store["metadata"]
    data_to_store["schema:isBasedOn"] = f"https://repo.metadatacenter.org/templates/{config['cedar']['templateId']}"
    data_to_store["@id"] = f"http://localhost/template-instances/{session_id}"

    with open(fileNameJson, "w") as f:
        json.dump(data_to_store, f, indent=4)
    
    g = Graph()
    g.parse(data=json.dumps(data_to_store), format='json-ld')
    g.serialize(destination=fileNameTurtle)

    return {"status": "OK"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
