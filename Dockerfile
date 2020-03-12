FROM node:12-alpine
WORKDIR /usr/app/src

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

EXPOSE 3000
ENV PORT 3000

CMD ["node", "./lib/index.js"]
