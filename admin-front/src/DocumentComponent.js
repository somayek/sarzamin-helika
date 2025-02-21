import React from "react";

const DocumentComponent = ({ document }) => {
  return (
    <div className="border-b p-2">
      <strong>Document:</strong> {document.text} <br />
      <strong>Key:</strong> {document.key} <br />
    </div>
  );
};

export default DocumentComponent;
