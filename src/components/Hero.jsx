import React from "react";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero">
      <div className="hero-left">
        <div className="hero-portfolio-tag">PORTFOLIO · 2026 · INDONESIA</div>

        <h1 className="hero-title">
          Precision in <br />
          <span className="hero-title-line">
            Every <span className="underline-cut">Cut.</span>
          </span>
        </h1>

        <p className="hero-subtitle">— CNC PROGRAMMER & PRODUCT DESIGNER</p>

        <p className="hero-description">
          Crafting efficient toolpaths and production-ready programs for
          furniture, joinery, and precision components.
        </p>

        <div className="hero-buttons">
          <button
            className="btn-primary"
            onClick={() => scrollToSection("work")}
          >
            View Projects
          </button>
          <button
            className="btn-secondary"
            onClick={() => scrollToSection("contact")}
          >
            Start a project
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">8+</span>
            <span className="stat-label">YEARS EXPERIENCE</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">120+</span>
            <span className="stat-label">PROJECTS DELIVERED</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">15+</span>
            <span className="stat-label">MACHINES PROGRAMMED</span>
          </div>
        </div>
      </div>

      <div className="cad-box">
        <div className="cad-tolerance">Tolerance ±0.05mm</div>
        <div className="cad-code">DWG-001 / ISOMETRIC</div>
        <div className="cad-drawing">
          <div className="drawing-box">
            <div className="drawing-grid">
              <div className="drawing-line-h"></div>
              <div className="drawing-line-v"></div>
            </div>
            <div className="drawing-label">ISOMETRIC VIEW</div>
            <div className="drawing-details">
              <span>MAT: OAK</span>
              <span>SCALE: 1:1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
