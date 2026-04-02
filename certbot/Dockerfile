FROM certbot/dns-cloudflare

# Install docker-cli
RUN apk add --no-cache docker-cli

# Copy auto update certificate script
COPY auto-update-certificate.sh /auto-update-certificate.sh
RUN chmod +x /auto-update-certificate.sh

# Execute script on launch container
ENTRYPOINT [ "/auto-update-certificate.sh" ]
