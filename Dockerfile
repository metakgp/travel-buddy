# Step 1: Use an official Node.js runtime as a base image
FROM node:18-alpine AS base

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application
COPY . .

# Step 6: Set environment variables for production
ENV NODE_ENV=production

# Step 7: Build the Next.js application
RUN npm run build

# Step 8: Production stage
FROM node:18-alpine AS production

# Step 9: Set working directory
WORKDIR /app

# Step 10: Copy built application and dependencies from base stage
COPY --from=base /app/package.json /app/package-lock.json ./
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/node_modules ./node_modules

# Step 11: Copy metaploy stuff
COPY metaploy/ ./

# Step 12: Set the command to start the application
CMD ["./postinstall.sh", "npm start"]
