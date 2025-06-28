import React, { useEffect, useState } from "react";
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

const TeamsPage = () => {
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
      <Navbar
        sections={[]}
        activeSection="teams"
        isLightMode={isLightMode}
        toggleLightMode={() => setIsLightMode((v) => !v)}
      />

      <div>
        <h1 align="center" className="text-[#ff914d]">Guidance</h1>

        <div className="flex flex-row justify-center items-center gap-10 max-md:flex-col items-center pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative group rounded-full w-60 h-60">
              <img
                className="rounded-full w-full h-full object-cover"
                src="https://media.licdn.com/dms/image/v2/D4D03AQEf3-o5dA_Gpw/profile-displayphoto-shrink_200_200/B4DZdO.WFFGgAY-/0/1749376657194?e=1756339200&v=beta&t=INFp24JqaxJL-BA8w00LTZ9DXqHBUSCVXvJpf4B_oTE"
                alt="..."
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold hidden group-hover:flex rounded-full">
                Hi
              </div>
            </div>
            <h3 className="text-2xl font-bold">Vinayak Pai</h3>
            <p className="text-muted">Faculty Advisor</p>
          </div>

          <TeamMember 
          img="https://media.licdn.com/dms/image/v2/D4D03AQEf3-o5dA_Gpw/profile-displayphoto-shrink_200_200/B4DZdO.WFFGgAY-/0/1749376657194?e=1756339200&v=beta&t=INFp24JqaxJL-BA8w00LTZ9DXqHBUSCVXvJpf4B_oTE"
          name="Vinayak Pai"
          role="Student"
          />
        </div>
      </div>
</div>
  );
};

export default TeamsPage;
