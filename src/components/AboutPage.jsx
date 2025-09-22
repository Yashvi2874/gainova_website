import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar"; // ✅ Make sure Navbar is used
import evolutionGif from "../../public/images/Pages/Evolution.gif";
import ContactForm from "../components/contact/ContactForm";

const AboutPage = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

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

  const handleContactUsClick = () => {
    setIsContactFormOpen(true);
  };

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
      <div className={`homepage ${isLightMode ? "light-mode" : "dark-mode"}`} style={{
    background: isLightMode
      ? themeColors.background
      : "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
    color: themeColors.text,
    fontFamily: "Livvic, sans-serif",
    minHeight: "100vh"
  }}>
        <section style={{
          overflow: 'hidden',
          marginTop: '0rem',
          backgroundImage: `url(${evolutionGif})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '6rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          position: 'relative'
        }}>
          <div style={{ 
            backgroundColor: 'rgba(0,0,0,0.7)', 
            padding: '3rem 2rem', 
            borderRadius: '2rem', 
            maxWidth: '900px', 
            backdropFilter: 'blur(10px)', 
            textAlign: 'center',
            border: '1px solid rgba(255, 145, 77, 0.3)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 30px 60px rgba(255, 145, 77, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.5)';
          }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: themeColors.heading, 
              fontFamily: 'Garet, sans-serif',
              marginBottom: '1.5rem',
              textShadow: '0 0 15px rgba(212, 190, 105, 0.5)'
            }}>
              Empowering the AI Ecosystem.
            </h1>
            <p style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.8', 
              marginTop: '1rem', 
              color: themeColors.dummy_text,
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              GAINOVA is a global community bridging <strong>industries</strong>, <strong>universities</strong>, and <strong>students</strong> to accelerate <strong>innovation</strong> and <strong>collaboration</strong> in Artificial Intelligence (AI) and Generative AI (GenAI). We foster a <strong>scalable, accessible, and collaborative</strong> ecosystem for shaping the future of AI—empowering learners, leaders, and change-makers across the globe.
            </p>
          </div>
        </section>

        <section style={{ 
          padding: '4rem 1rem', 
          maxWidth: '1200px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            color: themeColors.heading, 
            fontFamily: 'Garet, sans-serif', 
            textAlign: 'center',
            marginBottom: '3rem',
            textShadow: '0 0 10px rgba(212, 190, 105, 0.3)'
          }}>
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
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  cursor: 'pointer',
                  transform: hoveredIndex === index ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                  boxShadow: hoveredIndex === index ? `0 20px 40px ${isLightMode ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'}` : '0 10px 20px rgba(0,0,0,0.1)',
                  color: themeColors.text,
                  border: `1px solid ${isLightMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '1rem',
                  filter: 'drop-shadow(0 0 8px rgba(255, 145, 77, 0.5))'
                }}>{item.icon}</div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold',
                  color: themeColors.highlight,
                  marginBottom: '0.5rem'
                }}>{item.title}</h3>
                <p style={{ 
                  marginTop: '0.5rem', 
                  color: themeColors.subtext, 
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ 
          paddingTop: '2rem', 
          padding: '4rem 1rem', 
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '300', 
            color: themeColors.heading, 
            fontFamily: 'Garet, sans-serif',
            textShadow: '0 0 10px rgba(212, 190, 105, 0.3)'
          }}>
            Collaborate, innovate, and transform with the best minds across the globe.
          </h2>
          <p style={{ 
            fontSize: '1rem', 
            color: themeColors.subtext, 
            marginTop: '1rem',
            maxWidth: '600px',
            margin: '1rem auto'
          }}>
            Join our community and be part of the AI revolution.
          </p>
          <div className="section-cta mt-4">
            <button className="cta-button" onClick={handleContactUsClick}
              style={{
                background: 'linear-gradient(45deg, #ff914d, #d4be69)',
                border: 'none',
                borderRadius: '30px',
                padding: '1rem 2rem',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(255, 145, 77, 0.4)',
                marginTop: '2rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 145, 77, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 145, 77, 0.4)';
              }}
            >
              <a href="mailto:info@gainova.org" style={{
                color: '#fff',
                borderRadius: '30px',
                display: 'inline-block',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>
                Get started today!
                <span className="arrow-icon" style={{ marginLeft: '0.5rem' }}>→</span>
              </a>
            </button>
          </div>
        </section>

      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
        isLightMode={isLightMode}
      />
      </div>
    </>
  );
};

export default AboutPage;
