import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Questionnaire from "./Questionnaire";
import ContactInfo from "./ContactInfo";
import VideoRecording from "./VideoRecording";
import PhotoCapture from "./PhotoCapture";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>خدمات کنسولی سرزمین - هلیکا</h1>
        <Routes>
          <Route path="/" element={<Questionnaire />} />
          <Route path="/contact-info" element={<ContactInfo />} />
          <Route path="/video-recording" element={<VideoRecording />} />
          <Route path="/photo-capture" element={<PhotoCapture />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
