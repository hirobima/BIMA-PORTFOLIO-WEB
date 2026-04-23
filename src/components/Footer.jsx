import React, { useContext } from "react";
import { ThemeContext } from "../App";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 - Info */}
        <div className="footer-col">
          <div className="footer-name">Bima Yufianto</div>
          <div className="footer-title">CNC PROGRAMMER & PRODUCT DESIGNER</div>
          <div className="footer-bio">
            Precision CNC programming, toolpath optimization and
            production-ready digital fabrication — built from Indonesia.
          </div>
        </div>

        {/* Column 2 - Navigation */}
        <div className="footer-col">
          <div className="footer-nav-title">NAVIGATE</div>
          <ul className="footer-nav-list">
            <li>
              <button onClick={() => scrollToSection("work")}>Work</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("about")}>About</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("skills")}>Skills</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("contact")}>
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3 - Elsewhere */}
        <div className="footer-col">
          <div className="footer-nav-title">ELSEWHERE</div>
          <ul className="footer-nav-list">
            <li>
              <a href="mailto:bima.yufianto@cncprogrammer.com">
                bima.yufianto@cncprogrammer.com
              </a>
            </li>
            <li>
              <a href="https://wa.me/6281234567890">+62 812 3456 7890</a>
            </li>
            <li>
              <button onClick={() => window.open("#", "_blank")}>Fiverr</button>
            </li>
            <li>
              <button onClick={() => window.open("#", "_blank")}>Upwork</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-copyright">
          © 2026 BIMA YUFIANTO. ALL RIGHTS RESERVED.
        </div>
        <div className="footer-credits">
          <span>BUILT WITH PRECISION - V1.0</span>
          <button onClick={scrollToTop} className="back-to-top">
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
