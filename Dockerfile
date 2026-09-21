FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG SITE_URL=""
RUN SITE_URL="$SITE_URL" npm run build

FROM nginx:1.28-alpine AS runtime
COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY deploy/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
USER nginx
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/salud || exit 1
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
