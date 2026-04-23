import React from "react";

const About = () => {
  return (
    <section
      id="about"
      style={{ padding: "60px 0", borderTop: "1px solid var(--border-color)" }}
    >
      <div className="about-grid">
        {/* Left Column */}
        <div>
          <div className="section-number" style={{ textAlign: "left" }}>
            03 / ABOUT
          </div>
          <h2
            className="section-title"
            style={{ textAlign: "left", fontSize: "clamp(28px, 5vw, 48px)" }}
          >
            A quiet, precise <br />
            approach to fabrication.
          </h2>
        </div>

        {/* Right Column */}
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div className="about-detail">
              <div className="about-detail-label">BASED IN</div>
              <div className="about-detail-value">INDONESIA</div>
            </div>
            <div className="about-detail">
              <div className="about-detail-label">AVAILABILITY</div>
              <div className="about-detail-value">OPEN TO WORK</div>
            </div>
          </div>

          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.6",
              marginBottom: "20px",
              fontSize: "clamp(13px, 4vw, 15px)",
            }}
          >
            Experienced CNC programmer specializing in furniture production,
            precision cutting, and efficient toolpath strategies.
          </p>

          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.6",
              marginBottom: "24px",
              fontSize: "clamp(13px, 4vw, 15px)",
            }}
          >
            I translate CAD designs into reliable, optimized CNC programs — from
            3-axis routing to 5-axis complex joinery. My focus is on clean
            toolpaths, minimal waste, and production workflows that scale from
            prototype to series manufacturing.
          </p>

          <ul style={{ listStyle: "none", marginBottom: "32px" }}>
            <li
              style={{
                color: "var(--text-secondary)",
                fontSize: "clamp(12px, 3.5vw, 14px)",
                marginBottom: "10px",
                paddingLeft: "20px",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  color: "var(--accent-color)",
                }}
              >
                ✓
              </span>{" "}
              Production-ready toolpaths with optimized feeds and speeds
            </li>
            <li
              style={{
                color: "var(--text-secondary)",
                fontSize: "clamp(12px, 3.5vw, 14px)",
                marginBottom: "10px",
                paddingLeft: "20px",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  color: "var(--accent-color)",
                }}
              >
                ✓
              </span>{" "}
              Full pipeline from CAD model to post-processed G-code
            </li>
            <li
              style={{
                color: "var(--text-secondary)",
                fontSize: "clamp(12px, 3.5vw, 14px)",
                marginBottom: "10px",
                paddingLeft: "20px",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  color: "var(--accent-color)",
                }}
              >
                ✓
              </span>{" "}
              Experience across furniture, joinery and precision components
            </li>
            <li
              style={{
                color: "var(--text-secondary)",
                fontSize: "clamp(12px, 3.5vw, 14px)",
                marginBottom: "10px",
                paddingLeft: "20px",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  color: "var(--accent-color)",
                }}
              >
                ✓
              </span>{" "}
              Fluent in ZW3D, Aspire, VCarve, Fusion 360, and PowerMill
            </li>
          </ul>

          <div>
            <p
              style={{
                fontSize: "11px",
                color: "var(--accent-color)",
                marginBottom: "12px",
                letterSpacing: "1px",
              }}
            >
              SOFTWARE STACK
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {[
                "ZW3D",
                "Aspire",
                "VCarve",
                "Fusion 360",
                "PowerMill",
                "SolidWorks",
                "AutoCAD",
                "Rhino",
              ].map((sw, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "10px",
                    color: "var(--text-secondary)",
                    background: "var(--bg-secondary)",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    letterSpacing: "0.5px",
                  }}
                >
                  {sw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
