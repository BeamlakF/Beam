

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
        <img src="/hero.jpg" alt="Beam" />
      </div>

      {/* Hero content */}
      <div className="hero-content">
        <h1 className="fade-in">Beamlak Fekadu </h1>
        <p className="fade-in delay-1"> </p>
        <button className="contact-button fade-in delay-2">
          <a href="#contact">Checkout my CV</a>
        </button>
      </div>
    </section>
  );
}

export default Home;
