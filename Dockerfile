FROM node:lts AS runtime
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENV HOST=localhost
ENV PORT=8017
EXPOSE 8017
CMD node ./dist/server/entry.mjs