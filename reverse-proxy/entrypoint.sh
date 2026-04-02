#!/bin/bash

## Replace Domain
echo "Replace Domains in nginx.conf:"
echo "Base Domain"
sed -i "s|__DOMAIN__|${DOMAIN_NAME}|g" /etc/nginx/nginx.conf

echo "API"
sed -i "s|__API_DOMAIN__|${API_DOMAIN_NAME}|g" /etc/nginx/nginx.conf

echo "Streaming"
sed -i "s|__STREAMING_DOMAIN__|${STREAMING_DOMAIN_NAME}|g" /etc/nginx/nginx.conf

echo "Reverse Proxy"
sed -i "s|__REVERSE_PROXY_DOMAIN__|${REVERSE_PROXY_DOMAIN_NAME}|g" /etc/nginx/nginx.conf

echo "Front"
sed -i "s|__FRONT_DOMAIN__|${FRONT_DOMAIN_NAME}|g" /etc/nginx/nginx.conf

# 最後にNginxを起動
exec nginx -g 'daemon off;'
