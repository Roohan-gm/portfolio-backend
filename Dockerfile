FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only what's needed
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 8001

# Start the app
CMD ["node", "dist/server.js"]