import React from "react";

const AnswerComponent = ({ answer }) => {
  return (
    <div className="border-b p-2">
      <strong>Answer:</strong> {answer.text} <br />
      <strong>Key:</strong> {answer.key} <br />
      <strong>Order:</strong> {answer.order} <br />
      <strong>Next Question Key:</strong> {answer.next_question_key || "None"}{" "}
      <br />
      <strong>Documents:</strong>{" "}
      {answer.documents.length > 0 ? answer.documents.join(", ") : "None"}{" "}
      <br />
      <strong>Charges:</strong>{" "}
      {answer.charges.length > 0 ? answer.charges.join(", ") : "None"} <br />
      <strong>Created At:</strong> {new Date(answer.createdAt).toLocaleString()}{" "}
    </div>
  );
};

export default AnswerComponent;
