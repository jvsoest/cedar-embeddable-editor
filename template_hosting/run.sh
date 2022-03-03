docker run --rm \
    --name webpage \
    -p 80:80 \
    -v $(pwd)/html:/usr/share/nginx/html \
    -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf \
    nginx
