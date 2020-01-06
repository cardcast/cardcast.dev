FROM node:8.16.0-alpine AS build-env

WORKDIR /app

COPY ./package*.json ./

RUN npm install 

COPY . .

RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=build-env /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]