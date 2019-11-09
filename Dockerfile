FROM node:10

WORKDIR /

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8082

CMD [ "mkdir", "SAVE" ]

CMD [ "node", "file-manager.js" ]
