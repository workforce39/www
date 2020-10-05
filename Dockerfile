# building stage
FROM node:14.12 as build-stage

ARG CONTRACT_ADDR

WORKDIR /app
COPY package*.json ./
RUN npm install
ENV CONTRACT_ADDR=${CONTRACT_ADDR}
RUN touch .env
COPY . .
RUN npm run build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]