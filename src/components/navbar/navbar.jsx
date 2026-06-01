import ServicesBg from "../../assets/nav-image-2.jpeg";
import AboutBg from "../../assets/nav-image.jpeg";
import ContactBg from "../../assets/contact-image.jpeg";

import { useState } from "react";
import LogoLight from "../../assets/logo-light.png";
import "./navbar.css";
const NAV_LINKS = [
  { id: "home", label: "Home", image: ServicesBg },
  { id: "about", label: "About", image: AboutBg },
  { id: "services", label: "Services", image: ServicesBg },
  { id: "projects", label: "Projects", image: AboutBg },
  { id: "contact", label: "Contact", image: ContactBg },
];

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hoveredLink, setHoveredLink] = useState("home");
  const [activeLink, setActiveLink] = useState("home");

  const handleMenuClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
    }, 1500);
  };

  const handleLinkHover = (linkId) => {
    setHoveredLink(linkId);
    setActiveLink(linkId);
  };

  const currentLink = NAV_LINKS.find((link) => link.id === hoveredLink);
  const currentImage = currentLink?.image || NavImage;

  return (
    <>
      <div className="hero-header">
        <button
          className={`hamburger-menu ${menuOpen ? "active" : ""} ${isClosing ? "closing" : ""}`}
          onClick={() => (menuOpen ? handleMenuClose() : setMenuOpen(true))}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {menuOpen && (
        <nav className={`nav-menu ${isClosing ? "closing" : ""}`}>
          <img
            key={currentImage}
            className="nav-image section-image"
            src={currentImage}
            alt=""
          />
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={activeLink === link.id ? "active" : ""}
                  onMouseEnter={() => handleLinkHover(link.id)}
                  onClick={handleMenuClose}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
export default Navigation;
