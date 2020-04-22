FROM node:lts-alpine3.9

MAINTAINER danii_mor

WORKDIR /usr/src/esb

COPY . /usr/src/esb

CMD npm start
