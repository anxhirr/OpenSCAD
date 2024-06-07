// Portions of this file are Copyright 2021 Google LLC, and licensed under GPL2+. See COPYING.

export default `

// Click on Render or hit F6 to do a fine-grained rendering.
$fn=$preview ? 20 : 100;

translate([-24,0,0]) {
  union() {
    cube(15, center=true);
    sphere(10);
  }
}

intersection() {
  cube(15, center=true);
  sphere(10);
}

translate([24,0,0]) {
  difference() {
    cube(15, center=true);
    sphere(10);
  }
}

translate([0, -30, -12])
  linear_extrude(1)
    text("OpenSCAD Playground", halign="center", valign="center");
`