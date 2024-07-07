# Stage 1: Build stage
FROM node:lts AS build

WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker layer caching
COPY package*.json ./

# Install npm dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runtime stage
FROM node:lts AS runtime

WORKDIR /app

# Copy built artifacts from the build stage
COPY --from=build /app/dist ./dist

# Expose port defined in environment variable (default to 3000)
EXPOSE ${PORT}

# Command to run the application
CMD ["node", "./dist/server/entry.mjs"]
