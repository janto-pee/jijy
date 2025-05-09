FROM node:20-alpine As development

LABEL org.opencontainers.image.authors="Ayobami Adejumo"
LABEL org.opencontainers.image.title="Ecommerce Backend Service"
LABEL org.opencontainers.image.description="A dockerfile to build a backend service for a recruitment platform"
LABEL org.opencontainers.image.version="1.0"
LABEL org.opencontainers.image.url="https://github.com/janto-pee/jijy"
LABEL org.opencontainers.image.source="https://github.com/janto-pee/jijy"

RUN mkdir app
WORKDIR /app
RUN apk add --no-cache openssl
COPY package*.json .
COPY . .
RUN npm cache clean --force 
RUN rm -rf node_modules 
RUN npm install

FROM node:20-alpine As build
WORKDIR /app
RUN apk add --no-cache openssl
COPY package*.json .
COPY --from=development /app/node_modules ./node_modules
COPY . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

FROM node:20-alpine As production
RUN apk add --no-cache openssl
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV PORT=3000
EXPOSE $PORT
CMD [ "node", "build/src/index.js" ]

RUN apk --no-cache add curl
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://loalhost:${PORT} || exit 1

# HU FLACARECE