import NavImage from "../../assets/nav-image.jpeg";
import NavImage2 from "../../assets/nav-image-2.jpeg";
import { useState } from "react";
import LogoLight from "../../assets/logo-light.png";
import "./navbar.css";
const NAV_LINKS = [
  { id: "home", label: "Home", image: NavImage },
  { id: "about", label: "About", image: NavImage2 },
  { id: "services", label: "Services", image: NavImage },
  { id: "contact", label: "Contact", image: NavImage2 },
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
        <a className="logo-container" href="/#home">
          <img src={LogoLight} alt="Logo" />
        </a>
        <button
          className={`hamburger-menu ${menuOpen ? "active" : ""}`}
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
