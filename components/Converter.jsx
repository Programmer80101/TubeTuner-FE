"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import withPopup from "@/hoc/withPopup";
import "@/css/Converter.css";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

function Converter({ addPopup }) {
  const [url, setUrl] = useLocalStorage("converter-url", "");
  const [type, setType] = useLocalStorage("converter-type", 0);
  const [videoFormat, setVideoFormat] = useLocalStorage("converter-video-format", 0);
  const [audioFormat, setAudioFormat] = useLocalStorage("converter-audio-format", 0);
  const [videoQuality, setVideoQuality] = useLocalStorage("converter-video-quality", 3);
  const [audioQuality, setAudioQuality] = useLocalStorage("converter-audio-quality", 2);

  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [downloadPath, setDownloadPath] = useState("");
  const [conversionId, setConversionId] = useState(null);


  const types = ["Audio", "Video"];

  const audioFormats = [
    'mp3',
    'wav',
    'flac',
    'opus',
    'aac',
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

  const triggerDownload = () => {
    window.location = `${backendUrl}/${downloadPath}`;
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
        addPopup(data.error, "red");
        return;
      }
      console.log("data: ", data);
      setStatus("Pending...");
      setConversionId(data.conversionId);
    } catch (error) {
      console.error("Error while conversion: ", error);
    }
  }

  useEffect(() => {
    if (downloadPath) triggerDownload();
  }, [downloadPath]);

  useEffect(() => {
    if (!conversionId) return;
    const interval = setInterval(async () => {
      try {
        const endpoint = `${backendUrl}/progress`;
        const body = { conversionId: conversionId };
        const { data } = await axios.post(endpoint, body);

        const {
          status,
          download,
          transcode,
          downloadPath,
        } = data;

        setStatus(status);
        setProgress(download);

        if (status === "completed" && downloadPath) {
          clearInterval(interval);
          setDownloadPath(downloadPath);
          addPopup("Conversion completed!", "green");
        }
        if (status === "error") {
          clearInterval(interval);
          addPopup("Conversion error: " + data.error, "red");
        }
      } catch (error) {
        console.error("Progress poll error:", error);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [conversionId]);

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
            className="mb-0"
            label="Enter a YouTube URL"
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
              className="mt-0"
              width="50%"
              value={type}
              setValue={setType}
              options={types}
            />
            <Dropdown
              label="Format"
              className="mt-0"
              width="50%"
              value={type === 0 ? audioFormat : videoFormat}
              setValue={type === 0 ? setAudioFormat : setVideoFormat}
              options={type === 0 ? audioFormats : videoFormats}
            />
          </div>
          <div className="split-container">
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
          </div>
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