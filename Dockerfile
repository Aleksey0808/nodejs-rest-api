FROM node

WORKDIR /node.js-rest-api

COPY . /node.js-rest-api/

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]