import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { saveAs } from 'file-saver';
import htmlDocx from 'html-docx-js/dist/html-docx';
import mammoth from 'mammoth';
import './HomePage.css';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/webpack';
import { PDFDocument } from 'pdf-lib';
import Navbar from './Navbar';

registerPlugin(FilePondPluginFileValidateType);

function HomePage() {
  const [files, setFiles] = useState([]);

  const handleConvert = async () => {
    if (files.length === 0) {
      alert('Please select a file to convert');
      return;
    }

    const file = files[0].file;
    const fileType = file.type;

    try {
      if (fileType === 'application/pdf') {
        await convertPdfToDocx(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        await convertDocxToPdf(file);
      } else {
        throw new Error('Unsupported file type');
      }
    } catch (error) {
      alert(`Error converting file: ${error.message}`);
      console.error(error);
    }
  };

  const convertPdfToDocx = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdfDoc.numPages;
      let text = '';

      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        const page = await pdfDoc.getPage(pageNumber);
        const textContent = await page.getTextContent();
        textContent.items.forEach((item) => {
          text += item.str + '\n';
        });
        if (pageNumber < totalPages) {
          text += '\f';
        }
      }

      text = text.replace(/[^\x00-\x7F]/g, ' ');

      const htmlContent = `<html><body><p>${text.replace(/\n/g, '<br>')}</p></body></html>`;
      const docxBlob = htmlDocx.asBlob(htmlContent);
      saveAs(docxBlob, 'output.docx');
    } catch (error) {
      alert('Error converting PDF to DOCX');
      console.error(error);
    }
  };

  const convertDocxToPdf = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const { value: textContent } = await mammoth.extractRawText({ arrayBuffer });

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 12;

      const lines = textContent.split('\n');
      let yOffset = height - fontSize;

      lines.forEach((line) => {
        page.drawText(line, {
          x: 50,
          y: yOffset,
          size: fontSize,
          maxWidth: width - 100,
        });
        yOffset -= fontSize + 2;
      });

      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(pdfBlob, 'output.pdf');
    } catch (error) {
      alert('Error converting DOCX to PDF');
      console.error(error);
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      <h1>Document Converter</h1>
      <FilePond
        files={files}
        allowMultiple={false}
        onupdatefiles={setFiles}
        acceptedFileTypes={['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      <button className="convert-button" onClick={handleConvert}>Convert</button>
      <footer className="footer">
        <p>&copy; 2024 FileFlex. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
