## Features

- Automatic preview on edit (F5), and full rendering on Ctrl+Enter (or F6). Using a trick to force $preview=true.
- Syntax highlighting
- Ships with many standard SCAD libraries (can browse through them in the UI)
- Autocomplete of imports
- Autocomplete of symbols / function calls (pseudo-parses file and its transitive imports)
- Responsive layout (but editing on iOS is still a pain, will address that soon). On small screens editor and viewer are stacked onto each other, while on larger screens they can be side-by-side
- Installable as a PWA (then persists edits in localStorage instead of the hash fragment). On iOS just open the sharing panel and tap "Add to Home Screen".

## Building

On LINUX

```bash
chmod +x ./scad.sh

# For dev mode
./scad.sh --dev


# For Production mode
./scad.sh --prod
```

Docker comands :

```bash
docker build -t inert/scad:end .
docker tag inert/scad:end inert/scad:end
docker push inert/scad:end
#run
docker-compose up


#pull
docker pull inert/scad:end
#run
docker run -p 4000:4000 --name Scad-Playground inert/scad:end
```
