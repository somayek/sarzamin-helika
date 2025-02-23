import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QuestionSelector from "./QuestionSelector";
import "./styles.css";
import PDFDocument from "./PDFDocument";

const RequestBlock = ({
  request,
  index,
  handleInputChange,
  handleAnswerChange,
  handleSubmit,
  currentAnswers,
  answers,
  uniqueApplications,
  traceId,
}) => {
  return (
    <div className="request-block">
      <h3>درخواست {index + 1}</h3>

      <div className="input-row">
        <input
          type="text"
          placeholder="نام"
          value={request.name}
          onChange={(e) => handleInputChange(index, "name", e.target.value)}
        />
        <select
          value={request.application}
          onChange={(e) =>
            handleInputChange(index, "application", e.target.value)
          }
        >
          <option value="">نوع درخواست</option>
          {uniqueApplications.map((app, i) => (
            <option key={i} value={app.value}>
              {app.text}
            </option>
          ))}
        </select>
      </div>

      {request.answeredQuestions.length > 0 && (
        <div className="answered-questions">
          <ul>
            {request.answeredQuestions.map((item, idx) => (
              <li key={idx}>{`${item.question}: ${item.answer}`}</li>
            ))}
          </ul>
        </div>
      )}

      {request.currentQuestion && (
        <QuestionSelector
          request={request}
          index={index}
          handleAnswerChange={handleAnswerChange}
          currentAnswers={currentAnswers}
          answers={answers}
        />
      )}

      {request.application && request.currentQuestion === null && (
        <button onClick={() => handleSubmit(index)}>دریافت لیست مدارک</button>
      )}
      {request.documents && request.documents.length > 0 && (
        <div className="documents">
          <h3>مستندات لازم</h3>
          <ul className="document-list">
            {request.documents.map(
              (doc, i) =>
                doc.text && (
                  <li key={i} className="document-item">
                    <span className="document-text">{doc.text}</span>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
      {request.charges && request.charges.length > 0 && (
        <div className="documents">
          <h3>هزینه ها</h3>
          <ul className="document-list">
            {request.charges.map(
              (charge, i) =>
                charge && (
                  <li key={i} className="document-item">
                    <span className="document-text">CAD {charge}</span>
                  </li>
                )
            )}
          </ul>

          <div className="total-charges">
            <strong>هزینه کل:</strong> CAD{" "}
            {request.charges
              .reduce((acc, charge) => acc + parseFloat(charge), 0)
              .toFixed(2)}
          </div>
        </div>
      )}

      {request.documents && request.documents.length > 0 && (
        <div>
          <PDFDownloadLink
            document={<PDFDocument request={request} traceId={traceId} />}
            fileName="request_details.pdf"
          >
            {({ loading }) => (
              <button
                className={loading ? "downloadBtnDisabled" : "downloadBtn"}
                disabled={loading}
              >
                {loading ? "در حال بارگذاری سند..." : "دانلود PDF"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default RequestBlock;
