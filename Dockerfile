FROM node:14 as base

WORKDIR /usr/src/yoda-pay

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

COPY src ./src

RUN npm run build

#ENV
ENV NODE_ENV production

EXPOSE 4000
CMD [ "node", "./built/src/main/server.js" ]