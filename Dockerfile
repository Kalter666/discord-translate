FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE $PORT
CMD ["npm", "run","start:prod"]
