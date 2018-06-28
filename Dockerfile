FROM node:carbon
LABEL name "my-vuejs-docker-application"
MAINTAINER Juan Pablo Sanchez - Julieth Morales
WORKDIR /app
ADD . /app
RUN npm install
RUN npm install --save axios vue-axios
RUN npm install -g http-server nodemon
RUN npm run build
RUN ls -al /app
EXPOSE 80
CMD ["nodemon", "server.js"]
### CMD ["npm", "start"]