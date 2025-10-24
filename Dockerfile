# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./

# Install ALL dependencies (including typescript)
RUN npm ci

# Copy source and build
COPY src ./src
COPY tsconfig.json .
RUN npx tsc

# Final stage
FROM node:20-alpine

WORKDIR /app

# Install ONLY production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled JS from builder
COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/server.js"]