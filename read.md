on wsl :

sudo apt install wget
sudo apt install make
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
source ~/.bashrc
nvm install node
sudo apt install unzip


cd 3DSkai-OpenSCAD
make public
npm install
npm start


