import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // adjust the path as needed
import homeBg from "../assets/bg_new.jpg";
import robotImage from "../assets/robot-website.webp";


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
     <div
    className={`homepage ${isLightMode ? "light-mode" : "dark-mode"}`}
    style={{ minHeight: "100vh", overflow: "hidden"}}
  >
            <Navbar
        sections={sections}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isLightMode={isLightMode}
        toggleLightMode={() => setIsLightMode((v) => !v)}
      />

      <section
  id="home"
  className="section home fade-in"
  style={{
    position: "relative",
    backgroundColor: "#242423",
    color: "white",
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "2rem 4rem",
    boxSizing: "border-box",
    borderRadius: "20px",
    border: "1px solid #444",
    overflow: "hidden",
    flexWrap: "wrap",
  }}
>
  {/* Left Side - Text Content */}
  <div style={{ flex: "1 1 50%", zIndex: 1, minWidth: "300px" }}>
    <h1
      style={{
        fontFamily: "Garet, sans-serif",
        fontSize: "4rem",
        margin: 0,
        fontWeight: "bold",
        color: "#FFFFFF",
      }}
    >
      <span style={{ color: "#FFFFFF" }}>G</span>
      <span style={{ color: "#FF914D" }}>AI</span>
      <span style={{ color: "#FFFFFF" }}>NOVA</span>
    </h1>
    <p
      style={{
        fontFamily: "Livvic, sans-serif",
        fontSize: "1.5rem",
        marginTop: "1rem",
        color: "#D4BE69",
      }}
    >
      Empowering the AI ecosystem
    </p>

    {/* Button */}
    <button
      style={{
        marginTop: "2rem",
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        fontFamily: "Livvic, sans-serif",
        backgroundColor: "#FFFFFF",
        color: "#000000",
        borderRadius: "2rem",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        transition: "all 0.3s ease",
      }}
      onClick={() => scrollToSection("features")}
    >
      Learn More{" "}
      <span style={{ color: "#FF914D", fontSize: "1.2rem" }}>→</span>
    </button>
  </div>

  {/* Right Side - Robot Image */}
  <div
    style={{
      flex: "1 1 40%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
      minWidth: "300px",
    }}
  >
    <img
      src={robotImage}
      alt="Robot with Tablet"
      style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
    />
  </div>
</section>

      <section id="features" className="section features">
  <h2>Our Features</h2>
  <div className="features-grid">
    {[
      {
        title: "Innovative Collaborative Projects",
        description:
          "Tackle real-world AI/GenAI challenges with experts and students. Gain hands-on experience and drive AI innovation.",
      },
      {
        title: "Industry-Leading Frameworks & Standards",
        description:
          "Shape the future of AI with open-source standards that ensure interoperability and reduce costs.",
      },
      {
        title: "AI Training & Certification",
        description:
          "Master AI with certified courses and boost your career with cutting-edge skills in AI frameworks and digital transformation.",
      },
      {
        title: "AI Maturity Model for Success",
        description:
          "Use our AI Maturity Model to track your progress and accelerate your AI transformation.",
      },
      {
        title: "Global Events & Conferences",
        description:
          "Connect with industry leaders and innovators at AI hackathons, conferences, and more.",
      },
      {
        title: "Innovation Hub for Breakthrough Ideas",
        description:
          "Collaborate on MVP projects and explore the latest AI trends to push the limits of innovation.",
      },
      {
        title: "Open APIs for Seamless Integration",
        description:
          "Leverage Open APIs to build scalable AI agent systems and drive digital transformation.",
      },
      {
        title: "Startup Growth & Innovation",
        description:
          "Accelerate your startup with mentorship, collaboration, and exposure to the GAINOVA community.",
      },
    ].map((feature, index) => (
      <div className="feature-card" key={index}>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    ))}
  </div>
</section>


      <section id="why" className="section why-gainova">
        <h2>Why GAINOVA?</h2>
        <h3>GAINOVA is an international collaboration platform that connects students, universities, industry experts, and startups to drive AI innovation and adoption.</h3>
        <ul>
          <li>
            <b>Comprehensive Resource Hub:</b> Access projects, tools, frameworks, and training for AI-driven growth.
          </li>
          <li>
            <b>Seamless Collaboration:</b> Work together on real-world problems, share knowledge, and innovate globally.
          </li>
          <li>
            <b>Scalable & Accessible:</b> As a web-based SaaS platform, GAINOVA empowers users to thrive in the AI economy from anywhere.
          </li>
          <li>
            <b>Global Network:</b> Connect with a diverse community of innovators, experts, and learners from all corners of the world to accelerate your AI journey.
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
