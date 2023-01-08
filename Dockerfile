FROM node:16-alpine

WORKDIR /my-project
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 8020
EXPOSE 8021

CMD ["yarn", "start"]