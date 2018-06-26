FROM ubuntu:17.10

#update system, add required packages
RUN apt-get update && apt-get install -y curl \ 
&& curl -sL https://deb.nodesource.com/setup_8.x | bash - \
&& apt-get update && apt-get install -y git nodejs \
&& apt-get clean

#set git user 
RUN git config --global user.name "root"
RUN git config --global user.email "root@localhost"

# create workspace and make current
RUN mkdir -p /SLACKRELAY
WORKDIR /SLACKRELAY

COPY package.json ./
COPY server.js ./
COPY ./slack_relay_secrets.json ./

# starting server
RUN npm install
RUN node server.js