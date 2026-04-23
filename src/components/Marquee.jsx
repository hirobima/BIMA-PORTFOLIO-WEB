import React from "react";

const Marquee = () => {
  const items = [
    "Furniture",
    "Joinery",
    "Nesting",
    "ZW3D",
    "Aspire",
    "VCarve",
    "Fusion 360",
    "PowerMill",
    "5-Axis",
    "CNC Router",
    "SolidWorks",
    "Rhino",
  ];

  // Duplicate items for seamless loop
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="marquee-container">
      <div className="marquee">
        {marqueeItems.map((item, index) => (
          <div key={index} className="marquee-item">
            <span className="cross">✕</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
