import React, { useState, useEffect } from "react";
import "./styles.css"; // Import the CSS file

import LogComponent from "./LogComponent";
import RuleComponent from "./RuleComponent";

export default function AdminPanel() {
  const [logs, setLogs] = useState([]);
  const [rules, setRules] = useState([]);
  const [activeTab, setActiveTab] = useState("logs");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/log`)
      .then((res) => res.json())
      .then((data) => setLogs(data));

    fetch(`${process.env.REACT_APP_BACKEND_URL}/rules`)
      .then((res) => res.json())
      .then((data) => setRules(data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex border-b">
        <button
          className={`p-2 ${
            activeTab === "logs" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("logs")}
        >
          Logs
        </button>
        <button
          className={`p-2 ${
            activeTab === "rules" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("rules")}
        >
          Rules
        </button>
      </div>

      {/* Conditionally render Logs or Rules based on activeTab */}
      {activeTab === "logs" && (
        <div className="log-container">
          <h2 className="log-header">Logs</h2>
          {logs.map((log, index) => (
            <LogComponent key={index} log={log} />
          ))}
        </div>
      )}

      {activeTab === "rules" && (
        <div className="rules-container">
          <h2 className="rule-header">Rules</h2>
          {rules.map((rule, index) => (
            <RuleComponent key={index} rule={rule} />
          ))}
        </div>
      )}
    </div>
  );
}
