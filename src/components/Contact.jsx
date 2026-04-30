import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // GANTI DENGAN FORM ID ANDA DARI FORMSPREE
  const FORMSPREE_ID = "mojrabbr";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New message from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      style={{ padding: "60px 0", borderTop: "1px solid var(--border-color)" }}
    >
      <div className="contact-grid">
        {/* Left Column - Sama seperti sebelumnya */}
        <div>
          <div className="section-number" style={{ textAlign: "left" }}>
            05 / CONTACT
          </div>
          <h2
            className="section-title"
            style={{ textAlign: "left", fontSize: "clamp(28px, 5vw, 48px)" }}
          >
            Let's build something <br />
            precise together.
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.6",
              marginBottom: "32px",
              maxWidth: "400px",
              fontSize: "clamp(13px, 4vw, 14px)",
            }}
          >
            Have a furniture run, a joinery prototype, or a multi-axis
            challenge? Send a brief — I'll reply within 24 hours.
          </p>

          <div className="contact-info">
            <div className="contact-detail" style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--accent-color)",
                  marginBottom: "4px",
                  letterSpacing: "1px",
                }}
              >
                EMAIL
              </div>
              <div
                style={{
                  fontSize: "clamp(12px, 3.5vw, 14px)",
                  color: "var(--text-primary)",
                  wordBreak: "break-all",
                }}
              >
                hirobima28@gmail.com
              </div>
            </div>

            <div className="contact-detail" style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--accent-color)",
                  marginBottom: "4px",
                  letterSpacing: "1px",
                }}
              >
                WHATSAPP
              </div>
              <div
                style={{
                  fontSize: "clamp(12px, 3.5vw, 14px)",
                  color: "var(--text-primary)",
                }}
              >
                +62 895 0592 0370
              </div>
            </div>

            <div className="contact-detail" style={{ marginBottom: "32px" }}>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--accent-color)",
                  marginBottom: "4px",
                  letterSpacing: "1px",
                }}
              >
                LOCATION
              </div>
              <div
                style={{
                  fontSize: "clamp(12px, 3.5vw, 14px)",
                  color: "var(--text-primary)",
                }}
              >
                Indonesia
              </div>
            </div>

            <button
              onClick={() =>
                window.open(
                  "https://wa.me/6289505920370?text=Halo%20Bima,%20saya%20tertarik%20untuk%20diskusi%20proyek%20CNC",
                  "_blank"
                )
              }
              className="contact-link-btn"
            >
              Quick Brief Online →
            </button>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            {/* Success Message */}
            {submitStatus === "success" && (
              <div
                style={{
                  backgroundColor: "rgba(152,168,105,0.2)",
                  border: "1px solid #98a869",
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "20px",
                  color: "#98a869",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                ✓ Message sent successfully! I'll reply within 24 hours.
              </div>
            )}

            {/* Error Message */}
            {submitStatus === "error" && (
              <div
                style={{
                  backgroundColor: "rgba(255,0,0,0.1)",
                  border: "1px solid #ff4444",
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "20px",
                  color: "#ff4444",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                ✗ Failed to send message. Please try again or email me directly.
              </div>
            )}

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  marginBottom: "8px",
                }}
              >
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="form-input"
                placeholder="Your name"
                disabled={isSubmitting}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  marginBottom: "8px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="form-input"
                placeholder="your@email.com"
                disabled={isSubmitting}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  marginBottom: "8px",
                }}
              >
                Message
              </label>
              <textarea
                required
                rows="4"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="form-textarea"
                placeholder="Tell me about your project..."
                disabled={isSubmitting}
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
              style={{
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
