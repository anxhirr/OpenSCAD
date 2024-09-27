#!/bin/bash

# Install wget
sudo apt install -y wget

# Install make
sudo apt install -y make

# Install zip
sudo apt install -y zip

# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

# Source nvm to make it available in the current shell session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Install Node.js using NVM (installs the latest version of Node.js)
nvm install node

# Set Node.js to the default version
nvm use node

# Install Yarn globally using npm (as Yarn might not be included by default)
npm install -g yarn

# Install unzip
sudo apt install -y unzip

# Install Yarn dependencies for your project
yarn install

# Run the 'make public' command
make public

#test build comand
yarn run build:prod