# Use an official Node.js runtime as a parent image
FROM node:18

# Install prerequisites
RUN apt-get update && apt-get install -y \
    wget \
    make \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /usr/src/app

# Install nvm and Node.js
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && nvm install node

# Copy the local package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN make public
RUN yarn run build

# Expose the port the app runs on
EXPOSE 4000

# Command to run the app
CMD ["yarn", "start:dev"]
