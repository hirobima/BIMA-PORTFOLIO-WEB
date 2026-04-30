import React from 'react';
import { useSkills } from '../hooks/useSupabase';

const Skills = () => {
  const { skills, loading } = useSkills();

  if (loading) {
    return (
      <section id="skills" style={{ padding: "80px 0", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ textAlign: "center", color: "#888" }}>Loading skills...</div>
      </section>
    );
  }

  return (
    <section id="skills" style={{ padding: "80px 0", borderTop: "1px solid #1a1a1a" }}>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ fontSize: "14px", color: "#666666", marginBottom: "8px" }}>04 / CAPABILITIES</div>
        <h2 style={{ fontSize: "48px", fontWeight: "700", marginBottom: "16px" }}>Skills & Process</h2>
        <p style={{ color: "#888888", maxWidth: "600px", lineHeight: "1.5" }}>
          A focused toolkit built around production reliability, tight tolerances and sustainable manufacturing rhythms.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
        <div>
          {skills.map((skill, idx) => (
            <div key={skill.id} style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
                <span style={{ fontSize: "20px", fontFamily: "monospace", color: "#444" }}>
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>{skill.name}</h3>
                  <p style={{ fontSize: "12px", color: "#666", lineHeight: "1.4" }}>{skill.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          {skills.map((skill) => (
            <div key={skill.id} style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "8px" }}>
                <span style={{ color: "#999" }}>{skill.name}</span>
                <span style={{ color: "#666" }}>{skill.percentage}%</span>
              </div>
              <div style={{ height: "3px", background: "#1a1a1a", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${skill.percentage}%`, background: "#ffffff", borderRadius: "3px" }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;