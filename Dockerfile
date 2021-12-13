FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm run install:client

COPY . .

EXPOSE 8080

RUN npm run build:client
RUN npm run build
RUN rm -rf ./dist/client
RUN mv ./client/dist ./dist/client

CMD [ "node", "dist/index.js" ]
