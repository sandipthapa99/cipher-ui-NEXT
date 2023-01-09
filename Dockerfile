FROM node:18-alpine
# ENV NODE_OPTIONS="max-old-space-size 8192"
WORKDIR /my-project
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 8020
EXPOSE 8021

CMD ["yarn", "start"]