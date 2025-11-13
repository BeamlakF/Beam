import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./Beam.css";

const API_BASE = "https://beam.onrender.com/api"; // your backend API base

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

  // fetch CV download link
  useEffect(() => {
    axios
      .get(`${API_BASE}/cv/download/`, { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        setCvLink(url);
      })
      .catch(() => console.log("No CV available yet."));
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
            <li>
              {cvLink && (
                <a href={cvLink} download="Beamlak_CV.pdf">
                  Download CV
                </a>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Hero, Experience, Portfolio, Skills sections remain the same */}

        <Articles />

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
    </div>
  );
}
