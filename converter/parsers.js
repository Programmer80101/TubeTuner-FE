function parseYouTubeVideoID(url) {
  if (typeof url !== "string") return null;

  const regex =
    /(?:youtu(?:\.be\/|be\.com\/(?:.*?(?:v=|vi=|v\/|embed\/|shorts\/))))([A-Za-z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function parseISODuration(isoDuration) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = isoDuration.match(regex);

  if (!matches) return "00:00:00";

  const hours = parseInt(matches[1] || "0", 10);
  const minutes = parseInt(matches[2] || "0", 10);
  const seconds = parseInt(matches[3] || "0", 10);

  const pad = (num) => String(num).padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export {parseYouTubeVideoID, parseISODuration};
