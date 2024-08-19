import React, { useContext } from "react";
import { SingleLayoutComponentId } from "../state/app-state";
import { TabMenu } from "primereact/tabmenu";
import { ToggleButton } from "primereact/togglebutton";
import { ModelContext, FSContext } from "./contexts";
import SettingsMenu from "./SettingsMenu";
import "./PanelSwitcher.css"; // Import your CSS file

export default function PanelSwitcher() {
  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");

  const state = model.state;

  const singleTargets: {
    id: SingleLayoutComponentId;
    icon: string;
    label: string;
  }[] = [
    { id: "editor", icon: "pi pi-pencil", label: "Edit" },
    { id: "customizer", icon: "pi pi-sliders-h", label: "Customize" },
  ];
  if ((state.parameterSet?.parameters?.length ?? 0) > 0) {
    singleTargets.push({
      id: "viewer",
      icon: "pi pi-box",
      label: "View",
    });
  }
  const multiTargets = singleTargets;

  return (
    <div
      className="flex flex-row"
      style={{
        margin: "0px",
        position: "relative",
      }}>
      {state.view.layout.mode === "multi" ? (
        <div
          className="flex flex-row gap-1"
          style={{
            justifyContent: "center",
            flex: 1,
            margin: "5px",
          }}>
          {multiTargets.map(({ icon, label, id }) => (
            <ToggleButton
              key={id}
              checked={(state.view.layout as any)[id]}
              onLabel={label}
              offLabel={label}
              onIcon={icon}
              offIcon={icon}
              onChange={(e) => model.changeMultiVisibility(id, e.value)}
              className="toggle-button"
            />
          ))}
        </div>
      ) : (
        <TabMenu
          activeIndex={singleTargets
            .map((t) => t.id)
            .indexOf(state.view.layout.focus)}
          style={{
            flex: 1,
          }}
          model={singleTargets.map(({ icon, label, id }) => ({
            icon,
            label,
            command: () => model.changeSingleVisibility(id),
            className: "tab-menu-item",
          }))}
        />
      )}
      <SettingsMenu
        style={{
          position: "absolute",
          right: 0,
          top: "4px",
        }}
      />
    </div>
  );
}
