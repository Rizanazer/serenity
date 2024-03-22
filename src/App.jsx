import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "pages/login_signup/loginsignup";
import Home from "pages/Home/Home";

function App() {

  return <Router>
    <Routes>
      <Route path="/" element={<Login />} />
       <Route path="/dashboard" element={<Home />} />
    </Routes>
  </Router>
}

export default App;
