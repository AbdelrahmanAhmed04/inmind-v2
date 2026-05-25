import "./aboutSection.css";
import AboutBg from "../../assets/nav-image.jpeg";

function AboutSection() {
  return (
    <>
      <div
        className="about-section-container section-container section"
        id="about"
      >
        <img className="about-image section-image" src={AboutBg} alt="" />

        <div className="about-content section-content">
          <h3 className="about-title section-title">About</h3>
          <div className="vertical-break"></div>
          <p className="about-text section-text">
            Film District is a Cairo based production house with more than a
            decade of experience and a proven track record in delivering
            production services and creative solutions across all marketing
            communications.
          </p>
          <p className="about-text section-text">
            From idea inception and concept visualization to full production and
            final delivery, we manage every stage of the journey with precision
            and creativity. Driven by storytelling and execution excellence,
            Film District has expanded its presence internationally with the
            establishment of its Paris branch in 2015, extending its creative
            vision beyond borders.
          </p>
        </div>
        <div className="section-tag">
          About <div className="vertical-tag-break"></div>
        </div>
      </div>
    </>
  );
}

export default AboutSection;
