import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import "./SummaryPage.css";
import { Link, useLocation } from "react-router-dom";

export const SummaryPage = () => {
  const [isYouTubeLoaded, setIsYouTubeLoaded] = useState(false);
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
          <div className="video-player" id="video-player-id">
            {isYouTubeLoaded && videoId ? (
              <YouTube videoId={videoId} opts={opts} />
            ) : (
              <p>No video selected</p>
            )}
          </div>
          <div className="summary-box">
            <h2>Video Summary</h2>
            <p>{/* Display the summarized content here */}</p>
          </div>
        </section>
        <section className="related-videos">
          <h3>Related Videos</h3>
          <div className="video-list">
            {/* Display a list of related video thumbnails and titles here */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SummaryPage;