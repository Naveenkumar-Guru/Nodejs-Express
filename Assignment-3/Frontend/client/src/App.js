import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import VerifyOTP from "./components/pages/VerifyOTP";
import "./App.css";


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Register</Link> | <Link to="/login">Login</Link> |{" "}
        <Link to="/verify">Verify OTP</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyOTP />} />
      </Routes>
    </Router>
  );
}

export default App;
