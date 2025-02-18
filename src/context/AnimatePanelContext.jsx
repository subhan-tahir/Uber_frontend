import { createContext, useState, useEffect, useRef } from "react";
import gsap from "gsap";

export const AnimatePanelProvider = createContext();

const AnimatePanelContext = ({ children }) => {
  const [activePanel, setActivePanel] = useState(null); // Stores which panel is active
  const panelRefs = {
    topPanel: useRef(null),
    vehiclePanel: useRef(null),
    confirmPanel: useRef(null),
    lookingPanel: useRef(null),
  };

  useEffect(() => {
    Object.entries(panelRefs).forEach(([key, ref]) => {
      if (!ref.current) return;

      if (key === "topPanel") {
        // Animate height for topPanel
        gsap.to(ref.current, {
          height: activePanel === "topPanel" ? "50%" : "0%",
          padding: activePanel === "topPanel" ? 24 : 0,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        // Animate translateY for other panels
        gsap.to(ref.current, {
          translateY: activePanel === key ? "0%" : "100%",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });
  }, [activePanel]);

  return (
    <AnimatePanelProvider.Provider value={{ setActivePanel, panelRefs,activePanel }}>
      {children}
    </AnimatePanelProvider.Provider>
  );
};
export default AnimatePanelContext
