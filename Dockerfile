FROM --platform=linux/amd64 node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 80

COPY package.json ./

COPY package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "start"]