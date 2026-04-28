FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the Vite port
EXPOSE 5173

# Start the dev server and expose it to the Docker network
# The --host flag is crucial for Vite to work inside Docker
CMD ["npm", "run", "dev", "--", "--host"]