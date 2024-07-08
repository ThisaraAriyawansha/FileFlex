import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import './WelcomePage.css'; // Import your CSS styles
import Navbar from './Navbar'; // Assuming Navbar component is defined in './Navbar'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 10,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      yoyo: Infinity, // yoyo animation to create a pulsating effect
    },
  },
};

const FileFlexWelcomePage = () => {
  return (
    <div>
      <Navbar /> {/* Include your Navbar component */}
      <div className="fileflex-welcome-page">
        <main className="main-content">
          {/* Welcome banner */}
          <section className="welcome-banner">
            <motion.h1
              className="title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <br/>
              FileFlex
            </motion.h1>
            <motion.p
              className="subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Your Document Conversion and Analysis Tool
            </motion.p>
          </section>

          {/* Features section */}
          <section className="features-section">
            {/* Feature card: Document Conversion */}
            <motion.div className="feature-card" variants={containerVariants} initial="hidden" animate="visible">
              <FontAwesomeIcon icon={faFilePdf} className="feature-icon" />
              <h2 className="feature-title">Document Conversion</h2>
              <p className="feature-description">Convert PDF files to DOCX and vice versa.</p>
              <motion.div variants={buttonVariants} whileHover="hover">
                <Link to="/homePage" className="feature-btn">Convert Now</Link>
              </motion.div>
            </motion.div>

            {/* Feature card: Document Analysis */}
            <motion.div className="feature-card" variants={containerVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
              <FontAwesomeIcon icon={faFileAlt} className="feature-icon" />
              <h2 className="feature-title">Document Analysis</h2>
              <p className="feature-description">Analyze and extract insights from documents.</p>
              <motion.div variants={buttonVariants} whileHover="hover">
                <Link to="/analyze" className="feature-btn">Analyze Document</Link>
              </motion.div>
            </motion.div>
          </section>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2024 FileFlex. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default FileFlexWelcomePage;
