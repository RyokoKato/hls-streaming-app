FROM nginx:latest

# Server Setting
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

# m3u8, ts ファイルをhls以下にコピー
COPY hls/ /usr/share/nginx/data/www/hls/

# サムネイル画像をthumbs以下にコピー
COPY thumbs/ /usr/share/nginx/data/www/thumbs/

# catalog.jsonを所定の位置にコピー
COPY catalog.json /usr/share/nginx/data/www/
