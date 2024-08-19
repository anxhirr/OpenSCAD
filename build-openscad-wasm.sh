#!/bin/bash
set -euo pipefail

# Define the default directory if not set
OPENSCAD_DIR="${OPENSCAD_DIR:-$HOME/tmp/openscad-color}"

# Clone the OpenSCAD repository
if [ ! -d "$OPENSCAD_DIR" ]; then
  echo "Cloning the OpenSCAD repository..."
  git clone --recurse https://github.com/inerttila/3DSkai-OpenSCAD.git "$OPENSCAD_DIR"
else
  echo "Directory $OPENSCAD_DIR already exists."
fi

# Navigate to the project directory
cd "$OPENSCAD_DIR"

# Install necessary packages
sudo apt update
sudo apt install -y wget make unzip git curl

# Install nvm and Node.js
if [ ! -d "$HOME/.nvm" ]; then
  echo "Installing nvm..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
  # Load nvm into the current shell session
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  nvm install node
else
  echo "nvm is already installed."
  # Load nvm into the current shell session
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Install Node.js dependencies, build, and start the project
npm install
make public
npm start