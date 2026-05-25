import "./services-section.css";
import ServicesBg from "../../assets/nav-image-2.jpeg";

function ServicesSection() {
  return (
    <>
      <div
        className="services-section-container section-container section"
        id="services"
      >
        <div className="services-content section-content">
          <h3 className="services-title section-title">Production</h3>
          <div className="vertical-break"></div>
          <p className="services-text section-text">
            We handle every step of the production journey. From strategy and
            creative development to filming and post production, we turn ideas
            into compelling visual stories through seamless execution and
            cinematic quality.
          </p>
        </div>
        <img className="services-image section-image" src={ServicesBg} alt="" />

        <div className="section-tag">
          services <div className="vertical-tag-break"></div>
        </div>
      </div>
    </>
  );
}

export default ServicesSection;
