
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming React Router is used for navigation
import './FileFlexWelcomePage.css'; // Import CSS file for styling

const FileFlexWelcomePage = () => {
  return (
    <div className="fileflex-welcome-page">
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="FileFlex Logo" />
        </div>
        <nav className="navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <section className="welcome-banner">
          <h1 className="title">FileFlex</h1>
          <p className="subtitle">Your Document Conversion and Analysis Tool</p>
          <Link to="/convert" className="btn-get-started">Get Started</Link>
        </section>

        <section className="features-section">
          <div className="feature-card">
            <img src="/conversion-icon.png" alt="Document Conversion Icon" className="feature-icon" />
            <h2 className="feature-title">Document Conversion</h2>
            <p className="feature-description">Convert PDF files to DOCX and vice versa.</p>
            <Link to="/convert" className="feature-btn">Convert Now</Link>
          </div>

          <div className="feature-card">
            <img src="/analysis-icon.png" alt="Document Analysis Icon" className="feature-icon" />
            <h2 className="feature-title">Document Analysis</h2>
            <p className="feature-description">Analyze and extract insights from documents.</p>
            <Link to="/analyze" className="feature-btn">Analyze Document</Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="contact-info">
          <p>Email: contact@fileflex.com</p>
          <p>Phone: +1 123-456-7890</p>
        </div>
        <div className="social-links">
          <a href="https://twitter.com/fileflex" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com/company/fileflex" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/fileflex" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div className="legal-info">
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}

export default FileFlexWelcomePage;
