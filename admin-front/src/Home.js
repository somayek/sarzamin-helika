import React, { useState, useEffect } from "react";
import LogComponent from "./LogComponent";
import RuleComponent from "./RuleComponent";
import DocumentComponent from "./DocumentComponent";
import QuestionComponent from "./QuestionComponent";
import AnswerComponent from "./AnswerComponent";

import "./styles.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("logs");
  const [logs, setLogs] = useState([]);
  const [rules, setRules] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const backend = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const logResponse = await fetch(`${backend}/log`);
        const ruleResponse = await fetch(`${backend}/rules`);
        const questionResponse = await fetch(`${backend}/questions`);
        const answerResponse = await fetch(`${backend}/answers`);
        const documentResponse = await fetch(`${backend}/documents`);

        const logsData = await logResponse.json();
        const rulesData = await ruleResponse.json();
        const questionsData = await questionResponse.json();
        const answersData = await answerResponse.json();
        const documentsData = await documentResponse.json();

        setLogs(logsData);
        setRules(rulesData);
        setQuestions(questionsData);
        setAnswers(answersData);
        setDocuments(documentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="tabs">
        <button onClick={() => setActiveTab("logs")}>Logs</button>
        <button onClick={() => setActiveTab("rules")}>Rules</button>
        <button onClick={() => setActiveTab("questions")}>Questions</button>
        <button onClick={() => setActiveTab("answers")}>Answers</button>
        <button onClick={() => setActiveTab("documents")}>Documents</button>
      </div>

      <div className="tab-content">
        {activeTab === "logs" && <LogTab data={logs} />}
        {activeTab === "rules" && <RuleTab data={rules} />}
        {activeTab === "questions" && <QuestionTab data={questions} />}
        {activeTab === "answers" && <AnswerTab data={answers} />}
        {activeTab === "documents" && <DocumentTab data={documents} />}
      </div>
    </div>
  );
};

const LogTab = ({ data }) => {
  return (
    <div className="log-tab">
      <h2>Logs</h2>
      <ul>
        {data.map((log, index) => (
          <div key={index}>
            <LogComponent log={log} />
            {index < data.length - 1 && <hr className="my-2 border-gray-300" />}
          </div>
        ))}
      </ul>
    </div>
  );
};
const RuleTab = ({ data }) => {
  return (
    <div className="rule-tab">
      <h2>Rules</h2>
      <ul>
        {data.map((rule, index) => (
          <div key={index}>
            <RuleComponent rule={rule} />
            {index < data.length - 1 && <hr className="my-2 border-gray-300" />}
          </div>
        ))}
      </ul>
    </div>
  );
};
const QuestionTab = ({ data }) => {
  return (
    <div className="question-tab">
      <h2>Questions</h2>
      <ul>
        {data.map((question, index) => (
          <div key={index}>
            <QuestionComponent question={question} />
            {index < data.length - 1 && <hr className="my-2 border-gray-300" />}
          </div>
        ))}
      </ul>
    </div>
  );
};
const AnswerTab = ({ data }) => {
  return (
    <div className="answer-tab">
      <h2>Answers</h2>
      <ul>
        {data.map((answer, index) => (
          <div key={index}>
            <AnswerComponent answer={answer} />
            {index < data.length - 1 && <hr className="my-2 border-gray-300" />}
          </div>
        ))}
      </ul>
    </div>
  );
};
const DocumentTab = ({ data }) => {
  return (
    <div className="document-tab">
      <h2>Documents</h2>
      <ul>
        {data.map((document, index) => (
          <div key={index}>
            <DocumentComponent document={document} />
            {index < data.length - 1 && <hr className="my-2 border-gray-300" />}
          </div>
        ))}
      </ul>
    </div>
  );
};
export default App;
