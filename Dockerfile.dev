FROM node:18

RUN npm install -g nodemon
RUN mkdir -p /home/app

WORKDIR /home/app

EXPOSE 3001

CMD ["nodemon", "index.js"]