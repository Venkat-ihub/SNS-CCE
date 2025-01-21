import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import SavedJobs from "./pages/user/SavedJobs";
import JobDetails from "./pages/user/JobDetails";
import UserProfile from "./pages/user/UserProfile";
import StudyMaterial from "./pages/user/StudyMaterial";
import MNCMaterials from "./pages/user/study-materials/MNCMaterials";
import StateMaterials from "./pages/user/study-materials/StateMaterials";
import CentralMaterials from "./pages/user/study-materials/CentralMaterials";
import OtherMaterials from "./pages/user/study-materials/OtherMaterials";

// Components
import ProtectedRoute from "./components/common/ProtectedRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
          <Container maxWidth={false} disableGutters>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Admin Routes */}
              <Route
                path="/admin-home"
                element={
                  <ProtectedRoute userType="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/profile"
                element={
                  <ProtectedRoute userType="admin">
                    <AdminProfile />
                  </ProtectedRoute>
                }
              />

              {/* User Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute userType="user">
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-jobs"
                element={
                  <ProtectedRoute userType="user">
                    <SavedJobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/:id"
                element={
                  <ProtectedRoute userType="user">
                    <JobDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/profile"
                element={
                  <ProtectedRoute userType="user">
                    <UserProfile />
                  </ProtectedRoute>
                }
              />

              {/* Study Material Routes */}
              <Route
                path="/study-materials"
                element={
                  <ProtectedRoute userType="user">
                    <StudyMaterial />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/study-materials/mnc"
                element={
                  <ProtectedRoute userType="user">
                    <MNCMaterials />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/study-materials/state"
                element={
                  <ProtectedRoute userType="user">
                    <StateMaterials />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/study-materials/central"
                element={
                  <ProtectedRoute userType="user">
                    <CentralMaterials />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/study-materials/others"
                element={
                  <ProtectedRoute userType="user">
                    <OtherMaterials />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
