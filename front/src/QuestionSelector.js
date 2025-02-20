import React from "react";

const QuestionSelector = ({
  request,
  index,
  handleAnswerChange,
  currentAnswers,
  allQuestions,
  answers,
}) => {
  return (
    <div className="question-selector">
      <label className="question-label">{request.currentQuestion.text}</label>
      <select
        value={request.selectedAnswers[request.currentQuestion.key] || ""}
        onChange={(e) =>
          handleAnswerChange(index, request.currentQuestion.key, e.target.value)
        }
        className="answer-select"
      >
        <option value="">انتخاب کنید</option>
        {currentAnswers.map((answer) => (
          <option key={answer.key} value={answer.key}>
            {answer.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuestionSelector;
