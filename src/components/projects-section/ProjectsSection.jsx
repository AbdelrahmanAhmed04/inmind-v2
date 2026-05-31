import { useState, useEffect, useContext } from "react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { ProjectsContext } from "../../components/projects-context/ProjectsContext";
import ProjectCard from "../project-card/ProjectCard";
import "./projects-section.css";

function ProjectsSection() {
  const { projects } = useContext(ProjectsContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 1. Create a balanced, processed array of projects
  const safeProjects = projects || [];
  const processedProjects =
    safeProjects.length % 2 !== 0
      ? [...safeProjects, safeProjects[0]]
      : safeProjects;

  // Track responsive sizing window breakpoints
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute dynamic items layout sizes
  let itemsPerView = 6;
  let tracksCount = 3;

  if (windowWidth <= 768) {
    itemsPerView = 2;
    tracksCount = 1;
  } else if (windowWidth <= 1200) {
    itemsPerView = 4;
    tracksCount = 2;
  }

  const itemsPerStep = 2;

  // 2. Base carousel limits on the processed array length
  const maxIndex = Math.max(0, processedProjects.length - itemsPerView);

  // Prevent sliding out of bounds on browser dimension shift
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handleNext = () =>
    setCurrentIndex((p) => Math.min(p + itemsPerStep, maxIndex));
  const handlePrevious = () =>
    setCurrentIndex((p) => Math.max(p - itemsPerStep, 0));

  return (
    <div className="projects-section-wrapper section" id="projects">
      <div className="projects-carousel">
        <button className="carousel-nav carousel-prev" onClick={handlePrevious}>
          <HiChevronLeft />
        </button>

        <div className="projects-viewport">
          <div
            className="projects-track"
            style={{
              left: `-${(currentIndex / 2) * (100 / tracksCount)}%`,
            }}
          >
            {/* 3. Map over the processed array instead of the raw database context */}
            {processedProjects.map((project, index) => {
              const localImagePath = (() => {
                if (!project.image) return "";
                const fileName = project.image.includes(".")
                  ? project.image
                  : `${project.image}.webp`;
                try {
                  return new URL(`../../assets/${fileName}`, import.meta.url)
                    .href;
                } catch {
                  return "";
                }
              })();

              return (
                <div className="project-item" key={index}>
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
