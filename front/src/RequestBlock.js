import React from "react";
import QuestionSelector from "./QuestionSelector";
import "./styles.css";

const RequestBlock = ({
  request,
  index,
  handleInputChange,
  handleAnswerChange,
  currentAnswers,
  answers,
  uniqueApplications,
}) => {
  return (
    <div className="request-block">
      <h3>درخواست {request.application} {request.name}</h3>

      {!request.application && (
      <div className="input-row">
        <input
          type="text"
          placeholder="نام"
          value={request.name}
          onChange={(e) => handleInputChange(index, "name", e.target.value)}
          disabled={!!request.application}
        />
        <select
          value={request.application}
          onChange={(e) =>
            handleInputChange(index, "application", e.target.value)
          }
          disabled={!!request.application}
        >
          <option value="">نوع درخواست</option>
          {uniqueApplications.map((app, i) => (
            <option key={i} value={app.value}>
              {app.text}
            </option>
          ))}
        </select>
      </div>
      )}


      {request.answeredQuestions.length > 0 && (
        <div className="answered-questions">
          <ul>
            {request.answeredQuestions.map((item, idx) => (
              <li key={idx}><b>{`${item.question}`}</b><u> {`${item.answer}`}</u></li>
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
    </div>
  );
};

export default RequestBlock;
