import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./Beam.css";

const API_BASE = "https://beam-jw63.onrender.com/api"; // Backend API base

// ===== ARTICLES LIST =====
export function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/articles/`)
      .then((res) => setArticles(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load articles.");
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div id="articles" className="articles-page">
      <h2 className="articles-h2">Latest Articles</h2>
      {articles.length === 0 ? (
        <p>No articles available</p>
      ) : (
        articles.slice(0, 5).map((article) => (
          <div key={article.id} className="article-box">
            {article.cover_image && (
              <img
                src={article.cover_image}
                alt={article.title}
                style={{
                  width: "200px",
                  height: "auto",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              />
            )}
            <h3>{article.title}</h3>
            <p>
              {article.content
                ? article.content.length > 150
                  ? article.content.slice(0, 150) + "..."
                  : article.content
                : "No content available"}
            </p>
            <Link to={`/articles/${article.slug}`} className="see-more-button">
              See More
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

// ===== ARTICLE DETAIL =====
export function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/articles/${slug}/`)
      .then((res) => setArticle(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load article.");
      });
  }, [slug]);

  if (error) return <p>{error}</p>;
  if (!article) return <p>Loading...</p>;

  return (
    <div className="article-detail">
      {article.cover_image && (
        <img src={article.cover_image} alt={article.title} className="detail-image" />
      )}
      <h2>{article.title}</h2>
      <p className="detail-content">{article.content}</p>
      <Link to="/articles" className="back-button">
        ← Back to Articles
      </Link>
    </div>
  );
}

// ===== MAIN PROFILE PAGE =====
export default function BeamProfile() {
  const [cvLink, setCvLink] = useState("");
  const [devProjects, setDevProjects] = useState([]);
  const [designProjects, setDesignProjects] = useState([]);

  // Fetch CV download link
  useEffect(() => {
    axios
      .get(`${API_BASE}/cv/download/`, { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        setCvLink(url);
      })
      .catch(() => console.log("No CV available yet."));
  }, []);

  // Fetch projects from backend
  useEffect(() => {
    axios
      .get(`${API_BASE}/projects/`)
      .then((res) => {
        const dev = res.data.filter((p) => p.project_type === "development");
        const design = res.data.filter((p) => p.project_type === "design");
        setDevProjects(dev);
        setDesignProjects(design);
      })
      .catch((err) => console.error("Failed to fetch projects", err));
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject?.value || "",
      message: form.message.value,
    };
    try {
      await axios.post(`${API_BASE}/contact/`, data);
      alert("Message sent successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="beam-root">
      <header>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#design-portfolio">My Designs</a></li>
            <li><a href="#articles">Articles</a></li>
            <li><a href="#contact">Contact Me</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* ===== HERO ===== */}
        <section id="home" className="hero">
          <div className="hero-text">
            <h1>Hello! This is Beamlak.</h1>
            <h2>Software Engineer and Designer</h2>
            <p>
              Junior Software Engineer with a strong foundation in web development,
              backend systems, and UI/UX and graphic design. Experienced in building
              secure and scalable web applications using Django and Node.js. Passionate
              about continuous learning in data structures and algorithms.
            </p>
            {cvLink ? (
              <a href={cvLink} download="Beamlak_CV.pdf" className="hero-button">
                Download CV
              </a>
            ) : (
              <span className="hero-button disabled">CV not available</span>
            )}
          </div>
          <div className="hero-image">
            <img src="./Beam.jpg" alt="Portrait of Beamlak" className="rect-image" />
          </div>
        </section>

        {/* ===== Experiences ===== */}
        <section id="experience" className="experiences">
          <h3>Experiences</h3>
          <ul>
            <li>
              <strong>Graphic Design Intern</strong> <em>Halwote Hareg Design Studio</em>
              <p>Designed branding materials for clients. Created user-friendly experiences based on client requirements.</p>
            </li>
            <li>
              <strong>Participant in the Software Development Program</strong> <em>Women Techsters Bootcamp</em>
              <p>Attending classes focused on empowering women in technology and enhancing technical expertise.</p>
            </li>
            <li>
              <strong>Software Engineering Student</strong> <em>ALX Africa</em>
              <p>Completed an intensive software engineering program focused on problem-solving, collaboration, and real-world project development.</p>
            </li>
          </ul>
        </section>

        {/* ===== Development Portfolio ===== */}
        <section id="portfolio">
          <h3>Development Portfolio</h3>
          <div className="portfolio-grid">
            {devProjects.length === 0 ? (
              <p>No development projects available.</p>
            ) : (
              devProjects.map((p) => (
                <article key={p.id}>
                  {p.cover_image && <img src={p.cover_image} alt={p.title} />}
                  <h4>{p.title}</h4>
                  <p><em>{p.description}</em></p>
                  {p.live_url && (
                    <p><a href={p.live_url} target="_blank" rel="noreferrer">Live Demo</a></p>
                  )}
                  {p.repo_url && (
                    <p><a href={p.repo_url} target="_blank" rel="noreferrer">GitHub Repo</a></p>
                  )}
                </article>
              ))
            )}
          </div>
        </section>

        {/* ===== Design Portfolio ===== */}
        <section id="design-portfolio">
          <h3>Design Portfolio</h3>
          <div className="design-gallery">
            {designProjects.length === 0 ? (
              <p>No design projects available.</p>
            ) : (
              designProjects.map((p) => (
                <figure key={p.id}>
                  {p.cover_image && <img src={p.cover_image} alt={p.title} />}
                  <figcaption>{p.title}</figcaption>
                </figure>
              ))
            )}
          </div>
        </section>

        {/* ===== Skills ===== */}
        <section id="skills">
          <h3>Skills</h3>
          {[["Django", "70%"], ["HTML", "60%"], ["CSS", "50%"], ["JavaScript", "50%"], ["React", "20%"], ["Node.js", "40%"], ["Adobe CC", "90%"]].map(([skill, width]) => (
            <div className="skill" key={skill}>
              <label>{skill}</label>
              <div className="progress-bar">
                <div className="fill" style={{ "--target-width": width }}></div>
              </div>
            </div>
          ))}
        </section>

        {/* ===== Articles ===== */}
        <Articles />

        {/* ===== Contact Form ===== */}
        <section id="contact">
          <h3>Contact Me</h3>
          <form onSubmit={handleContactSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" required />
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Your email" required />
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="Subject" />
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Write your message here..." required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer>
        <div className="footer-content">
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#design-portfolio">My Designs</a></li>
              <li><a href="#articles">Articles</a></li>
              <li><a href="#contact">Contact Me</a></li>
            </ul>
          </div>

          <div className="footer-address">
            <h4>Find Me At</h4>
            <p>Addis Ababa University - CTBE</p>
            <p><a href="https://www.linkedin.com/in/beamlak-fekadu-979033322/" target="_blank" rel="noreferrer">LinkedIn</a></p>
            <p><a href="https://github.com/BeamlakF" target="_blank" rel="noreferrer">GitHub</a></p>
            <p><a href="mailto:beamlakfekadu562@gmail.com">beamlakfekadu562@gmail.com</a></p>
          </div>
        </div>
        <p className="footer-bottom">© 2025 Beamlak Fekadu | All Rights Reserved</p>
      </footer>
    </div>
  );
}
