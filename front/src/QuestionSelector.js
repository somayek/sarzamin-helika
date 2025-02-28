import React from "react";

const QuestionSelector = ({
  request,
  index,
  handleAnswerChange,
  currentAnswers,
}) => {
  return (
    <div className="question-selector">
      <label className="question-label">{request.currentQuestion.text}</label>
      <div>
        {currentAnswers.map((answer) => (
          <button
            key={answer.key}
            onClick={() =>
              handleAnswerChange(index, request.currentQuestion.key, answer.key)
            }
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionSelector;
