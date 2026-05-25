import { useState, useEffect } from "react";
import "./project-card.css";

function ProjectCard({ image, videoId }) {
  // --- VIDEO STATE COMMENTED OUT ---
  // const [videoOpen, setVideoOpen] = useState(false);
  // const [isClosing, setIsClosing] = useState(false);

  const handleVideoOpen = () => {
    // --- DISABLED: DO NOTHING WHEN CLICKED ---
    /* setVideoOpen(true);
     */
  };

  // --- VIDEO CLOSE LOGIC COMMENTED OUT ---
  /*
  const handleVideoClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setVideoOpen(false);
      setIsClosing(false);
    }, 400);
  };
  */

  // --- SCROLL TO CLOSE LISTENERS COMMENTED OUT ---
  /*
  useEffect(() => {
    if (!videoOpen) return;

    const handleScroll = () => {
      handleVideoClose();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [videoOpen]);
  */

  // --- OVERLAY INTERACTION LOGIC COMMENTED OUT ---
  /*
  const handleOverlayClick = () => {
    handleVideoClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  */

  return (
    <>
      <div className="project-card">
        <img
          src={image}
          className="project-card-image"
          alt="Project Thumbnail"
        />
        <div className="project-card-overlay"></div>

        <div className="project-card-content"></div>

        <button className="project-card-btn" onClick={handleVideoOpen}>
          show video
        </button>
      </div>

      {/* --- VIDEO MODAL HTML LAYOUT COMMENTED OUT --- */}
      {/* {videoOpen && (
        <div
          className={`video-modal-overlay ${isClosing ? "closing" : ""}`}
          onClick={handleOverlayClick}
        >
          <div className="video-modal-container" onClick={handleModalClick}>
            <button className="video-modal-close" onClick={handleVideoClose}>
              ✕
            </button>

            <div className="video-wrapper">
              <iframe
                src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&title=0&byline=0&portrait=0`}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Project Video"
              ></iframe>
            </div>
          </div>
        </div>
      )} 
      */}
    </>
  );
}

export default ProjectCard;
