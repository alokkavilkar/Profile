FROM node:13-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PASSWORD=password

WORKDIR /app
COPY . /app/
RUN npm install
ENTRYPOINT [ "node" ]
CMD [ "server.js" ]