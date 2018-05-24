### STAGE 1: Build ###

FROM node:8.11.2

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/web && cp -a /tmp/node_modules /opt/web/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/web
ADD . /opt/web

#RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
##RUN npm run deploy
RUN npm run deploy:dev

### STAGE 2: Setup ###

#FROM nginx:latest

#COPY nginx.conf /etc/nginx/nginx.conf
#COPY site.conf /etc/nginx/conf.d/default.conf
#RUN rm -rf /usr/share/nginx/html/*

#RUN cp -a /opt/web/dist /usr/share/nginx/html/

#RUN touch /var/run/nginx.pid && \
#  chown -R nginx:nginx /var/run/nginx.pid && \
#  chown -R nginx:nginx /var/cache/nginx && \
#  chown -R nginx:nginx /usr/share/nginx/html

#USER nginx

#RUN cd /usr/share/nginx/html

#CMD [ "nodemon", "dist/server.js" ]

# Expose API port to the outside
EXPOSE 4000

CMD ["node", "dist/server.js"]
