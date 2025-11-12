import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./Beam.css";

// ===== ARTICLES LIST =====
export function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://beam.onrender.com/articles/")
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
            {article.image && (
              <img
                src={article.image}
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
            <Link to={`/articles/${article.id}`} className="see-more-button">
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
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://beam.onrender.com/articles/${id}/`)
      .then((res) => setArticle(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load article.");
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!article) return <p>Loading...</p>;

  return (
    <div className="article-detail">
      {article.image && (
        <img src={article.image} alt={article.title} className="detail-image" />
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };
    console.log("Contact form data:", data);
    form.reset();
    alert("Message sent (demo). Connect this handler to your backend when ready.");
  };

  return (
    <div className="beam-root">
      <header>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Me</a></li>
            <li><a href="#">Download CV</a></li>
            <li><a href="#">Portfolio</a></li>
            <li><a href="#">Skills</a></li>
            <li><a href="#contact">Contact Me</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-text">
            <h1>Hello! This is Beamlak.</h1>
            <h2>Software Engineer and Designer</h2>
            <p>
              Junior Software Engineer with a strong foundation in web development, backend systems, and UI/UX and
              graphic design. Experienced in building secure and scalable web applications using Django and Node.js.
              Passionate about continuous learning in data structures and algorithms.
            </p>
          </div>
          <div className="hero-image">
            <img src="/images/Beam.jpg" alt="Portrait of Beamlak" className="rect-image" />
          </div>
        </section>

        <Articles />

        <section className="experiences">
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

        <section id="portfolio">
          <h3>Development Portfolio</h3>
          <div className="portfolio-grid">
            <article>
              <img src="/images/job.png" alt="Job Platform Project Preview" />
              <h4>Job Platform Backend</h4>
              <p><em>Django, JWT Auth, PostgreSQL, Swagger API</em></p>
              <p>Built a RESTful API with secure authentication and documentation.</p>
            </article>
            <article>
              <img src="/images/Beam.png" alt="Portfolio Website Screenshot" />
              <h4>Portfolio Websites</h4>
              <p><em>React, Django, PostgreSQL</em></p>
              <p>Developed full-stack portfolio websites showcasing professional work.</p>
            </article>
            <article>
              <img src="/images/Library.png" alt="Smart Library Project Preview" />
              <h4>Smart Library Management API</h4>
              <p><em>Django, Swagger, Redis, Docker</em></p>
              <p>Developed a scalable API with caching and containerization.</p>
            </article>
            <article>
              <img src="/images/TaskFlow.png" alt="TaskFLOW Project Preview" />
              <h4>TaskFLOW - Team Task Manager</h4>
              <p><em>Django, JWT Auth, PostgreSQL</em></p>
              <p>Developed a scalable API for team and task management.</p>
            </article>
          </div>
        </section>

        <section id="design-portfolio">
          <h3>Design Portfolio</h3>
          <div className="design-gallery">
            <figure>
              <img src="/images/logo-collection.jpg" alt="Logo Design Collection" />
              <figcaption>Brand logo collection for local businesses and startups.</figcaption>
            </figure>
            <figure>
              <img src="/images/poster-series.jpg" alt="Event Poster Designs" />
              <figcaption>Creative poster designs for cultural and educational events.</figcaption>
            </figure>
            <figure>
              <img src="/images/ui-dashboard.jpg" alt="UI Dashboard Mockup" />
              <figcaption>UI/UX mockup for a modern admin dashboard interface.</figcaption>
            </figure>
            <figure>
              <img src="/images/mobile-app-ui.jpg" alt="Mobile App UI Design" />
              <figcaption>Clean, minimal mobile app design concept focused on usability.</figcaption>
            </figure>
          </div>
        </section>

        <section id="skills">
          <h3>Skills</h3>
          {[
            ["Django", "70%"],
            ["HTML", "60%"],
            ["CSS", "50%"],
            ["JavaScript", "50%"],
            ["React", "20%"],
            ["Node.js", "40%"],
            ["Adobe CC", "90%"],
          ].map(([skill, width]) => (
            <div className="skill" key={skill}>
              <label>{skill}</label>
              <div className="progress-bar">
                <div className="fill" style={{ "--target-width": width }}></div>
              </div>
            </div>
          ))}
        </section>

        <section id="contact">
          <h3>Contact Me</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" required />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Your email" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Write your message here..." required></textarea>

            <button type="submit">Send Message</button>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Me</a></li>
              <li><a href="#">Download CV</a></li>
              <li><a href="#">Portfolio</a></li>
              <li><a href="#">Skills</a></li>
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
