import React from "react";
import RequestComponent from "./RequestComponent";

const LogComponent = ({ log }) => {
  return (
    <div className="border-b p-2">
      <h3 className="font-bold text-lg mt-2">
        Requests: {log.requests.length}
      </h3>
      <h4>شناسه پیگیری:‌{log.traceId}</h4>
      {log.requests.map((request, index) => (
        <div>
          <RequestComponent key={index} request={request} />
          {index < log.requests.length - 1 && <hr className="dotted-hr" />}
        </div>
      ))}
    </div>
  );
};

export default LogComponent;
