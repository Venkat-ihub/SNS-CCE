import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import JobOpportunities from "./pages/users/JobOpportunities";
import InternOpportunities from "./pages/users/InternOpportunities";
import Footer from "./components/common/Footer";
import { AppRoutes } from "./components/common/constants";

function App() {
  const noFooterRoutes = ["/login", "/admin-login", "/signup", "/admin-signup"];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path={AppRoutes.login} element={<Login />} />
        <Route path={AppRoutes.adminLogin} element={<Login />} />
        <Route path={AppRoutes.register} element={<Signup />} />
        <Route path={AppRoutes.adminSignup} element={<Signup />} />
        <Route path={AppRoutes.jobs} element={<JobOpportunities />} />
        <Route path={AppRoutes.internships} element={<InternOpportunities />} />
      </Routes>
      {/* Conditionally render the footer */}
      {!noFooterRoutes.includes(location.pathname) && <Footer />}
    </Router>
  );
}

export default App;
