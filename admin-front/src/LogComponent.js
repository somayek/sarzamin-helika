import React from "react";
import RequestComponent from "./RequestComponent";

const LogComponent = ({ log }) => {
  return (
    <div className="border-b p-2">
      <h3 className="font-bold text-lg mt-2">Requests</h3>
      <h4>شناسه پیگیری:‌{log.traceId}</h4>
      {log.requests.map((request, index) => (
        <RequestComponent key={index} request={request} />
      ))}
    </div>
  );
};

export default LogComponent;
