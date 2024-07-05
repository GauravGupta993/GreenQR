import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Scan from "./Components/Scan";
import Feedback from "./Components/Feedback";

import Button from "@mui/material/Button";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
      {/* <Button variant="contained">Hello world</Button> */}
    </div>
  );
}

export default App;
