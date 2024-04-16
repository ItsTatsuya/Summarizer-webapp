import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import "./SummaryPage.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { marked } from 'marked';

export const SummaryPage = () => {
  const [isYouTubeLoaded, setIsYouTubeLoaded] = useState(false);
  const [videoSummary, setVideoSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const location = useLocation();
  const videoId = new URLSearchParams(location.search).get("videoId");

  const opts = {
    width: 1152,
    height: 648,
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    const fetchVideoSummary = async (videoId) => {
      try {
        setIsLoading(true); // Set loading to true before making the request
        const response = await axios.post("/summary", { videoId });
        const summaryText = response.data.data;
        const parsedSummary = marked.parse(summaryText);
        setVideoSummary(parsedSummary);
      } catch (error) {
        console.error("Error fetching video summary:", error);
      } finally {
        setIsLoading(false); // Set loading to false after the request completes
      }
    };
    if (videoId) {
      fetchVideoSummary(videoId);
    }
  }, [videoId]);

  // Load YouTube iframe API script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onload = () => {
      setIsYouTubeLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="body-summary">
      <header className="navbar">
        <div className="logo">
          <p className="logofont">YouTube Summarizer</p>
        </div>
        <nav className="navbar-2">
          <Link to={"/"} className="navsigninlink">
            Home
          </Link>
        </nav>
      </header>
      <main className="main-summary">
        <section className="video-container">
          <div className="sticky-video-player" id="video-player-id">
            {isYouTubeLoaded && videoId ? (
              <YouTube videoId={videoId} opts={opts} />
            ) : (
              <p>No video selected</p>
            )}
          </div>
          <div className="summary-box">
            <h2>Video Summary</h2>
            {isLoading ? (
              <p>Loading summary...</p>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: videoSummary }} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SummaryPage;
