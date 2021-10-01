# syntax=docker/dockerfile:1
FROM node:12.18.1
WORKDIR ./ci_cd_app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD npm start
