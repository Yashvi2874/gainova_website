import React, { useEffect, useState } from "react";


// Image Imports
import podcastImg from "../assets/gaia_podcast.png";
import catalystImg from "../assets/gaia_catalyst.png";
import academyImg from "../assets/gaia_academy.png";
import eventsImg from "../assets/gaia_events.png";
import frameworkImg from "../assets/gaia_frameworks.png";
import mentorshipImg from "../assets/gaia_mentorship.png";
import featuresBg from "../assets/features_bg.png"; // Your background image


const features = [
 {
   id: 1,
   title: "GAIA Podcasts",
   description:
     "Conversations that drive the future of AI. Tune into exclusive interviews with CEOs, founders, and AI experts on innovation, ethics, and impact.",
   image: podcastImg,
   tags: [],
 },
 {
   id: 2,
   title: "Catalyst Projects",
   description:
     "Fast-paced innovation sprints connecting students, academia, and industry to solve real-world problems using AI and GenAI tools.",
   image: catalystImg,
   tags: ["Coming Soon"],
 },
 {
   id: 3,
   title: "GAIA Academy",
   description:
     "Curated online courses, webinars, and certifications to upskill in AI and digital transformation.",
   image: academyImg,
   tags: ["Coming Soon"],
 },
 {
   id: 4,
   title: "Events & Conferences",
   description:
     "Global summits, hackathons, and meetups to foster collaboration and showcase AI innovation.",
   image: eventsImg,
   tags: ["Coming Soon"],
 },
 {
   id: 5,
   title: "AI Frameworks & Toolkits",
   description:
     "Open-source tools and APIs to simplify AI development and promote industry interoperability.",
   image: frameworkImg,
   tags: ["Coming Soon"],
 },
 {
   id: 6,
   title: "Mentorship & Community",
   description:
     "Forums, mentorship programs, and leadership initiatives to nurture the next-gen AI talent.",
   image: mentorshipImg,
   tags: ["Coming Soon"],
 },
];


const FeaturesPage = () => {
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
     <section
       className="section"
       style={{
         minHeight: "100vh",
         width: "100vw",
         padding: "4rem 2rem",
         boxSizing: "border-box",
         position: "relative",
         backgroundImage: `url(${featuresBg})`,
         backgroundSize: "cover",
         backgroundPosition: "center",
         backgroundRepeat: "no-repeat",
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
       }}
     >
       {/* Overlay */}
       <div
         style={{
           position: "absolute",
           top: 0,
           left: 0,
           right: 0,
           bottom: 0,
           backgroundColor: "rgba(0,0,0,0.6)",
           zIndex: 1,
         }}
       />


       <div style={{
         position: "relative",
         zIndex: 2,
         maxWidth: "1300px",
         width: "100%",
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         textAlign: "center", // Center text alignment
       }}>
         <h1
           className="main-heading"
           style={{
             color: "#FF914D",
             fontSize: "4rem",
             marginBottom: "2rem",
             width: "100%"
           }}
         >
           Features
         </h1>


         <div
           className="grid"
           style={{
             display: "grid",
             gridTemplateColumns: "repeat(3, 1fr)",
             gap: "2rem",
             width: "100%",
             justifyContent: "center",
           }}
         >
           {features.map((feature) => (
             <div
  key={feature.id}
  style={{
    background: isLightMode
      ? "rgba(255, 255, 255, 0.25)"
      : "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: isLightMode
      ? "0 8px 32px 0 rgba(31, 38, 135, 0.1)"
      : "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
    overflow: "hidden",
    transition: "transform 0.3s ease",
    maxWidth: "380px",
    width: "100%",
  }}
  className="feature-card"
>
               <div style={{ height: "180px", overflow: "hidden" }}>
                 <img
                   src={feature.image}
                   alt={feature.title}
                   style={{
                     width: "100%",
                     height: "100%",
                     objectFit: "cover",
                   }}
                 />
               </div>
               <div style={{ padding: "1.5rem", color: isLightMode ? "#000" : "#fff" }}>
                 {feature.tags?.length > 0 && (
                   <div style={{ marginBottom: "1rem" }}>
                     {feature.tags.map((tag, i) => (
                       <span
                         key={i}
                         style={{
                           padding: "0.25rem 0.75rem",
                           backgroundColor: "#242423",
                           borderRadius: "999px",
                           fontSize: "0.75rem",
                           color: "#fff",
                           marginRight: "0.5rem",
                         }}
                       >
                         {tag}
                       </span>
                     ))}
                   </div>
                 )}
                 <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{feature.title}</h3>
                 <p style={{ fontSize: "0.95rem", color: isLightMode ? "#333" : "#ccc" }}>
                   {feature.description}
                 </p>
               </div>
             </div>
           ))}
         </div>
       </div>
     </section>
   </div>
 );
  return (
    <div className={`homepage ${isLightMode ? "light-mode" : "dark-mode"}`}>
      {/* <Navbar
        sections={[]}
        activeSection="features"
        isLightMode={isLightMode}
        toggleLightMode={() => setIsLightMode((v) => !v)}
      /> */}

      <section
        id="features-hero"
        className="section"
        style={{
          minHeight: "calc(100vh - 100px)", // Adjust based on navbar height
          width: "100vw",
          padding: "2rem",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 className="main-heading">
          <span className="logo-orange">Features</span>
        </h1>
        <ul className="home-description" style={{ marginTop: "1rem" }}>
          <li>Smart Routing</li>
          <li>Responsive Design</li>
          <li>API Integration</li>
        </ul>
        <p className="home-description" style={{ marginTop: "2rem" }}>
          Built with care by Eeshaja.
        </p>
      </section>
    </div>
  );
};


export default FeaturesPage;



