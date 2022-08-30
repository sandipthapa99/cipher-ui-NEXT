FROM node:16-alpine as dependencies
WORKDIR /my-project
RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" "FD33FBB4-0EE4-4D25-9DC1-1E0D505FCC32"
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine as builder
WORKDIR /my-project
COPY . .
COPY --from=dependencies /my-project/node_modules ./node_modules
RUN yarn build

FROM node:16-alpine as runner
WORKDIR /my-project
ENV NODE_ENV production

COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /my-project/public ./public
COPY --from=builder /my-project/.next ./.next
COPY --from=builder /my-project/node_modules ./node_modules
COPY --from=builder /my-project/package.json ./package.json

EXPOSE 3004
ENV PORT 3004
CMD ["yarn", "start"]