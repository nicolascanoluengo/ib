import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const loadingTexts = [
  "Assessing Criterion A",
  "Assessing Criterion B",
  "Assessing Criterion C",
  "Assessing Criterion D",
  "Putting Final Comments"
];

const LoadingAnalysisPage = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const analysisData = location.state || {};

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex(prevIndex => {
        if (prevIndex < loadingTexts.length - 1) {
          return prevIndex + 1;
        }
        return prevIndex;
      });
    }, 2000);

    const navigationTimeout = setTimeout(() => {
      if(analysisData.premium){
        navigate('/premium-results', { state: analysisData });
      } else {
        navigate('/free-results', { state: analysisData });
      }
    }, 10000); // Total wait time of 10 seconds

    return () => {
      clearInterval(textInterval);
      clearTimeout(navigationTimeout);
    };
  }, [navigate, analysisData]);

  return (
    <>
      <Helmet>
        <title>Analyzing Your Essay... - IB Assessment AI</title>
        <meta name="description" content="Our AI is analyzing your essay. Please wait a moment." />
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 className="h-16 w-16 text-blue-400 animate-spin mb-8" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Analyzing Your Essay...</h1>
          <div className="h-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTextIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl text-gray-300"
              >
                {loadingTexts[currentTextIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoadingAnalysisPage;