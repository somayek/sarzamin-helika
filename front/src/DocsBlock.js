import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";

import "./styles.css";
import PDFDocument from "./PDFDocument";

const DocsBlock = ({ requests, traceId }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const generatePDF = async () => {
    const doc = <PDFDocument requests={requests} traceId={traceId} />;
    const blob = await pdf(doc).toBlob();
    setPdfUrl(URL.createObjectURL(blob));
  };

  const allDocuments = requests.flatMap(
    (request, index) =>
      request.documents?.map((doc) => ({ ...doc, requestIndex: index + 1 })) ||
      []
  );
  const allCharges = requests.flatMap(
    (request, index) =>
      request.charges?.map((charge) => ({
        ...charge,
        requestIndex: index + 1,
      })) || []
  );

  return (
    <div>
      {allDocuments.length > 0 && (
        <div className="documents">
          <h3>مستندات لازم</h3>
          {requests.map(
            (request, index) =>
              request.documents &&
              request.documents.length > 0 && (
                <div key={index}>
                  <h4>
                    درخواست {index + 1} {request.name}
                  </h4>
                  <ul className="document-list">
                    {request.documents.map((doc, i) =>
                      doc.text ? (
                        <li key={i} className="document-item">
                          <span className="document-text">{doc.text}</span>
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              )
          )}
        </div>
      )}

      {allCharges.length > 0 && (
        <div className="charges">
          <h3>هزینه ها</h3>
          <table className="charges-table">
            <thead>
              <tr>
                <th>درخواست</th>
                <th>شرح</th>
                <th>مقدار</th>
                <th>واحد پول</th>
              </tr>
            </thead>
            <tbody>
              {allCharges.map((charge, i) => (
                <tr key={i}>
                  <td>درخواست {charge.requestIndex}</td>
                  <td>{charge.description}</td>
                  <td>{charge.amount}</td>
                  <td>{charge.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total-charges">
            <strong>هزینه کل:</strong> CAD{" "}
            {allCharges
              .reduce((acc, charge) => acc + parseFloat(charge.amount), 0)
              .toFixed(2)}
          </div>
        </div>
      )}

      <div>
        <button onClick={generatePDF}>ایجاد PDF</button>
        {pdfUrl && (
          <a href={pdfUrl} download={`Document_${traceId}.pdf`}>
            2دانلود
          </a>
        )}
      </div>
    </div>
  );
};

export default DocsBlock;
