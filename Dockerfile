FROM node:12.6.0
# Create app directory
WORKDIR /app
ADD . /app/

# global install & update
RUN apt-get -y update --fix-missing
RUN apt-get upgrade -y
RUN apt-get -y install vim
RUN npm i -g yarn
RUN npm i -g pm2

RUN rm yarn.lock
#RUN yarn
#RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
#CMD [ "yarn", "start" ]
