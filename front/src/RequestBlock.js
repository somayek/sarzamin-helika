import React from "react";
import QuestionSelector from "./QuestionSelector";

const RequestBlock = ({
  request,
  index,
  handleInputChange,
  handleAnswerChange,
  handleSubmit,
  currentAnswers,
  allQuestions,
  answers,
  uniqueApplications,
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
      </div>

      <div className="input-row">
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
          <h3>پاسخ های شما</h3>
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
          <h3>هزینه ها</h3>
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
        </div>
      )}
    </div>
  );
};

export default RequestBlock;
