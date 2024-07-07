import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';
import { Container, Grid, Typography, Box, CircularProgress, Paper, Button } from '@mui/material';
import './Analyze.css';
import Navbar from './Navbar';

const App = () => {
  const [file, setFile] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [fullText, setFullText] = useState('');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const setPdfWorkerSrc = async () => {
      const pdfjsVersion = await getPdfjsVersion();
      GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
    };

    setPdfWorkerSrc();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFile(file);
    setWordCount(0);
    setParagraphCount(0);
    setFullText('');
    setShowResult(false);
  };

  const handleProcessClick = async () => {
    if (!file) return;
    setProcessing(true);
    setLoading(true);
    setShowResult(false);

    let text = '';
    if (file.type === 'application/pdf') {
      text = await extractTextFromPDF(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      text = await extractTextFromDocx(file);
    }

    analyzeText(text);
    setLoading(false);
    setProcessing(false);
    setShowResult(true);
  };

  const extractTextFromPDF = async (file) => {
    const fileReader = new FileReader();
    return new Promise((resolve) => {
      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await getDocument({ data: typedArray }).promise;
        let text = '';

        for (let i = 0; i < pdf.numPages; i++) {
          const page = await pdf.getPage(i + 1);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(' ');
        }

        resolve(text);
      };
      fileReader.readAsArrayBuffer(file);
    });
  };

  const extractTextFromDocx = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const analyzeText = (text) => {
    const words = text.split(/\s+/).filter((word) => word.length > 0);
    const paragraphs = text.split(/\n+/).filter((para) => para.trim().length > 0);
    setWordCount(words.length);
    setParagraphCount(paragraphs.length);
    setFullText(text);
  };

  const getPdfjsVersion = async () => {
    const { version } = require('pdfjs-dist/package.json');
    return version;
  };

  return (
    <div className="app-container">
      <Navbar />
      <Container maxWidth="lg" className="main-content">
        <Box my={4}>
          <Typography variant="h3" component="h1" align="center" gutterBottom className="typography-header">
            Document Analyzer
          </Typography>
          <Box my={2} display="flex" justifyContent="center">
            <input type="file" onChange={handleFileChange} accept=".pdf, .docx" />
          </Box>
          <Box my={2} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleProcessClick} disabled={!file || processing} className="btn-primary">
              {processing ? 'Processing...' : 'Process'}
            </Button>
          </Box>
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : (
            showResult && (
              <Grid container spacing={4} className="result-container">
                <Grid item xs={12} md={6}>
                  <Paper elevation={3} className="paper">
                    <Typography variant="h6" className="typography-header">Document Preview</Typography>
                    <Box mt={2} className="document-preview">
                      <Typography variant="body1" className="typography-body">{fullText}</Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={3} className="paper">
                    <Typography variant="h6" className="typography-header">Document Analysis</Typography>
                    <Box mt={2}>
                      <Typography variant="body1" className="typography-body"><strong>File Name:</strong> {file.name}</Typography>
                      <Typography variant="body1" className="typography-body"><strong>Word Count:</strong> {wordCount}</Typography>
                      <Typography variant="body1" className="typography-body"><strong>Paragraph Count:</strong> {paragraphCount}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )
          )}
        </Box>
      </Container>
      <footer className="footer">
        <p>&copy; 2024 FileFlex. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
