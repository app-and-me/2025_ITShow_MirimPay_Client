FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.loc*k ./

RUN yarn install --production
RUN yarn global add vite
RUN yarn add @vitejs/plugin-react
RUN mv node_modules ../

COPY . .

EXPOSE 2095

CMD ["yarn", "dev"]