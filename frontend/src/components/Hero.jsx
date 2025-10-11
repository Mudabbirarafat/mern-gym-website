
const Hero = () => {
  // Scroll to section by ID
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="content">
        <div className="title">
          <h1>LET&apos;S</h1>
          <h1>GET</h1>
          <h1>MOVING</h1>
        </div>

        <div className="sub-title">
          <p>Your Journey to Fitness Starts Here</p>
          <p>Unleash Your Potential</p>
        </div>

        <div className="buttons">
          <button onClick={() => scrollToSection("contact")}>
            Start Your Journey
          </button>
          <button onClick={() => scrollToSection("pricing")}>
            Discover Your Plan
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
