
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./.env.local ./ 



RUN npm run build

EXPOSE 3003

CMD ["npm", "run", "start:prod"]