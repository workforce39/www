# building stage
FROM node:14.12 as build-stage

ARG ELASTIC_URL
ARG ELASTIC_USER
ARG ELASTIC_PASS

WORKDIR /app
COPY package*.json ./
RUN npm install
ENV ELASTIC_URL=${ELASTIC_URL}
ENV ELASTIC_USER=${ELASTIC_USER}
ENV ELASTIC_PASS=${ELASTIC_PASS}
RUN touch .env
COPY . .
RUN npm run build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]