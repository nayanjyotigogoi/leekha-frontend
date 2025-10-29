# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy rest of the project
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Run Stage ----
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only the necessary build output
COPY --from=builder /app ./

# Expose the default Next.js port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
