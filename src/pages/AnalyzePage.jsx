import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { useToast } from '@/components/ui/use-toast';

const AnalyzePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [essayType, setEssayType] = useState('');
  const [subject, setSubject] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const essayTypes = [
    { value: 'ia', label: 'Internal Assessment (IA)', price: '€4.99' },
    { value: 'ee', label: 'Extended Essay (EE)', price: '€9.99' },
    { value: 'tok', label: 'Theory of Knowledge (TOK)', price: '€4.99' }
  ];

  const subjects = [
    'Biology', 'Chemistry', 'Physics', 'Mathematics', 'Economics', 
    'Psychology', 'History', 'English', 'Geography', 'Business Management',
    'Computer Science', 'Environmental Systems', 'Philosophy', 'Art'
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a Word document, PDF, or text file.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    toast({
      title: "File uploaded successfully",
      description: `${file.name} is ready for analysis.`,
    });
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !essayType) {
      toast({
        title: "Missing information",
        description: "Please upload a file and select an essay type.",
        variant: "destructive"
      });
      return;
    }

    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to analyze your essay.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    setIsAnalyzing(true);

    // Simulate analysis process
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create mock analysis result
      const analysisResult = {
        id: Date.now(),
        title: selectedFile.name,
        type: essayTypes.find(type => type.value === essayType)?.label,
        subject: subject,
        date: new Date().toISOString(),
        grade: Math.floor(Math.random() * 3) + 5, // Random grade 5-7
        feedback: {
          overall: "Your essay demonstrates a good understanding of the topic with clear analysis and well-structured arguments.",
          criteria: [
            {
              name: "Research Question",
              score: 6,
              feedback: "Clear and focused research question that is appropriate for the subject."
            },
            {
              name: "Analysis",
              score: 5,
              feedback: "Good analysis with room for deeper critical thinking."
            },
            {
              name: "Conclusion",
              score: 6,
              feedback: "Well-structured conclusion that addresses the research question."
            }
          ]
        }
      };

      // Save to localStorage
      const existingAnalyses = JSON.parse(localStorage.getItem('analyses') || '[]');
      existingAnalyses.unshift(analysisResult);
      localStorage.setItem('analyses', JSON.stringify(existingAnalyses));

      toast({
        title: "Analysis complete!",
        description: "Your essay has been analyzed successfully.",
      });

      navigate('/results', { state: { analysis: analysisResult } });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Analyze Essay - IB Assessment AI | Upload & Get Instant Feedback</title>
        <meta name="description" content="Upload your IB essay for instant AI analysis. Get examiner-level feedback on IA, EE, and TOK essays in under 30 seconds." />
      </Helmet>

      <Navigation />

      <div className="pt-24 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Analyze Your <span className="gradient-text">IB Essay</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Get examiner-level feedback in under 30 seconds
            </p>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              <CheckCircle className="h-4 w-4 mr-1" />
              Secure & Private Analysis
            </Badge>
          </motion.div>

          <div className="space-y-8">
            {/* File Upload */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-blue-400" />
                    Upload Your Essay
                  </CardTitle>
                  <CardDescription>
                    Supports Word documents, PDFs, and text files up to 10MB
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive 
                        ? 'border-blue-400 bg-blue-400/10' 
                        : selectedFile 
                          ? 'border-green-400 bg-green-400/10' 
                          : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {selectedFile ? (
                      <div className="space-y-4">
                        <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
                        <div>
                          <p className="text-lg font-semibold text-green-400">{selectedFile.name}</p>
                          <p className="text-sm text-gray-400">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedFile(null)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove file
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-lg font-semibold mb-2">
                            Drag and drop your essay here
                          </p>
                          <p className="text-gray-400 mb-4">or</p>
                          <Button
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="border-white/20 hover:bg-white/10"
                          >
                            Browse Files
                          </Button>
                        </div>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx,.doc,.txt"
                      onChange={handleFileInputChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Essay Type Selection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Essay Type</CardTitle>
                  <CardDescription>
                    Select the type of IB assessment you're submitting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {essayTypes.map((type) => (
                      <div
                        key={type.value}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          essayType === type.value
                            ? 'border-blue-400 bg-blue-400/10'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                        onClick={() => setEssayType(type.value)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{type.label}</h3>
                          <Badge className="bg-blue-500/20 text-blue-300">
                            {type.price}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">
                          {type.value === 'ia' && 'Individual investigation in your chosen subject'}
                          {type.value === 'ee' && '4,000-word independent research essay'}
                          {type.value === 'tok' && 'Theory of Knowledge essay on prescribed titles'}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Subject Selection (for IA) */}
            {essayType === 'ia' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Subject</CardTitle>
                    <CardDescription>
                      Select the subject for your Internal Assessment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {subjects.map((subjectOption) => (
                        <Button
                          key={subjectOption}
                          variant={subject === subjectOption ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSubject(subjectOption)}
                          className={`${
                            subject === subjectOption 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                              : 'border-white/20 hover:bg-white/10'
                          }`}
                        >
                          {subjectOption}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Analysis Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <Card className="glass-card border-blue-500/30 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Ready to Analyze?</h3>
                      <p className="text-gray-300">
                        Your essay will be analyzed against official IB rubrics in under 30 seconds
                      </p>
                    </div>
                    
                    {selectedFile && essayType && (
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {selectedFile.name}
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {essayTypes.find(type => type.value === essayType)?.label}
                        </div>
                        {subject && (
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {subject}
                          </div>
                        )}
                      </div>
                    )}

                    <Button
                      size="lg"
                      onClick={handleAnalyze}
                      disabled={!selectedFile || !essayType || isAnalyzing || (essayType === 'ia' && !subject)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4 glow-effect disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing Essay...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Start Analysis
                        </>
                      )}
                    </Button>

                    {(!selectedFile || !essayType || (essayType === 'ia' && !subject)) && (
                      <div className="flex items-center justify-center text-sm text-yellow-400">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Please complete all required fields above
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyzePage;