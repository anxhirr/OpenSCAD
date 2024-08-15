import { useRef } from "react";
import { Menu } from "primereact/menu";

export default function HelpMenu() {
  const menuRef = useRef<Menu>(null);
  return (
    <>
      <Menu
        model={[
          {
            label: "openscad-playground",
            icon: "pi pi-github",
            url: "https://github.com/openscad/openscad-playground",
            target: "_blank",
          },
          {
            label: "LICENSES",
            icon: "pi pi-info-circle",
            url: "https://github.com/openscad/openscad-playground/blob/main/LICENSE.md",
            target: "_blank",
          },
          {
            label: "OpenSCAD Docs",
            icon: "pi pi-book",
            url: "https://openscad.org/documentation.html",
            target: "_blank",
          },
          {
            label: "Customizer Syntax",
            icon: "pi pi-book",
            url: "https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Customizer",
            target: "_blank",
          },

          {
            label: "OpenSCAD Cheatsheet",
            icon: "pi pi-palette",
            url: "https://openscad.org/cheatsheet/",
            target: "_blank",
          },
          {
            label: "BOSL2 Cheatsheet",
            icon: "pi pi-palette",
            url: "https://github.com/BelfrySCAD/BOSL2/wiki/CheatSheet",
            target: "_blank",
          },
        ]}
        popup
        ref={menuRef}
      />
    </>
  );
}
