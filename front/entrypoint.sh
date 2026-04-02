#!/bin/bash

## Replace API Domain
echo "Replace API Domain in index.html"
sed -i "s|__API_DOMAIN__|${API_DOMAIN_NAME}|g" /usr/share/nginx/data/www/js/config.js

# 最後にNginxを起動
exec nginx -g 'daemon off;'
