import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../utils/axios";
import OTPVerification from "../../components/common/OTPVerification";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Required"),
  password: Yup.string()
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
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const Signup = () => {
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("user");
  const navigate = useNavigate();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile_number: "",
      password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (!isEmailVerified || !isMobileVerified) {
          setError("Please verify both email and mobile number");
          return;
        }
        await axios.post("/api/users/register/", {
          ...values,
          user_type: userType,
        });
        navigate("/login", {
          state: { message: "Registration successful! Please login." },
        });
      } catch (error) {
        setError(error.response?.data?.error || "Registration failed");
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
          maxWidth: 500,
          mx: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>

        <Tabs
          value={userType}
          onChange={(_, newValue) => setUserType(newValue)}
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="User" value="user" />
          <Tab label="Admin" value="admin" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            name="name"
            label="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
            disabled={isEmailVerified}
          />
          {!isEmailVerified && formik.values.email && !formik.errors.email && (
            <OTPVerification
              type="email"
              identifier={formik.values.email}
              onVerify={(success) => setIsEmailVerified(success)}
            />
          )}
          <TextField
            fullWidth
            name="mobile_number"
            label="Mobile Number"
            value={formik.values.mobile_number}
            onChange={formik.handleChange}
            error={
              formik.touched.mobile_number &&
              Boolean(formik.errors.mobile_number)
            }
            helperText={
              formik.touched.mobile_number && formik.errors.mobile_number
            }
            margin="normal"
            disabled={isMobileVerified}
          />
          {!isMobileVerified &&
            formik.values.mobile_number &&
            !formik.errors.mobile_number && (
              <OTPVerification
                type="mobile"
                identifier={formik.values.mobile_number}
                onVerify={(success) => setIsMobileVerified(success)}
              />
            )}
          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
            sx={{ mt: 3, mb: 2 }}
            disabled={
              formik.isSubmitting || !isEmailVerified || !isMobileVerified
            }
          >
            Sign Up
          </Button>
        </form>

        <Box sx={{ textAlign: "center" }}>
          <Link component={RouterLink} to="/login" variant="body2">
            Already have an account? Login
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
