import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import axios from "../../utils/axios";

const OTPVerification = ({ identifier, type, onVerify }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSendOTP = async () => {
    try {
      setIsSending(true);
      setError("");
      await axios.post("/api/users/send-otp/", {
        [type]: identifier,
        type,
      });
    } catch (error) {
      setError(error.response?.data?.error || "Failed to send OTP");
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setIsVerifying(true);
      setError("");
      await axios.post("/api/users/verify-otp/", {
        [type]: identifier,
        otp,
        type,
      });
      onVerify(true);
    } catch (error) {
      setError(error.response?.data?.error || "Invalid OTP");
      onVerify(false);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
        <TextField
          size="small"
          label="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="contained"
          onClick={handleVerifyOTP}
          disabled={!otp || isVerifying}
        >
          Verify
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {type === "email" ? "Email" : "SMS"} verification required
        </Typography>
        <Button size="small" onClick={handleSendOTP} disabled={isSending}>
          {isSending ? "Sending..." : "Send OTP"}
        </Button>
      </Box>
    </Box>
  );
};

export default OTPVerification;
