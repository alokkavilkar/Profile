FROM node:22-alpine3.19

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PASSWORD=password

WORKDIR /app
COPY . /app/
RUN npm install
ENTRYPOINT [ "node" ]
CMD [ "server.js" ]