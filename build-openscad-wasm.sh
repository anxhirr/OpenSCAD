#!/bin/bash
set -euo pipefail

# Define the default directory if not set
OPENSCAD_DIR="${OPENSCAD_DIR:-$HOME/tmp/openscad-color}"

# Clone the OpenSCAD repository
if [ ! -d "$OPENSCAD_DIR" ]; then
  echo "Cloning the OpenSCAD repository..."
  git clone --recurse https://github.com/inerttila/3DSkai-OpenSCAD.git \
    "$OPENSCAD_DIR"
else
  echo "Directory $OPENSCAD_DIR already exists."
fi

# Run CMake and build with Docker
docker run --rm -it -v "$OPENSCAD_DIR":/src:rw --platform=linux/amd64 openscad/wasm-base:latest \
  emcmake cmake -B build -DEXPERIMENTAL=ON "$@"
docker run --rm -it -v "$OPENSCAD_DIR":/src:rw --platform=linux/amd64 openscad/wasm-base:latest \
  cmake --build build -j10

# Prepare the output directory and copy files
rm -rf libs/openscad-wasm
mkdir -p libs/openscad-wasm

cp "$OPENSCAD_DIR/build/openscad.wasm" libs/openscad-wasm/
cp "$OPENSCAD_DIR/build/openscad.js" libs/openscad-wasm/
cp "$OPENSCAD_DIR/build/openscad.wasm.map" libs/openscad-wasm/ || true
(cd libs && zip -r ../dist/openscad-wasm.zip openscad-wasm)
