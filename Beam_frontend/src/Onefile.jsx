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

  if (error) return <p className="empty-state">{error}</p>;

  return (
    <div id="articles" className="articles-page">
      <span className="section-kicker">Writing</span>
      <h2 className="section-title">Latest Articles</h2>
      {articles.length === 0 ? (
        <p className="empty-state">No articles available</p>
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

  if (error) return <p className="empty-state">{error}</p>;
  if (!article) return <p className="empty-state">Loading...</p>;

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
          <a href="#home" className="brand">Beam<span>.</span></a>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#volunteering">Volunteering</a></li>
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
            <span className="hero-badge">My journey starts with me</span>
            <h1>Hello! This is Beamlak.</h1>
            <h2>Software Engineer and Designer</h2>
            <p>
              Junior Software Engineer with a strong foundation in web development,
              backend systems, and UI/UX and graphic design. Experienced in building
              secure and scalable web applications using Django, SpringBoot and Node.js. Passionate
              about continuous learning in cloud computing and AI.
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

        {/* ===== Experience ===== */}
        <section id="experience" className="experiences">
          <span className="section-kicker">Where I've Worked</span>
          <h3 className="section-title">Experience</h3>
          <ul>
            <li>
              <strong>Junior Software Developer</strong> <em>INSA</em>
              <i>Feb 2025 - present</i>
              <p>Working on development and documentation of ITAS.</p>
            </li>
            <li>
              <strong>Software Product Tester &amp; Graphics Designer Intern</strong> <em>EDit Educational Services</em>
              <i>Dec 2025 - April 2026</i>
              <p>Worked on marketing posters and software product testing and maintenance.</p>
            </li>
            <li>
              <strong>Junior Graphic Designer</strong> <em>Halwote Hareg Design Studio</em>
              <i>Feb 2025 - Oct 2025</i>
              <p>Designed branding materials for clients. Created user-friendly experiences based on client requirements.</p>
            </li>
          </ul>
        </section>

        {/* ===== Volunteering ===== */}
        <section id="volunteering" className="experiences volunteering">
          <span className="section-kicker">Extra-curricular</span>
          <h3 className="section-title">Volunteering</h3>
          <ul>
            <li>
              <strong>Project Organizer</strong> <em>GDG AAU core technical team</em>
              <i>Nov 2025 - present</i>
              <p>Developed the backend system of Unilearn-university life navigation system.</p>
            </li>
            <li>
              <strong>Editor of GDG insider</strong> <em>GDG AAU core social media team</em>
              <i>April 2025 - present</i>
              <p>Worked on marketing posters and also sole designer and writer of GDG Insider magazine</p>
            </li>
            <li>
              <strong>Director of Marketing</strong> <em>AWS Student Builder Group</em>
              <i>July 2026 - present</i>
              <p>Developing on Marketing and Promotion of AWS and cloud systems.</p>
            </li>
            <li>
              <strong>Apprentice</strong> <em>Thrive Student club</em>
              <i>Nov 2026 - May 2026</i>
              <p>Working on teaching materials for students and assisting during lectures</p>
            </li>
            <li>
              <strong>Member</strong> <em>Aiesec in Ethiopia</em>
              <i>Aug 2026 - Member</i>
              <p>Working with the MAC OC with marketing posters</p>
            </li>
          </ul>
        </section>

        {/* ===== Development Portfolio ===== */}
        <section id="portfolio">
          <span className="section-kicker">Development</span>
          <h3 className="section-title">Development Portfolio</h3>
          <div className="portfolio-grid">
            {devProjects.length === 0 ? (
              <p className="empty-state">No development projects available.</p>
            ) : (
              devProjects.map((p) => (
                <article key={p.id}>
                  {p.cover_image && <img src={p.cover_image} alt={p.title} />}
                  <div className="portfolio-card-body">
                    <h4>{p.title}</h4>
                    <p><em>{p.description}</em></p>
                    <div className="portfolio-card-links">
                      {p.live_url && (
                        <a href={p.live_url} target="_blank" rel="noreferrer">Live Demo</a>
                      )}
                      {p.repo_url && (
                        <a href={p.repo_url} target="_blank" rel="noreferrer">GitHub Repo</a>
                      )}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>


        {/* ===== Articles ===== */}
        <Articles />

        {/* ===== Contact Form ===== */}
        <section id="contact">
          <span className="section-kicker">Get In Touch</span>
          <h3 className="section-title">Contact Me</h3>
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
              <li><a href="#volunteering">Volunteering</a></li>
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