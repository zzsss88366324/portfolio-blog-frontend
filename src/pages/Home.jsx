import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to My Portfolio</h1>
            <p className="hero-subtitle">
              Showcasing my projects, sharing my thoughts, and connecting with the world
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">
                View Projects
              </Link>
              <Link to="/blog" className="btn btn-secondary">
                Read Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="grid grid-3">
            <div className="feature-card card">
              <div className="feature-icon">📁</div>
              <h3>Projects</h3>
              <p>
                Explore my portfolio of work including web development, design, and more.
              </p>
              <Link to="/projects" className="feature-link">
                View all projects →
              </Link>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">✍️</div>
              <h3>Blog</h3>
              <p>
                Read my latest thoughts on technology, development, and industry trends.
              </p>
              <Link to="/blog" className="feature-link">
                Read blog posts →
              </Link>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">💬</div>
              <h3>Contact</h3>
              <p>
                Get in touch for collaborations, inquiries, or just to say hello.
              </p>
              <Link to="/contact" className="feature-link">
                Contact me →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <h2>About Me</h2>
            <p>
              I'm a passionate developer who loves creating beautiful and functional
              web applications. This platform showcases my work and shares my journey
              in the world of technology.
            </p>
            <p>
              Feel free to explore my projects, read my blog posts, and reach out
              if you'd like to collaborate or just chat about tech!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
