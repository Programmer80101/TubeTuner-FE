"use client";

import { FaArrowsRotate } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

import axios from "axios";
import { useEffect, useState } from "react";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import useLocalStorage from "@/hooks/useLocalStorage";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Switch from "@/components/Switch";
import DotLoader from "@/components/DotLoader";
import Dropdown from "@/components/Dropdown";
import Tooltip from "@/components/Tooltip";
import withPopup from "@/hoc/withPopup";
import "@/css/Converter.css";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const ytApiKey = process.env.NEXT_PUBLIC_YT_API_KEY;

const types = [
  `Audio`,
  `Video`,
];

const audioFormats = [
  'mp3',
  'wav',
  'flac',
  'aac',
  'opus',
  'ac3',
  'vorbis',
  'alac',
];

const videoFormats = [
  'mp4',
  'mkv',
  'mov',
  'avi',
  'flv',
  'webm',
  "gif",
];

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

const displayStatus = {
  idle: "Convert",
  pending: "Pending...",
  converting: "Converting...",
  processing: "Processing...",
  done: "Convert Next",
}

const displayStatusLabel = {
  idle: "Convet YouTube Video",
  pending: "Pending Conversion",
  converting: "Converting Current YouTube Video",
  processing: "Processing YouTube Video",
  done: "Conversion Completed! Convert Next YouTube Video",
}

const displayStatusPopup = {
  idle: "",
  pending: "",
  converting: "Conversion Started!",
  processing: "Processing...",
  done: "Conversion Completed!",
}

const displayStatusPopupColors = {
  idle: "",
  pending: "",
  converting: "blue",
  processing: "blue",
  done: "green",
  error: "red",
}

function extractYouTubeVideoID(url) {
  if (typeof url !== 'string') return null;

  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function parseISODuration(isoDuration) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = isoDuration.match(regex);

  if (!matches) return '00:00:00';

  const hours = parseInt(matches[1] || '0', 10);
  const minutes = parseInt(matches[2] || '0', 10);
  const seconds = parseInt(matches[3] || '0', 10);

  const pad = (num) => String(num).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function Converter({ addPopup }) {
  const [url, setUrl] = useLocalStorage("converter-url", "");
  const [type, setType] = useLocalStorage("converter-type", 0);
  const [videoFormat, setVideoFormat] = useLocalStorage("converter-video-format", 0);
  const [audioFormat, setAudioFormat] = useLocalStorage("converter-audio-format", 0);
  const [videoQuality, setVideoQuality] = useLocalStorage("converter-video-quality", 3);
  const [audioQuality, setAudioQuality] = useLocalStorage("converter-audio-quality", 2);
  const [autoDownload, setAutoDownload] = useLocalStorage("converter-auto-download", false);

  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [videoDetails, setVideoDetails] = useState({});

  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const isOnline = useOnlineStatus();

  const triggerDownload = () => {
    const fileFormat = type === 0 ? audioFormats[audioFormat] : videoFormats[videoFormat]
    const url = [
      `${backendUrl}/download/`,
      `?fileName=`,
      encodeURIComponent(`${fileName}.${fileFormat}`),
      `&customName=`,
      encodeURIComponent(`${videoDetails.title}.${fileFormat}`)
    ]

    window.location = url.join("");
    // or window.location.href
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isOnline) {
      addPopup("Network error! Check your connection and try again!", "red");
      return;
    }

    const videoId = extractYouTubeVideoID(url);

    if (!videoId) {
      addPopup("Invalid YouTube URL", "red");
      return;
    }

    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails',
          id: videoId,
          key: ytApiKey,
        },
      });

      if (!response.data || !response.data.items) {
        addPopup("Invalid YouTube URL!", "red");
        return;
      }

      const items = response.data.items;
      if (items && items.length > 0) {
        const title = items[0].snippet.title;
        const duration = items[0].contentDetails.duration;

        const parsedDuration = parseISODuration(duration);

        setVideoDetails({
          title,
          duration: parsedDuration,
        });
      } else {
        addPopup("Invalid YouTube URL!", "red");
        return;
      }
    } catch (error) {
      setStatus("idle");
      addPopup("Invalid YouTube URL", "red");
      console.error("Error fetching video details: ", error);
      return;
    }

    const endpoint = `${backendUrl}/convert`;
    const body = {
      id: videoId,
      url: url,
      type: types[type],
      format: type === 0 ? audioFormats[audioFormat] : videoFormats[videoFormat],
      audioQuality: parseInt(audioQualities[audioQuality]),
      videoQuality: parseInt(videoQualities[videoQuality]),
    }

    try {
      const { data } = await axios.post(endpoint, body);

      if (data.error) {
        addPopup("Uh-oh! Something went horribly wrong!", "red");
        return;
      }

      setLoading(true);
      setStatus(data.status);
      setFileName(data.fileName);
    } catch (error) {
      setStatus("idle");
      addPopup("An unexpected error occured!", "red");
      console.error("Error while conversion: ", error);
    }
  }

  useEffect(() => {
    if (displayStatusPopup[status])
      addPopup(displayStatusPopup[status], displayStatusPopupColors[status]);
  }, [status]);

  useEffect(() => {
    if (!fileName) return;
    const interval = setInterval(async () => {
      try {
        const endpoint = `${backendUrl}/progress`;
        const body = { fileName };

        const { data } = await axios.post(endpoint, body);
        const newStatus = data.status;

        setStatus(newStatus);
        setProgress(data.progress);

        if (newStatus === "done") {
          setLoading(false);
          setProgress(0);
          setFileSize(data.fileSize);
          clearInterval(interval);

          const audio = new Audio("./ding.m4a");
          audio.volume = 0.25;
          audio.play();

          if (autoDownload) triggerDownload();
        }

        if (newStatus === "error") {
          setStatus("idle");
          setLoading(false);
          clearInterval(interval);
          addPopup("Something went wrong!", "red");
        }
      } catch (error) {
        setStatus("idle");
        setLoading(false);
        clearInterval(interval);
        addPopup("Something went horribly wrong!", "red");
        console.error("Progress poll error:", error);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [fileName]);

  return (
    <div id="converter">
      <div className="converter-wrapper">
        <h2>Converter</h2>
        <form
          className="converter-form"
          name="converter"
          onSubmit={(e) => onSubmit(e)}
        >
          {(status === "idle") ? (
            <>
              <Input
                id="url"
                name="url"
                type="text"
                className="mb-0 mt-0"
                label="Paste a YouTube URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                required
                showTooltip={false}
                showDetails={false}
              />
              <div className="split-container">
                <Dropdown
                  label="Type"
                  width={30 * 4}
                  className="mt-0"
                  value={type}
                  setValue={setType}
                  options={types}
                  ariaLabel="Type"
                  inlineLabel={true}
                />
                <Dropdown
                  label="Format"
                  width={28 * 4}
                  className="mt-0"
                  value={type === 0 ? audioFormat : videoFormat}
                  setValue={type === 0 ? setAudioFormat : setVideoFormat}
                  options={type === 0 ? audioFormats : videoFormats}
                  ariaLabel="Format"
                  inlineLabel={true}
                />
              </div>
              <div className="split-container">
                <Dropdown
                  label="Audio Quality"
                  className="mt-0"
                  width={30 * 4}
                  value={audioQuality}
                  setValue={setAudioQuality}
                  options={audioQualities}
                  ariaLabel="Audio Quality"
                  inlineLabel={true}
                />
                <Dropdown
                  label="Video Quality"
                  className="mt-0"
                  width={28 * 4}
                  value={videoQuality}
                  setValue={setVideoQuality}
                  options={videoQualities}
                  disabled={type === 0}
                  ariaLabel="Video Quality"
                  inlineLabel={true}
                />
              </div>
            </>
          ) : (
            <div>
              <span className="block">
                <span className="font-400">Video Title: </span> {videoDetails.title}
              </span>
              <span className="block">
                <span className="font-400">Duration: </span> {videoDetails.duration}
              </span>
            </div>
          )}
          <div className="split-container">
            {(status !== "done") ? (
              <Button
                id="convert-button"
                type="submit"
                color="primary"
                className="col-span-2"
                title={displayStatusLabel[status]}
                aria-label={displayStatusLabel[status]}
                isLoading={loading}
                showLoadingAnimation={false}
              >
                <span className="content">
                  {status === "pending" ? (
                    <DotLoader />
                  ) : (
                    <FaArrowsRotate />
                  )}
                  {displayStatus[status]}
                </span>
                <span
                  className="progress-bar"
                  data-status={status}
                  style={{
                    width: `${progress}%`
                  }}
                />
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  color="green"
                  onClick={() => triggerDownload()}
                >
                  <FaDownload />
                  Download {fileSize}
                </Button>
                <Button
                  type="button"
                  color="primary"
                  onClick={() => setStatus("idle")}
                >
                  Convert Next
                </Button>
              </>
            )}
          </div>

          <Switch
            checked={autoDownload}
            onChange={setAutoDownload}
            label={`Auto Download: ${autoDownload ? "On" : "Off"}`}
            disabled={false}
            fullWidth={false}
          >
            Auto Download
            <Tooltip icon={<FaQuestionCircle />} >
              Automatically starts download when conversion finishes.
            </Tooltip>
          </Switch>
        </form>
      </div>
    </div>
  )
}

export default withPopup(Converter);