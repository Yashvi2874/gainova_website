import React, { forwardRef, useEffect, useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube, FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";
import LogoLight from "../../assets/Logo_light.svg";
import LogoDark from "../../assets/Logo_dark.svg";
import "./ContactUs.css";

const email = "hello@gainova.com";
const phone = "+91 93164 11714";
const linkedin = "https://linkedin.com/company/gainova"; // <-- update to your real LinkedIn

const ContactUs = forwardRef((props, ref) => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const updateMode = () => {
      setIsLightMode(document.body.classList.contains("light-mode"));
    };

    updateMode();

    // Listen for class changes on body
    const observer = new MutationObserver(updateMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const leftIcons = [
    {
      href: linkedin,
      icon: <FaLinkedin />,
      label: "LinkedIn",
    },
    {
      href: `mailto:${email}`,
      icon: <FaEnvelope />,
      label: "Email",
    },
    {
      href: `tel:${phone.replace(/\s/g, "")}`,
      icon: <FaPhone />,
      label: "Phone",
    },
  ];
  const rightIcons = [
    {
      href: "https://instagram.com/gainova", // <-- update to your real Instagram
      icon: <FaInstagram />,
      label: "Instagram",
    },
    {
      href: "https://youtube.com/@gainova", // <-- update to your real YouTube
      icon: <FaYoutube />,
      label: "YouTube",
    },
    {
      href: "https://twitter.com/gainova", // <-- update to your real Twitter/X
      icon: <FaTwitter />,
      label: "Twitter",
    },
  ];

  return (
    <footer ref={ref} className="footer">
      {/* Desktop/Tablet: show groups */}
      <div className="footer-icons-row">
        <div className="footer-icons-group">
          {leftIcons.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
        <div
        className="footer-logo-center"
        style={{ cursor: "pointer", flexDirection: "column" }}
        onClick={() => {
          const hero = document.getElementById("home");
          if (hero) hero.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <img
          src={isLightMode ? LogoDark : LogoLight}
          alt="Gainova Logo"
          className="footer-logo"
        />
        <p className="footer-text">©GAINOVA 2025. All rights reserved.</p>
      </div>
        <div className="footer-icons-group">
          {rightIcons.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      {/* Mobile: show all icons in one row */}
      <div className="footer-icons-row-mobile">
        <div
        className="footer-logo-center"
        style={{ cursor: "pointer", flexDirection: "column" }}
        onClick={() => {
          const hero = document.getElementById("home");
          if (hero) hero.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <img
          src={isLightMode ? LogoDark : LogoLight}
          alt="Gainova Logo"
          className="footer-logo"
        />
        <p className="footer-text">©GAINOVA 2025. All rights reserved.</p>
      </div>
      <div className="footer-icons-group-mobile">
        {[...leftIcons, ...rightIcons].map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>
      </div>
    </footer>
  );
});

export default ContactUs;
