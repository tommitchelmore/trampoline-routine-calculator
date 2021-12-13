FROM node:14.17.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN mkdir client
COPY ./client/package*.json ./client/
RUN npm run install:client

COPY . .

ENV NODE_ENV production
EXPOSE 3030

RUN npm run build:client
RUN npm run build
RUN rm -rf ./dist/client
RUN mv ./client/build ./dist/client

CMD [ "node", "dist/index.js" ]
