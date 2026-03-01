FROM node:18-alpine

COPY . /app/Frontend/

WORKDIR /app/Frontend/

ENV PATH /app/Frontend/node_modules/.bin:$PATH

RUN npm install

ARG REACT_APP_API_URL

CMD ["npm", "start"] 