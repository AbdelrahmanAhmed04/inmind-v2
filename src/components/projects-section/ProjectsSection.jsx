import ProjectCard from "../project-card/ProjectCard";
import { useState } from "react";
import image31 from "../../assets/31.q_salary vimeo.png";
import image32 from "../../assets/32.totalenergies_microbus vimeo.png";
import image33 from "../../assets/33.totalenergies_motorcycle vimeo.png";
import image34 from "../../assets/34.totalenergies_car vimeo.png";
import image35 from "../../assets/35.totalenergies_trella vimeo.png";
import image36 from "../../assets/36.dabur_miswak vimeo.png";
import image37 from "../../assets/37.vatika_hair_cream vimeo.png";
import image38 from "../../assets/38.e_bank_2025 vimeo.png";
import image39 from "../../assets/39.dabur_amla_ksa vimeo.png";
import image40 from "../../assets/40.hobby_hair_oil_dc vimeo.png";
import image41 from "../../assets/41.ozee__molo_massage vimeo.png";
import image42 from "../../assets/42.ozee_khltat_mn_el_keis vimeo.png";
import image43 from "../../assets/43.ozee_sauna_ala_al_gamr vimeo.png";
import image44 from "../../assets/44.ozee_an3am_mn_al_harirr vimeo.png";
import image45 from "../../assets/45.total_bonjour vimeo.png";
import { HiChevronRight } from "react-icons/hi"; // Font Awesome version
import { HiChevronLeft } from "react-icons/hi"; // Heroicons version

import "./projects-section.css";
const projects = [
  { image: image31, videoId: "1121851891" },
  {
    image: image32,
    videoId: "1121851891",
  },
  {
    image: image33,

    videoId: "1121851891",
  },
  { image: image34, videoId: "1121851891" },
  {
    image: image35,

    videoId: "1121851891",
  },
  { image: image36, videoId: "1121851891" },
  { image: image37, videoId: "1121851891" },
  { image: image38, videoId: "1121851891" },
  { image: image39, videoId: "1121851891" },
  { image: image40, videoId: "1121851891" },
  { image: image41, videoId: "1121851891" },
  { image: image42, videoId: "1121851891" },
  { image: image43, videoId: "1121851891" },
  { image: image44, videoId: "1121851891" },
  { image: image45, videoId: "1121851891" },
  { image: image31, videoId: "1121851891" },
];

function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = 6;
  const itemsPerStep = 2;

  const maxIndex = projects.length - itemsPerView;

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + itemsPerStep, maxIndex));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - itemsPerStep, 0));
  };

  return (
    <div className="projects-section-wrapper section">
      <div className="projects-carousel">
        <button className="carousel-nav carousel-prev" onClick={handlePrevious}>
          <HiChevronLeft />
        </button>

        <div className="projects-viewport">
          <div
            className="projects-track"
            style={{
              transform: `translateX(-${(currentIndex / 2) * (100 / 3)}%)`,
            }}
          >
            {projects.map((project, index) => (
              <div className="project-item" key={index}>
                <ProjectCard image={project.image} videoId={project.videoId} />
              </div>
            ))}
          </div>
        </div>

        <button className="carousel-nav carousel-next" onClick={handleNext}>
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default ProjectsSection;
