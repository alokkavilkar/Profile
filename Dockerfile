FROM node

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PASSWORD=password

WORKDIR /app
COPY . /app/
ENTRYPOINT [ "node" ]
CMD [ "server.js" ]