import { useState, useEffect } from "react";

function Home() {
  const roles = ["Junior Software Engineer", "Designer", "UI/UX Enthusiast"];
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(120); // typing speed

  // Typing + deleting effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let typingInterval;

    if (!isDeleting) {
      typingInterval = setInterval(() => {
        setText((prev) => {
          const nextText = currentRole.slice(0, prev.length + 1);
          if (nextText === currentRole) {
            setTimeout(() => setIsDeleting(true), 1000); // pause before deleting
            clearInterval(typingInterval);
          }
          return nextText;
        });
      }, speed);
    } else {
      typingInterval = setInterval(() => {
        setText((prev) => {
          const nextText = currentRole.slice(0, prev.length - 1);
          if (nextText === "") {
            setIsDeleting(false);
            setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
            clearInterval(typingInterval);
          }
          return nextText;
        });
      }, speed / 1.5); // deleting faster
    }

    return () => clearInterval(typingInterval);
  }, [isDeleting, roleIndex]);

  return (
    <section id="home" className="home">
      {/* Flowing glowing lines */}
      <div className="flowing-lines">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Hero image */}
      <div className="hero-image">
        <img src="/hero.jpg" alt="Beam" />
      </div>

      {/* Hero content */}
      <div className="hero-content">
        <h1 className="fade-in">Beamlak Fekadu</h1>
        <p className="fade-in delay-1">
          <span className="typing">{text}</span>
          <span className="cursor">|</span>
        </p>
        <button className="contact-button fade-in delay-2">
          <a href="/media/cv.pdf" download>
            Download My CV
          </a>
        </button>
      </div>
    </section>
  );
}

export default Home;
