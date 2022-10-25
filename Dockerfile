FROM node:16

WORKDIR /data/
COPY . /data/
RUN yarn install

CMD yarn dev