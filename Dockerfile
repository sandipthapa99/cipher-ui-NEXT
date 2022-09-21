FROM node:16-alpine

WORKDIR /my-project
RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" "FD33FBB4-0EE4-4D25-9DC1-1E0D505FCC32"
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 8020

CMD ["yarn", "start"]