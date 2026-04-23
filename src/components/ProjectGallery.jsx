import React, { useState, useEffect } from "react";

const ProjectGallery = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All Work");
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects from GitHub raw content
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/hirobima/BIMA-PORTFOLIO-WEB/contents/src/content/projects');
        const files = await response.json();
        
        const projectData = await Promise.all(
          files.map(async (file) => {
            const contentResponse = await fetch(file.download_url);
            const data = await contentResponse.json();
            return { id: file.name.replace('.json', ''), ...data };
          })
        );
        
        setProjects(projectData.sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const filters = ["All Work", "CNC Router", "3 Axis", "4 Axis Rotary", "5 Axis", "Furniture Design"];

  const filteredProjects = filter === "All Work" 
    ? projects 
    : projects.filter(p => p.category === filter);

  if (loading) {
    return <div className="text-center" style={{ padding: "40px", color: "var(--text-secondary)" }}>Loading projects...</div>;
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
              {project.image ? (
                <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span className="project-code">{project.code}</span>
              )}
              <span className="project-category">{project.category}</span>
            </div>
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <p className="project-software">{project.software}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "24px", marginBottom: "12px" }}>{selectedProject.title}</h3>
            <p style={{ color: "#888", marginBottom: "16px" }}>{selectedProject.description}</p>
            <p style={{ fontSize: "12px", marginBottom: "8px" }}>Software: {selectedProject.software}</p>
            <p style={{ fontSize: "12px", marginBottom: "24px" }}>Category: {selectedProject.category}</p>
            {selectedProject.tags && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} style={{ fontSize: "10px", background: "#333", padding: "2px 8px", borderRadius: "12px" }}>{tag}</span>
                ))}
              </div>
            )}
            <button className="modal-close" onClick={() => setSelectedProject(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;
