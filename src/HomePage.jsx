import React, { useState, useEffect } from "react";
import homeBg from "./assets/bg_new.jpg";

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
      <nav className="navbar">
        <div className="logo">
          <span className="logo-light">G</span>
          <span className="logo-orange">AI</span>
          <span className="logo-light">NOVA</span>
        </div>
        <ul className="nav-links">
          {sections.map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section)}
                className={activeSection === section ? "active" : ""}
              >
                {section === "why"
                  ? "Why GAINOVA"
                  : section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
          <li>
            <button
              aria-label="Toggle light mode"
              className="lightmode-toggle"
              onClick={() => setIsLightMode((v) => !v)}
              style={{
                marginLeft: "1.5rem",
                fontSize: "1.2rem",
                background: "none",
                border: "none",
                color: isLightMode ? "#ff6b35" : "#f0f0f0",
                cursor: "pointer",
              }}
            >
              {isLightMode ? "☀️" : "🌙"}
            </button>
          </li>
        </ul>
      </nav>

      <section
        id="home"
        className="section home fade-in"
        style={{
          position: "relative",
          backgroundImage: `url(${homeBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: isLightMode ? "#213547" : "white",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: isLightMode
              ? "rgba(255,255,255,0.55)"
              : "rgba(0,0,0,0.55)",
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 className="main-heading">
            <span className="logo-light">G</span>
            <span className="logo-orange">AI</span>
            <span className="logo-light">NOVA</span>
          </h1>
          <p className="tagline">Empowering the AI Ecosystem</p>
          <p>
            Collaborate, innovate, and transform with the best minds across the
            globe.
          </p>
          <p className="home-description">
            GAINOVA is an international community bridging industries,
            universities, and students to accelerate innovation and
            collaboration in Artificial Intelligence (AI) and Generative AI
            (GenAI). As a web-based SaaS platform, GAINOVA fosters a scalable,
            accessible, and collaborative ecosystem, empowering global
            stakeholders to shape the AI-driven future.
          </p>
        </div>
      </section>

      <section id="features" className="section features">
        <h2>Our Features</h2>
        <ul>
          <li>
            <b>Catalyst Projects</b> – Solve real-world problems with rapid
            innovation sprints.
          </li>
          <li>
            <b>Frameworks & Standards</b> – Promote open-source AI standards and
            interoperability.
          </li>
          <li>
            <b>Training & Certifications</b> – Upskill with AI-focused courses
            and credentials.
          </li>
          <li>
            <b>Research & Publications</b> – Stay updated with insights,
            whitepapers, and case studies.
          </li>
          <li>
            <b>Events & Hackathons</b> – Network and innovate at our global
            events.
          </li>
          <li>
            <b>Innovation Hub</b> – Experiment with cutting-edge technologies and
            build MVPs.
          </li>
          <li>
            <b>Open APIs</b> – Standardized APIs for scalable AI agent systems.
          </li>
          <li>
            <b>AI Maturity Model</b> – Assess and guide your AI transformation
            journey.
          </li>
        </ul>
      </section>

      <section id="why" className="section why-gainova">
        <h2>Why GAINOVA?</h2>
        <ul>
          <li>
            <b>Global Collaboration</b> between students, universities, and
            industries.
          </li>
          <li>
            <b>Hands-on Learning</b> through real-world projects and innovation
            hubs.
          </li>
          <li>
            <b>Career Growth</b> with certifications, mentorships, and leadership
            opportunities.
          </li>
          <li>
            <b>Innovation Leadership</b> via research and MVP development.
          </li>
          <li>
            <b>Sustainability Focus</b> – aligning AI innovation with global
            goals.
          </li>
        </ul>
      </section>

      <section id="podcast" className="section podcast">
        <h2>Podcast & Talks</h2>
        <div
          className="podcast-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          <div>
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/6bSwif8KzWI?si=-30zuvcK7wN9ol58"
              title="Podcast Episode 1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>
              <b>Episode 1:</b> AI is epic and whatnot
            </p>
          </div>

          <div>
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/AXtNUgEWgQI?si=aTHVBoa3ttssVIbi"
              title="Podcast Episode 2"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>
              <b>Episode 2:</b> Robots are what all the cool kids are talking
              about and here's why
            </p>
          </div>

          <div>
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/07g1A5f3jJI?si=sicxLDGjw-26IbY_"
              title="Podcast Episode 3"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>
              <b>Episode 3:</b> Here's how to legally sell children
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <h2>Contact Us</h2>
        <p>📧 hello@reallygreatsite.com</p>
        <p>🌐 www.reallygreatsite.com</p>
      </section>
    </div>
  );
};

export default Homepage;
