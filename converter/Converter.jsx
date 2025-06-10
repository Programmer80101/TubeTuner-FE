"use client";

import { FaSliders, FaArrowsRotate, FaDownload } from "react-icons/fa6";
import { FaQuestionCircle, FaArrowRight } from "react-icons/fa";

import axios from "axios";
import { useEffect, useState } from "react";

import useOnlineStatus from "@/hooks/useOnlineStatus";
import useLocalStorage from "@/hooks/useLocalStorage";
import useServiceStatus from "@/hooks/useServiceStatus";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Switch from "@/components/Switch";
import Widget from "@/components/Widget";
import DotLoader from "@/components/DotLoader";
import Dropdown from "@/components/Dropdown";
import Tooltip from "@/components/Tooltip";

import withPopup from "@/hoc/withPopup";

import {
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
} from "@/converter/config";

import { parseYouTubeVideoID, parseISODuration } from "@/converter/parsers";
import "@/converter/Converter.css";

function Converter({ addPopup }) {
  const [url, setUrl] = useLocalStorage("converter-url", "");
  const [type, setType] = useLocalStorage("converter-type", 0);
  const [videoFormat, setVideoFormat] = useLocalStorage("converter-video-format", 0);
  const [audioFormat, setAudioFormat] = useLocalStorage("converter-audio-format", 0);
  const [videoQuality, setVideoQuality] = useLocalStorage("converter-video-quality", 3);
  const [audioQuality, setAudioQuality] = useLocalStorage("converter-audio-quality", 2);

  const [playSound, setPlaySound] = useLocalStorage("converter-play-sound", true);
  const [autoDownload, setAutoDownload] = useLocalStorage("converter-auto-download", false);

  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [videoDetails, setVideoDetails] = useState({});

  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);

  const isOnline = useOnlineStatus();
  const isServiceReady = useServiceStatus();

  const showServiceIsOffline = () => {
    addPopup("Service is offline, try again in a few minutes!", "red");
  }

  const showServiceIsOnline = () => {
    addPopup("Service is back online!", "green");
  }

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

    if (!isServiceReady) {
      showServiceIsOffline();
      return;
    }

    const videoId = parseYouTubeVideoID(url);

    if (!videoId) {
      addPopup("Invalid YouTube URL", "red");
      return;
    }

    try {
      const response = await axios.get(`${backendUrl}/ping`);

      if (response.status !== 200) {
        showServiceIsOffline();
        return;
      }
    } catch {
      showServiceIsOffline();
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

    setFileName("");

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
    if (popupText[status])
      addPopup(popupText[status], popupColors[status]);
  }, [status]);

  useEffect(() => {
    if (isServiceReady) showServiceIsOnline();
    else showServiceIsOffline();
  }, [isServiceReady]);

  useEffect(() => {
    if (!fileName) return;
    const interval = setInterval(async () => {
      try {
        const endpoint = `${backendUrl}/progress`;
        const body = { fileName };

        const { data } = await axios.post(endpoint, body);
        const newStatus = data.status;

        setStatus(newStatus);

        if (newStatus === "converting") {
          setConversionProgress(data.progress);
        }

        if (newStatus === "processing") {
          setConversionProgress(100);
          setProcessingProgress(data.progress);
        }

        if (newStatus === "done") {
          setLoading(false);
          setConversionProgress(0);
          setProcessingProgress(0);
          setFileSize(data.fileSize);
          clearInterval(interval);

          if (playSound) {
            const audio = new Audio("./ding.m4a");
            audio.volume = 0.25;
            audio.play();
          }

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
    }, 300);

    return () => clearInterval(interval);
  }, [fileName]);

  return (
    <div id="converter">
      <div className="converter-wrapper">
        <h1>TubeTuner</h1>
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
                title={buttonLabels[status]}
                aria-label={buttonLabels[status]}
                isLoading={loading}
                showLoadingAnimation={false}
                disabled={!isServiceReady}
              >
                <span className="content">
                  {status === "pending" ? (
                    <DotLoader />
                  ) : (
                    <FaArrowsRotate />
                  )}
                  {buttonText[status]}
                </span>
                <span
                  className="progress-bar conversion"
                  style={{
                    width: `${conversionProgress}%`,
                    animation: status === "converting" ? "" : "none",
                  }}
                />
                <span
                  className="progress-bar processing"
                  style={{
                    width: `${processingProgress}%`
                  }}
                />
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  color="green"
                  onClick={() => triggerDownload()}
                  disabled={!isServiceReady}
                >
                  <FaDownload />
                  Download ({fileSize})
                </Button>
                <Button
                  type="button"
                  color="primary"
                  onClick={() => setStatus("idle")}
                >
                  Convert Next
                  <FaArrowRight />
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
      <Widget title="Settings" icon={<FaSliders className="scale-90 origin-center" />}>
        <div className="p-4">
          <div className="flex flex-col gap-2">
            <Switch
              checked={playSound}
              onChange={setPlaySound}
              label={`Play Sound: ${playSound ? "On" : "Off"}`}
              disabled={false}
            >
              Play Sound
              <Tooltip icon={<FaQuestionCircle />} >
                Plays a sound when conversion finishes.
              </Tooltip>
            </Switch>
            <Switch
              checked={autoDownload}
              onChange={setAutoDownload}
              label={`Auto Download: ${autoDownload ? "On" : "Off"}`}
              disabled={false}
            >
              Auto Download
              <Tooltip icon={<FaQuestionCircle />} >
                Automatically starts download when conversion finishes.
              </Tooltip>
            </Switch>
          </div>
        </div>
      </Widget>
    </div>
  )
}

export default withPopup(Converter);