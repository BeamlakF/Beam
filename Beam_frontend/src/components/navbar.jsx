import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      <div className="logo">
        <img src="/logo.png" alt="law" />
        <h1>Beam</h1>
      </div>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <HashLink smooth to="/#top" onClick={() => setMenuOpen(false)}>
              Home
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#portfolio" onClick={() => setMenuOpen(false)}>
              Portfolio
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#projects" onClick={() => setMenuOpen(false)}>
              projects
            </HashLink>
          </li>
          <li>
            <Link to="/articles" onClick={() => setMenuOpen(false)}>
              Articles
            </Link>
          </li>
        </ul>
      </div>

      <button className="contact-button">
        <HashLink smooth to="/#contact" onClick={() => setMenuOpen(false)}>
          Contact Me
        </HashLink>
      </button>
    </nav>
  );
}

export default Navbar;
