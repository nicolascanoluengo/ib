import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Zap, Download, Lock, Lightbulb, Loader2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';

const parseFeedbackText = (feedbackString) => {
  try {
    const feedbackJson = JSON.parse(feedbackString);
    const text = feedbackJson.value || '';

    const finalGradeMatch = text.match(/Final Grade:\s*(\d)\/7/);
    const compositeScoreMatch = text.match(/Composite Score:\s*(\d+)\/(\d+)/);
    
    const criteria = [];
    const criteriaRegex = /Criterion\s+([A-Z]):\s*(\d+)\/(\d+)/g;
    let match;
    while ((match = criteriaRegex.exec(text)) !== null) {
      criteria.push({
        name: `Criterion ${match[1]}`,
        score: parseInt(match[2], 10),
        maxScore: parseInt(match[3], 10),
      });
    }

    return {
      finalGrade: finalGradeMatch ? parseInt(finalGradeMatch[1], 10) : null,
      compositeScore: compositeScoreMatch ? parseInt(compositeScoreMatch[1], 10) : null,
      compositeMax: compositeScoreMatch ? parseInt(compositeScoreMatch[2], 10) : null,
      criteria,
      fullText: text,
    };
  } catch (error) {
    console.error("Error parsing feedback:", error);
    return null;
  }
};

useEffect(() => {
  const fetchSubmission = async () => {
    const { data, error } = await supabase
      .from('Submissions')
      .select('*') // o explícitamente .select('id, feedback, ...')
      .eq('id', submissionId)
      .single();

    if (error) {
      console.error('Error fetching submission:', error);
    } else {
      setSubmission(data);
    }
  };

  fetchSubmission();
}, []);


const GradeBar = ({ grade, maxGrade = 7 }) => {
  const percentage = maxGrade > 0 ? (grade / maxGrade) * 100 : 0;
  return (
    <div className="w-full h-4 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 relative">
      <div
        className="absolute top-0 h-6 w-1 bg-white rounded-full -mt-1"
        style={{ left: `calc(${percentage}% - 2px)` }}
      ></div>
    </div>
  );
};

const Criterion = ({ title, score, maxScore }) => {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  return (
    <div className="p-4 border border-white/10 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">{title}</h4>
        <span className="font-bold text-lg">{score}/{maxScore}</span>
      </div>
      <div className="w-full h-3 rounded-full bg-slate-700">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-green-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const BlurredCriterion = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="relative p-4 border border-white/10 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">{title}</h4>
        <div className="relative">
          <span className="font-bold text-lg filter blur-sm select-none text-transparent bg-gray-600 rounded">X/X</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Button onClick={() => navigate('/pricing')} size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black h-7 px-2">
              <Lock className="w-3 h-3 mr-1" />
              Reveal
            </Button>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="w-full h-3 rounded-full bg-gradient-to-r from-red-500/50 via-yellow-500/50 to-green-500/50 filter blur-sm select-none"></div>
      </div>
    </div>
  );
};

const ResultsPage = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  const feedbackData = useMemo(() => {
    if (submission && submission.feedback) {
      return parseFeedbackText(submission.feedback);
    }
    return null;
  }, [submission]);

  useEffect(() => {
    const fetchSubmission = async () => {
      if (!user || !submissionId) return;

      setLoading(true);
      const { data, error } = await supabase
        .from('Submissions')
        .select('*')
        .eq('id', submissionId)
        .eq('user_email', user.email)
        .single();

      if (error || !data) {
        toast({ title: "Error", description: "Could not fetch submission details.", variant: "destructive" });
        navigate('/submissions');
        return;
      }
      
      setSubmission(data);
      setLoading(false);
    };

    fetchSubmission();
  }, [submissionId, user, navigate, toast]);

  const handleDownload = () => {
    if (!feedbackData) return;
    const blob = new Blob([feedbackData.fullText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `IB_Report_${submissionId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-4 text-lg">Loading your results...</p>
      </div>
    );
  }

  if (!submission || !feedbackData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Could not load or parse results. Please try again.</p>
      </div>
    );
  }

  const isPremium = submission.feedback_type === 'premium';

  return (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Feedback Breakdown</h1>

    <p className="mb-4"><strong>Final Grade:</strong> {feedbackData.finalGrade ?? 'N/A'} / 7</p>
    <p className="mb-4"><strong>Composite Score:</strong> {feedbackData.compositeScore ?? 'N/A'} / {feedbackData.compositeMax ?? 'N/A'}</p>

    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">By Criterion:</h2>
      <ul className="list-disc list-inside">
        {feedbackData.criteria.map((crit, idx) => (
          <li key={idx} className="mb-1">
            {crit.name}: {crit.score} / {crit.maxScore}
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Full Feedback Text:</h2>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
        {feedbackData.fullText}
      </pre>
    </div>
  </div>
);
}

  return (
    <>
      <Helmet>
        <title>{isPremium ? 'Premium Feedback' : 'Your Free Grade'} - IB Assessment AI</title>
        <meta name="description" content="View your AI-generated IB assessment feedback." />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow flex items-center justify-center py-24 px-4 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl"
          >
            <Card className={`glass-card ${isPremium ? 'border-yellow-400/50' : ''}`}>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl md:text-4xl">{isPremium ? 'Your Premium Feedback' : 'Your Predicted Grade'}</CardTitle>
                {isPremium && (
                  <CardDescription>
                    <span className="text-yellow-400 flex items-center justify-center">
                      <Zap className="w-5 h-5 mr-2" /> One feedback round used.
                    </span>
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="text-center space-y-8">
                <div>
                  <div className="text-7xl md:text-8xl font-bold gradient-text mb-2">{feedbackData.finalGrade || 'N/A'}</div>
                  {feedbackData.compositeScore !== null && (
                    <p className="text-xl text-gray-300 mb-4">
                      Composite Score: {feedbackData.compositeScore}/{feedbackData.compositeMax}
                    </p>
                  )}
                  <GradeBar grade={feedbackData.finalGrade} maxGrade={7} />
                </div>

                {!isPremium && (
                  <Card className="bg-slate-800/50 border-blue-400/30">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg text-blue-300">
                        <Lightbulb className="w-5 h-5 mr-2" />
                        Pro Tip to Improve Your Grade
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">"Consider more implications in the audience"</p>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-4 text-left">
                  <h3 className="text-xl font-bold text-center mb-4">Criterion Breakdown</h3>
                  {isPremium ? (
                    feedbackData.criteria.map((criterion, index) => (
                      <Criterion key={index} title={criterion.name} score={criterion.score} maxScore={criterion.maxScore} />
                    ))
                  ) : (
                    feedbackData.criteria.map((criterion, index) => (
                      <BlurredCriterion key={index} title={criterion.name} />
                    ))
                  )}
                </div>

                <div className="mt-12 text-left">
                  {isPremium ? (
                    <Card className="glass-card p-6">
                      <h3 className="text-2xl font-bold mb-4">Detailed Feedback</h3>
                      <p className="text-gray-300 whitespace-pre-wrap">{feedbackData.fullText}</p>
                    </Card>
                  ) : (
                    <div className="relative">
                      <div className="p-6 border border-white/10 rounded-lg filter blur-md select-none">
                        <h3 className="text-2xl font-bold mb-4 text-transparent bg-gray-600 rounded">Detailed Feedback</h3>
                        <p className="text-transparent bg-gray-500 rounded">This detailed feedback helps you understand exactly what to do to improve your grade. Unlock it now to boost your score.</p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button onClick={() => navigate('/pricing')} size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 glow-effect">
                          <Zap className="w-5 h-5 mr-2" />
                          Unlock Full Feedback
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 justify-center mt-8">
                  <Button onClick={() => navigate('/')} size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 glow-effect">
                    <Zap className="w-5 h-5 mr-2" />
                    Analyze Another
                  </Button>
                  {isPremium && (
                    <Button onClick={handleDownload} variant="outline" size="lg" className="border-white/20 hover:bg-white/10">
                      <Download className="w-5 h-5 mr-2" />
                      Download Report
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default ResultsPage;

{submission?.feedback && (
  <div className="mt-6">
    <a
      href={submission.feedback}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
    >
      📄 Ver Feedback en PDF
    </a>
  </div>
)}

console.log('URL del feedback PDF:', submission?.feedback);
