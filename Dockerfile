# remember to mv/cp bower_components and node_modules to static/ before
# build image
FROM nginx:1.17.8

ADD static /usr/local/harmoryedge/web/static

ADD node_modules /usr/local/harmoryedge/web/static/node_modules

EXPOSE 80