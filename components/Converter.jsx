"use client";

import { HiOutlineAdjustments } from "react-icons/hi";

import axios from "axios";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import ToggleButton from "@/components/ToggleButton";
import withPopup from "@/hoc/withPopup";
import "@/css/Converter.css";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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


function Converter({ addPopup }) {
  const [url, setUrl] = useLocalStorage("converter-url", "");
  const [type, setType] = useLocalStorage("converter-type", 0);
  const [videoFormat, setVideoFormat] = useLocalStorage("converter-video-format", 0);
  const [audioFormat, setAudioFormat] = useLocalStorage("converter-audio-format", 0);
  const [videoQuality, setVideoQuality] = useLocalStorage("converter-video-quality", 3);
  const [audioQuality, setAudioQuality] = useLocalStorage("converter-audio-quality", 2);

  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [conversionId, setConversionId] = useState(null);

  const types = [
    `Audio | ${audioFormats[audioFormat]}`,
    `Video | ${videoFormats[videoFormat]}`,
  ];

  const triggerDownload = () => {
    const url = [
      `${backendUrl}/download/`,
      `?fileName=${conversionId}`,
      `&customName=hehehehaw`
    ]

    window.location = url.join("");
    // or window.location.href
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const endpoint = `${backendUrl}/convert`;
    const body = {
      url: url,
      type: types[type],
      format: type === 0 ? audioFormats[audioFormat] : videoQualities[videoQuality],
      audioQuality: audioQualities[audioFormat],
      videoQuality: videoQualities[videoQuality],
    }

    try {
      const { data } = await axios.post(endpoint, body);

      if (data.error) {
        addPopup("Something went wrong!", "red");
        return;
      }

      console.log("data: ", data);
      setStatus("Pending...");
      setConversionId(data.conversionId);
    } catch (error) {
      addPopup("An unexpected error occured!", "red");
      console.error("Error while conversion: ", error);
    }
  }

  useEffect(() => {
    if (!conversionId) return;
    const interval = setInterval(async () => {
      try {
        const endpoint = `${backendUrl}/progress`;
        const body = { conversionId };

        const { data } = await axios.post(endpoint, body);
        const newStatus = data.status;

        setStatus(newStatus);
        setProgress(data.progress);

        if (newStatus === "done") {
          clearInterval(interval);
          addPopup("Conversion completed!", "green");
        }

        if (newStatus === "error") {
          clearInterval(interval);
          addPopup("Uh oh! Something went horribly wrong!", "red");
        }
      } catch (error) {
        console.error("Progress poll error:", error);
        addPopup("Something went wrong while ");
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [conversionId]);

  return (
    <div id="converter">
      {/* <div id="advanced-options">
          <Dropdown
            label="Audio Quality"
            className="mt-0"
            width="50%"
            value={audioQuality}
            setValue={setAudioQuality}
            options={audioQualities}
          />
          <Dropdown
            label="Video Quality"
            className="mt-0"
            width="50%"
            value={videoQuality}
            setValue={setVideoQuality}
            options={videoQualities}
            disabled={type === 0}
          />
          <Dropdown
            label="Format"
            width="50%"
            className="mt-0"
            value={type === 0 ? audioFormat : videoFormat}
            setValue={type === 0 ? setAudioFormat : setVideoFormat}
            options={type === 0 ? audioFormats : videoFormats}
          />
        </div> */}

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
            className="mb-0"
            label="Paste a YouTube URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            required
            showTooltip={false}
            showDetails={false}
          />
          <div className="split-container">
            <ToggleButton
              label="Select Type"
              aria-label="Select Type"
              className="mt-0"
              value={type}
              setValue={setType}
              options={types}
            />
            <Button
              type="submit"
              color="primary"
              title="Convert YouTube Video"
              aria-label="Convert YouTube Video"
              loadingText="Converting..."
              isLoading={false}
            >
              Convert
            </Button>
          </div>
        </form>
        {conversionId && (
          <div>
            <p>Conversion ID: {conversionId}</p>
            <p>Status: {status}</p>
            <p>Progress: {progress}%</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default withPopup(Converter);