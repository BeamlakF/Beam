import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false); // to show sending state
  const [success, setSuccess] = useState(""); // success message
  const [error, setError] = useState(""); // error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("https://fekadu.onrender.com/contact/",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          text: formData.message, // must match Django serializer field
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      const data = await response.json();
      console.log("Message sent:", data);
      setSuccess("Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", subject: "", message: "" });

    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="contact-page">
      <div className="contact-container">
        <div className="contact-form">
          <h2>Contact Me</h2>
          <p>For legal inquiries, consultations, or appointments, please reach out using the form below.</p>

          <form onSubmit={handleSubmit}>
            <label>Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />

            <label>Message:</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>

        <div className="office-info">
          <h3>Office Information</h3>
          <p><strong>Law Office of Fekadu Hailemariam</strong></p>
          <p>Email: fekadu164@gmail.com</p>
          <p>Phone: +251-911-769-346</p>
          <p>Address: Nur Building, Lideta<br/>Addis Ababa, Ethiopia</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
