import React from "react";
import RequestComponent from "./RequestComponent";

const LogComponent = ({ log }) => {
  return (
    <div className="border-b p-2">
      <strong>ID:</strong> {log._id} <br />
      <strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}{" "}
      <br />
      <h3 className="font-bold text-lg mt-2">Requests</h3>
      {log.requests.map((request, index) => (
        <RequestComponent key={index} request={request} />
      ))}
    </div>
  );
};

export default LogComponent;
