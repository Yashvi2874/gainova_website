import React, { useState, useEffect } from "react";
import robotImage from "../../assets/robot-website.webp";
import LogoLight from "../../assets/Logo_light.svg";
import LogoDark from "../../assets/Logo_dark.svg";
import "./HomePage.css";

const sections = ["home", "features", "why", "podcast", "contact"];

const Homepage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    setIsLightMode(mq.matches);
    const handler = (e) => setIsLightMode(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("gainova-lightmode");
    if (stored !== null) setIsLightMode(stored === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("gainova-lightmode", isLightMode);
    document.body.classList.toggle("light-mode", isLightMode);
    document.body.classList.toggle("dark-mode", !isLightMode);
  }, [isLightMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`homepage ${isLightMode ? "light-mode" : "dark-mode"}`}>
    <section id="home" className="section home fade-in"
>
  {/* Optional: dark overlay to enhance text visibility */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: 0,
    }}
  ></div>

  {/* Left side - Text */}
  <div style={{ flex: "1 1 50%", minWidth: "300px", zIndex: 1 , marginLeft: "2.5rem"}}>
    <img
      src={isLightMode ? LogoDark : LogoLight}
      alt="GAINOVA Logo"
      className="hero-logo"
    />
    <p className="hero-tagline">
      Global AI Network for Open Virtual Advancement
    </p>
    <button
      className="hero-learn-btn"
      onClick={() => window.location.href = "/about"}>
      Learn More{" "}
      <span className="arrow"></span>
    </button>
  </div>

  {/* Right side - Image */}
<div className="hero-right">
  <img
    src={robotImage}
    alt="AI Robot"
    className="hero-image"
  />
</div>
</section>

    </div>
  );
};

export default Homepage;