import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Scan from "./components/Scan";
import Feedback from "./components/Feedback";
import Content from "./components/Content";
import LandingPage from './LandingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scan" element={<Scan />} />
        {/* <Route path="/feedback" element={<Feedback />} />
        <Route path="/content" element={<Content />} /> */}
      </Routes>
    </div>
  );
}

export default App;
