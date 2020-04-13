FROM node:lts-alpine3.9

MAINTAINER danii_mor

WORKDIR /usr/src/esb

COPY . /usr/src/esb

RUN apk update &&\
    apk add redis --no-cache &&\
    npm install

EXPOSE 80

CMD /usr/bin/redis-server --daemonize yes; node esb
