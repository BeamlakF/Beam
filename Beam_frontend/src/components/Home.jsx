

function Home() {
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
        <img src="/Fekadu.jpg" alt="Lawyer" />
      </div>

      {/* Hero content */}
      <div className="hero-content">
        <h1 className="fade-in">Fekadu Hailemariam</h1>
        <p className="fade-in delay-1">Senior Attorney at Law</p>
        <button className="contact-button fade-in delay-2">
          <a href="#contact">Schedule a Consultation</a>
        </button>
      </div>
    </section>
  );
}

export default Home;
