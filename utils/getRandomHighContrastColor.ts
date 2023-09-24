export function getRandomHighContrastColor(): string {
  const getRandomHexValue = () => Math.floor(Math.random() * 256).toString(16);
  const randomColor = `#${getRandomHexValue()}${getRandomHexValue()}${getRandomHexValue()}`;

  // Check the luminance of the color to determine if it's dark or light
  const r = parseInt(randomColor.slice(1, 3), 16);
  const g = parseInt(randomColor.slice(3, 5), 16);
  const b = parseInt(randomColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Choose a text color (either black or white) based on luminance
  const textColor = luminance > 0.5 ? "black" : "white";

  return randomColor;
}
