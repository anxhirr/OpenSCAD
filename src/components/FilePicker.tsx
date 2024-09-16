import { CSSProperties, useContext } from "react";
import TreeNode from "primereact/treenode";
import { ModelContext, FSContext } from "./contexts";
import { join } from "../fs/filesystem";
import { defaultSourcePath } from "../state/initial-state";
import { zipArchives } from "../fs/zip-archives";

const showDropdown = false; // Set to false to hide the dropdown

const biasedCompare = (a: string, b: string) =>
  a === "openscad" ? -1 : b === "openscad" ? 1 : a.localeCompare(b);

function listFilesAsNodes(
  fs: FS,
  path: string,
  accept?: (path: string) => boolean
): TreeNode[] {
  const files: [string, string][] = [];
  const dirs: [string, string][] = [];
  for (const name of fs.readdirSync(path)) {
    if (name.startsWith(".")) {
      continue;
    }
    const childPath = join(path, name);
    if (accept && !accept(childPath)) {
      continue;
    }
    const stat = fs.lstatSync(childPath);
    const isDirectory = stat.isDirectory();
    if (!isDirectory && !name.endsWith(".scad")) {
      continue;
    }
    (isDirectory ? dirs : files).push([name, childPath]);
  }
  [files, dirs].forEach((arr) => arr.sort(([a], [b]) => biasedCompare(a, b)));

  const nodes: TreeNode[] = [];
  for (const [arr, isDirectory] of [
    [files, false],
    [dirs, true],
  ] as [[string, string][], boolean][]) {
    for (const [name, path] of arr) {
      let children: TreeNode[] = [];
      let label = name;
      if (path.lastIndexOf("/") === 0) {
        const config = zipArchives[name];
        if (config && config.gitOrigin) {
          const repoUrl = config.gitOrigin.repoUrl;
          if (!children) children = [];

          children.push({
            icon: "pi pi-github",
            label: repoUrl.replaceAll("https://github.com/", ""),
            key: repoUrl,
            selectable: true,
          });

          for (const [label, link] of Object.entries(config.docs ?? [])) {
            children.push({
              icon: "pi pi-book",
              label,
              key: link,
              selectable: true,
            });
          }
        }
      }

      if (isDirectory) {
        children = [...children, ...listFilesAsNodes(fs, path, accept)];
        if (children.length == 0) {
          continue;
        }
      }

      nodes.push({
        // icon: isDirectory ? 'pi pi-folder' : isFileWritable(path) ? 'pi pi-file' : 'pi pi-lock',
        icon: isDirectory
          ? "pi pi-folder"
          : path === defaultSourcePath
          ? "pi pi-home"
          : "pi pi-file",
        label,
        data: path,
        key: path,
        children,
        selectable: !isDirectory,
      });
    }
  }
  return nodes;
}

export default function FilePicker({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");
  const state = model.state;

  const fs = useContext(FSContext);
  return null;
}
