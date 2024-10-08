import { useState, useEffect, CSSProperties, useContext, useRef } from "react";
import { State } from "../state/app-state";
import { ModelContext } from "./contexts";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import "./footer.css";

function downloadOutput(state: State) {
  if (!state.output) return;
  const sourcePathParts = state.params.sourcePath.split("/");
  const sourceFileName = sourcePathParts.slice(-1)[0];
  const fileName = [
    sourceFileName,
    state.output!.isPreview ? "preview.stl" : "render.stl",
  ].join(".");
  const doDownload = () => {
    const a = document.createElement("a");
    a.href = state.output!.stlFileURL;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (state.output.isPreview && state.params.source.indexOf("$preview") >= 0) {
    confirmDialog({
      message:
        "This model references the $preview variable but hasn't been rendered (F6), or its rendering is stale. You're about to download the preview result itself, which may not have the intended refinement of the render. Sure you want to proceed?",
      header: "Preview vs. Render",
      icon: "pi pi-exclamation-triangle",
      accept: doDownload,
      acceptLabel: `Download ${fileName}`,
      rejectLabel: "Cancel",
    });
  } else {
    doDownload();
  }
}

export default function Footer({ style }: { style?: CSSProperties }) {
  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");
  const state = model.state;

  const [isRenderClicked, setIsRenderClicked] = useState(false);

  const toast = useRef<Toast>(null);

  const severityByMarkerSeverity = new Map<
    monaco.MarkerSeverity,
    "danger" | "warning" | "info"
  >([
    [monaco.MarkerSeverity.Error, "danger"],
    [monaco.MarkerSeverity.Warning, "warning"],
    [monaco.MarkerSeverity.Info, "info"],
  ]);
  const markers = state.lastCheckerRun?.markers ?? [];

  const getBadge = (s: monaco.MarkerSeverity) => {
    const count = markers.filter((m) => m.severity == s).length;
    const sev =
      s == monaco.MarkerSeverity.Error
        ? "danger"
        : s == monaco.MarkerSeverity.Warning
        ? "warning"
        : s == monaco.MarkerSeverity.Info
        ? "info"
        : "success";
    return (
      <>
        {count > 0 && (
          <Badge value={count} severity={severityByMarkerSeverity.get(s)} />
        )}
      </>
    );
  };

  const maxMarkerSeverity =
    markers.length == 0
      ? undefined
      : markers.map((m) => m.severity).reduce((a, b) => Math.max(a, b));

  // Handle Render button click
  const handleRenderClick = () => {
    setIsRenderClicked(true);
    model.render({ isPreview: false, now: true });
    setIsRenderClicked(false);
  };

  // Trigger loading on page reload
  useEffect(() => {
    setIsRenderClicked(true);
    const timeoutId = setTimeout(() => {
      setIsRenderClicked(false);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      {/* Spinner only shows when the Render button is clicked or the page is loading */}
      <div
        className="inert"
        style={{
          display: isRenderClicked || state.rendering ? "flex" : "none",
        }}>
        <div className="spinner-square">
          <div className="square-1 square"></div>
          <div className="square-2 square"></div>
          <div className="square-3 square"></div>
        </div>
      </div>

      <div
        className="flex flex-row gap-1"
        style={{
          position: "fixed",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          alignItems: "center",
          margin: "5px",
          zIndex: 1000,
          ...(style ?? {}),
        }}>
        <Button
          onClick={handleRenderClick}
          loading={state.rendering}
          icon="pi pi-refresh"
          title="Render the model (F6)."
          label="Render"
        />

        {state.output && (
          <Button
            icon="pi pi-download"
            title={`Download ${
              state.output.isPreview ? "preview.stl" : "render.stl"
            } (${state.output.formattedStlFileSize})\nGenerated in ${
              state.output.formattedElapsedMillis
            }`}
            severity="secondary"
            text
            onClick={() => downloadOutput(state)}
          />
        )}
        <span style={{ flex: 1 }}></span>
        <Toast ref={toast} />
      </div>
    </div>
  );
}
