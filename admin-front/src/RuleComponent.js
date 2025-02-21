import React from "react";

const RuleComponent = ({ rule }) => {
  return (
    <div className="border-b p-2">
      <strong>Application:</strong> {rule.application} <br />
      <strong>Questions:</strong> {rule.questions.join(", ")} <br />
      <strong>Documents:</strong> {rule.documents.join(", ")} <br />
      <strong>Charges:</strong> {rule.charges.join(", ")} <br />
      <strong>Created At:</strong> {new Date(rule.createdAt).toLocaleString()}{" "}
    </div>
  );
};

export default RuleComponent;
