## Features

- Automatic preview on edit (F5), and full rendering on Ctrl+Enter (or F6). Using a trick to force $preview=true.
- Syntax highlighting
- Ships with many standard SCAD libraries (can browse through them in the UI)
- Autocomplete of imports
- Autocomplete of symbols / function calls (pseudo-parses file and its transitive imports)
- Responsive layout (but editing on iOS is still a pain, will address that soon). On small screens editor and viewer are stacked onto each other, while on larger screens they can be side-by-side
- Installable as a PWA (then persists edits in localStorage instead of the hash fragment). On iOS just open the sharing panel and tap "Add to Home Screen".

## Building

Start On LINUX

```bash
dos2unix *.sh

chmod +x ./scad.sh

# For dev mode
./scad.sh --dev


# For Production mode
./scad.sh --prod
```

Docker comands :

```bash
docker build -t inert/scad:server .
docker tag inert/scad:server inert/scad:server
docker push inert/scad:server
#run
docker-compose up


#pull
docker pull inert/scad:server
#run
docker run -p 3000:3000 --name Scad-Playground inert/scad:server
```
