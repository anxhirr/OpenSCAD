import defaultScad from "./default-scad";
import { State } from "./app-state";

export const defaultSourcePath = "/playground.scad";
export const defaultModelColor = "#069";

export const blankProjectState: State = {
  params: {
    sourcePath: defaultSourcePath,
    source: "",
    features: [],
  },
  view: {
    color: defaultModelColor,
    layout: {
      mode: "single",
      focus: "editor",
    },
  },
};

export function createInitialState(fs: any, state: State | null) {
  type Mode = State["view"]["layout"]["mode"];
  const mode: Mode = window.matchMedia("(min-width: 768px)").matches
    ? "multi"
    : "single";

  const initialState: State = {
    params: {
      sourcePath: defaultSourcePath,
      source: defaultScad,
      features: [],
    },
    view: {
      layout: {
        mode: "multi",
        editor: true,
        viewer: true,
        customizer: false,
      } as any,

      color: "#069",
    },
    ...(state ?? {}),
  };

  if (initialState.view.layout.mode != mode) {
    if (mode === "multi" && initialState.view.layout.mode === "single") {
      initialState.view.layout = {
        mode,
        editor: true,
        viewer: true,
        customizer: initialState.view.layout.focus == "customizer",
      };
    } else if (mode === "single" && initialState.view.layout.mode === "multi") {
      initialState.view.layout = {
        mode,
        focus: initialState.view.layout.viewer
          ? "viewer"
          : initialState.view.layout.customizer
          ? "customizer"
          : "editor",
      };
    }
  }

  initialState.view.showAxes ??= true;
  initialState.view.showShadows ??= true;

  fs.writeFile(initialState.params.sourcePath, initialState.params.source);
  if (initialState.params.sourcePath !== defaultSourcePath) {
    fs.writeFile(defaultSourcePath, defaultScad);
  }

  const defaultFeatures = ["manifold", "fast-csg", "lazy-union"];
  defaultFeatures.forEach((f) => {
    if (initialState.params.features.indexOf(f) < 0)
      initialState.params.features.push(f);
  });

  return initialState;
}
