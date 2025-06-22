import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
import evolutionGif from "../assets/Evolution.gif";

const AboutPage = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    setIsLightMode(mq.matches);
    const handler = (e) => setIsLightMode(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const initiatives = [
    {
      title: "Podcasts",
      description: "Insights from AI leaders and innovators worldwide",
      color: "#ff6b35",
      icon: "🚀",
      status: "Active"
    },
    {
      title: "Catalyst Projects",
      description: "Solve real-world problems with rapid innovation sprints",
      color: "#ff6b35",
      icon: "🚀",
      status: "Pipeline"
    },
    {
      title: "Training & Certifications",
      description: "Upskill with AI-focused courses and credentials",
      color: "#4a90e2",
      icon: "🎓",
      status: "Pipeline"
    },
    {
      title: "Research & Publications",
      description: "Stay updated with insights, whitepapers, and case studies",
      color: "#50c878",
      icon: "📚",
      status: "Pipeline"
    },
    {
      title: "Innovation Hub",
      description: "Experiment with cutting-edge technologies and build MVPs",
      color: "#9b59b6",
      icon: "🔬",
      status: "Pipeline"
    },
    {
      title: "Frameworks & Standards",
      description: "Promote open-source AI standards and interoperability",
      color: "#e74c3c",
      icon: "⚙️",
      status: "Pipeline"
    },
    {
      title: "Events & Hackathons",
      description: "Network and innovate at our global events",
      color: "#f39c12",
      icon: "🌟",
      status: "Pipeline"
    },
    {
      title: "Open APIs",
      description: "Standardized APIs for scalable AI agent systems",
      color: "#1abc9c",
      icon: "🔗",
      status: "Pipeline"
    },
    {
      title: "AI Maturity Model",
      description: "Assess and guide your AI transformation journey",
      color: "#8e44ad",
      icon: "📊",
      status: "Pipeline"
    }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw',
      overflowX: 'hidden',
      background: isLightMode 
        ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color: isLightMode ? '#333' : '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      transition: 'all 0.3s ease'
    },
    heroWrapper: {
      position: 'relative',
      minHeight: '100vh',
      paddingTop: '100px', // Adjust this value based on your navbar height
      backgroundImage: `url(${evolutionGif})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem'
    },
    heroOverlay: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      padding: '3rem',
      borderRadius: '2rem',
      maxWidth: '900px',
      backdropFilter: 'blur(10px)',
      textAlign: 'center',
      color: '#fff'
    },
    mainHeading: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      lineHeight: '1.2'
    },
    subtitle: {
      fontSize: '1.25rem',
      lineHeight: '1.8',
      fontWeight: 400,
      margin: '0 auto',
      maxWidth: '750px',
      opacity: 0.9
    },
    section: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem clamp(1rem, 4vw, 2rem)'
    },
    sectionTitle: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: '300',
      textAlign: 'center',
      marginBottom: '3rem',
      color: isLightMode ? '#333' : '#fff'
    },
    initiativeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '2rem',
      marginBottom: '2rem'
    },
    initiativeCard: {
      background: isLightMode 
        ? 'rgba(255, 255, 255, 0.9)'
        : 'rgba(255, 255, 255, 0.08)',
      padding: '2.5rem',
      borderRadius: '20px',
      border: isLightMode ? '2px solid rgba(0,0,0,0.05)' : '2px solid rgba(255,255,255,0.1)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1.5rem'
    },
    cardIcon: {
      fontSize: '2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(10px)'
    },
    statusBadge: {
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    activeBadge: {
      background: 'linear-gradient(135deg, #4CAF50, #45a049)',
      color: 'white'
    },
    pipelineBadge: {
      background: 'linear-gradient(135deg, #FF9800, #F57C00)',
      color: 'white'
    },
    initiativeTitle: {
      fontSize: '1.4rem',
      fontWeight: '700',
      marginBottom: '1rem',
      color: isLightMode ? '#333' : '#fff',
      lineHeight: '1.3'
    },
    initiativeDescription: {
      fontSize: '1rem',
      opacity: 0.85,
      lineHeight: '1.6',
      color: isLightMode ? '#666' : '#ccc'
    },
    cardGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, transparent, currentColor, transparent)',
      opacity: 0,
      transition: 'opacity 0.3s ease'
    },
    ctaSection: {
      textAlign: 'center',
      padding: '4rem clamp(1rem, 4vw, 2rem)',
      background: isLightMode 
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.2)',
      margin: '4rem 0'
    },
    ctaTitle: {
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
      fontWeight: '300',
      marginBottom: '1rem',
      color: isLightMode ? '#333' : '#fff'
    },
    ctaSubtitle: {
      fontSize: '1.1rem',
      opacity: 0.8,
      marginBottom: '2rem',
      color: isLightMode ? '#666' : '#ccc'
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '30px',
      border: 'none',
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block'
    }
  };

  return (
    <div style={styles.container}>
      {/* <Navbar
        sections={[]}
        activeSection="about"
        isLightMode={isLightMode}
        toggleLightMode={() => setIsLightMode((v) => !v)}
      /> */}

      {/* Hero Section with Local GIF */}
      <section style={styles.heroWrapper}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.mainHeading}>Empowering the AI<br /> Ecosystem.</h1>
          <p style={styles.subtitle}>
            GAINOVA is a global community bridging <strong>industries</strong>, <strong>universities</strong>, and <strong>students</strong> to accelerate <strong>innovation</strong> and <strong>collaboration</strong> in Artificial Intelligence (AI) and Generative AI (GenAI). We foster a <strong>scalable, accessible, and collaborative</strong> ecosystem for shaping the future of AI—empowering learners, leaders, and change-makers across the globe.
          </p>
        </div>
      </section>

      {/* Initiatives Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Initiatives</h2>
        <div style={styles.initiativeGrid}>
          {initiatives.map((initiative, index) => (
            <div
              key={index}
              style={{
                ...styles.initiativeCard,
                borderLeft: `4px solid ${initiative.color}`,
                color: initiative.color
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(${initiative.color.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(',')}, 0.25)`;
                e.currentTarget.style.background = isLightMode 
                  ? 'rgba(255, 255, 255, 0.95)'
                  : 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.querySelector('.card-gradient').style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = isLightMode 
                  ? 'rgba(255, 255, 255, 0.9)'
                  : 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.querySelector('.card-gradient').style.opacity = '0';
              }}
            >
              <div className="card-gradient" style={styles.cardGradient}></div>
              
              <div style={styles.cardHeader}>
                <div style={{...styles.cardIcon, background: `linear-gradient(135deg, ${initiative.color}20, ${initiative.color}40)`}}>
                  {initiative.icon}
                </div>
                <div style={{
                  ...styles.statusBadge,
                  ...(initiative.status === 'Active' ? styles.activeBadge : styles.pipelineBadge)
                }}>
                  {initiative.status}
                </div>
              </div>
              
              <h3 style={{...styles.initiativeTitle, color: initiative.color}}>
                {initiative.title}
              </h3>
              <p style={styles.initiativeDescription}>{initiative.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>
          Collaborate, innovate, and transform with the best minds across the globe.
        </h2>
        <p style={styles.ctaSubtitle}>
          Join our community and be part of the AI revolution
        </p>
        <a 
          href="mailto:info@gainova.org" 
          style={styles.ctaButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 107, 53, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Get Started Today
        </a>
      </section>
    </div>
  );
};

export default AboutPage;

document.body.style.paddingTop = "100px";