## Features

- Automatic preview on edit (F5), and full rendering on Ctrl+Enter (or F6). Using a trick to force $preview=true.
- Syntax highlighting
- Ships with many standard SCAD libraries (can browse through them in the UI)
- Autocomplete of imports
- Autocomplete of symbols / function calls (pseudo-parses file and its transitive imports)
- Responsive layout (but editing on iOS is still a pain, will address that soon). On small screens editor and viewer are stacked onto each other, while on larger screens they can be side-by-side
- Installable as a PWA (then persists edits in localStorage instead of the hash fragment). On iOS just open the sharing panel and tap "Add to Home Screen".

## Roadmap

- Add tests!
- Persist camera state
- Support 2D somehow? (e.g. add option in OpenSCAD to output 2D geometry as non-closed polysets, or to auto-extrude by some height)
- Customizer support. Probably by adding --export-json or --export-format=customizer-json to OpenSCAD. And use React Hook Forms maybe? https://react-hook-form.com/
- Replace Makefile w/ something that reads the libs metadata
- Proper Preview rendering: have OpenSCAD export the preview scene to a rich format (e.g. glTF, with some parts being translucent when prefixed w/ % modifier) and display it using https://modelviewer.dev/ maybe)
- Model /home fs in shared state. have two clear paths: /libraries for builtins, and /home for user data. State pointing to /libraries paths needs not store the data except if there's overrides (flagged as modifications in the file picker)
- Drag and drop of files (SCAD, STL, etc) and Zip archives. For assets, auto insert the corresponding import.
- Fuller PWA support w/ link Sharing, File opening / association to \*.scad files...
- Look into accessibility
- Setup [OPENSCADPATH](https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Libraries#Setting_OPENSCADPATH) env var w/ Emscripten to ensure examples that include assets / import local files will run fine.
- Bundle more examples (ask users to contribute)
- Animation rendering (And other formats than STL)
- Compress URL fragment
- Mobile (iOS) editing support: switch to https://www.npmjs.com/package/react-codemirror ?
- Detect which bundled libraries are included / used in the sources and only download these rather than wait for all of the zips. Means the file explorer would need to be more lazy or have some prebuilt hierarchy.
- Preparse builtin libraries definitions at compile time, ship the JSON.

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
