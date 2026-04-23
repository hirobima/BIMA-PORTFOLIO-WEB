import React from "react";

const Skills = () => {
  const skillsList = [
    {
      id: "01",
      title: "CNC Programming",
      desc: "Post-processed G-code for routers and machining centers.",
      percentage: 95,
    },
    {
      id: "02",
      title: "CAD / CAM Modeling",
      desc: "Parametric modeling and manufacturing-ready translations.",
      percentage: 92,
    },
    {
      id: "03",
      title: "Toolpath Optimization",
      desc: "Feed, speed and strategy tuning for cycle and surface quality.",
      percentage: 90,
    },
    {
      id: "04",
      title: "Furniture Engineering",
      desc: "Joinery, nesting, fixturing and batch production workflows.",
      percentage: 88,
    },
    {
      id: "05",
      title: "Multi-Axis Machining",
      desc: "3, 4-axis rotary and continuous 5-axis programming.",
      percentage: 90,
    },
    {
      id: "06",
      title: "Production Workflow",
      desc: "Design-to-machine pipelines that scale from 1 to 1000.",
      percentage: 85,
    },
  ];

  const skillBars = [
    { label: "CNC Programming", percentage: 95 },
    { label: "CAD / CAM Modeling", percentage: 92 },
    { label: "Toolpath Optimization", percentage: 90 },
    { label: "Furniture Design Engineering", percentage: 88 },
    { label: "3 / 4 / 5 Axis Machining", percentage: 90 },
    { label: "Production Workflow", percentage: 85 },
  ];

  return (
    <section
      id="skills"
      style={{ padding: "80px 0", borderTop: "1px solid #1a1a1a" }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: "48px" }}>
        <div
          style={{ fontSize: "14px", color: "#666666", marginBottom: "8px" }}
        >
          04 / CAPABILITIES
        </div>
        <h2
          style={{ fontSize: "48px", fontWeight: "700", marginBottom: "16px" }}
        >
          Skills & Process
        </h2>
        <p style={{ color: "#888888", maxWidth: "600px", lineHeight: "1.5" }}>
          A focused toolkit built around production reliability, tight
          tolerances and sustainable manufacturing rhythms.
        </p>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}
      >
        {/* Left Column - Skills List */}
        <div>
          {skillsList.map((skill) => (
            <div key={skill.id} style={{ marginBottom: "32px" }}>
              <div
                style={{ display: "flex", gap: "16px", marginBottom: "12px" }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontFamily: "monospace",
                    color: "#444",
                  }}
                >
                  {skill.id}
                </span>
                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      marginBottom: "4px",
                    }}
                  >
                    {skill.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      lineHeight: "1.4",
                    }}
                  >
                    {skill.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Skill Bars */}
        <div>
          {skillBars.map((skill, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  marginBottom: "8px",
                }}
              >
                <span style={{ color: "#999" }}>{skill.label}</span>
                <span style={{ color: "#666" }}>{skill.percentage}%</span>
              </div>
              <div
                style={{
                  height: "3px",
                  background: "#1a1a1a",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${skill.percentage}%`,
                    background: "#ffffff",
                    borderRadius: "3px",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
