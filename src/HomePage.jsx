import React, { useState, useEffect } from "react";
import homeBg from "./assets/bg_new.jpg";


const sections = ["home", "features", "why", "contact"];

const Homepage = () => {
  const [activeSection, setActiveSection] = useState("home");

  // Scroll handler to detect currently visible section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3; // adjust trigger point

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section on nav click
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="homepage">
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
                {section === "why" ? "Why GAINOVA" : section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
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
    color: "white",
    height: "90vh",   
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2rem",
    boxSizing: "border-box",
  }}
>
  {/* Overlay */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.55)",  
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
    <p>Collaborate, innovate, and transform with the best minds across the globe.</p>

    <p className="home-description">
      GAINOVA is an international community bridging industries, universities, and students to accelerate innovation and collaboration in Artificial Intelligence (AI) and Generative AI (GenAI). As a web-based SaaS platform, GAINOVA fosters a scalable, accessible, and collaborative ecosystem, empowering global stakeholders to shape the AI-driven future.
    </p>
  </div>
</section>



      <section id="features" className="section features">
        <h2>Our Features</h2>
        <ul>
          <li><b>Catalyst Projects</b> – Solve real-world problems with rapid innovation sprints.</li>
          <li><b>Frameworks & Standards</b> – Promote open-source AI standards and interoperability.</li>
          <li><b>Training & Certifications</b> – Upskill with AI-focused courses and credentials.</li>
          <li><b>Research & Publications</b> – Stay updated with insights, whitepapers, and case studies.</li>
          <li><b>Events & Hackathons</b> – Network and innovate at our global events.</li>
          <li><b>Innovation Hub</b> – Experiment with cutting-edge technologies and build MVPs.</li>
          <li><b>Open APIs</b> – Standardized APIs for scalable AI agent systems.</li>
          <li><b>AI Maturity Model</b> – Assess and guide your AI transformation journey.</li>
        </ul>
      </section>

      <section id="why" className="section why-gainova">
        <h2>Why GAINOVA?</h2>
        <ul>
          <li><b>Global Collaboration</b> between students, universities, and industries.</li>
          <li><b>Hands-on Learning</b> through real-world projects and innovation hubs.</li>
          <li><b>Career Growth</b> with certifications, mentorships, and leadership opportunities.</li>
          <li><b>Innovation Leadership</b> via research and MVP development.</li>
          <li><b>Sustainability Focus</b> – aligning AI innovation with global goals.</li>
        </ul>
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
