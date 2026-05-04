import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../App";
import { useSiteSettings } from "../hooks/useSupabase";

const Header = () => {
  const { settings, loading } = useSiteSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const gridPattern = document.querySelector(".grid-pattern");
      const gridGlow = document.querySelector(".grid-glow");

      if (gridPattern) {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollY / maxScroll, 1);
        const newOpacity = Math.max(0, 1 - progress * 0.9);
        gridPattern.style.opacity = newOpacity;
      }

      if (gridGlow) {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollY / maxScroll, 1);
        const newOpacity = Math.max(0, 0.1 - progress * 0.1);
        gridGlow.style.opacity = newOpacity;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Data dari database dengan fallback
  const profileName = settings?.profile_name || "Bima Yufianto";
  const profileRole = settings?.profile_role || "CNC / CAM PROGRAMMER";

  if (loading) {
    return (
      <header className="header" style={{ background: "transparent" }}>
        <div className="header-content">
          <div className="logo">
            <span className="logo-name">Loading...</span>
            <span className="logo-title">...</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <div className="header-grid-bg">
        <div className="grid-pattern"></div>
        <div className="grid-glow"></div>
        <div className="grid-fade"></div>
      </div>

      <header
        className={`header`}
        style={{
          background: isScrolled
            ? theme === "light"
              ? "rgba(245,245,245,0.95)"
              : "rgba(17,15,14,0.95)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
        }}
      >
        <div className="header-content">
          {/* Logo - KIRI (dinamis dari CMS) */}
          <div className="logo">
            <span className="logo-name">{profileName}</span>
            <span className="logo-title">{profileRole}</span>
          </div>

          {/* Desktop Navigation - TENGAH */}
          <div className="desktop-nav">
            <div className="nav-links-center">
              <button onClick={() => scrollToSection("work")}>
                <span className="nav-number">01</span>
                <span className="nav-text">Work</span>
              </button>
              <button onClick={() => scrollToSection("about")}>
                <span className="nav-number">02</span>
                <span className="nav-text">About</span>
              </button>
              <button onClick={() => scrollToSection("skills")}>
                <span className="nav-number">03</span>
                <span className="nav-text">Skills</span>
              </button>
              <button onClick={() => scrollToSection("contact")}>
                <span className="nav-number">04</span>
                <span className="nav-text">Contact</span>
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="nav-right">
            <label className="theme-switch">
              <input
                type="checkbox"
                checked={theme === "light"}
                onChange={toggleTheme}
              />
              <span className="slider">
                <span className="slider-icon sun">☀️</span>
                <span className="slider-icon moon">🌙</span>
              </span>
            </label>

            <button
              className="lets-talk-btn desktop-only"
              onClick={() => scrollToSection("contact")}
            >
              Let's Talk
            </button>

            <button
              className={`hamburger-btn ${isMobileMenuOpen ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-content">
            <button onClick={() => scrollToSection("work")}>
              <span className="mobile-nav-number">01</span>
              <span className="mobile-nav-text">Work</span>
            </button>
            <button onClick={() => scrollToSection("about")}>
              <span className="mobile-nav-number">02</span>
              <span className="mobile-nav-text">About</span>
            </button>
            <button onClick={() => scrollToSection("skills")}>
              <span className="mobile-nav-number">03</span>
              <span className="mobile-nav-text">Skills</span>
            </button>
            <button onClick={() => scrollToSection("contact")}>
              <span className="mobile-nav-number">04</span>
              <span className="mobile-nav-text">Contact</span>
            </button>
            <button
              className="mobile-lets-talk"
              onClick={() => scrollToSection("contact")}
            >
              Let's Talk
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;