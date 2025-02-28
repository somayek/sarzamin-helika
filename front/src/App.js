import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Questionnaire from "./Questionnaire";
import ContactInfo from "./ContactInfo";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>خدمات کنسولی سرزمین - هلیکا</h1>
        <Routes>
          <Route path="/" element={<Questionnaire />} />
          <Route path="/contact-info" element={<ContactInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
