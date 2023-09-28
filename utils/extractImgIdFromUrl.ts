export function extractImageIdFromUrl(url: string) {
  const regex = /\/([a-f0-9-]+)\/?$/;

  const match = url.match(regex);
  if (match) {
    console.log(match);
    return match[1];
  } else {
    return null;
  }
}
