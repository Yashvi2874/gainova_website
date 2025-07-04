import React, { useState, useRef, useEffect } from "react";
// import Navbar from "../components/Navbar/Navbar";
import podcastVideo from "./../../public/images/Pages/podcast_1.mp4";

// ✅ Hook for scroll-based animation
const useSlideInOnScroll = () => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("visible");
        } else {
          node.classList.remove("visible");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
};


// 🎯 BentoTilt Component
export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;

    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => setTransformStyle("");

  return (
    <div
      ref={itemRef}
      className={`bento-tilt ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

// 🎙 PodcastCard Component
export const PodcastCard = ({ src, title, description, isComingSoon, videoId }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
  const videoUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : '';

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();
    setCursorPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="podcast-card">
      {videoId ? (
        <a href={videoUrl} target="_blank" rel="noopener noreferrer">
          <img src={thumbnailUrl} alt={`YouTube Video: ${title}`} className="podcast-video-thumbnail" />
        </a>
      ) : (
        <video src={src} loop muted autoPlay className="podcast-video" />
      )}

      <div className="podcast-content">
        <h1 className="podcast-title">{title}</h1>
        {description && <p className="podcast-description">{description}</p>}
        {isComingSoon && videoId && (
  <a
    href={videoUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="coming-soon-button-link"
  >
    <div
      ref={hoverButtonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="coming-soon-button"
    >
      <div
        className="hover-effect"
        style={{
          opacity: hoverOpacity,
          background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
        }}
      />
      <p className="coming-soon-text">Watch now</p>
    </div>
  </a>
)}

      </div>
    </div>
  );
};

// 🧩 PodcastPage Component
const PodcastPage = () => {
  const ref2 = useSlideInOnScroll();
  const ref3 = useSlideInOnScroll();
  const ref4 = useSlideInOnScroll();
  const refTuneIn = useSlideInOnScroll();

  // ✅ Light/Dark Mode Logic
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
    <div className={` ${isLightMode ? "light-mode" : "dark-mode"}`}>
      {/* <Navbar
        sections={[]}
        activeSection="podcast"
        isLightMode={isLightMode}
        toggleLightMode={() => setIsLightMode((v) => !v)}
      /> */}

      <section className="podcast-page">
        <div className="container">
          {/* Episode 1 */}
          <div className="podcast-item featured-episode" style={{ marginTop: '5rem' }}>
            <PodcastCard
              src={podcastVideo}
              title={
                <>
                  GAINOVA Podcast: <br /> Plug into the AI Pulse <br /><br /> <br/>
                </>
              }
              description={<>From next-gen AI breakthroughs to real-world innovations, we decode the future — one episode at a time. <br />Not just a podcast — a portal.
                Tune into expert insights, bold ideas, and real conversations at the bleeding edge of AI and innovation. Whether you're a creator, a coder, or just curious — this is where vision meets velocity.</>}
            />
          </div>

          {/* Scroll-triggered "Tune in now" */}
          <div ref={refTuneIn} className="tune-in-text-container">
            <h2 className="tune-in-text">Tune in now</h2>
          </div>

          <div className="podcast-grid">
            <BentoTilt className="podcast-item">
              <div ref={ref2} className="zentry-animate" style={{ animationDelay: "0.1s" }}>
                <PodcastCard
                  videoId="HkTVwxmZt1w"
                  title="Episode 2: GenAI Revolution"
                  description="We discuss the rapid advancements in generative AI and its impact on gaming."
                  isComingSoon
                />
              </div>
            </BentoTilt>

            <BentoTilt className="podcast-item">
              <div ref={ref3} className="zentry-animate" style={{ animationDelay: "0.2s" }}>
                <PodcastCard
                  videoId="CRraHg4Ks_g"
                  title="Episode 3: The AI Revolution"
                  description="AI is transforming industries in ways we couldn't imagine a few years ago. We explore some key AI breakthroughs."
                  isComingSoon
                />
              </div>
            </BentoTilt>

            <BentoTilt className="podcast-item">
              <div ref={ref4} className="zentry-animate" style={{ animationDelay: "0.3s" }}>
                <PodcastCard
                  videoId="HISRUrJsD08"
                  title="Episode 4: The Future of AI in Gaming"
                  description="A deep dive into how AI is reshaping the gaming landscape and revolutionizing player experiences."
                  isComingSoon
                />
              </div>
            </BentoTilt>

          </div>

          <BentoTilt className="coming-soon-wrapper">
    <div className="coming-soon-item">
      <div className="coming-soon">
        <h1 className="coming-soon-title">More episodes coming soon.</h1>
      </div>
    </div>
  </BentoTilt>
        </div>
      </section>
    </div>
  );
};

export default PodcastPage;
