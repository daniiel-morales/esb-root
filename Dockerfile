FROM node:lts-alpine3.9

MAINTAINER danii_mor

WORKDIR /usr/src/esb

COPY . /usr/src/esb

RUN apk update && \
    apk add redis && \
    npm install

EXPOSE 2013

CMD ["node", "esb"]


