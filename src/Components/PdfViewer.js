import React, { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfViewer({ pdfData }) {
  const [numPages, setNumPages] = useState(null);


  
  useEffect(() => {
    // Ensure the PDF data is an ArrayBuffer
    if (pdfData instanceof ArrayBuffer) {
      pdfjs.getDocument({ data: pdfData }).promise.then((pdf) => {
        setNumPages(pdf.numPages);
      });
    }
  }, [pdfData]);

  return (
    <div>
      {numPages && (
        <Document
          file={{ data: pdfData }}
          options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      )}
    </div>
  );
}

export default PdfViewer;
