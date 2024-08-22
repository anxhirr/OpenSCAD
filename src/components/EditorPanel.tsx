import React, { CSSProperties, useContext, useRef, useState } from "react";
import Editor, { loader, Monaco } from "@monaco-editor/react";
import openscadEditorOptions from "../language/openscad-editor-options";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import { Menu } from "primereact/menu";
import { buildUrlForStateParams } from "../state/fragment-state";
import { blankProjectState, defaultSourcePath } from "../state/initial-state";
import { ModelContext, FSContext } from "./contexts";
import FilePicker from "./FilePicker";

// const isMonacoSupported = false;
const isMonacoSupported = (() => {
  const ua = window.navigator.userAgent;
  const iosWk = ua.match(/iPad|iPhone/i) && ua.match(/WebKit/i);
  return !iosWk;
})();

let monacoInstance: Monaco | null = null;
if (isMonacoSupported) {
  loader.init().then((mi) => (monacoInstance = mi));
}

export default function EditorPanel({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");

  const menu = useRef<Menu>(null);

  const state = model.state;

  const [editor, setEditor] = useState(
    null as monaco.editor.IStandaloneCodeEditor | null
  );

  if (editor) {
    const checkerRun = state.lastCheckerRun;
    const editorModel = editor.getModel();
    if (editorModel) {
      if (checkerRun && monacoInstance) {
        monacoInstance.editor.setModelMarkers(
          editorModel,
          "openscad",
          checkerRun.markers
        );
      }
    }
  }

  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editor.addAction({
      id: "openscad-render",
      label: "Render OpenSCAD",
      run: () => model.render({ isPreview: false, now: true }),
    });
    editor.addAction({
      id: "openscad-preview",
      label: "Preview OpenSCAD",
      run: () => model.render({ isPreview: true, now: true }),
    });
    setEditor(editor);
  };

  return (
    <div
      className={`editor-panel ${className ?? ""}`}
      style={{
        // maxWidth: '5 0vw',
        display: "flex",
        flexDirection: "column",
        // position: 'relative',
        // width: '100%', height: '100%',
        ...(style ?? {}),
      }}>
      <div
        style={{
          position: "relative",
          flex: 1,
          backgroundColor: "#1e1e1e", // Ensure the background is dark even outside the editor
          color: "#d4d4d4", // Light text color to match the dark theme
        }}>
        {isMonacoSupported && (
          <Editor
            className="openscad-editor absolute-fill"
            defaultLanguage="openscad"
            path={state.params.sourcePath}
            value={state.params.source}
            onChange={(s) => (model.source = s ?? "")}
            onMount={onMount}
            options={{
              ...openscadEditorOptions,
              fontSize: 16,
              lineNumbers: state.view.lineNumbers ? "on" : "off",
              theme: "vs-dark", // VS Code dark theme
            }}
          />
        )}
        {!isMonacoSupported && (
          <InputTextarea
            style={{
              backgroundColor: "#1e1e1e", // Dark background for fallback textarea
              color: "#d4d4d4", // Light text color
            }}
            className="openscad-editor absolute-fill"
            value={state.params.source}
            onChange={(s) => (model.source = s.target.value ?? "")}
          />
        )}
      </div>

      <div
        style={{
          display: state.view.logs ? undefined : "none",
          overflowY: "scroll",
          height: "calc(min(200px, 30vh))",
        }}>
        <pre>
          <code id="logs" style={{}}>
            {state.lastCheckerRun?.logText ?? "No log yet!"}
          </code>
        </pre>
      </div>
    </div>
  );
}
