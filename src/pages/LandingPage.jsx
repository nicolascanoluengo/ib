import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AssessmentTypeStep from '@/components/interactive-grader/AssessmentTypeStep';
import IAStep from '@/components/interactive-grader/IAStep';
import TOKStep from '@/components/interactive-grader/TOKStep';
import EEStep from '@/components/interactive-grader/EEStep';
import UploadStep from '@/components/interactive-grader/UploadStep';
import FeedbackOptionsStep from '@/components/interactive-grader/FeedbackOptionsStep';


const LandingPage = () => {
  const [step, setStep] = useState('assessmentType');
  const [submissionData, setSubmissionData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, feedbackRounds, setFeedbackRounds } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const paddingTopClass = user ? 'pt-32' : 'pt-24';

  const updateSubmissionData = (data) => {
    setSubmissionData(prev => ({ ...prev, ...data }));
  };
  
  const handleNextStep = (nextStep, data) => {
    updateSubmissionData(data);
    setStep(nextStep);
  };
  
  const handleBack = () => {
    if (isLoading) return;
    switch (step) {
      case 'feedbackOptions':
        setStep('upload');
        break;
      case 'upload':
        if (submissionData.type === 'IAs') setStep('iaDetails');
        else if (submissionData.type === 'TOK') setStep('tokDetails');
        else if (submissionData.type === 'EE') setStep('eeDetails');
        else setStep('assessmentType');
        break;
      case 'iaDetails':
      case 'tokDetails':
      case 'eeDetails':
        setStep('assessmentType');
        break;
      default:
        setStep('assessmentType');
    }
  };

  const handleFinalSubmit = async (feedbackType) => {
    if (isLoading) return;

    if (!user) {
        toast({ title: "Authentication Required", description: "Please log in or sign up to submit your essay.", variant: "destructive" });
        return navigate('/login');
    }

    if (feedbackType === 'premium' && feedbackRounds <= 0) {
        toast({ title: "No Feedback Rounds Left", description: "Please purchase more feedback rounds to get premium feedback.", variant: "destructive" });
        return navigate('/pricing');
    }
    
    setIsLoading(true);
    toast({ title: "Submitting...", description: "Please wait while we upload your file and process your request." });

    const finalData = { ...submissionData, feedback_type: feedbackType };

    // 1. Upload file to Supabase Storage
    const file = finalData.file;
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    
    const { data: uploadResult, error: uploadError } = await supabase.storage
      .from('submissions')
      .upload(fileName, file);

    if (uploadError) {
      toast({ title: "File Upload Failed", description: uploadError.message, variant: "destructive" });
      setIsLoading(false);
      return;
    }

    // 2. Get public URL
    const { data: urlData } = supabase.storage.from('submissions').getPublicUrl(uploadResult.path);
    
    // 3. Insert into 'Submissions' table. The trigger will handle the webhook.
    const { error: insertError } = await supabase
      .from('Submissions')
      .insert([{
        user_email: user.email,
        type: finalData.type,
        group: finalData.group || null,
        subject: finalData.subject || null,
        level: finalData.level || null,
        tok_type: finalData.tok_type || null,
        file_url: urlData.publicUrl,
        feedback_type: finalData.feedback_type,
        language: finalData.language || 'English',
        status: 'pending'
      }]);
      
    if (insertError) {
      toast({ title: "Submission Failed", description: `Database error: ${insertError.message}`, variant: "destructive" });
      setIsLoading(false);
      return;
    }

    if (feedbackType === 'premium') {
      const newRoundCount = feedbackRounds - 1;
      setFeedbackRounds(newRoundCount); 
      // In a real app, you'd update this in the database as well for the user
    }
    
    setIsLoading(false);
    toast({ title: "Submission Successful!", description: "Your essay has been submitted for analysis. This may take a few minutes. You can check the status on your submissions page." });
    navigate('/submissions');
  };

  const renderStep = () => {
    switch (step) {
      case 'assessmentType':
        return <AssessmentTypeStep onSelect={(type) => handleNextStep(type === 'IAs' ? 'iaDetails' : type === 'TOK' ? 'tokDetails' : 'eeDetails', { type })} />;
      case 'iaDetails':
        return <IAStep onComplete={(data) => handleNextStep('upload', data)} />;
      case 'tokDetails':
        return <TOKStep onComplete={(data) => handleNextStep('upload', data)} />;
      case 'eeDetails':
        return <EEStep onComplete={(data) => handleNextStep('upload', data)} />;
      case 'upload':
        return <UploadStep onComplete={(data) => handleNextStep('feedbackOptions', data)} onBack={handleBack} />;
      case 'feedbackOptions':
        return <FeedbackOptionsStep onSubmit={handleFinalSubmit} onBack={handleBack} isLoading={isLoading} />;
      default:
        return <AssessmentTypeStep onSelect={(type) => handleNextStep(type === 'IAs' ? 'iaDetails' : type === 'TOK' ? 'tokDetails' : 'eeDetails', { type })} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Get Instant IB Feedback - IB Assessment AI</title>
        <meta name="description" content="The fastest way to get your IB essays graded. Select your assessment type and get instant feedback from our AI trained by IB examiners." />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className={`flex-grow flex items-center justify-center py-24 px-4 ${paddingTopClass}`}>
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;