"use client";

import { FaArrowsRotate } from "react-icons/fa6";

import axios from "axios";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
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
  'gif',
  'mkv',
  'mov',
  'avi',
  'flv',
  'webm',
  'mpeg2',
  '3gp',
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

  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
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

  const [videoId, setVideoId] = useState("");
  const [videoDetails, setVideoDetails] = useState({});

  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(10);

  const triggerDownload = () => {
    const url = [
      `${backendUrl}/download/`,
      `?fileName=${videoId}`,
      `&customName=hehehehaw`
    ]

    window.location = url.join("");
    // or window.location.href
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setVideoId(extractYouTubeVideoID(url));

    const endpoint = `${backendUrl}/convert`;
    const body = {
      id: videoId,
      url: url,
      type: types[type],
      format: type === 0 ? audioFormats[audioFormat] : videoFormats[videoQuality],
      audioQuality: parseInt(audioQualities[audioFormat]),
      videoQuality: parseInt(videoQualities[videoQuality]),
    }

    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails',
          id: videoId,
          key: ytApiKey,
        },
      });

      const items = response.data.items;
      if (items && items.length > 0) {
        const title = items[0].snippet.title;
        const duration = items[0].contentDetails.duration;

        const parsedDuration = parseISODuration(duration);

        setVideoDetails({
          title,
          parsedDuration,
        });
      } else {
        setStatus("error");
        addPopup("Invalid YouTube URL", "red");
      }
    } catch (error) {
      setStatus("error");
      addPopup("Invalid YouTube URL", "red");
      console.error("Error fetching video details: ", error);
    }

    try {
      const { data } = await axios.post(endpoint, body);

      if (data.error) {
        setStatus("error");
        addPopup("Uh-oh! Something went horribly wrong!", "red");
        return;
      }

      setLoading(true);
      setStatus(data.status);
    } catch (error) {
      setStatus("error");
      addPopup("An unexpected error occured!", "red");
      console.error("Error while conversion: ", error);
    }
  }

  useEffect(() => {
    if (displayStatusPopup[status])
      addPopup(displayStatusPopup[status], displayStatusPopupColors[status]);
  }, [status]);

  useEffect(() => {
    if (!videoId) return;
    const interval = setInterval(async () => {
      try {
        const endpoint = `${backendUrl}/progress`;
        const body = { videoId };

        const { data } = await axios.post(endpoint, body);
        const newStatus = data.status;

        setStatus(newStatus);
        setProgress(data.progress);

        if (newStatus === "done") {
          setLoading(false);
          clearInterval(interval);
        }

        if (newStatus === "error") {
          setLoading(false);
          clearInterval(interval);
          addPopup("Something went wrong!", "red");
        }
      } catch (error) {
        setStatus("error");
        setLoading(false);
        clearInterval(interval);
        addPopup("Something went horribly wrong!", "red");
        console.error("Progress poll error:", error);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [videoId]);

  return (
    <div id="converter">
      <div className="converter-wrapper">
        <h2>Converter</h2>
        <form
          className="converter-form"
          name="converter"
          onSubmit={(e) => onSubmit(e)}
        >
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
              width={30 * 4}
              className="mt-0"
              value={type}
              setValue={setType}
              options={types}
              ariaLabel="Type"
            />
            <Dropdown
              width={28 * 4}
              className="mt-0"
              value={type === 0 ? audioFormat : videoFormat}
              setValue={type === 0 ? setAudioFormat : setVideoFormat}
              options={type === 0 ? audioFormats : videoFormats}
              ariaLabel="Format"
            />
          </div>
          <div className="split-container">
            <Dropdown
              className="mt-0"
              width={30 * 4}
              value={audioQuality}
              setValue={setAudioQuality}
              options={audioQualities}
              ariaLabel="Audio Quality"
            />
            <Dropdown
              className="mt-0"
              width={28 * 4}
              value={videoQuality}
              setValue={setVideoQuality}
              options={videoQualities}
              disabled={type === 0}
              ariaLabel="Video Quality"
            />
          </div>
          <div className="split-container">
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
                <FaArrowsRotate />
                {displayStatus[status]}
              </span>
              <span
                className="progress-bar"
                style={{
                  width: `${progress}%`
                }}
              />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withPopup(Converter);