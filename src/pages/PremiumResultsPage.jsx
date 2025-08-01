
import React from 'react';
import { Navigate } from 'react-router-dom';

// This page is deprecated and its logic has been moved to ResultsPage.jsx
// It now just redirects to the new generic results page.
const PremiumResultsPage = () => {
  return <Navigate to="/dashboard" replace />;
};

export default PremiumResultsPage;
