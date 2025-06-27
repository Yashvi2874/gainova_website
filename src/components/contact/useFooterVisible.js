import { useEffect, useState } from "react";

export default function useFooterVisible(footerRef) {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [footerRef]);

  return footerVisible;
}