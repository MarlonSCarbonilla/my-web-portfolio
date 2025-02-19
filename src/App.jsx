import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [theme, setTheme] = useState("light");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // Handle scroll for active section and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Highlight active section
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          setActiveSection(section.id);
        }
      });

      // Sticky navbar
      if (window.scrollY > 50) {
        setIsNavbarSticky(true);
      } else {
        setIsNavbarSticky(false);
      }

      // Show scroll-to-top button
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme (light/dark)
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been sent.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className={`app ${theme}`}>
      {/* Navbar */}
      <nav className={`navbar ${isNavbarSticky ? "sticky" : ""}`}>
        <h1 className="logo">My Portfolio</h1>
        <ul className="nav-links">
          {["home", "about", "projects", "skills", "resume", "contact"].map((section) => (
            <li key={section} className={activeSection === section ? "active" : ""}>
              <a href={`#${section}`}>{section.charAt(0).toUpperCase() + section.slice(1)}</a>
            </li>
          ))}
        </ul>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </nav>

      {/* Scroll-to-top button */}
      {showScrollTop && (
        <button className="scroll-top" onClick={scrollToTop}>
          ↑
        </button>
      )}

      {/* Sections */}
      <main className="content">
        {/* Home Section */}
        <section id="home" className="home">
          <div className="home-content">
            <h2>Welcome to My Portfolio</h2>
            <p>
              I'm a passionate IT graduate specializing in web and mobile development. With a strong
              foundation in software engineering, I create innovative and user-friendly digital
              solutions.
            </p>
            <div className="home-buttons">
              <button className="btn primary">View My Work</button>
              <button className="btn secondary">Download Resume</button>
            </div>
          </div>
          <div className="home-image">
            <img src="https://via.placeholder.com/400" alt="Profile" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <h2>About Me</h2>
          <div className="about-content">
            <p>
              I am a fresh IT graduate with a strong foundation in software development and design.
              I have experience in building responsive websites, mobile applications, and AI-driven
              solutions. My passion lies in creating user-friendly and innovative digital experiences.
            </p>
            <div className="about-details">
              <div className="detail">
                <h3>Education</h3>
                <p>Bachelor of Science in Information Technology</p>
                <p>University of Tech, 2025</p>
              </div>
              <div className="detail">
                <h3>Experience</h3>
                <p>Intern at CodeCraft Solutions (2024)</p>
                <p>Freelance Web Developer (2023-Present)</p>
              </div>
              <div className="detail">
                <h3>Certifications</h3>
                <p>React Developer Certification</p>
                <p>Flutter Mobile Development</p>
                <p>UI/UX Design Specialization</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects">
          <h2>Projects</h2>
          <div className="project-grid">
            {[
              { title: "🏆 Web Portfolio", description: "A sleek, modern personal website built with React and CSS." },
              { title: "📱 Mobile App", description: "A cross-platform mobile application developed using Flutter." },
              { title: "🤖 AI Chatbot", description: "An AI-driven chatbot for automation and customer support." },
              { title: "🌐 E-Commerce Platform", description: "A full-stack e-commerce website with payment integration." },
              { title: "📊 Data Visualization Tool", description: "A tool for visualizing complex datasets using D3.js." },
              { title: "🎮 Game Development", description: "A 2D platformer game built with Unity." },
            ].map((project, index) => (
              <div key={index} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <button className="btn secondary">View Project</button>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills">
          <h2>Skills</h2>
          <div className="skill-list">
            {["JavaScript", "React", "Node.js", "Flutter", "Firebase", "UI/UX Design", "Python", "Django", "Swift"].map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="resume">
          <h2>Resume</h2>
          <div className="resume-content">
            <p>Download my resume to learn more about my qualifications and experience.</p>
            <a href="/resume.pdf" className="btn primary">Download Resume</a>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact">
          <h2>Contact Me</h2>
          <div className="contact-content">
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
              <button type="submit" className="btn primary">
                Send Message
              </button>
            </form>
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p>Email: example@example.com</p>
              <p>Phone: +123 456 7890</p>
              <p>Address: 123 Tech Street, City, Country</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 My Portfolio. All rights reserved.</p>
        <div className="social-links">
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
          <a href="#">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default App;