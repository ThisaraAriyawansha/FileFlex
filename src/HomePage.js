import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { saveAs } from 'file-saver';
import htmlDocx from 'html-docx-js/dist/html-docx';
import mammoth from 'mammoth';
import converterBtnImg from './images/converterbtn.jpg'; // Correct image path
import './HomePage.css'; // Import CSS file
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/webpack'; // Correct import for pdfjs-dist
import { PDFDocument } from 'pdf-lib';

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
      console.log('Starting PDF to DOCX conversion');
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdfDoc.numPages;
      let text = '';

      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        const page = await pdfDoc.getPage(pageNumber);
        const textContent = await page.getTextContent();
        console.log(`Extracting text from page ${pageNumber}`);
        textContent.items.forEach((item) => {
          text += item.str + '\n';
        });
        if (pageNumber < totalPages) {
          text += '\f'; // Add page break character for each page except the last one
        }
      }

      console.log('Extracted text:', text);

      // Remove unsupported characters
      // eslint-disable-next-line no-control-regex
      text = text.replace(/[^\x00-\x7F]/g, ' ');

      const htmlContent = `<html><body><p>${text.replace(/\n/g, '<br>')}</p></body></html>`;
      console.log('Generated HTML content:', htmlContent);
      const docxBlob = htmlDocx.asBlob(htmlContent);
      saveAs(docxBlob, 'output.docx');
      console.log('DOCX file saved successfully');
    } catch (error) {
      alert('Error converting PDF to DOCX');
      console.error('Error details:', error);
    }
  };

  const convertDocxToPdf = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const { value: textContent } = await mammoth.extractRawText({ arrayBuffer });

      // Create a PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 12;

      // Split the text content into lines
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

      // Save the PDF document
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
      <h1>Document Converter</h1>
      <FilePond
        files={files}
        allowMultiple={false}
        onupdatefiles={setFiles}
        acceptedFileTypes={['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <img
        src={converterBtnImg}
        alt="Convert"
        onClick={handleConvert}
        className="convert-btn"
      />
    </div>
  );
}

export default HomePage;
