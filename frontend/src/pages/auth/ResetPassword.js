import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../utils/axios";

const validationSchema = Yup.object({
  otp: Yup.string().required("Required"),
  new_password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .required("Required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Passwords must match")
    .required("Required"),
});

const ResetPassword = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  const formik = useFormik({
    initialValues: {
      otp: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("/api/users/reset-password/", {
          email,
          otp: values.otp,
          new_password: values.new_password,
        });
        navigate("/login", {
          state: {
            message:
              "Password reset successful! Please login with your new password.",
          },
        });
      } catch (error) {
        setError(error.response?.data?.error || "Failed to reset password");
      }
    },
  });

  if (!email) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="error">Invalid reset password link</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          mx: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Reset Password
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            name="otp"
            label="Enter OTP"
            value={formik.values.otp}
            onChange={formik.handleChange}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
            margin="normal"
          />
          <TextField
            fullWidth
            name="new_password"
            label="New Password"
            type="password"
            value={formik.values.new_password}
            onChange={formik.handleChange}
            error={
              formik.touched.new_password && Boolean(formik.errors.new_password)
            }
            helperText={
              formik.touched.new_password && formik.errors.new_password
            }
            margin="normal"
          />
          <TextField
            fullWidth
            name="confirm_password"
            label="Confirm Password"
            type="password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            error={
              formik.touched.confirm_password &&
              Boolean(formik.errors.confirm_password)
            }
            helperText={
              formik.touched.confirm_password && formik.errors.confirm_password
            }
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={formik.isSubmitting}
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
