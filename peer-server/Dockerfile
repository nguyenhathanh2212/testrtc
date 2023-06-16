FROM node:12

WORKDIR /peer-server
ADD ./peer-server/package.json .
RUN npm install
COPY ./peer-server/public ./public
COPY ./peer-server/app.js ./app.js

CMD node app.js