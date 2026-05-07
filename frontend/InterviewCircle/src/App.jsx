import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import InterviewCircleLanding from './Components/Landing'
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import DashboardLayout from './Components/Dashboard/DashboardLayout';
import InterviewSetup from './Components/Dashboard/InterviewSetup';
import InterviewRoom from './Components/Dashboard/InterviewRoom/InterviewRoom';
import InterviewFeedback from './Components/Dashboard/InterviewFeedback';
import QuestionBank from './Components/Dashboard/QuestionBank';
import QuestionSolver from './Components/Dashboard/QuestionSolver';
import Settings from './Components/Dashboard/Settings';
import Profile from './Components/Dashboard/Profile';
import ResumeATS from './Components/Dashboard/ResumeATS';
import LandingBackground from './Components/React-bits/LandingBackground';
import { AuthProvider } from './Context/AuthContext';
import './App.css'

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<InterviewCircleLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Dashboard Routes with Persistent Sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/questions" element={<QuestionBank />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/setup" element={<InterviewSetup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resume-ats" element={<ResumeATS />} />
        </Route>

        <Route path="/interview-room" element={<InterviewRoom />} />
        <Route path="/feedback" element={<InterviewFeedback />} />
        <Route path="/questions/:id" element={<QuestionSolver />} />
      </Routes>
    </AnimatePresence>
  );
};


function App() {
  return (
    <AuthProvider>
      <div className="bg-[#020617] min-h-screen relative overflow-hidden">
        {/* Persistent Global Background */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
          <LandingBackground 
            squareSize={50}
            borderColor="#312e81"
            hoverFillColor="#4338ca"
            hoverTrailAmount={10}
            speed={0.5}
          />
        </div>

        <div className="relative z-10">
          <Router>
            <AnimatedRoutes />
          </Router>
        </div>
      </div>
    </AuthProvider>
  )
}

export default App



