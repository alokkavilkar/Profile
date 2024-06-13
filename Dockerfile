FROM node

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PASSWORD=password

WORKDIR /app
COPY . /app/
RUN npm i
ENTRYPOINT [ "node" ]
CMD [ "server.js" ]