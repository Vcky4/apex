FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY apps/api ./apps/api
COPY libs ./libs
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Build application
RUN npx nx build api --configuration=production

# Production image
FROM node:22-alpine

WORKDIR /app

# Copy built files
COPY --from=builder /app/dist/apps/api ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "main.js"]
