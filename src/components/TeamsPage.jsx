import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";

const teamMembers = [
  {
    name: "Alice",
    image: "https://via.placeholder.com/150",
    profile: "https://github.com/alice",
  },
  {
    name: "Bob",
    image: "https://via.placeholder.com/150",
    profile: "https://linkedin.com/in/bob",
  },
  // Add more members here
];

const TeamsPage = () => {
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
      {/* <Navbar
        sections={[]}
        activeSection="teams"
        isLightMode={isLightMode}
        toggleLightMode={() => setIsLightMode((v) => !v)}
      /> */}

      <section
        className="section"
        style={{
          minHeight: "calc(100vh - 100px)",
          width: "100vw",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        <h1 className="main-heading" style={{ marginBottom: "2rem" }}>
          <span className="logo-orange">Our Team</span>
        </h1>
        <div
          className="team-grid"
          style={{
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              style={{
                background: isLightMode ? "#f5f5f5" : "#1e1e1e",
                border: "1px solid #ff6b35",
                borderRadius: "8px",
                padding: "1rem",
                textAlign: "center",
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                style={{ width: "100%", borderRadius: "6px" }}
              />
              <h3 style={{ margin: "0.75rem 0" }}>{member.name}</h3>
              <a
                href={member.profile}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#ff6b35",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeamsPage;
