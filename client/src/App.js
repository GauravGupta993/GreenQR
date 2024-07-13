import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Scan from "./Components/Scan";
import LandingPage from './LandingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scan" element={<Scan />} />
        {/* <Route path="/feedback" element={<Feedback />} /> */}
        <Route path="/content" element={<Content />} />
      </Routes>
    </div>
  );
}

export default App;
