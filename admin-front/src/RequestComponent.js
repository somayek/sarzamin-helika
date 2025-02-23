import React from "react";
import "./styles.css";

const RequestComponent = ({ request }) => {
  return (
    <div>
      <strong>Name:</strong> {request.name || "N/A"} <br />
      <strong>Application:</strong> {request.application} <br />
      {/* Display Selected Answers in a readable format */}
      <strong>Selected Answers:</strong>
      {request.selectedAnswers &&
      Object.keys(request.selectedAnswers).length > 0 ? (
        <ul className="custom-list">
          {Object.entries(request.selectedAnswers).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      ) : (
        <span> N/A</span>
      )}
      <br />
      <strong>Documents:</strong>{" "}
      {request.documents.length > 0 ? request.documents.join(", ") : "N/A"}{" "}
      <br />
      <strong>Charges:</strong>{" "}
      {request.charges.length > 0 ? request.charges.join(", ") : "N/A"} <br />
      <strong>Rule:</strong> {request.rule || "N/A"} <br />
      <strong>Created At:</strong>{" "}
      {request.createdAt ? new Date(request.createdAt).toLocaleString() : "N/A"}{" "}
      <br />
    </div>
  );
};

export default RequestComponent;
