import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const AboutPage = () => {
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

  return (
    <div className={`homepage ${isLightMode ? "light-mode" : "dark-mode"}`}>
      <Navbar
        sections={[]}
        activeSection="about"
        isLightMode={isLightMode}
        toggleLightMode={() => setIsLightMode((v) => !v)}
      />

      <section
        className="section"
        style={{
          minHeight: "calc(100vh - 100px)", // Adjust for nav height
          width: "100vw",                  // Force full viewport width
          padding: "2rem",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 className="main-heading">
          About<span className="logo-orange">Us</span>
        </h1>
        <p className="home-description">
          Created and maintained by Vedant Shetty.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
