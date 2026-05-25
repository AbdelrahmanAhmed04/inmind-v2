import "./hero-section.css";
import BgVideo from "../../assets/hero-video.mp4";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
function HeroSection() {
  return (
    <div className="hero-container section">
      <video
        className="hero-video"
        src={BgVideo}
        autoPlay
        muted
        loop
        playsInline
      ></video>
      <div className="video-overlay"></div>

      <div className="hero-title-container">
        <p className="hero-subtitle">Everyone needs a</p>
        <p className="hero-title">Line</p>
      </div>
      <div className="hero-credits">
        <div className="copyrights">
          <a href="/#home">InMind </a>
          <p>&nbsp;@ 2026 All rights reserved.</p>
        </div>
        <div className="scroll-indicator">
          <div className="line">
            <div className="dot" />
          </div>
        </div>
        <div className="social-icons-wrapper">
          <a href="#facebook" className="social-icon">
            <FaFacebook />
          </a>
          <a href="#instagram" className="social-icon">
            <FaInstagram />
          </a>
          <a href="#tiktok" className="social-icon">
            <FaTiktok />
          </a>
          <a href="#email" className="social-icon">
            <MdEmail />
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
