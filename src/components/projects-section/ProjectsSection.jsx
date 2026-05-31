import ProjectCard from "../project-card/ProjectCard";
import { useState, useEffect, useContext } from "react";
import { ProjectsContext } from "../../components/projects-context/ProjectsContext";
import "./projects-section.css";
import { HiChevronRight } from "react-icons/hi"; // Font Awesome version
import { HiChevronLeft } from "react-icons/hi"; // Heroicons version

const images = import.meta.glob("./assets/*.{jpg,png,webp}", { eager: true });
function usePreloadAssets() {
  useEffect(() => {
    Object.values(images).forEach((module) => {
      const img = new Image();
      img.src = module.default;
    });
  }, []);
}

function ProjectsSection() {
  const { projects } = useContext(ProjectsContext);
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
              left: `-${(currentIndex / 2) * (100 / 3)}%`,
            }}
          >
            {projects.map((project, index) => {
              // 1. Resolve the local image path dynamically
              const localImagePath = (() => {
                const localBase = "src/assets/"; // Points directly to your public/assets/ folder

                if (!project.image) return "";

                return project.image.includes(".")
                  ? localBase + project.image
                  : `${localBase}${project.image}.webp`;
              })();

              return (
                <div className="project-item" key={index}>
                  {/* 2. Pass the resolved local path down to your ProjectCard */}
                  <ProjectCard image={localImagePath} videoId={project.vid} />
                </div>
              );
            })}
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
