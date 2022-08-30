# pull the base image
FROM node:lts-slim

# set the working direction
WORKDIR /app

# install app dependencies
COPY holiday-social-media-be/package*.json ./

RUN npm ci --legacy-peer-deps && npm cache clean --force

# add app
COPY ./holiday-social-media-be .
EXPOSE 3000

# start app
# CMD ["npm", "run", "start"]