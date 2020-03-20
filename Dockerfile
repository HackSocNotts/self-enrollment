FROM node:12-alpine AS frontend-builder
WORKDIR /usr/app/src
COPY ./frontend/package.json .
COPY ./frontend/yarn.lock .
RUN yarn install --frozen-lockfile
COPY ./frontend .
RUN yarn build

FROM node:12-alpine AS server-builder
WORKDIR /usr/app/src
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:12-alpine
WORKDIR /usr/app
COPY --from=frontend-builder /usr/app/src/build ./frontend/build
COPY --from=server-builder /usr/app/src/node_modules ./node_modules
COPY --from=server-builder /usr/app/src/lib ./lib
EXPOSE 3000
ENV PORT 3000
CMD ["node", "./lib/index.js"]
