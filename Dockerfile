# syntax=docker/dockerfile:1

FROM node:16.13.0

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main"]