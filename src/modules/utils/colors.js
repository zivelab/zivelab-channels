export function hexToRgbA(hex, alpha = 1) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      alpha +
      ")"
    );
  }
  throw new Error("Bad Hex");
}

export const palette = {
  bar: [
    "#396AB1",
    "#DA7C30",
    "#3E9651",
    "#CC2529",
    "#535154",
    "#6B4C9A",
    "#922428",
    "#948B3D"
  ],
  line: [
    "#3869B1",
    "#DA7E30",
    "#3F9852",
    "#CC2428",
    "#535055",
    "#6B4C9A",
    "#922427",
    "#958C3D"
  ]
};
