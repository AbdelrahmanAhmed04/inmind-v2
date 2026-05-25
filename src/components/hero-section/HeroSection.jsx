import "./hero-section.css";
import LogoLight from "../../assets/logo-light.png";
function HeroSection() {
  return (
    <div className="hero-container" id="home">
      <div className="hero-header">
        <a className="logo-container" href="/#home">
          <img src={LogoLight} alt="Logo" />
        </a>
      </div>
      <div className="hero-title-container">
        <p className="hero-subtitle">test</p>
        <p className="hero-title"></p>
      </div>
      <div className="hero-credits">
        <div className="copyrights">
          <a href="/"></a> <p></p>
        </div>
        <div className="scroll-indicator"></div>
        <div className="social-icons-wrapper"></div>
      </div>
    </div>
  );
}

export default HeroSection;
