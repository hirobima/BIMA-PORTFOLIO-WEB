import React, { useState, useEffect } from 'react';
import { useProjects } from '../hooks/useSupabase';

const ProjectGallery = () => {
  const { projects, loading, error } = useProjects();
  const [filter, setFilter] = useState("All Work");
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = ["All Work", "CNC Router", "3 Axis", "4 Axis Rotary", "5 Axis", "Furniture Design"];

  const filteredProjects = filter === "All Work" 
    ? projects 
    : projects.filter(p => p.category === filter);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

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
          <div key={project.id} className="project-card" onClick={() => setSelectedProject(project)}>
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
            </div>
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description?.substring(0, 80)}...</p>
              <p className="project-software">{project.software}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedProject && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={(e) => e.target === e.currentTarget && setSelectedProject(null)}
        >
          <div style={{
            backgroundColor: "#110f0e",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            maxWidth: "500px",
            width: "100%",
            maxHeight: "80vh",
            overflowY: "auto",
            position: "relative",
          }}>
            <button 
              onClick={() => setSelectedProject(null)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "32px",
                height: "32px",
                backgroundColor: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                color: "#fff",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              ✕
            </button>

            {selectedProject.image_url && (
              <div style={{ width: "100%", height: "220px", overflow: "hidden", borderRadius: "20px 20px 0 0" }}>
                <img src={selectedProject.image_url} alt={selectedProject.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            )}

            <div style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#98a869", backgroundColor: "rgba(152,168,105,0.15)", padding: "4px 10px", borderRadius: "20px" }}>
                  {selectedProject.code}
                </span>
                <span style={{ fontSize: "10px", color: "#888", backgroundColor: "#1a1a1a", padding: "4px 10px", borderRadius: "20px" }}>
                  {selectedProject.category}
                </span>
              </div>

              <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#fff", marginBottom: "16px" }}>
                {selectedProject.title}
              </h2>

              <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.6", marginBottom: "20px" }}>
                {selectedProject.description}
              </p>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginBottom: "16px" }}></div>

              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "10px", color: "#98a869", letterSpacing: "1px", marginBottom: "6px" }}>SOFTWARE</div>
                <div style={{ fontSize: "13px", color: "#ccc" }}>{selectedProject.software}</div>
              </div>

              {selectedProject.tags && selectedProject.tags.length > 0 && (
                <div>
                  <div style={{ fontSize: "10px", color: "#98a869", letterSpacing: "1px", marginBottom: "8px" }}>TAGS</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {selectedProject.tags.map((tag, i) => (
                      <span key={i} style={{ fontSize: "10px", color: "#888", backgroundColor: "#1a1a1a", padding: "4px 10px", borderRadius: "20px" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;