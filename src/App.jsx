import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import HeroSection from "./components/hero-section/HeroSection";
import AboutSection from "./components/about-section/AboutSection";
import Navigation from "./components/navbar/navbar";
import { useScrollSnap } from "./hooks/useScrollSnap";
import "./App.css";
import ServicesSection from "./components/services-section/ServicesSection";
import ContactSection from "./components/contact-section/ContactSection";

function App() {
  useScrollSnap();

  return (
    <>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}

export default App;
