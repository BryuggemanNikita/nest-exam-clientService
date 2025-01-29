FROM node:20.16-alpine 

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
