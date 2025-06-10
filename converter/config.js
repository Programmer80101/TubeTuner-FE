const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const ytApiKey = process.env.NEXT_PUBLIC_YT_API_KEY;

const types = [`Audio`, `Video`];

const audioFormats = [
  "mp3",
  "flac",
  "wav",
  "m4a",
  "ogg",
  "webm",
  "opus",
  "aac",
  "aiff",
  "mka",
];

const videoFormats = ["mp4", "mkv", "mov", "avi", "flv", "webm", "gif"];

const videoQualities = [
  "144p",
  "240p",
  "320p",
  "480p",
  "540p",
  "720p",
  "1080p",
];

const audioQualities = [
  "48kbps",
  "64kbps",
  "128kbps",
  "160kbps",
  "256kbps",
  "320kbps",
  "512kbps",
];

const buttonText = {
  idle: "Convert",
  pending: "Pending...",
  converting: "Converting...",
  processing: "Processing...",
  done: "Convert Next",
};

const buttonLabels = {
  idle: "Convert YouTube Video",
  pending: "Pending Conversion",
  converting: "Converting Current YouTube Video",
  processing: "Processing YouTube Video",
  done: "Conversion Completed! Convert Next YouTube Video",
};

const popupText = {
  idle: "",
  pending: "",
  converting: "Conversion Started!",
  processing: "Processing...",
  done: "Conversion Completed!",
};

const popupColors = {
  idle: "",
  pending: "",
  converting: "blue",
  processing: "blue",
  done: "green",
  error: "red",
};

export {
  backendUrl,
  ytApiKey,
  types,
  audioFormats,
  audioQualities,
  videoFormats,
  videoQualities,
  buttonText,
  buttonLabels,
  popupText,
  popupColors,
};
