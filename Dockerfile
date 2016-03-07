FROM node:5.2.0-slim
MAINTAINER connor@jenca.io
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --production
COPY . /app
ENTRYPOINT ["node", "index.js"]