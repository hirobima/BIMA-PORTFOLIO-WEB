import React, { useState, useEffect } from "react";

const ProjectGallery = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All Work");
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const repo = "hirobima/BIMA-PORTFOLIO-WEB";
        const apiUrl = `https://api.github.com/repos/${repo}/contents/src/content/projects`;
        
        const response = await fetch(apiUrl);
        const files = await response.json();
        
        const jsonFiles = files.filter(file => file.name.endsWith('.json') && file.name !== '.gitkeep');
        
        const projectsData = await Promise.all(
          jsonFiles.map(async (file) => {
            const contentResponse = await fetch(file.download_url);
            const data = await contentResponse.json();
            return {
              id: file.name.replace('.json', ''),
              ...data
            };
          })
        );
        
        projectsData.sort((a, b) => (a.order || 0) - (b.order || 0));
        setProjects(projectsData);
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

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  if (loading) {
    return (
      <section id="work" style={{ padding: "60px 0" }}>
        <div className="text-center" style={{ padding: "40px", color: "var(--text-secondary)" }}>
          Loading projects...
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
              {project.image ? (
                <img 
                  src={project.image} 
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

      {/* MODAL POPUP - Full Details */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
              ✕
            </button>
            
            {selectedProject.image && (
              <div className="modal-image">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
            )}
            
            <div className="modal-body">
              <div className="modal-header">
                <span className="modal-code">{selectedProject.code || selectedProject.id}</span>
                <span className="modal-category">{selectedProject.category}</span>
              </div>
              
              <h2 className="modal-title">{selectedProject.title}</h2>
              
              <p className="modal-description">{selectedProject.description}</p>
              
              <div className="modal-details">
                <div className="modal-detail-item">
                  <span className="modal-detail-label">Software</span>
                  <span className="modal-detail-value">{selectedProject.software}</span>
                </div>
                
                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <div className="modal-detail-item">
                    <span className="modal-detail-label">Tags</span>
                    <div className="modal-tags">
                      {selectedProject.tags.map((tag, i) => (
                        <span key={i} className="modal-tag">{tag}</span>
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
