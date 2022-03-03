Build angular project, marking content location in /static on the webserver
```
node_modules/@angular/cli/bin/ng build --configuration production --baseHref="/static/"
```

Remove old folders in Flask project
```
rm -R template_hosting/python/static
cp -R dist/cedar-embeddable-editor template_hosting/python/static
cp template_hosting/python/static/index.html template_hosting/python/templates/index.html
```
