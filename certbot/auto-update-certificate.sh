#!/bin/sh
set -e

# 1. 初回起動チェック- 証明書がなければ取得する
if [ ! -d "/etc/letsencrypt/live/${DOMAIN_NAME}" ]; then
    echo "Starting initial certificate acquisition..."
    certbot certonly --dns-cloudflare \
        --dns-cloudflare-credentials /cloudflare.ini \
        -d $DOMAIN_NAME \
        -d "*.${DOMAIN_NAME}" \
        --email $EMAIL_ADDRESS \
        --agree-tos \
        --no-eff-email \
        --non-interactive
fi

# 2. 定期更新ループ
echo "Starting certificate renewal loop..."
while :; do
    # 12時間ごとに更新を試み、成功したときにreverse-proxyコンテナのnginxをリロードする
    certbot renew --dns-cloudflare \
        --dns-cloudflare-credentials /cloudflare.ini \
        --deploy-hook "docker exec reverse-proxy nginx -s reload"
    
    sleep 12h & wait $!
done
