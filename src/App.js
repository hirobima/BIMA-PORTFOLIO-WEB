import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectGallery from "./components/ProjectGallery";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Marquee from "./components/Marquee";
import Admin from "./pages/Admin";

export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

function HomePage() {
  const { theme } = React.useContext(ThemeContext);
  
  return (
    <div className={`app ${theme === "light" ? "light-mode" : "dark-mode"}`}>
      <Header />
      <main className="container">
        <Hero />
        <Marquee />
        <ProjectGallery />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    return savedTheme || "dark";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;