FROM node:14 as base

WORKDIR /usr/src/yoda-pay

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

COPY src ./src

RUN npm run build