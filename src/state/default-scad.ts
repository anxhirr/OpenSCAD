export default `
// PlayStation2 Slim Stand
// Made By 3DSKAI


e = 0.04; // epsilon
phi = (1 + sqrt(5)) / 2;

ps2_thickness = 28; // Includes rubber feet.
ps2_top_thickness = 15; // the layer that juts out on the front and top.
ps2_ridge_thickness = 2.85; // thickness of 3 cosmetic ridges on top layer.
ps2_ridge_height = 2.45; // height of 3 cosmetic ridges on top layer.
ps2_ridge_micro_height = 0.2; // height of 3 cosmetic ridges on bottom end.
ps2_top_length = 151; // Length from front to back.
ps2_bottom_length = 147.3;
ps2_rear_to_vent_rear = 68;
ps2_rear_to_vent_front = 131;
ps2_top_width = 229;
ps2_bottom_width = 211;
vent_wall_thickness = 2.25; // Thickness of wall between vent and nearest edge

ps2_bottom_thickness = ps2_thickness - ps2_top_thickness;
ps2_vent_length = ps2_rear_to_vent_front - ps2_rear_to_vent_rear;
ps2_ridge_spacing = (ps2_top_thickness - 3 * ps2_ridge_thickness) / 2;
$fn=360;

module stand(
    leg_width,
    leg_height,
    leg_thickness,
    leg_spacing,
    base_height
){
    module leg(width, height, thickness) {
        module half_leg(width, height, thickness) {
            translate([(ps2_thickness) / 2, -thickness / 2, 0])
                difference() {
                    cube(size=[width, thickness, height]);
                    translate([width, thickness + e, height])
                        rotate([90,0,0])
                        union(){
                            scale([width - ps2_ridge_thickness - ps2_ridge_height,
                                  height - ps2_ridge_thickness - ps2_ridge_height,
                                  thickness + 2 * e])
                                cylinder();

                            for (i = [0 : 1]) {
                                translate([0, 0,
                                          ps2_ridge_thickness + i *
                                          (ps2_ridge_thickness +
                                           ps2_ridge_spacing)]) {
                                    scale([width - ps2_ridge_thickness,
                                          height - ps2_ridge_thickness,
                                          ps2_ridge_spacing])
                                        cylinder();
                                }
                            }
                        }
                }

        }
        half_leg(width, height, thickness);
        mirror([1, 0, 0]) half_leg(width, height, thickness);
    }

    module base(width, length, height) {
        scale([1, -1, -1])
        translate([-width / 2,
                  - (length -  ps2_ridge_thickness) / 2 , 0])
        // From here, the top back left corner of the base (inside the
        // inset) is the origin. Positive x is right, and positive z is
        // down.
        difference() {
            union() {
                // Main base slab.
                translate([0, -ps2_ridge_thickness, 0])
                    cube([width, length, height]);

                // Ridge on base at back.
                translate([0, -ps2_ridge_thickness, -ps2_ridge_height])
                    cube([width, ps2_ridge_thickness, ps2_ridge_height + height]);

                // Nub at front vent area.
                translate([ps2_thickness - nub_width, ps2_bottom_length, -nub_height]) cube([nub_width, ps2_top_length - ps2_bottom_length, nub_height + height]);
            }

            translate([0, 0, -e])
                union() {
                    // Tolerance for micro-ridges
                    cube([ps2_top_thickness + ps2_ridge_micro_height, ps2_top_length, ps2_ridge_micro_height]);

                    // Interior void
                    translate([ps2_ridge_thickness, ps2_ridge_thickness, 0]) {
                        cube([vent_width, ps2_rear_to_vent_rear - 2* ps2_ridge_thickness, vent_height]);
                    }

                    // Main vent area.
                    translate([ps2_ridge_thickness, ps2_rear_to_vent_rear + vent_height, 0]) {
                        cube(size=[vent_width, ps2_vent_length - vent_height + e , height - ps2_ridge_thickness]);
                    rotate([0,90,0])
                            cylinder(h=vent_width, r=vent_height);
                    }

                    // Front vent slots.
                    for (i = [0 : num_slots - 1]) {
                        translate([vent_offset + i * (ps2_ridge_thickness + ps2_ridge_spacing), ps2_rear_to_vent_front - e, -nub_height])
                            cube(size=[ps2_ridge_thickness, ps2_top_length, height - ps2_ridge_thickness + nub_height]);
                    }
                }
        }

        // The extra 0.5 * ps2_ridge_spacing is to make sure the transition
        // happens in the middle of a vent slot.
        nub_width = ps2_ridge_thickness * 2 + ps2_ridge_spacing * 1.5;
        nub_height = ps2_ridge_height;
        num_slots =
            floor((ps2_thickness - ps2_ridge_spacing - 2 * ps2_ridge_thickness) /
                  (ps2_ridge_thickness + ps2_ridge_spacing)) + 1;
        vent_offset = ps2_ridge_thickness;
        vent_width = width - vent_wall_thickness - ps2_ridge_thickness;
        vent_height = height - ps2_ridge_thickness;
    }

    base_width = ps2_thickness;
    base_length = ps2_top_length + ps2_ridge_thickness;

    difference() {
        union() {
            // back leg
            translate([0, leg_spacing / 2, -base_height]) leg(leg_width, leg_height, leg_thickness);

            // front leg
            translate([0, -(leg_spacing / 2), -base_height]) leg(leg_width, leg_height, leg_thickness);

            base(base_width, base_length, base_height);
        }
    }

}

shade = .5;
base_height = ps2_bottom_thickness;
leg_width = 35;

color([shade,shade,shade])
stand(
  leg_width,                                    // leg_width
  leg_width + base_height,                      // leg_height
  ps2_top_thickness,                            // leg_thickness
  ps2_top_length - 20 - ps2_top_thickness,      // leg_spacing
  base_height                                   // base_height
);

// PS2 Slim stand-in for debugging purposes.
% translate([-ps2_thickness / 2, ps2_top_length / 2, 0])
    union() {
        translate([0,-ps2_top_length,0])
            cube([ps2_top_thickness, ps2_top_length, ps2_top_width]);
        translate([ps2_top_thickness,-ps2_bottom_length,0])
            cube([ps2_thickness - ps2_top_thickness, ps2_bottom_length,
                 ps2_bottom_width]);
    }

`;
