
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming React Router is used for navigation
import './WelcomePage.css'; // Import CSS file for styling

const FileFlexWelcomePage = () => {
  return (
    <div className="fileflex-welcome-page">
<header className="header">
  <nav className="navigation">
    <p className="logo-text">FileFlex</p>
  </nav>
</header>




      <main className="main-content">
        <section className="welcome-banner">
          <h1 className="title">FileFlex</h1>
          <p className="subtitle">Your Document Conversion and Analysis Tool</p>
        </section>

        <section className="features-section">
          <div className="feature-card">
            <img src="/conversion-icon.png" alt="Document Conversion Icon" className="feature-icon" />
            <h2 className="feature-title">Document Conversion</h2>
            <p className="feature-description">Convert PDF files to DOCX and vice versa.</p>
            <Link to="/homePage" className="feature-btn">Convert Now</Link>
          </div>

          <div className="feature-card">
            <img src="/analysis-icon.png" alt="Document Analysis Icon" className="feature-icon" />
            <h2 className="feature-title">Document Analysis</h2>
            <p className="feature-description">Analyze and extract insights from documents.</p>
            <Link to="/analyze" className="feature-btn">Analyze Document</Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default FileFlexWelcomePage;
