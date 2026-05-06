import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import InterviewCircleLanding from './Components/Landing'
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import InterviewSetup from './Components/Dashboard/InterviewSetup';
import InterviewRoom from './Components/Dashboard/InterviewRoom';
import InterviewFeedback from './Components/Dashboard/InterviewFeedback';
import QuestionBank from './Components/Dashboard/QuestionBank';
import QuestionSolver from './Components/Dashboard/QuestionSolver';
import Settings from './Components/Dashboard/Settings';
import './App.css'

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<InterviewCircleLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/setup" element={<InterviewSetup />} />
        <Route path="/interview-room" element={<InterviewRoom />} />
        <Route path="/feedback" element={<InterviewFeedback />} />
        <Route path="/questions" element={<QuestionBank />} />
        <Route path="/questions/:id" element={<QuestionSolver />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AnimatePresence>
  );
};


function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  )
}

export default App



