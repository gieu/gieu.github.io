FROM node:lts AS runtime
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 8517

CMD node ./dist/server/entry.mjs