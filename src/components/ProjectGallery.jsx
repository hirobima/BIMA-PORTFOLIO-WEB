import React, { useState, useEffect } from 'react';
import { useProjects } from '../hooks/useSupabase';

const ProjectGallery = () => {
  const { projects, loading, error } = useProjects();
  const [filter, setFilter] = useState("All Work");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filters = ["All Work", "CNC Router", "3 Axis", "4 Axis Rotary", "5 Axis", "Furniture Design"];

  const filteredProjects = filter === "All Work" 
    ? projects 
    : projects.filter(p => p.category === filter);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setCurrentImageIndex(0);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const openProject = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.gallery_images && selectedProject.gallery_images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev + 1 >= selectedProject.gallery_images.length ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.gallery_images && selectedProject.gallery_images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev - 1 < 0 ? selectedProject.gallery_images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <section id="work" style={{ padding: "60px 0" }}>
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
          <div style={{ display: "inline-block", width: "30px", height: "30px", border: "2px solid #98a869", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
          <p className="mt-2">Loading projects...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </section>
    );
  }

  if (error) {
    return (
      <section id="work" style={{ padding: "60px 0" }}>
        <div style={{ textAlign: "center", padding: "40px", color: "#ff4444" }}>
          Error loading projects: {error}
        </div>
      </section>
    );
  }

  return (
    <section id="work" style={{ padding: "60px 0" }}>
      <div className="section-header">
        <div className="section-number">02 / SELECTED WORK</div>
        <h2 className="section-title">Project Gallery</h2>
        <p className="section-description">
          A curated set of CNC programs, toolpaths and fabrication workflows — organized by machining strategy and application.
        </p>
        <div className="project-count">{filteredProjects.length} PROJECTS</div>
      </div>

      <div className="filters">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? 'filter-active' : ''}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card" onClick={() => openProject(project)}>
            <div className="project-image">
              {project.image_url ? (
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              ) : (
                <span className="project-code">{project.code || project.id}</span>
              )}
              <span className="project-category">{project.category || "Uncategorized"}</span>
              {project.gallery_images && project.gallery_images.length > 0 && (
                <span className="gallery-badge">
                  📸 {project.gallery_images.length}
                </span>
              )}
            </div>
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description?.substring(0, 80)}...</p>
              <p className="project-software">{project.software}</p>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP MODAL DENGAN GALLERY */}
      {selectedProject && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedProject(null);
              setCurrentImageIndex(0);
            }
          }}
        >
          <div style={{
            backgroundColor: "#110f0e",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            maxWidth: "900px",
            width: "100%",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}>
            
            {/* Tombol Close */}
            <button 
              onClick={() => {
                setSelectedProject(null);
                setCurrentImageIndex(0);
              }}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "40px",
                height: "40px",
                backgroundColor: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                color: "#fff",
                fontSize: "20px",
                cursor: "pointer",
                zIndex: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#98a869";
                e.target.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(0,0,0,0.7)";
                e.target.style.color = "#fff";
              }}
            >
              ✕
            </button>

            {/* Area Gambar */}
            <div style={{
              position: "relative",
              backgroundColor: "#000",
              minHeight: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              
              <img 
                src={selectedProject.gallery_images && selectedProject.gallery_images[currentImageIndex] 
                  ? selectedProject.gallery_images[currentImageIndex] 
                  : selectedProject.image_url}
                alt={selectedProject.title}
                style={{
                  width: "100%",
                  maxHeight: "500px",
                  objectFit: "contain",
                }}
              />

              {/* Tombol Navigasi */}
              {selectedProject.gallery_images && selectedProject.gallery_images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "44px",
                      height: "44px",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "50%",
                      color: "#fff",
                      fontSize: "24px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s",
                      zIndex: 10,
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#98a869"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(0,0,0,0.6)"}
                  >
                    ‹
                  </button>
                  <button 
                    onClick={nextImage}
                    style={{
                      position: "absolute",
                      right: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "44px",
                      height: "44px",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "50%",
                      color: "#fff",
                      fontSize: "24px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s",
                      zIndex: 10,
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#98a869"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(0,0,0,0.6)"}
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Counter Gambar */}
            {selectedProject.gallery_images && selectedProject.gallery_images.length > 1 && (
              <div style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(0,0,0,0.7)",
                padding: "6px 14px",
                borderRadius: "30px",
                fontSize: "12px",
                color: "#fff",
                zIndex: 15,
              }}>
                {currentImageIndex + 1} / {selectedProject.gallery_images.length}
              </div>
            )}

            {/* Thumbnail Strip */}
            {selectedProject.gallery_images && selectedProject.gallery_images.length > 1 && (
              <div style={{
                display: "flex",
                gap: "10px",
                padding: "16px",
                overflowX: "auto",
                backgroundColor: "#1a1a1a",
                borderTop: "1px solid #333",
              }}>
                {selectedProject.gallery_images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: currentImageIndex === idx ? "2px solid #98a869" : "2px solid transparent",
                      opacity: currentImageIndex === idx ? 1 : 0.6,
                      transition: "all 0.2s",
                    }}
                  >
                    <img 
                      src={img} 
                      alt={`Thumb ${idx + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Info Project */}
            <div style={{
              padding: "24px",
              overflowY: "auto",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#98a869", backgroundColor: "rgba(152,168,105,0.15)", padding: "4px 10px", borderRadius: "20px" }}>
                  {selectedProject.code}
                </span>
                <span style={{ fontSize: "10px", color: "#888", backgroundColor: "#1a1a1a", padding: "4px 10px", borderRadius: "20px" }}>
                  {selectedProject.category}
                </span>
              </div>

              <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#fff", marginBottom: "16px" }}>
                {selectedProject.title}
              </h2>

              <p style={{ fontSize: "14px", color: "#aaa", lineHeight: "1.6", marginBottom: "24px" }}>
                {selectedProject.description}
              </p>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginBottom: "20px", paddingTop: "20px" }}>
                
                {selectedProject.software && (
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "10px", color: "#98a869", letterSpacing: "1px", marginBottom: "8px" }}>🛠️ SOFTWARE</div>
                    <div style={{ fontSize: "14px", color: "#ccc" }}>{selectedProject.software}</div>
                  </div>
                )}

                {selectedProject.tools && selectedProject.tools.length > 0 && (
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "10px", color: "#98a869", letterSpacing: "1px", marginBottom: "8px" }}>🔧 TOOLS</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {selectedProject.tools.map((tool, i) => (
                        <span key={i} style={{ fontSize: "11px", color: "#888", backgroundColor: "#1a1a1a", padding: "4px 10px", borderRadius: "20px" }}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <div>
                    <div style={{ fontSize: "10px", color: "#98a869", letterSpacing: "1px", marginBottom: "8px" }}>🏷️ TAGS</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {selectedProject.tags.map((tag, i) => (
                        <span key={i} style={{ fontSize: "11px", color: "#888", backgroundColor: "#1a1a1a", padding: "4px 10px", borderRadius: "20px" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;