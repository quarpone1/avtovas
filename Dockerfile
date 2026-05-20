FROM nginx:1.27-alpine

COPY deploy/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html styles.css script.js yandex_ead1aa2fef73c646.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY car_divider/ /usr/share/nginx/html/car_divider/

EXPOSE 80
