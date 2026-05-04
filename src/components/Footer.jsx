import React, { useContext } from "react";
import { ThemeContext } from "../App";
import { useSiteSettings } from "../hooks/useSupabase";

const Footer = () => {
  const { settings, loading } = useSiteSettings();
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

  if (loading) {
    return (
      <footer className="footer">
        <div style={{ textAlign: "center", padding: "40px" }}>Loading footer...</div>
      </footer>
    );
  }

  // Data dari database dengan fallback
  const footerName = settings?.footer_name || "Bima Yufianto";
  const footerTitle = settings?.footer_title || "CNC PROGRAMMER & PRODUCT DESIGNER";
  const footerBio = settings?.footer_bio || "Precision CNC programming, toolpath optimization and production-ready digital fabrication — built from Indonesia.";
  const email = settings?.email || "hirobima28@gmail.com";
  const whatsapp = settings?.whatsapp || "+62 895 0592 0370";
  const whatsappRaw = settings?.whatsapp_raw || "6289505920370";
  const footerCopyright = settings?.footer_copyright || "© 2026 BIMA YUFIANTO. ALL RIGHTS RESERVED.";
  const footerCredits = settings?.footer_credits || "BUILT WITH PRECISION - V1.0";

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 - Info (dinamis dari CMS) */}
        <div className="footer-col">
          <div className="footer-name">{footerName}</div>
          <div className="footer-title">{footerTitle}</div>
          <div className="footer-bio">{footerBio}</div>
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
              <button onClick={() => scrollToSection("contact")}>Contact</button>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact Info (dinamis dari CMS) */}
        <div className="footer-col">
          <div className="footer-nav-title">CONTACT</div>
          <ul className="footer-nav-list">
            <li>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>
              <a href={`https://wa.me/${whatsappRaw}`}>{whatsapp}</a>
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

      {/* Bottom Bar (dinamis dari CMS) */}
      <div className="footer-bottom">
        <div className="footer-copyright">{footerCopyright}</div>
        <div className="footer-credits">
          <span>{footerCredits}</span>
          <button onClick={scrollToTop} className="back-to-top">
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;