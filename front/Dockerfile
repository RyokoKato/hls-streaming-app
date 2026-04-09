FROM nginx:latest

# Server Setting
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

# Contents
COPY ./favicon.png /usr/share/nginx/data/www/favicon.png
COPY ./index.html /usr/share/nginx/data/www/index.html
COPY ./html/ /usr/share/nginx/data/www/html/
COPY ./css/ /usr/share/nginx/data/www/css/
COPY ./js/ /usr/share/nginx/data/www/js/
COPY ./img/ /usr/share/nginx/data/www/img/

## Entrypoint
COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
