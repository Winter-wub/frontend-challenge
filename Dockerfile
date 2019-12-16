FROM node:13.3.0-alpine3.10 as BUILD
RUN npm install yarn -g
WORKDIR /app
COPY . .
RUN yarn --prod
RUN yarn build
FROM nginx:1.15.2-alpine as BASE
WORKDIR /app
COPY --from=BUILD /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]