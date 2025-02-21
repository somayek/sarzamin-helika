import React from "react";

const QuestionComponent = ({ question }) => {
  return (
    <div className="border-b p-2">
      <strong>Question:</strong> {question.text} <br />
      <strong>Key:</strong> {question.key} <br />
      <strong>Input Type:</strong> {question.input_type} <br />
      <strong>Options:</strong>{" "}
      {question.options.length > 0 ? question.options.join(", ") : "None"}{" "}
      <br />
      <strong>Next Question Key:</strong> {question.next_question_key || "None"}{" "}
      <br />
      <strong>Created At:</strong>{" "}
      {new Date(question.createdAt).toLocaleString()} <br />
    </div>
  );
};

export default QuestionComponent;
