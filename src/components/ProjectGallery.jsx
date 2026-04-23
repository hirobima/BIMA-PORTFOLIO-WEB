import React, { useState } from "react";

const projects = [
  {
    id: 1,
    code: "CNC-01",
    title: "Furniture CNC Routing",
    description: "Optimized nested toolpaths for plywood cabinet production.",
    category: "CNC Router",
    software: "ZW3D / Aspire",
    tags: ["Production", "Nesting"],
  },
  {
    id: 2,
    code: "CNC-02",
    title: "Complex Joinery Toolpath",
    description: "Dovetail and mortise joinery programmed on a 4-axis router.",
    category: "4 Axis Rotary",
    software: "ZW3D / Fusion 360",
    tags: ["Joinery", "4-Axis"],
  },
  {
    id: 3,
    code: "CNC-03",
    title: "5-Axis Sculpted Chair Shell",
    description: "Continuous 5-axis surfacing for ergonomic seating form.",
    category: "5 Axis",
    software: "ZW3D / PowerMill",
    tags: ["5-Axis", "Surfacing"],
  },
  {
    id: 4,
    code: "CNC-04",
    title: "Engraved Panel Series",
    description: "V-bit lettering and relief engraving on MDF panels.",
    category: "3 Axis",
    software: "Aspire / VCarve",
    tags: ["Engraving", "3-Axis"],
  },
  {
    id: 5,
    code: "CNC-05",
    title: "Rotary Table Leg",
    description: "Turned and fluted table leg on 4-axis rotary setup.",
    category: "4 Axis Rotary",
    software: "ZW3D / Aspire",
    tags: ["Rotary", "Furniture"],
  },
  {
    id: 6,
    code: "CNC-06",
    title: "Modular Shelving System",
    description: "Parametric shelving designed for flat-pack CNC production.",
    category: "Furniture Design",
    software: "ZW3D / Fusion 360",
    tags: ["Flat-pack", "Parametric"],
  },
  {
    id: 7,
    code: "CNC-07",
    title: "Aluminum Jig Plate",
    description: "Precision fixture plate milled on 3-axis aluminum setup.",
    category: "Precision",
    software: "ZW3D / Aspire",
    tags: ["Metal", "Fixturing"],
  },
  {
    id: 8,
    code: "CNC-08",
    title: "Cabinet Door Program",
    description: "Batch production program for shaker-style cabinet doors.",
    category: "CNC Router",
    software: "Aspire / ZW3D",
    tags: ["Batch", "Cabinetry"],
  },
];

const ProjectGallery = () => {
  const [filter, setFilter] = useState("All Work");
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    "All Work",
    "CNC Router",
    "3 Axis",
    "4 Axis Rotary",
    "5 Axis",
    "Furniture Design",
  ];

  const filteredProjects =
    filter === "All Work"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="work" style={{ padding: "80px 0" }}>
      {/* Section Header */}
      <div style={{ marginBottom: "48px" }}>
        <div
          style={{ fontSize: "14px", color: "#666666", marginBottom: "8px" }}
        >
          02 / SELECTED WORK
        </div>
        <h2
          style={{ fontSize: "48px", fontWeight: "700", marginBottom: "16px" }}
        >
          Project Gallery
        </h2>
        <p style={{ color: "#888888", maxWidth: "600px", lineHeight: "1.5" }}>
          A curated set of CNC programs, toolpaths and fabrication workflows —
          organized by machining strategy and application.
        </p>
        <div style={{ fontSize: "12px", color: "#444444", marginTop: "8px" }}>
          0{filteredProjects.length} OF 09 PROJECTS
        </div>
      </div>

      {/* Filter Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "40px",
          paddingBottom: "20px",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "8px 16px",
              background: filter === f ? "#ffffff" : "transparent",
              color: filter === f ? "#000000" : "#888888",
              border: "none",
              borderRadius: "4px",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
          gap: "24px",
          marginBottom: "60px",
        }}
      >
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            style={{
              background: "rgba(17, 17, 17, 0.3)",
              border: "1px solid #1a1a1a",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#444")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#1a1a1a")
            }
          >
            {/* Project Image Area */}
            <div
              style={{
                height: "200px",
                background: "linear-gradient(135deg, #1a1a1a, #0a0a0a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontSize: "32px",
                  fontFamily: "monospace",
                  color: "#2a2a2a",
                }}
              >
                {project.code}
              </span>
              <span
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  fontSize: "10px",
                  padding: "4px 8px",
                  background: "rgba(0,0,0,0.6)",
                  borderRadius: "4px",
                  color: "#888",
                }}
              >
                {project.category}
              </span>
            </div>

            {/* Project Content */}
            <div style={{ padding: "20px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#fff",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#666",
                  lineHeight: "1.5",
                  marginBottom: "12px",
                }}
              >
                {project.description}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    color: "#444",
                    letterSpacing: "0.5px",
                  }}
                >
                  {project.software}
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: "9px",
                        color: "#555",
                        background: "#111",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "24px",
          paddingTop: "40px",
          borderTop: "1px solid #1a1a1a",
        }}
      >
        {[
          "CNC ROUTER",
          "ZW3D",
          "ASPIRE",
          "4AXIS ROTARY",
          "FUSION 360",
          "5AXIS",
          "POWERMILL",
          "VCARVE",
        ].map((tech, i) => (
          <span
            key={i}
            style={{
              fontSize: "11px",
              color: "#555",
              letterSpacing: "1px",
            }}
          >
            {tech}
          </span>
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
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "16px",
              maxWidth: "500px",
              width: "100%",
              padding: "32px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: "24px", marginBottom: "12px" }}>
              {selectedProject.title}
            </h3>
            <p
              style={{ color: "#888", marginBottom: "16px", lineHeight: "1.5" }}
            >
              {selectedProject.description}
            </p>
            <div style={{ marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", color: "#666" }}>
                Software:{" "}
              </span>
              <span style={{ fontSize: "12px", color: "#aaa" }}>
                {selectedProject.software}
              </span>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <span style={{ fontSize: "12px", color: "#666" }}>
                Category:{" "}
              </span>
              <span style={{ fontSize: "12px", color: "#aaa" }}>
                {selectedProject.category}
              </span>
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                width: "100%",
                padding: "12px",
                background: "#fff",
                color: "#000",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;
