import React from "react";

const RequestComponent = ({ request }) => {
  return (
    <div className="border-b p-2">
      <strong>Request ID:</strong> {request._id} <br />
      <strong>Name:</strong> {request.name || "N/A"} <br />
      <strong>Sex:</strong> {request.sex || "N/A"} <br />
      <strong>Application:</strong> {request.application} <br />
      <strong>Age:</strong> {request.age || "N/A"} <br />
      <strong>Selected Answers:</strong>{" "}
      {JSON.stringify(request.selectedAnswers)} <br />
      <strong>Documents:</strong> {request.documents.join(", ")} <br />
      <strong>Charges:</strong> {request.charges.join(", ")} <br />
      <strong>Rule:</strong> {request.rule} <br />
      <strong>Created At:</strong>{" "}
      {new Date(request.createdAt).toLocaleString()} <br />
      <strong>Updated At:</strong>{" "}
      {new Date(request.updatedAt).toLocaleString()} <br />
    </div>
  );
};

export default RequestComponent;
