FROM node:12

FROM rabbitmq:management

RUN sudo docker run -dit --name Myrabbitmq -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin -p 15672:15672 -p 5672:5672 rabbitmq:managemen

FROM mysql:5.7

RUN sudo docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7

WORKDIR /usr/src/app 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "./dist/index.js"]