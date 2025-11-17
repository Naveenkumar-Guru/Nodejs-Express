import React, { useState } from "react";
import API from "../Api";

function VerifyOTP() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const handleSendOTP = async () => {
    try {
      const res = await API.post("/otp/send", { email });
      setMsg(res.data.msg);
    } catch (error) {
      setMsg(error.response?.data?.msg || "Error sending OTP");
    }
  };

  const handleVerify = async () => {
    try {
      const res = await API.post("/otp/verify", { email, code });
      setMsg(res.data.msg);
    } catch (error) {
      setMsg(error.response?.data?.msg || "Error verifying OTP");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendOTP}>Send OTP</button>
      <br />
      <br />
      <input
        type="text"
        placeholder="Enter OTP"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
      <p>{msg}</p>
    </div>
  );
}

export default VerifyOTP;
