## Features

- Automatic preview on edit (F5), and full rendering on Ctrl+Enter (or F6). Using a trick to force $preview=true.
- Syntax highlighting
- Ships with many standard SCAD libraries (can browse through them in the UI)
- Autocomplete of imports
- Autocomplete of symbols / function calls (pseudo-parses file and its transitive imports)
- Responsive layout (but editing on iOS is still a pain, will address that soon). On small screens editor and viewer are stacked onto each other, while on larger screens they can be side-by-side
- Installable as a PWA (then persists edits in localStorage instead of the hash fragment). On iOS just open the sharing panel and tap "Add to Home Screen".

## Building

Prerequisites:

- wget
- GNU make
- npm

Local dev:

On LINUX

```bash
yarn install
make public
yarn start:dev
```

First Start :

```bash
sudo apt install wget

sudo apt install make

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

source ~/.bashrc

nvm install node

sudo apt install unzip

cd 3DSkai-OpenSCAD

yarn install

make public

yarn start:dev

```

rebuild

```bash
yarn run build
```

Docker comands :

```bash

docker build -t inert/scad:end . # this will build the docker img

docker tag inert/scad:end inert/scad:end  #this will tag the docekr img

docker push inert/scad:end  # this will push the changes on the docker img

docker pull inert/scad:end # this will pull the docker img

docker run -p 4000:4000 --name Scad-Playground inert/scad:end # start the docker img

```
