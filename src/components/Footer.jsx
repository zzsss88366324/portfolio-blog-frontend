import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Portfolio & Blog</h3>
            <p>Showcasing projects and sharing thoughts on technology.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <p>Get in touch through the contact form or social media.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Portfolio & Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
