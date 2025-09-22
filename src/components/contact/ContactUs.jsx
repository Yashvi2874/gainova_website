import React, { forwardRef, useEffect, useState } from "react";
import { FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaLinkedin, FaTwitter } from "react-icons/fa";
import LogoLight from "../../../public/images/Pages/Logo_light.svg";
import LogoDark from "../../../public/images/Pages/Logo_dark.svg";
import "./ContactUs.css";

const email = "vedantshetty42@gmail.com";
const phone = "+91 9284775215";
const linkedin = "https://www.linkedin.com/company/gainova";
const instagram = "https://instagram.com/gainova";
const youtube = "https://youtube.com/@gainova";
const twitter = "https://twitter.com/gainova";

const ContactUs = forwardRef((props, ref) => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const updateMode = () => {
      setIsLightMode(document.body.classList.contains("light-mode"));
    };

    updateMode();

    const observer = new MutationObserver(updateMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const leftIcons = [
    {
      href: linkedin,
      icon: <FaLinkedin />,
      label: "LinkedIn",
      color: "#ff914d"
    },
    {
      href: `mailto:${email}`,
      icon: <FaEnvelope />,
      label: "Email", 
      color: "#ff914d"
    },
    {
      href: `tel:${phone.replace(/\s/g, "")}`,
      icon: <FaPhone />,
      label: "Phone",
      color: "#ff914d"
    },
  ];

  const rightIcons = [
    {
      href: instagram,
      icon: <FaInstagram />,
      label: "Instagram",
      color: "#ff914d"
    },
    {
      href: youtube,
      icon: <FaYoutube />,
      label: "YouTube",
      color: "#ff914d"
    },
    {
      href: twitter,
      icon: <FaTwitter />,
      label: "Twitter",
      color: "#ff914d"
    },
  ];

  return (
    <footer ref={ref} className="footer" id="contact">
      <div className="footer-content">
        {/* Desktop Layout */}
        <div className="footer-desktop">
          <div className="footer-section footer-left">
            <h3 className="footer-section-title">Connect</h3>
            <div className="footer-icons-group">
              {leftIcons.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-icon"
                  aria-label={link.label}
                  style={{ '--icon-color': link.color }}
                >
                  {link.icon}
                  <span className="icon-label">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section footer-center">
            <div
              className="footer-logo-center"
              onClick={() => {
                const hero = document.getElementById("home");
                if (hero) hero.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <img
                src={isLightMode ? LogoDark : LogoLight }
                alt="GAINOVA Logo"
                className="footer-logo"
              />
              <p className="footer-tagline">Global AI Network for Open Virtual Advancement</p>
              <div className="footer-links">
                <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
                <span className="footer-separator">|</span>
                <a href="/terms" className="footer-link">Terms of Service</a>
              </div>
              <p className="footer-copyright">© GAINOVA 2025. All rights reserved.</p>
            </div>
          </div>

          <div className="footer-section footer-right">
            <h3 className="footer-section-title">Follow</h3>
            <div className="footer-icons-group">
              {rightIcons.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-icon"
                  aria-label={link.label}
                  style={{ '--icon-color': link.color }}
                >
                  {link.icon}
                  <span className="icon-label">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="footer-mobile">
          <div
            className="footer-logo-center"
            onClick={() => {
              const hero = document.getElementById("home");
              if (hero) hero.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <img
              src={isLightMode ? LogoDark : LogoLight}
              alt="GAINOVA Logo"
              width={150}
              height={60}
              className="footer-logo"
            />
            <p className="footer-tagline">Global AI Network for Open Virtual Advancement</p>
          </div>

          <div className="footer-icons-mobile">
            {[...leftIcons, ...rightIcons].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon"
                aria-label={link.label}
                style={{ '--icon-color': link.color }}
              >
                {link.icon}
              </a>
            ))}
          </div>

          <div className="footer-links">
            <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
            <span className="footer-separator">|</span>
            <a href="/terms" className="footer-link">Terms of Service</a>
          </div>
          <p className="footer-copyright">© GAINOVA 2025. All rights reserved.</p>
        </div>
      </div>
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </footer>
  );
});

ContactUs.displayName = "ContactUs"

export default ContactUs;