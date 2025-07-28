FROM node:20-alpine AS base
WORKDIR /app

# Copy package files
COPY package*.json ./

FROM base AS deps
# Install dependencies (production only)
RUN npm ci --only=production

FROM base AS build
# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy built application from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Copy production dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

# Run the built application
# The standalone Node.js server respects HOST and PORT environment variables
CMD ["node", "./dist/server/entry.mjs"]