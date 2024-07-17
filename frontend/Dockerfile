# Use the official Node.js image from the Docker Hub
FROM node:18-alpine

# Set work directory
WORKDIR /app

# Install dependencies
COPY package.json /app/
RUN yarn install

# Copy project
COPY . /app/

# Build the application
# RUN yarn build

# Expose the port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
