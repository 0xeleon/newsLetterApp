FROM node:18

# WORKDIR /home/app/frontend

# RUN mkdir -p /newsletter-app

# COPY newsletter-app/package*.json .

WORKDIR /home/app/frontend/newsletter-app

COPY newsletter-app/* .

RUN npm install

# WORKDIR /home/app/frontend/newsletter-app

# RUN npm run build

