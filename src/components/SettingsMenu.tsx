import { CSSProperties, useContext, useRef, useState } from "react";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import { Menu } from "primereact/menu";
import { ModelContext } from "./contexts";
import "./menu.css";

export default function SettingsMenu({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");
  const state = model.state;

  const settingsMenu = useRef<Menu>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Toggle between dark and white modes
  const toggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    // Apply the class based on the new mode
    if (newMode) {
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
    }
  };

  return (
    <>
      <Menu
        model={
          [
            {
              label: isDarkMode
                ? "Switch to White Mode"
                : "Switch to Dark Mode",
              command: () => toggleMode(),
            },
          ] as MenuItem[]
        }
        popup
        ref={settingsMenu}
      />

      {
        <Button
          title="Settings menu"
          style={{ ...style, zIndex: "11", top: "0px" }}
          className={className}
          rounded
          text
          icon="pi pi-cog"
          onClick={(e) =>
            settingsMenu.current && settingsMenu.current.toggle(e)
          }
        />
      }
    </>
  );
}
