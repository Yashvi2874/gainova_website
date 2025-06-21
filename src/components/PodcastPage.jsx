import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const PodcastPage = () => {
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
        activeSection="podcast"
        isLightMode={isLightMode}
        toggleLightMode={() => setIsLightMode((v) => !v)}
      />

      <section
        className="section"
        style={{
          minHeight: "calc(100vh - 100px)", // Adjust if needed
          width: "100vw",
          padding: "2rem",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 className="main-heading">
          <span className="logo-orange">Podcast</span>
        </h1>
        <p className="home-description" style={{ marginTop: "1rem" }}>
          Curated by Adithi. Stay tuned for episodes!
        </p>
      </section>
    </div>
  );
};

export default PodcastPage;
