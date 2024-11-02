FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Compile TypeScript
RUN npx tsc -b
RUN npx prisma generate
# Expose port
EXPOSE 3000

# Start the application and run prisma pull
CMD ["sh", "-c", "npx prisma db pull && npx prisma generate &&  node dist/index.js"]
