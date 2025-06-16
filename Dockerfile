FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json tsconfig.json ./
COPY src ./src

RUN npm install

# RUN npm run build

# RUN npm prune --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]