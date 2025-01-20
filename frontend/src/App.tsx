import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css'
import LandingPage from './pages/LandingPage';
import JobOpportunities from './pages/users/JobOpportunities';
import InternOpportunities from './pages/users/InternOpportunities';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-signup" element={<Signup />} />
        <Route path="/jobs" element={<JobOpportunities />} />
        <Route path="/internships" element={<InternOpportunities />} />
      </Routes>
    </Router>
  );
};

export default App;