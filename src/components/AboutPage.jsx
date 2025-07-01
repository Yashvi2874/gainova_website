import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar"; // ✅ Make sure Navbar is used
import evolutionGif from "../assets/Evolution.gif";

const AboutPage = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    setIsLightMode(mq.matches);
    const handler = (e) => setIsLightMode(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("gainova-lightmode");
    if (stored !== null) {
      setIsLightMode(stored === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gainova-lightmode", isLightMode.toString());
    document.body.classList.toggle("light-mode", isLightMode);
    document.body.classList.toggle("dark-mode", !isLightMode);
  }, [isLightMode]);

  const themeColors = {
    background: isLightMode ? "#f5f5f5" : "#242423",
    text: isLightMode ? "#242423" : "#fff",
    subtext: isLightMode ? "#555" : "#ccc",
    card: isLightMode ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.08)",
    highlight: "#ff914d",
    heading: "#d4be69",
    dummy_text: "#fff"
  };

  const whyJoin = [
    { title: "Global Collaboration", description: "Across academia and industries", icon: "🌍" },
    { title: "Hands-on Learning", description: "Real-world projects and MVPs", icon: "🧠" },
    { title: "Career Growth", description: "Certifications, mentorship, and leadership", icon: "🎓" },
    { title: "Innovation Leadership", description: "Research and standardization in AI", icon: "📊" },
    { title: "Sustainability Focus", description: "Aligning AI with global development goals", icon: "🌱" },
    { title: "Certify & Build", description: "Train, certify and launch your ideas", icon: "🛠️" }
  ];

  return (
    <>
      <Navbar isLightMode={isLightMode} toggleLightMode={() => setIsLightMode((v) => !v)} />
      <div className={`homepage ${isLightMode ? "light-mode" : "dark-mode"}`} style={{ backgroundColor: themeColors.background, color: themeColors.text, fontFamily: "Livvic, sans-serif" }}>
        <section style={{
          marginTop: '1rem',
          backgroundImage: `url(${evolutionGif})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '6rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', padding: '3rem 1rem', borderRadius: '2rem', maxWidth: '900px', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: themeColors.heading, fontFamily: 'Garet, sans-serif' }}>
              Empowering the AI Ecosystem.
            </h1>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginTop: '1rem', color: themeColors.dummy_text }}>
              GAINOVA is a global community bridging <strong>industries</strong>, <strong>universities</strong>, and <strong>students</strong> to accelerate <strong>innovation</strong> and <strong>collaboration</strong> in Artificial Intelligence (AI) and Generative AI (GenAI). We foster a <strong>scalable, accessible, and collaborative</strong> ecosystem for shaping the future of AI—empowering learners, leaders, and change-makers across the globe.
            </p>
          </div>
        </section>

        <section style={{ padding: '4rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', color: themeColors.heading, fontFamily: 'Garet, sans-serif', textAlign: 'center' }}>
            Why Students and Industry Folks Alike Need to Join GAINOVA
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {whyJoin.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  backgroundColor: themeColors.card,
                  borderRadius: '16px',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  borderLeft: `4px solid ${themeColors.highlight}`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  transform: hoveredIndex === index ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
                  boxShadow: hoveredIndex === index ? `0 10px 25px ${isLightMode ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'}` : 'none',
                  color: themeColors.text
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{item.title}</h3>
                <p style={{ marginTop: '0.5rem', color: themeColors.subtext, fontSize: '0.95rem' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '300', color: themeColors.heading, fontFamily: 'Garet, sans-serif' }}>
            Collaborate, innovate, and transform with the best minds across the globe.
          </h2>
          <p style={{ fontSize: '1rem', color: themeColors.subtext, marginTop: '1rem' }}>
            Join our community and be part of the AI revolution.
          </p>
          <a href="mailto:info@gainova.org" style={{
            background: themeColors.highlight,
            color: '#fff',
            padding: '1rem 2rem',
            borderRadius: '30px',
            display: 'inline-block',
            marginTop: '2rem',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Get Started Today
          </a>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
