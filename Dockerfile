FROM node:10

WORKDIR /

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8082

CMD [ "node", "file-manager.js" ]
