import React, { useEffect, useState } from "react";
// import podcastImg from "./../../public/images/Features/gaia_podcast.png";
import catalystImg from "./../../public/images/Features/gaia_catalyst.png";
import academyImg from "./../../public/images/Features/gaia_academy.png";
import eventsImg from "./../../public/images/Features/gaia_events.png";
import frameworkImg from "./../../public/images/Features/gaia_frameworks.png";
import mentorshipImg from "./../../public/images/Features/gaia_mentorship.png";
// import featuresBg from "./../../public/images/Features/features_bg.png"; // Your background image
import Card from "./Card";

const features = [
 // {
 //   id: 1,
 //   title: "GAIA Podcasts",
 //   description:
 //     "Conversations that drive the future of AI. Tune into exclusive interviews with CEOs, founders, and AI experts on innovation, ethics, and impact.",
 //   image: podcastImg,
 //   tags: [],
 // },
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
        marginTop: "-1.8rem",
        overflow: "hidden",
        opacity: 1,
         minHeight: "100vh",
         width: "100vw",
         padding: "4rem 2rem",
         boxSizing: "border-box",
         position: "relative",
         background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
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
         textAlign: "center",
       }}>
         <h1
           className="main-heading"
           style={{
             color: "#FF914D",
             fontSize: "4rem",
             marginBottom: "2rem",
             width: "100%",
             fontFamily: "'Garet', sans-serif",
             fontWeight: "700",
             textShadow: "0 0 20px rgba(255, 145, 77, 0.5)",
           }}
         >
           Features
         </h1>

         <div
           className="grid"
           style={{
             display: "grid",
             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
             gap: "2rem",
             width: "100%",
             justifyContent: "center",
             marginTop: "2rem",
           }}
         >
           {features.map((feature) => (
             <Card key={feature.id} className="feature-card" style={{
               maxWidth: "380px",
               width: "100%",
               cursor: "pointer",
               padding: "0",
             }}>
               <div style={{ height: "180px", overflow: "hidden", padding: "2rem" }}>
                 <img
                   src={feature.image}
                   alt={feature.title}
                   style={{
                     width: "100%",
                     height: "100%",
                     objectFit: "cover",
                     borderRadius: "8px",
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
                           background: "linear-gradient(45deg, #ff914d, #d4be69)",
                           borderRadius: "999px",
                           fontSize: "0.75rem",
                           color: "#fff",
                           marginRight: "0.5rem",
                           fontWeight: "600",
                           boxShadow: "0 4px 12px rgba(255, 145, 77, 0.3)",
                         }}
                       >
                         {tag}
                       </span>
                     ))}
                   </div>
                 )}
                 <h3 style={{ 
                   fontSize: "1.25rem", 
                   marginBottom: "0.5rem",
                   fontWeight: "700",
                   color: "#ff914d"
                 }}>{feature.title}</h3>
                 <p style={{ 
                   fontSize: "0.95rem", 
                   color: isLightMode ? "#333" : "#ccc",
                   lineHeight: "1.6"
                 }}>
                   {feature.description}
                 </p>
               </div>
             </Card>
           ))}
         </div>
       </div>
     </section>
   </div>
 );
}
export default FeaturesPage;