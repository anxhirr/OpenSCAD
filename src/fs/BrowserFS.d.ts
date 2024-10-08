// import { FS } from "./filesystem";

declare interface FS {
  writeFile(path: string, content: string): void;
  readdir(path: string, cb: (err: any, files: string[]) => void): void;
  readdirSync(path: string): string[];
  symlink(target: string, source: string): void;
  readFileSync(path: string): BufferSource;
  lstatSync(path: string): { isDirectory(): boolean };
}

declare interface EmscriptenFS extends FS {}

declare type BrowserFSInterface = {
  BFSRequire: (name: string) => any;

  install: (windowOrSelf: Window) => void;
  configure: (options: any, callback: (e?: any) => void) => void;

  EmscriptenFS: {
    new (fs: FS, path: string, errnoCodes: object): EmscriptenFS;
  };
};
