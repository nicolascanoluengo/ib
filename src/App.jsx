
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import PricingPage from '@/pages/PricingPage';
import FeaturesPage from '@/pages/FeaturesPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import DashboardPage from '@/pages/DashboardPage';
import ProgressPage from '@/pages/ProgressPage';
import SubmissionsPage from '@/pages/SubmissionsPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import LandingPage from '@/pages/LandingPage';
import ContactPage from '@/pages/ContactPage';
import LoadingAnalysisPage from '@/pages/LoadingAnalysisPage';
import ResultsPage from '@/pages/ResultsPage';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/loading-analysis" element={<LoadingAnalysisPage />} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/progress" element={<PrivateRoute><ProgressPage /></PrivateRoute>} />
          <Route path="/submissions" element={<PrivateRoute><SubmissionsPage /></PrivateRoute>} />
          <Route path="/results/:submissionId" element={<PrivateRoute><ResultsPage /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
