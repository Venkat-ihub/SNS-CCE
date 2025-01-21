import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../utils/axios";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
});

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("/api/users/forgot-password/", values);
        setSuccess("Password reset instructions have been sent to your email.");
        setError("");
      } catch (error) {
        setError(error.response?.data?.error || "Failed to process request");
        setSuccess("");
      }
    },
  });

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
          Forgot Password
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting}
          >
            Reset Password
          </Button>
        </form>

        <Box sx={{ textAlign: "center" }}>
          <Link component={RouterLink} to="/login" variant="body2">
            Back to Login
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
