FROM node:12

WORKDIR /user/src 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "./dist/index.js"]