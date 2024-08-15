export default `
// 3DSKAI Pen
// by 3DSKAI

translate([0, -30, -12])
  linear_extrude(1)
    text("3DSKAI", halign="center", valign="center");

// Pen dimensions
pen_length = 150;
pen_diameter = 10;
cap_length = 25;
cap_diameter = 11;
tip_length = 20;
tip_diameter = 6;

// Main body of the pen
module pen_body() {
    cylinder(h = pen_length, r = pen_diameter / 2);
}

// Pen cap
module pen_cap() {
    translate([0, 0, pen_length])
        cylinder(h = cap_length, r = cap_diameter / 2);
}

// Pen tip
module pen_tip() {
    translate([0, 0, -tip_length])
        cylinder(h = tip_length, r1 = tip_diameter / 2, r2 = pen_diameter / 2);
}

// Combine all parts
module pen() {
    pen_tip();
    pen_body();
    pen_cap();
}

// Render the pen
pen();


`;
