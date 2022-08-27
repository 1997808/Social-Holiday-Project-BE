# pull the base image
FROM node:lts-slim

# set the working direction
WORKDIR /app

# install app dependencies
COPY ["package.json", "./"]

RUN npm install --legacy-peer-deps

# add app
COPY . .
EXPOSE 3001

# start app
# CMD ["npm", "run", "start"]