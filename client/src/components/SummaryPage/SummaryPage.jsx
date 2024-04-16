import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import "./SummaryPage.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios"; // Add axios for making API requests

export const SummaryPage = () => {
  const [isYouTubeLoaded, setIsYouTubeLoaded] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState([]); // State to store related videos
  const [videoSummary,setVideoSummary] = useState(''); // State to store the video summary
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
    const fetchVideoSummary = async () => {
        try {
            const response = await axios.post('/summary', { videoId });
            setVideoSummary(response.data.data);
        } catch (error) {
            console.error('Error fetching video summary:', error);
        }
    };
    if (videoId) {
        fetchVideoSummary();
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
          <div className="video-player" id="video-player-id">
            {isYouTubeLoaded && videoId ? (
              <YouTube videoId={videoId} opts={opts} />
            ) : (
              <p>No video selected</p>
            )}
          </div>
          <div className="summary-box">
            <h2>Video Summary</h2>
            <p>{videoSummary}</p>
          </div>
        </section>
        <section className="related-videos">
          <h3>Related Videos</h3>
          <div className="video-list">
            {relatedVideos.map((video) => (
              <div key={video.id.videoId} className="related-video-item">
                <a href={`/summary?videoId=${video.id.videoId}`}>
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                  />
                  <p>{video.snippet.title}</p>
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SummaryPage;
