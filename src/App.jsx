import { useEffect, useState } from "react";
import "./App.css";

const imageBase = `${import.meta.env.BASE_URL}images/`;

const teachers = [
  {
    name: "N. Sujata Gupta Ma'am",
    role: "",
    image: `${imageBase}sujata ma'am.jpeg`,
  },
  {
    name: "A Dedicated Mentor",
    role: "",
    image: `${imageBase}sujata ma'am1.jpeg`,
  },
];

const quotes = [
  "A great teacher inspires hope, ignites imagination, and instills a love of learning.",
  "The influence of a good teacher can never be erased.",
  "Teachers plant the seeds of knowledge that grow forever.",
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeQuote, setActiveQuote] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 500);

      document.querySelectorAll(".reveal").forEach((element) => {
        const top = element.getBoundingClientRect().top;

        if (top < window.innerHeight - 80) {
          element.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightbox(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuote((current) => (current + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  const handleTribute = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newTribute = {
      name: formData.get("name"),
      teacher: formData.get("teacher"),
      message: formData.get("message"),
      createdAt: new Date().toISOString(),
    };

    const oldTributes =
      JSON.parse(localStorage.getItem("teacherTributes")) || [];

    localStorage.setItem(
      "teacherTributes",
      JSON.stringify([...oldTributes, newTribute])
    );

    event.currentTarget.reset();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3500);
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-container">

          <button
            className="logo"
            onClick={() => scrollToSection("home")}
          >
            🏫 <span>CBIT</span>
          </button>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <button onClick={() => scrollToSection("home")}>
              Home
            </button>

            <button onClick={() => scrollToSection("about")}>
              About
            </button>

            <button onClick={() => scrollToSection("teachers")}>
              Teachers
            </button>

            <button onClick={() => scrollToSection("gallery")}>
              Gallery
            </button>

            <button onClick={() => scrollToSection("quotes")}>
              Quotes
            </button>

            <button onClick={() => scrollToSection("awards")}>
              Awards
            </button>

            <button onClick={() => scrollToSection("write-tribute")}>
              Tribute
            </button>
          </nav>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>
      </header>

      {/* HERO */}
      <section id="home" className="hero-section">

        <div className="hero-overlay"></div>

        <div className="hero-particles">
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
          <span>✧</span>
        </div>

        <div className="hero-content">

          <div className="hero-logo">
            <img
              src={`${imageBase}CBIT.png`}
              alt="CBIT Logo"
            />
          </div>

          <div className="hero-badge">
            🌸 September 5, 2026
          </div>

          <p className="hero-small-title">
            A Celebration of Gratitude
          </p>

          <h1>
            Happy Teachers’
            <span> Day 2026</span>
          </h1>

          <p className="hero-description">
            Celebrating the mentors who inspire us,
            guide us, and help us become the best
            version of ourselves.
          </p>

          <div className="hero-actions">

            <button
              className="primary-button"
              onClick={() => scrollToSection("teachers")}
            >
              Meet Our Teachers ✨
            </button>

            <button
              className="outline-button"
              onClick={() => scrollToSection("write-tribute")}
            >
              Write a Tribute 💌
            </button>

          </div>

        </div>

      </section>

      {/* TEACHERS */}
      <section id="teachers" className="section teachers-section">

        <div className="section-heading reveal">

          <span className="section-icon">
            👩‍🏫
          </span>

          <p>OUR WONDERFUL MENTORS</p>

          <h2>Meet Our Teachers</h2>

          <div className="heading-line"></div>

          <span>
            The people who make learning meaningful.
          </span>

        </div>

        <div className="teacher-grid">

          {teachers.map((teacher, index) => (
            <article
              className={`teacher-card teacher-${index + 1} reveal`}
              key={teacher.name}
            >

              <div
                className="teacher-image"
                onClick={() => setLightbox(teacher.image)}
              >

                <img
                  src={teacher.image}
                  alt={teacher.name}
                />

                <div className="photo-hover">
                  View Photo ✨
                </div>

              </div>

              <div className="teacher-info">

                <span>0{index + 1}</span>

                <h3>{teacher.name}</h3>

                {teacher.role && (
                  <p>{teacher.role}</p>
                )}

              </div>

            </article>
          ))}

        </div>

      </section>

      {/* ABOUT */}
      <section id="about" className="section about-section">

        <div className="section-heading reveal">

          <span className="section-icon">
            💐
          </span>

          <p>FROM OUR HEARTS</p>

          <h2>Thank You, Teachers</h2>

          <div className="heading-line"></div>

        </div>

        <div className="thank-grid">

          <article className="thank-card pink-card reveal">
            <div className="thank-icon">💻</div>

            <span>01</span>

            <h3>Learning Through Technology</h3>

            <p>
              You encouraged us to explore technology,
              programming, and new ideas beyond textbooks
              and become confident learners.
            </p>
          </article>

          <article className="thank-card blue-card reveal">
            <div className="thank-icon">🤖</div>

            <span>02</span>

            <h3>IoT & Smart Thinking</h3>

            <p>
              You helped us understand how IoT and connected
              technology can turn creative ideas into solutions
              for real-world problems.
            </p>
          </article>

          <article className="thank-card gold-card reveal">
            <div className="thank-icon">🚀</div>

            <span>03</span>

            <h3>Projects That Build Confidence</h3>

            <p>
              Every project taught us to experiment, solve
              problems, learn from mistakes, and keep improving.
            </p>
          </article>

          <article className="thank-card green-card reveal">
            <div className="thank-icon">🌐</div>

            <span>04</span>

            <h3>Web Development & Creativity</h3>

            <p>
              You inspired us to explore web development,
              build useful applications, and combine technology
              with creativity.
            </p>
          </article>

        </div>

      </section>

      {/* IMPACT */}
      <section id="impact" className="impact-section">

        <div className="section-heading dark-heading reveal">

          <span className="section-icon">
            🌟
          </span>

          <p>YOUR IMPACT</p>

          <h2>More Than a Teacher</h2>

          <div className="heading-line"></div>

        </div>

        <div className="impact-grid">

          <article className="impact-card reveal">

            <strong>💻</strong>

            <h3>Technology</h3>

            <p>
              You inspired us to explore programming,
              web development, IoT, and modern technologies.
            </p>

          </article>

          <article className="impact-card reveal">

            <strong>🚀</strong>

            <h3>Projects</h3>

            <p>
              You showed us that the best learning happens
              when we turn ideas into projects and real solutions.
            </p>

          </article>

          <article className="impact-card reveal">

            <strong>🧠</strong>

            <h3>Problem Solving</h3>

            <p>
              Your guidance encouraged us to ask questions,
              experiment, solve problems, and never stop learning.
            </p>

          </article>

        </div>

      </section>

      {/* TRIBUTE WALL */}
      <section className="section tribute-section">

        <div className="section-heading reveal">

          <span className="section-icon">
            💌
          </span>

          <p>WORDS FROM THE HEART</p>

          <h2>Tribute Wall</h2>

          <div className="heading-line"></div>

        </div>

        <div className="tribute-grid">

          <article className="tribute-card tribute-pink reveal">

            <span className="quote-symbol">“</span>

            <p>
              📚 You taught us that learning goes beyond
              textbooks through technology, projects,
              experiments, and curiosity.
            </p>

            <div className="tribute-avatar">
              🌸
            </div>

            <strong>
              A Grateful Student
            </strong>

          </article>

          <article className="tribute-card tribute-blue reveal">

            <span className="quote-symbol">“</span>

            <p>
              💻 Your guidance encouraged us to explore
              programming, web development, and turn our
              ideas into something real.
            </p>

            <div className="tribute-avatar">
              ⭐
            </div>

            <strong>
              With Gratitude
            </strong>

          </article>

          <article className="tribute-card tribute-purple reveal">

            <span className="quote-symbol">“</span>

            <p>
              🤖 IoT and technology became more meaningful
              because you showed us how learning can connect
              with real-world problems.
            </p>

            <div className="tribute-avatar">
              💜
            </div>

            <strong>
              Forever Thankful
            </strong>

          </article>

          <article className="tribute-card tribute-green reveal">

            <span className="quote-symbol">“</span>

            <p>
              ❤️ Beyond technical knowledge, you taught us
              confidence, patience, creativity, and the courage
              to keep learning.
            </p>

            <div className="tribute-avatar">
              🌱
            </div>

            <strong>
              Always Grateful
            </strong>

          </article>

        </div>

      </section>

      {/* GALLERY */}
      <section id="gallery" className="section gallery-section">

        <div className="section-heading reveal">

          <span className="section-icon">
            📸
          </span>

          <p>CHERISHED MOMENTS</p>

          <h2>A Beautiful Memory</h2>

          <div className="heading-line"></div>

        </div>

        <div className="gallery-grid">

          <article className="gallery-card reveal">

            <img
              src={`${imageBase}sujata ma'am1.jpeg`}
              alt="N. Sujata Gupta Ma'am"
            />

            <div className="gallery-caption">

              <span>❤️</span>

              <h3>
                A Special Memory
              </h3>

            </div>

          </article>

        </div>

      </section>

      {/* QUOTES */}
      <section id="quotes" className="quotes-section">

        <div className="quote-background-mark"></div>

        <div className="quote-container reveal">

          <span className="quote-label">
            WORDS TO REMEMBER
          </span>

          <h2>
            Teacher Quotes
          </h2>

          <div className="quote-line"></div>

          <blockquote>

            <span>“</span>

            {quotes[activeQuote]}

            <span>”</span>

          </blockquote>

          <div className="quote-dots">

            {quotes.map((_, index) => (
              <button
                key={index}
                className={
                  index === activeQuote
                    ? "active"
                    : ""
                }
                onClick={() => setActiveQuote(index)}
                aria-label={`Quote ${index + 1}`}
              />
            ))}

          </div>

        </div>

      </section>

      {/* AWARDS */}
      <section id="awards" className="section awards-section">

        <div className="section-heading reveal">

          <span className="section-icon">
            🏆
          </span>

          <p>
            WITH SINCERE APPRECIATION
          </p>

          <h2>
            Appreciation Awards
          </h2>

          <div className="heading-line"></div>

        </div>

        <div className="awards-grid">

          <article className="award-card award-gold reveal">

            <div className="award-medal">
              🌟
            </div>

            <h3>
              Innovation & Inspiration Award
            </h3>

            <p>
              For encouraging us to explore new ideas,
              technologies, and possibilities.
            </p>

            <span>
              With Love & Gratitude
            </span>

          </article>

          <article className="award-card award-purple reveal">

            <div className="award-medal">
              💻
            </div>

            <h3>
              Technology Mentor Award
            </h3>

            <p>
              For inspiring our journey through programming,
              web development, IoT, and technology.
            </p>

            <span>
              With Love & Gratitude
            </span>

          </article>

          <article className="award-card award-blue reveal">

            <div className="award-medal">
              🚀
            </div>

            <h3>
              Project Guidance Award
            </h3>

            <p>
              For encouraging us to learn by building,
              experimenting, solving problems, and creating.
            </p>

            <span>
              With Love & Gratitude
            </span>

          </article>

        </div>

      </section>

      {/* SURPRISE */}
      <section className="surprise-section">

        <div className="confetti confetti-one">
          ✦
        </div>

        <div className="confetti confetti-two">
          ✧
        </div>

        <div className="confetti confetti-three">
          ✦
        </div>

        <div className="confetti confetti-four">
          ✧
        </div>

        <div className="surprise-content reveal">

          <div className="surprise-gift">
            🎁
          </div>

          <span>
            ONE LITTLE SURPRISE
          </span>

          <h2>
            A Special Message
            <br />
            Just For You
          </h2>

          <p>
            Because teachers deserve more than just
            one day of appreciation.
          </p>

          <button
            className="surprise-button"
            onClick={() => setSurpriseOpen(!surpriseOpen)}
          >
            {surpriseOpen
              ? "Close Message ❤️"
              : "Open Surprise 🎁"}
          </button>

          {surpriseOpen && (
            <div className="surprise-message">

              <div>
                💐 ✨ 🌸
              </div>

              <h3>
                Thank You, Dear Ma'am! 💐
              </h3>

              <p>
                Your guidance helped us learn not only
                from lessons, but also through projects,
                technology, creativity, and real-world
                experiences. Thank you for your guidance,
                encouragement, patience, and for inspiring
                us to keep learning, building, experimenting,
                and believing in ourselves. ❤️
              </p>

            </div>
          )}

        </div>

        <div className="surprise-flowers">
          🌸 ✨ 🌼 💐 ⭐ 🌷
        </div>

      </section>

      {/* WRITE TRIBUTE */}
      <section
        id="write-tribute"
        className="section write-section"
      >

        <div className="section-heading reveal">

          <span className="section-icon">
            ✍️
          </span>

          <p>
            YOUR WORDS MATTER
          </p>

          <h2>
            Write a Tribute
          </h2>

          <div className="heading-line"></div>

          <span>
            Leave a heartfelt message for a teacher.
          </span>

        </div>

        <form
          className="tribute-form reveal"
          onSubmit={handleTribute}
        >

          <div className="form-row">

            <div className="form-group">

              <label htmlFor="name">
                Your Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="teacher">
                Teacher's Name
              </label>

              <input
                id="teacher"
                name="teacher"
                type="text"
                placeholder="Enter teacher's name"
                required
              />

            </div>

          </div>

          <div className="form-group">

            <label htmlFor="message">
              Your Tribute
            </label>

            <textarea
              id="message"
              name="message"
              rows="6"
              minLength="10"
              placeholder="Write something from your heart..."
              required
            />

          </div>

          <button
            className="submit-button"
            type="submit"
          >
            Send Tribute 💌
          </button>

          {submitted && (
            <div className="success-message">
              ❤️ Your tribute has been saved. Thank you!
            </div>
          )}

        </form>

      </section>

      {/* FINAL THANK YOU */}
      <section className="final-section">

        <div className="final-decoration">
          ✨ 🌸 ✨
        </div>

        <div className="final-content reveal">

          <span>
            WITH ALL OUR GRATITUDE
          </span>

          <h2>
            Thank You,
            <br />
            Teachers! ❤️
          </h2>

          <p>
            You teach. You inspire. You believe.
            <br />
            And because of you, we grow.
          </p>

          <div className="final-line"></div>

          <strong>
            Happy Teachers’ Day 2026
          </strong>

        </div>

        <div className="final-decoration bottom">
          🌼 💐 🌷
        </div>

      </section>

      {/* FOOTER */}
      <footer className="site-footer">

        <div className="footer-brand">
          🏫 <strong>CBIT</strong>
        </div>

        <p>
          Made with ❤️ for Teachers’ Day 2026
        </p>

        <button
          onClick={() => scrollToSection("home")}
        >
          Back to Top ↑
        </button>

      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="lightbox"
          onClick={() => setLightbox(null)}
        >

          <button
            className="lightbox-close"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>

          <img
            src={lightbox}
            alt="Expanded teacher memory"
            onClick={(event) => event.stopPropagation()}
          />

        </div>
      )}

      {/* BACK TO TOP */}
      {showTop && (
        <button
          className="back-top"
          onClick={() => scrollToSection("home")}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}

    </div>
  );
}

export default App;