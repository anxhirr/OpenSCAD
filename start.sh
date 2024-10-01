#!/bin/bash

echo "--------------------------------------------------------"
sudo apt update

echo "--------------------------------------------------------"
sudo apt install -y wget make zip unzip

echo "--------------------------------------------------------"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

echo "--------------------------------------------------------"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install node
echo "--------------------------------------------------------"

make public
echo "--------------------------------------------------------"

npm i
