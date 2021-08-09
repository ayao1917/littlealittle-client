FROM node:12.6.0
# Create app directory
WORKDIR /app

RUN npm i -g yarn
RUN npm i -g pm2

COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3001

# start command
CMD ["pm2-runtime", "start", "yarn", "--", "start"]

