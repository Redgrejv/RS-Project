FROM ubuntu:16.04

RUN apt-get update

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update

RUN apt-get install nodejs -y
RUN apt-get update

RUN service mongod start

COPY mongo_database/data /

RUN npm install

CMD ["npm", "start"]