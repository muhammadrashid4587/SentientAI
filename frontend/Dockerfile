# frontend/Dockerfile

# 1. Node image
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

# either…
RUN npm ci --legacy-peer-deps

# …or create an .npmrc so you don’t need to repeat the flag:
# RUN echo "legacy-peer-deps=true" > .npmrc
# RUN npm ci


# 3. Copy source and build
COPY . .
RUN npm run build

# 4. Serve with a simple static server
RUN npm install -g serve

EXPOSE 5173

# 5. Start the static server
CMD ["serve", "-s", "dist", "-l", "5173"]
