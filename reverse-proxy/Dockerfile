FROM nginx:latest

# Server Setting
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

## Entrypoint
COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
