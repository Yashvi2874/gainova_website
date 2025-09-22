import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar/Navbar";
import TeamMember from "./TeamMember";

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

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setIsIntersecting(true);
        setHasAnimated(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasAnimated, options]);

  return [elementRef, isIntersecting];
};

// Animated section component
const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      {children}
    </div>
  );
};

const TeamsPage = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    setIsLightMode(mq.matches);
    const handler = (e) => setIsLightMode(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Note: Removed localStorage usage as it's not supported in Claude artifacts
  // In your actual implementation, you can keep the localStorage code

  return (
<div className={`homepage min-h-screen w-full font-livvic overflow-hidden`} style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)' }}>
      {/* <Navbar
        sections={[]}
        activeSection="teams"
        isLightMode={isLightMode}
        toggleLightMode={() => setIsLightMode((v) => !v)}
      /> */}

      <div className="w-[100vw] mt-20">
        <AnimatedSection delay={0}>
          <AnimatedSection delay={0}>
  <div className="text-center mt-10 mb-0 relative inline-block w-full">
    <h1 className="text-6xl font-extrabold text-[#ff914d] inline-block relative pb-4 max-md:text-4xl animate-pulse">
      Meet Our Team
      <span className="block h-[5px] w-[60%] mt-2 mx-auto bg-gradient-to-r from-transparent via-[#ff914d] to-transparent max-md:h-[3px]"></span>
    </h1>
  </div>
</AnimatedSection>
          <div className="p-0">
    <div className="flex flex-row items-center justify-center items-start gap-20 max-md:flex-col pt-10 pb-10 max-md:gap-10 max-sm:gap-6">

      {/* Mentor Section */}
      <div className="text-center flex-1 max-md:w-full transform transition duration-500 hover:scale-105">
        <h1 className="text-[#d4be69] m-4 font-semibold text-xl">Mentor</h1>
        <div className="flex justify-center">
          <TeamMember 
            img="aniket.jpeg"
            name="Dr Aniket Mhala"
            linkedin="https://www.linkedin.com/in/dr-aniket-mhala-560abaa/"
          />
        </div>
      </div>

      {/* Student Lead Section */}
      <div className="text-center flex-1 max-md:w-full transform transition duration-500 hover:scale-105">
        <h1 className="text-[#d4be69] m-4 font-semibold text-xl">Student Lead</h1>
        <div className="flex justify-center">
          <TeamMember 
            img="vedant.png"
            name="Vedant Shetty"
            linkedin="https://www.linkedin.com/in/vedant-shetty-315853287/"
            mail="vedantshetty42@gmail.com"
            github="PyKnight-vedant"
          />
        </div>
      </div>

    </div>
  </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="p-6 bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent rounded-2xl m-4 transform transition duration-500 hover:shadow-2xl">
            <h1 align="center" className="text-[#d4be69] mb-10 m-4 text-2xl">Project Management Team</h1>
            <div className="flex flex-row justify-center items-center gap-[70px] max-md:flex-col items-center pt-4 pb-[30px] max-md:gap-8 max-sm:gap-6">
              <TeamMember name="Eeshaja Swami" img="eeshaja.jpg" linkedin="https://www.linkedin.com/in/eeshaja-swami-8445b2210/" mail="eeshaja.swami2005@gmail.com"/>

              <TeamMember name="Somin" img="somin.jpg" linkedin="https://www.linkedin.com/in/somin-shah-93039a286/" mail="sominshah.ks@gmail.com" github="SSHAH1518" />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="pt-[30px] bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent rounded-2xl m-4 transform transition duration-500 hover:shadow-2xl">
            <h1 align="center" className="text-[#d4be69] mb-10 m-4 text-2xl">Research Team</h1>
            <div className="flex flex-row justify-center items-center gap-[70px] max-xl:flex-col items-center pt-4 pb-[30px] max-md:gap-8 max-sm:gap-6">
              <TeamMember name="Aaditya Khopade" img="aadityak.png" linkedin="https://www.linkedin.com/in/aaditya-khopade-402122278/" mail="aadityakhopade11@gmail.com"/>

              <TeamMember name="Hriday Shah" img="hriday.jpg" linkedin="https://www.linkedin.com/in/hriday-shah-09b33b288/" mail="hridayshah05@gmail.com" github="cinnamon1952"/>

              <TeamMember name="Siddharth" img="sid.jpeg" linkedin="https://www.linkedin.com/in/siddharth-chintawar-a76366291/" mail="s.chintawar@somaiya.edu" github="sidc124"/>
              
              <TeamMember name="Vivek Lakhsman" img="vivek.jpg" linkedin="https://www.linkedin.com/in/vivek-lakshman/" mail="vivekl2005@gmail.com"/>
              
            </div>
            <div className="flex flex-row justify-center items-center gap-[70px] max-md:flex-col items-center pb-[30px] max-md:gap-8"> 
              <TeamMember name="Yashh Gokullgandhi" img="yashh.jpeg" linkedin="https://www.linkedin.com/in/yashh-gokullgandhi-615766283/"/>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <div className="pt-[30px] bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent rounded-2xl m-4 transform transition duration-500 hover:shadow-2xl">
            <h1 align="center" className="text-[#d4be69] mb-10 m-4 text-2xl">Tech Team</h1>
            <div className="flex flex-row justify-center items-center gap-[70px] max-xl:flex-col items-center pt-4 pb-[30px] max-md:gap-8 max-sm:gap-6">
              <TeamMember name="Mann Shah" img="mann.jpeg" linkedin="https://www.linkedin.com/in/mann-shah-3940a3278/" mail="shmann1306@gmail.com"/>

              <TeamMember name="Vinayak Pai" img="vinayak.jpeg" linkedin="https://www.linkedin.com/in/vinayak-pai-62b7a1289/" mail="vinayakpai2006@gmail.com" github="Vinayak314"/>

              <TeamMember name="Adithi Jahnavi" img="adithi.jpeg" linkedin="http://www.linkedin.com/in/adithi-jahnavi-a50687350" mail="adithi2903@gmail.com" github="adithi2903"/>

              <TeamMember name="Aditya Pawar" img="adityap.jpg" linkedin="https://www.linkedin.com/in/aditya-pawar-566a5b326/" mail="adityapawar2306@gmail.com" github="Bored-Pawar"/>

            </div>
            <div className="flex flex-row justify-center items-center gap-[70px] max-xl:flex-col items-center pb-[30px] max-md:gap-8"> 
              <TeamMember name="Yashasvi Gupta" img="yashvi.jpg" linkedin="https://www.linkedin.com/in/yashasvi-gupta-1230b423a/" mail="yashasvigupta28@gmail.com" github="Yashvi2874"/>

              <TeamMember name="Vaishnavi Singh" img="vaishnavi.jpeg" linkedin="http://www.linkedin.com/in/vaishnavi-singh-636718289" mail="singhvaishnavi252@gmail.com"/>

            </div>
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={500}>
          <div className="pt-[30px] bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent rounded-2xl m-4 transform transition duration-500 hover:shadow-2xl">
            <h1 align="center" className="text-[#d4be69] mb-10 m-4 text-2xl">Marketing Team</h1>
            <div className="flex flex-row justify-center items-center gap-[70px] max-xl:flex-col items-center pt-4 pb-[30px] max-md:gap-8 max-sm:gap-6">
              <TeamMember name="Harjas Sigh Sethi" img="harjas.png" linkedin="https://www.linkedin.com/in/harjas-sethi-7566b9184/" mail="harjas.singh@somaiya.edu "/>

              <TeamMember name="Suryaansh Jain" img="suryaansh.jpg" linkedin="https://www.linkedin.com/in/suryaansh-jain-61b74b28a/" mail="suryaansh.j2006@gmail.com" github="suryaansh-jain"/>

              <TeamMember name="Giri Patil" img="giri.png" linkedin="https://www.linkedin.com/in/giri-patil-388315270/" mail="giri.patil@somaiya.edu"/>

              <TeamMember name="Ruchi Sharma" img="ruchi.jpg" linkedin="https://www.linkedin.com/in/ruchi-sharma-634330296/" mail="ruciz.12.sharma@gmail.com" />

            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <div className="pt-[30px] bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent rounded-2xl m-4 transform transition duration-500 hover:shadow-2xl">
            <h1 align="center" className="text-[#d4be69] mb-10 m-4 text-2xl">Creative Team</h1>
            <div className="flex flex-row justify-center items-center gap-[70px] max-xl:flex-col items-center pt-4 pb-[90px] max-md:gap-8">
              <TeamMember name="Atharva Sawant" img="atharva.jpg" linkedin="http://www.linkedin.com/in/atharva-sawant10" mail="athrsawant@gmail.com" github="AtharvaSawant"/>

              <TeamMember name="Mrinali Sharma" img="mrinali.jpg" linkedin="https://www.linkedin.com/in/mrinali-sharma-353b92327/" mail="mrinalish@gmail.com" github="mrinalishh"/>

              <TeamMember name="Abhishek Joshi" img="abhishek.jpeg" linkedin="http://www.linkedin.com/in/abhishek-joshi2" mail="ketanabhishek8@gmail.com" github="ketanabhishek8"/>
            </div>
          </div>
        </AnimatedSection>
      </div>
</div>
  );
};

export default TeamsPage;