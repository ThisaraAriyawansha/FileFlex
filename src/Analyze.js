import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';
import './Analyze.css';

const App = () => {
  const [file, setFile] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);

  useEffect(() => {
    // Set the workerSrc for pdfjs
    const setPdfWorkerSrc = async () => {
      const pdfjsVersion = await getPdfjsVersion();
      GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
    };

    setPdfWorkerSrc();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFile(file);

    if (file.type === 'application/pdf') {
      const text = await extractTextFromPDF(file);
      analyzeText(text);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const text = await extractTextFromDocx(file);
      analyzeText(text);
    }
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
  };

  const getPdfjsVersion = async () => {
    const { version } = require('pdfjs-dist/package.json');
    return version;
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Document Analyzer</h1>
      </header>
      <main className="main-content">
        <input type="file" onChange={handleFileChange} accept=".pdf, .docx" />
        {file && (
          <div className="file-info">
            <p><strong>File Name:</strong> {file.name}</p>
            <p><strong>Word Count:</strong> {wordCount}</p>
            <p><strong>Paragraph Count:</strong> {paragraphCount}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
