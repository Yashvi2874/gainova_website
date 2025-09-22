"use client";
import { useState, useEffect, useRef } from "react";
import { FaPlay, FaChevronDown, FaGlobe, FaUsers, FaRocket, FaBrain, FaLightbulb, FaCode, FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ContactForm from "../../components/contact/ContactForm";
import "./HomePage.css";
import LogoLight from "/images/Pages/Logo_light.svg";
import LogoDark from "/images/Pages/Logo_dark.svg";
import RobotImage from "/images/Pages/robot-website.webp";
import { motion, useScroll, useTransform } from "motion/react";
import WorldMap from "./WorldMap.jsx";

const sections = ["home", "goal", "collaborate", "features", "faqs"];

const Homepage = ({ isLightMode }) => {
  const navigate = useNavigate(); // Add this line to properly initialize navigate
  const [activeSection, setActiveSection] = useState("home");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const goalSectionRef = useRef(null);

  // Add this for scroll progress
  const { scrollYProgress: goalScrollProgress } = useScroll({
    target: goalSectionRef,
    offset: ["start end", "end start"],
  });

  // Animate dashoffset from 2000 (hidden) to 0 (fully drawn)
  const dash1 = useTransform(goalScrollProgress, [0, 0.8], [0.2, 1.2]);
  const dash2 = useTransform(goalScrollProgress, [0, 0.8], [0.15, 1.2]);
  const dash3 = useTransform(goalScrollProgress, [0, 0.8], [0.1, 1.2]);
  const dash4 = useTransform(goalScrollProgress, [0, 0.8], [0.05, 1.2]);
  const dash5 = useTransform(goalScrollProgress, [0, 0.8], [0, 1.2]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target && entry.target.classList) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

// const SVG = () => {
//   const ref = useRef(null);
//   const {scrollYProgress} = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });
//   const transition = {
//   duration: 0,
//   ease: "linear",
// };

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     console.log(latest);
//   });

//   const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
//   const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
//   const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
//   const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
//   const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

//   return (
//     <div className='w-full' ref={ref}>
//      <svg
//         width="1440"
//         height="890"
//         viewBox="0 0 1440 890"
//         xmlns="http://www.w3.org/2000/svg"
//         className="w-full sticky top-0"
//       >
//         <motion.path
//           d="M0 663C145.5 663 191 666.265 269 647C326.5 630 339.5 621 397.5 566C439 531.5 455 529.5 490 523C509.664 519.348 521 503.736 538 504.236C553.591 504.236 562.429 514.739 584.66 522.749C592.042 525.408 600.2 526.237 607.356 523.019C624.755 515.195 641.446 496.324 657 496.735C673.408 496.735 693.545 519.572 712.903 526.769C718.727 528.934 725.184 528.395 730.902 525.965C751.726 517.115 764.085 497.106 782 496.735C794.831 496.47 804.103 508.859 822.469 518.515C835.13 525.171 850.214 526.815 862.827 520.069C875.952 513.049 889.748 502.706 903.5 503.736C922.677 505.171 935.293 510.562 945.817 515.673C954.234 519.76 963.095 522.792 972.199 524.954C996.012 530.611 1007.42 534.118 1034 549C1077.5 573.359 1082.5 594.5 1140 629C1206 670 1328.5 662.5 1440 662.5"
//           stroke="#FFB7C5"
//           strokeWidth="2"
//           fill="none"
//           initial={{
//             pathLength: 0,
//           }}      
//           style={{
//             pathLength: pathLengthFirst,
//           }}
//           transition={transition}
//         />
//         <motion.path
//           d="M0 587.5C147 587.5 277 587.5 310 573.5C348 563 392.5 543.5 408 535C434 523.5 426 526.235 479 515.235C494 512.729 523 510.435 534.5 512.735C554.5 516.735 555.5 523.235 576 523.735C592 523.735 616 496.735 633 497.235C648.671 497.235 661.31 515.052 684.774 524.942C692.004 527.989 700.2 528.738 707.349 525.505C724.886 517.575 741.932 498.33 757.5 498.742C773.864 498.742 791.711 520.623 810.403 527.654C816.218 529.841 822.661 529.246 828.451 526.991C849.246 518.893 861.599 502.112 879.5 501.742C886.47 501.597 896.865 506.047 907.429 510.911C930.879 521.707 957.139 519.639 982.951 520.063C1020.91 520.686 1037.5 530.797 1056.5 537C1102.24 556.627 1116.5 570.704 1180.5 579.235C1257.5 589.5 1279 587 1440 588"
//           stroke="#FFDDB7"
//           strokeWidth="2"
//           fill="none"
//           initial={{
//             pathLength: 0,
//           }}
//           style={{
//             pathLength: pathLengthSecond,
//           }}
//           transition={transition}
//         />
//         <motion.path
//           d="M0 514C147.5 514.333 294.5 513.735 380.5 513.735C405.976 514.94 422.849 515.228 436.37 515.123C477.503 514.803 518.631 506.605 559.508 511.197C564.04 511.706 569.162 512.524 575 513.735C588 516.433 616 521.702 627.5 519.402C647.5 515.402 659 499.235 680.5 499.235C700.5 499.235 725 529.235 742 528.735C757.654 528.735 768.77 510.583 791.793 500.59C798.991 497.465 807.16 496.777 814.423 499.745C832.335 507.064 850.418 524.648 866 524.235C882.791 524.235 902.316 509.786 921.814 505.392C926.856 504.255 932.097 504.674 937.176 505.631C966.993 511.248 970.679 514.346 989.5 514.735C1006.3 515.083 1036.5 513.235 1055.5 513.235C1114.5 513.235 1090.5 513.235 1124 513.235C1177.5 513.235 1178.99 514.402 1241 514.402C1317.5 514.402 1274.5 512.568 1440 513.235"
//           stroke="#B1C5FF"
//           strokeWidth="2"
//           fill="none"
//           initial={{
//             pathLength: 0,
//           }}
//           style={{
//             pathLength: pathLengthThird,
//           }}
//           transition={transition}
//         />
//         <motion.path
//           d="M0 438.5C150.5 438.5 261 438.318 323.5 456.5C351 464.5 387.517 484.001 423.5 494.5C447.371 501.465 472 503.735 487 507.735C503.786 512.212 504.5 516.808 523 518.735C547 521.235 564.814 501.235 584.5 501.235C604.5 501.235 626 529.069 643 528.569C658.676 528.569 672.076 511.63 695.751 501.972C703.017 499.008 711.231 498.208 718.298 501.617C735.448 509.889 751.454 529.98 767 529.569C783.364 529.569 801.211 507.687 819.903 500.657C825.718 498.469 832.141 499.104 837.992 501.194C859.178 508.764 873.089 523.365 891 523.735C907.8 524.083 923 504.235 963 506.735C1034.5 506.735 1047.5 492.68 1071 481.5C1122.5 457 1142.23 452.871 1185 446.5C1255.5 436 1294 439 1439.5 439"
//           stroke="#4FABFF"
//           strokeWidth="2"
//           fill="none"
//           initial={{
//             pathLength: 0,
//           }}
//           style={{
//             pathLength: pathLengthFourth,
//           }}
//           transition={transition}
//         />
//         <motion.path
//           d="M0.5 364C145.288 362.349 195 361.5 265.5 378C322 391.223 399.182 457.5 411 467.5C424.176 478.649 456.916 491.677 496.259 502.699C498.746 503.396 501.16 504.304 503.511 505.374C517.104 511.558 541.149 520.911 551.5 521.236C571.5 521.236 590 498.736 611.5 498.736C631.5 498.736 652.5 529.236 669.5 528.736C685.171 528.736 697.81 510.924 721.274 501.036C728.505 497.988 736.716 497.231 743.812 500.579C761.362 508.857 778.421 529.148 794 528.736C810.375 528.736 829.35 508.68 848.364 502.179C854.243 500.169 860.624 500.802 866.535 502.718C886.961 509.338 898.141 519.866 916 520.236C932.8 520.583 934.5 510.236 967.5 501.736C1011.5 491 1007.5 493.5 1029.5 480C1069.5 453.5 1072 440.442 1128.5 403.5C1180.5 369.5 1275 360.374 1439 364"
//           stroke="#076EFF"
//           strokeWidth="2"
//           fill="none"
//           initial={{
//             pathLength: 0,
//           }}
//           style={{
//             pathLength: pathLengthFifth,
//           }}
//           transition={transition}
//         />
 
//         {/* Gaussian blur for the background paths */}
 
//         <path
//           d="M0 663C145.5 663 191 666.265 269 647C326.5 630 339.5 621 397.5 566C439 531.5 455 529.5 490 523C509.664 519.348 521 503.736 538 504.236C553.591 504.236 562.429 514.739 584.66 522.749C592.042 525.408 600.2 526.237 607.356 523.019C624.755 515.195 641.446 496.324 657 496.735C673.408 496.735 693.545 519.572 712.903 526.769C718.727 528.934 725.184 528.395 730.902 525.965C751.726 517.115 764.085 497.106 782 496.735C794.831 496.47 804.103 508.859 822.469 518.515C835.13 525.171 850.214 526.815 862.827 520.069C875.952 513.049 889.748 502.706 903.5 503.736C922.677 505.171 935.293 510.562 945.817 515.673C954.234 519.76 963.095 522.792 972.199 524.954C996.012 530.611 1007.42 534.118 1034 549C1077.5 573.359 1082.5 594.5 1140 629C1206 670 1328.5 662.5 1440 662.5"
//           stroke="#FFB7C5"
//           strokeWidth="2"
//           fill="none"
//           filter="url(#blurMe)"
//         />
//         <path
//           d="M0 587.5C147 587.5 277 587.5 310 573.5C348 563 392.5 543.5 408 535C434 523.5 426 526.235 479 515.235C494 512.729 523 510.435 534.5 512.735C554.5 516.735 555.5 523.235 576 523.735C592 523.735 616 496.735 633 497.235C648.671 497.235 661.31 515.052 684.774 524.942C692.004 527.989 700.2 528.738 707.349 525.505C724.886 517.575 741.932 498.33 757.5 498.742C773.864 498.742 791.711 520.623 810.403 527.654C816.218 529.841 822.661 529.246 828.451 526.991C849.246 518.893 861.599 502.112 879.5 501.742C886.47 501.597 896.865 506.047 907.429 510.911C930.879 521.707 957.139 519.639 982.951 520.063C1020.91 520.686 1037.5 530.797 1056.5 537C1102.24 556.627 1116.5 570.704 1180.5 579.235C1257.5 589.5 1279 587 1440 588"
//           stroke="#FFDDB7"
//           strokeWidth="2"
//           fill="none"
//           filter="url(#blurMe)"
//         />
//         <path
//           d="M0 514C147.5 514.333 294.5 513.735 380.5 513.735C405.976 514.94 422.849 515.228 436.37 515.123C477.503 514.803 518.631 506.605 559.508 511.197C564.04 511.706 569.162 512.524 575 513.735C588 516.433 616 521.702 627.5 519.402C647.5 515.402 659 499.235 680.5 499.235C700.5 499.235 725 529.235 742 528.735C757.654 528.735 768.77 510.583 791.793 500.59C798.991 497.465 807.16 496.777 814.423 499.745C832.335 507.064 850.418 524.648 866 524.235C882.791 524.235 902.316 509.786 921.814 505.392C926.856 504.255 932.097 504.674 937.176 505.631C966.993 511.248 970.679 514.346 989.5 514.735C1006.3 515.083 1036.5 513.235 1055.5 513.235C1114.5 513.235 1090.5 513.235 1124 513.235C1177.5 513.235 1178.99 514.402 1241 514.402C1317.5 514.402 1274.5 512.568 1440 513.235"
//           stroke="#B1C5FF"
//           strokeWidth="2"
//           fill="none"
//           filter="url(#blurMe)"
//         />
//         <path
//           d="M0 438.5C150.5 438.5 261 438.318 323.5 456.5C351 464.5 387.517 484.001 423.5 494.5C447.371 501.465 472 503.735 487 507.735C503.786 512.212 504.5 516.808 523 518.735C547 521.235 564.814 501.235 584.5 501.235C604.5 501.235 626 529.069 643 528.569C658.676 528.569 672.076 511.63 695.751 501.972C703.017 499.008 711.231 498.208 718.298 501.617C735.448 509.889 751.454 529.98 767 529.569C783.364 529.569 801.211 507.687 819.903 500.657C825.718 498.469 832.141 499.104 837.992 501.194C859.178 508.764 873.089 523.365 891 523.735C907.8 524.083 923 504.235 963 506.735C1034.5 506.735 1047.5 492.68 1071 481.5C1122.5 457 1142.23 452.871 1185 446.5C1255.5 436 1294 439 1439.5 439"
//           stroke="#4FABFF"
//           strokeWidth="2"
//           fill="none"
//           filter="url(#blurMe)"
//         />
//         <path
//           d="M0.5 364C145.288 362.349 195 361.5 265.5 378C322 391.223 399.182 457.5 411 467.5C424.176 478.649 456.916 491.677 496.259 502.699C498.746 503.396 501.16 504.304 503.511 505.374C517.104 511.558 541.149 520.911 551.5 521.236C571.5 521.236 590 498.736 611.5 498.736C631.5 498.736 652.5 529.236 669.5 528.736C685.171 528.736 697.81 510.924 721.274 501.036C728.505 497.988 736.716 497.231 743.812 500.579C761.362 508.857 778.421 529.148 794 528.736C810.375 528.736 829.35 508.68 848.364 502.179C854.243 500.169 860.624 500.802 866.535 502.718C886.961 509.338 898.141 519.866 916 520.236C932.8 520.583 934.5 510.236 967.5 501.736C1011.5 491 1007.5 493.5 1029.5 480C1069.5 453.5 1072 440.442 1128.5 403.5C1180.5 369.5 1275 360.374 1439 364"
//           stroke="#076EFF"
//           strokeWidth="2"
//           fill="none"
//           filter="url(#blurMe)"
//         />
 
//         <defs>
//           <filter id="blurMe">
//             <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
//           </filter>
//         </defs>
//       </svg>
//       </div>
//     );
// };
  
  const faqs = [
    {
      question: "What is GAINOVA?",
      answer: "GAINOVA stands for Global AI Network for Open Virtual Advancement. We are pioneering the future of artificial intelligence through innovative solutions and collaborative research that bridges academia, industry, and global communities."
    },
    {
      question: "How does GAINOVA work?",
      answer: "We develop cutting-edge AI technologies through research partnerships, provide educational resources via GAIA Academy, host global events and conferences, and create open-source frameworks that democratize AI development across industries."
    },
    {
      question: "What services does GAINOVA offer?",
      answer: "Our comprehensive ecosystem includes GAIA Podcasts featuring industry leaders, Catalyst Projects for innovation sprints, GAIA Academy for AI education, global events and conferences, open-source AI frameworks, and mentorship programs for emerging talent."
    },
    {
      question: "How can I get involved with GAINOVA?",
      answer: "Join our community through our social media channels, participate in our events and hackathons, enroll in GAIA Academy courses, contribute to our open-source projects, or apply for our mentorship programs. Contact us directly to explore collaboration opportunities."
    }
  ];

  const handleContactUsClick = () => {
    setIsContactFormOpen(true);
  };

  // Function to handle navigation to About page
  const handleLearnMoreClick = () => {
    navigate("/about"); // Use navigate instead of window.location.href
  };

  // Function to handle navigation to Features page
  const handleExploreFeaturesClick = () => {
    navigate("/features"); // Use navigate instead of window.location.href
  };

  const getPathLength = (startOffset, endOffset) => {
    if (!goalSectionRef.current) return 0;
    
    const rect = goalSectionRef.current.getBoundingClientRect();
    const elementTop = scrollY + rect.top;
    const elementHeight = rect.height;
    
    const scrollProgress = Math.max(0, Math.min(1, 
      (scrollY - elementTop + window.innerHeight) / (elementHeight + window.innerHeight)
    ));
    
    return Math.max(startOffset, Math.min(endOffset, startOffset + (endOffset - startOffset) * scrollProgress));
  };

  return (
    <div className={`homepage ${isLightMode ? "light-mode" : "dark-mode"}`}>
      {/* Hero Section */}
      <section id="home" className="section home">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-left">
            <img
              src={isLightMode ? LogoDark : LogoLight}
              alt="GAINOVA Logo"
              className="hero-logo"
            />
            <p className="hero-tagline">
               Global AI Network for Open Virtual Advancement
            </p>
            <button
              className="hero-learn-btn"
              onClick={handleLearnMoreClick}
            >
              Learn More
              <span className="arrow-icon">→</span>
            </button>
          </div>
          <div className="hero-right">
            <img
              src={RobotImage} // Use the imported image instead of relative path
              alt="AI Robot"
              className="hero-image"
            />
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <div className="scroll-text">Scroll to explore</div>
        </div>
      </section>

      {/* Our Goals Section with Enhanced Background Effect */}
      {/* <section
        id="goal"
        className="section goals-enhanced"
        style={{ position: "relative", minHeight: "120vh" }}>
      <div className='flex h-[400vh] w-full relative'>
        <SVG/>
      </div>
        <div className="goals-content-enhanced" style={{ position: "relative", zIndex: 1 }}>
          <div className="goals-header">
            <h2 className="goals-title-enhanced">Our Vision</h2>
            <p className="goals-description-enhanced">
              Pioneering the future of AI through innovation, collaboration, and impact
            </p>
          </div>
          
          <div className="goals-grid-enhanced">
            <div className="goal-card-enhanced">
              <div className="goal-icon-enhanced">
                <FaRocket />
              </div>
              <h3>Innovation Excellence</h3>
              <p>Pioneering cutting-edge AI technologies that reshape industries</p>
            </div>
            <div className="goal-card-enhanced">
              <div className="goal-icon-enhanced">
                <FaGlobe />
              </div>
              <h3>Global Impact</h3>
              <p>Creating solutions that benefit humanity worldwide</p>
            </div>
            <div className="goal-card-enhanced">
              <div className="goal-icon-enhanced">
                <FaBrain />
              </div>
              <h3>Open Collaboration</h3>
              <p>Building bridges between innovators and researchers</p>
            </div>
          </div>
        </div>
      </section> */}
      <section id="goal" className="section goals-enhanced" ref={goalSectionRef} style={{ position: 'relative' }}>
        <div className="goals-content-enhanced">
          <div className="goals-header">
            <h2 className="goals-title-enhanced">Our Vision</h2>
            <p className="goals-description-enhanced">
              Pioneering the future of AI through innovation, collaboration, and impact
            </p>
          </div>
          <div className="goals-grid-enhanced">
            <div className="goal-card-enhanced">
              <div className="goal-icon-enhanced">
                <FaRocket />
              </div>
              <h3>Innovation Excellence</h3>
              <p>Pioneering cutting-edge AI technologies that reshape industries</p>
            </div>
            <div className="goal-card-enhanced">
              <div className="goal-icon-enhanced">
                <FaGlobe />
              </div>
              <h3>Global Impact</h3>
              <p>Creating solutions that benefit humanity worldwide</p>
            </div>
            <div className="goal-card-enhanced">
              <div className="goal-icon-enhanced">
                <FaBrain />
              </div>
              <h3>Open Collaboration</h3>
              <p>Building bridges between innovators and researchers</p>
            </div>
          </div>
        </div>
        {/* Enhanced Gemini Background Effect */}
        <div className="gemini-background">
          <svg width="100vw" height="100%" viewBox="0 0 1440 590" className="gemini-svg-enhanced">
            <defs>
              <linearGradient id="gemini-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 183, 197, 0)" />
                <stop offset="20%" stopColor="rgba(255, 183, 197, 0.8)" />
                <stop offset="80%" stopColor="rgba(255, 183, 197, 0.8)" />
                <stop offset="100%" stopColor="rgba(255, 183, 197, 0)" />
              </linearGradient>
              <linearGradient id="gemini-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 221, 183, 0)" />
                <stop offset="20%" stopColor="rgba(255, 221, 183, 0.8)" />
                <stop offset="80%" stopColor="rgba(255, 221, 183, 0.8)" />
                <stop offset="100%" stopColor="rgba(255, 221, 183, 0)" />
              </linearGradient>
              <linearGradient id="gemini-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(177, 197, 255, 0)" />
                <stop offset="20%" stopColor="rgba(177, 197, 255, 0.8)" />
                <stop offset="80%" stopColor="rgba(177, 197, 255, 0.8)" />
                <stop offset="100%" stopColor="rgba(177, 197, 255, 0)" />
              </linearGradient>
              <linearGradient id="gemini-gradient-4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(79, 171, 255, 0)" />
                <stop offset="20%" stopColor="rgba(79, 171, 255, 0.8)" />
                <stop offset="80%" stopColor="rgba(79, 171, 255, 0.8)" />
                <stop offset="100%" stopColor="rgba(79, 171, 255, 0)" />
              </linearGradient>
              <linearGradient id="gemini-gradient-5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(7, 110, 255, 0)" />
                <stop offset="20%" stopColor="rgba(7, 110, 255, 0.8)" />
                <stop offset="80%" stopColor="rgba(7, 110, 255, 0.8)" />
                <stop offset="100%" stopColor="rgba(7, 110, 255, 0)" />
              </linearGradient>
              <filter id="gemini-glow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <path
              d="M0 663C145.5 663 191 666.265 269 647C326.5 630 339.5 621 397.5 566C439 531.5 455 529.5 490 523C509.664 519.348 521 503.736 538 504.236C553.591 504.236 562.429 514.739 584.66 522.749C592.042 525.408 600.2 526.237 607.356 523.019C624.755 515.195 641.446 496.324 657 496.735C673.408 496.735 693.545 519.572 712.903 526.769C718.727 528.934 725.184 528.395 730.902 525.965C751.726 517.115 764.085 497.106 782 496.735C794.831 496.47 804.103 508.859 822.469 518.515C835.13 525.171 850.214 526.815 862.827 520.069C875.952 513.049 889.748 502.706 903.5 503.736C922.677 505.171 935.293 510.562 945.817 515.673C954.234 519.76 963.095 522.792 972.199 524.954C996.012 530.611 1007.42 534.118 1034 549C1077.5 573.359 1082.5 594.5 1140 629C1206 670 1328.5 662.5 1440 662.5"
              stroke="url(#gemini-gradient-1)"
              strokeWidth="3"
              fill="none"
              filter="url(#gemini-glow)"
              strokeDasharray="2000"
              style={{ strokeDashoffset: dash1 }}
            />
            <path
              d="M0 587.5C147 587.5 277 587.5 310 573.5C348 563 392.5 543.5 408 535C434 523.5 426 526.235 479 515.235C494 512.729 523 510.435 534.5 512.735C554.5 516.735 555.5 523.235 576 523.735C592 523.735 616 496.735 633 497.235C648.671 497.235 661.31 515.052 684.774 524.942C692.004 527.989 700.2 528.738 707.349 525.505C724.886 517.575 741.932 498.33 757.5 498.742C773.864 498.742 791.711 520.623 810.403 527.654C816.218 529.841 822.661 529.246 828.451 526.991C849.246 518.893 861.599 502.112 879.5 501.742C886.47 501.597 896.865 506.047 907.429 510.911C930.879 521.707 957.139 519.639 982.951 520.063C1020.91 520.686 1037.5 530.797 1056.5 537C1102.24 556.627 1116.5 570.704 1180.5 579.235C1257.5 589.5 1279 587 1440 588"
              stroke="url(#gemini-gradient-2)"
              strokeWidth="3"
              fill="none"
              filter="url(#gemini-glow)"
              strokeDasharray="2000"
              style={{ strokeDashoffset: dash2 }}
            />
            <path
              d="M0 514C147.5 514.333 294.5 513.735 380.5 513.735C405.976 514.94 422.849 515.228 436.37 515.123C477.503 514.803 518.631 506.605 559.508 511.197C564.04 511.706 569.162 512.524 575 513.735C588 516.433 616 521.702 627.5 519.402C647.5 515.402 659 499.235 680.5 499.235C700.5 499.235 725 529.235 742 528.735C757.654 528.735 768.77 510.583 791.793 500.59C798.991 497.465 807.16 496.777 814.423 499.745C832.335 507.064 850.418 524.648 866 524.235C882.791 524.235 902.316 509.786 921.814 505.392C926.856 504.255 932.097 504.674 937.176 505.631C966.993 511.248 970.679 514.346 989.5 514.735C1006.3 515.083 1036.5 513.235 1055.5 513.235C1114.5 513.235 1090.5 513.235 1124 513.235C1177.5 513.235 1178.99 514.402 1241 514.402C1317.5 514.402 1274.5 512.568 1440 513.235"
              stroke="url(#gemini-gradient-3)"
              strokeWidth="3"
              fill="none"
              filter="url(#gemini-glow)"
              strokeDasharray="2000"
              style={{ strokeDashoffset: dash3 }}
            />
            <path
              d="M0 438.5C150.5 438.5 261 438.318 323.5 456.5C351 464.5 387.517 484.001 423.5 494.5C447.371 501.465 472 503.735 487 507.735C503.786 512.212 504.5 516.808 523 518.735C547 521.235 564.814 501.235 584.5 501.235C604.5 501.235 626 529.069 643 528.569C658.676 528.569 672.076 511.63 695.751 501.972C703.017 499.008 711.231 498.208 718.298 501.617C735.448 509.889 751.454 529.98 767 529.569C783.364 529.569 801.211 507.687 819.903 500.657C825.718 498.469 832.141 499.104 837.992 501.194C859.178 508.764 873.089 523.365 891 523.735C907.8 524.083 923 504.235 963 506.735C1034.5 506.735 1047.5 492.68 1071 481.5C1122.5 457 1142.23 452.871 1185 446.5C1255.5 436 1294 439 1439.5 439"
              stroke="url(#gemini-gradient-4)"
              strokeWidth="3"
              fill="none"
              filter="url(#gemini-glow)"
              strokeDasharray="2000"
              style={{ strokeDashoffset: dash4 }}
            />
            <path
              d="M0.5 364C145.288 362.349 195 361.5 265.5 378C322 391.223 399.182 457.5 411 467.5C424.176 478.649 456.916 491.677 496.259 502.699C498.746 503.396 501.16 504.304 503.511 505.374C517.104 511.558 541.149 520.911 551.5 521.236C571.5 521.236 590 498.736 611.5 498.736C631.5 498.736 652.5 529.236 669.5 528.736C685.171 528.736 697.81 510.924 721.274 501.036C728.505 497.988 736.716 497.231 743.812 500.579C761.362 508.857 778.421 529.148 794 528.736C810.375 528.736 829.35 508.68 848.364 502.179C854.243 500.169 860.624 500.802 866.535 502.718C886.961 509.338 898.141 519.866 916 520.236C932.8 520.583 934.5 510.236 967.5 501.736C1011.5 491 1007.5 493.5 1029.5 480C1069.5 453.5 1072 440.442 1128.5 403.5C1180.5 369.5 1275 360.374 1439 364"
              stroke="url(#gemini-gradient-5)"
              strokeWidth="3"
              fill="none"
              filter="url(#gemini-glow)"
              strokeDasharray="2000"
              style={{ strokeDashoffset: dash5 }}
            />
          </svg>
        </div>
      </section>

      {/* Our Ecosystem Timeline */}
      <section id="features" className="section features">
        <div className="section-header">
          <h2>Our Ecosystem</h2>
          <p>Discover the comprehensive suite of services and programs we offer</p>
        </div>

        <div className="ecosystem-timeline">
          <div className="timeline-item">
            <div className="timeline-marker">
              <FaPlay className="timeline-icon" />
            </div>
            <div className="timeline-content">
              <h3>🎙️ GAIA Podcasts</h3>
              <p>Exclusive interviews with AI leaders, innovators, and visionaries shaping the future of technology.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker">
              <FaRocket className="timeline-icon" />
            </div>
            <div className="timeline-content">
              <h3>🚀 Catalyst Projects</h3>
              <p>Fast-paced innovation sprints connecting students, academia, and industry to solve real-world problems.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker">
              <FaGraduationCap className="timeline-icon" />
            </div>
            <div className="timeline-content">
              <h3>🎓 GAIA Academy</h3>
              <p>Comprehensive courses, certifications, and training programs for AI and digital transformation.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker">
              <FaUsers className="timeline-icon" />
            </div>
            <div className="timeline-content timeline-content-margin">
              <h3>🌐 Events & Community</h3>
              <p>Global conferences, hackathons, and networking events fostering collaboration and innovation.</p>
            </div>
          </div>
        </div>

        <div className="section-cta">
          <button className="cta-button" onClick={handleExploreFeaturesClick}>
            Explore All Features
            <span className="arrow-icon">→</span>
          </button>
        </div>
      </section>

      {/* Collaborate Section - Above FAQ */}
      <section id="collaborate" className="section collaborate">
        <div className="section-header" style={{ display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
          <h2>Collaborate With Us</h2>
          <p>Join our global network of AI innovators and shape the future together</p>
          <div className="world-map-center">
            <WorldMap
    dots={[
      {
        start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
        end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
      },
      {
        start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
        end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
      },
      {
        start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
        end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
      },
      {
        start: { lat: 51.5074, lng: -0.1278 }, // London
        end: { lat: 28.6139, lng: 77.209 }, // New Delhi
      },
      {
        start: { lat: 28.6139, lng: 77.209 }, // New Delhi
        end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
      },
      {
        start: { lat: 28.6139, lng: 77.209 }, // New Delhi
        end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
      },
    ]}
    lineColor="#ff914d"
  /> </div>
        </div>
        
        <div className="collaborate-stats">
          <div className="stat-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">Global Partners</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">25+</div>
            <div className="stat-label">Countries</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Community Members</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100+</div>
            <div className="stat-label">AI Projects</div>
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      {/* <section id="podcast" className="section podcast">
        <div className="section-header">
          <div className="podcast-icon">🎙️</div>
          <h2>GAIA Podcasts</h2>
          <p>Tune into conversations that drive the future of AI</p>
        </div>

        <div className="podcast-grid"> 
          <div className="podcast-card featured">
            <div className="podcast-header">
              <div className="play-button">
                <FaPlay />
              </div>
              <span className="episode-badge">Coming Soon</span>
            </div>
            <h3>Episode 1: The AI Revolution Begins</h3>
            <p>Join us as we explore the foundations of artificial intelligence and its transformative impact on society with renowned AI researcher Dr. Sarah Chen.</p>
            <div className="guest-info">Featuring: Dr. Sarah Chen, AI Research Director</div>
          </div>

          <div className="podcast-card">
            <div className="podcast-header">
              <div className="play-button">
                <FaPlay />
              </div>
              <span className="episode-badge">Coming Soon</span>
            </div>
            <h3>Episode 2: GenAI in Enterprise</h3>
            <p>Discover how generative AI is revolutionizing business operations and customer experiences across industries.</p>
            <div className="guest-info">Featuring: Mark Johnson, CTO at TechCorp</div>
          </div>
        </div>

        <div className="section-cta">
          <button className="cta-button" onClick={() => window.location.href = "/podcast"}>
            View All Episodes
            <span className="arrow-icon">→</span>
          </button>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section id="faqs" className="section faqs">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Got questions? We've got answers!</p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                {faq.question}
                <span className={`chevron ${openFAQ === index ? 'rotate-180' : ''}`}>
                  <FaChevronDown />
                </span>
              </button>
              <div className={`faq-answer ${openFAQ === index ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="section-cta">
          <button className="cta-button" onClick={handleContactUsClick}>
            Want to know more? Contact us
            <span className="arrow-icon">→</span>
          </button>
        </div>
      </section>

      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
        isLightMode={isLightMode}
      />
    </div>
  );
};

export default Homepage;