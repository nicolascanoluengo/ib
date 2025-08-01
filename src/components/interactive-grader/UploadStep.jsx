import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Upload, X, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const UploadStep = ({ onComplete, onBack }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [language, setLanguage] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

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
    ];
    if (!allowedTypes.includes(file.type)) {
      toast({ title: "Invalid file type", description: "Please upload a PDF file.", variant: "destructive" });
      return;
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB
      toast({ title: "File too large", description: "Please upload a file smaller than 10MB.", variant: "destructive" });
      return;
    }
    setSelectedFile(file);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleComplete = () => {
    if (selectedFile && language) {
      onComplete({ file: selectedFile, language });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8">Upload Your Document</h2>
      
      <div className="space-y-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-blue-400 bg-blue-400/10' : selectedFile ? 'border-green-400 bg-green-400/10' : 'border-gray-600 hover:border-gray-500'
          }`}
          onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="space-y-4">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
              <div>
                <p className="text-lg font-semibold text-green-400">{selectedFile.name}</p>
                <p className="text-sm text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)} className="text-gray-400 hover:text-white">
                <X className="h-4 w-4 mr-2" /> Remove file
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-semibold mb-2">Drag and drop your essay here</p>
                <p className="text-gray-400 mb-4">or</p>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="border-white/20 hover:bg-white/10">
                  Browse Files
                </Button>
              </div>
            </div>
          )}
          <input ref={fileInputRef} type="file" className="hidden" accept=".pdf" onChange={handleFileInputChange} />
        </div>
        
        <div className="text-left">
          <Label>Language of Submission</Label>
          <Select onValueChange={setLanguage} value={language}>
            <SelectTrigger className="w-full bg-slate-800/50 border-white/20">
              <SelectValue placeholder="Choose language..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex gap-4 justify-center">
        <Button variant="link" onClick={onBack} className="mt-8 text-gray-400">Go Back</Button>
        <Button onClick={handleComplete} disabled={!selectedFile || !language} className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600">
          Next
        </Button>
      </div>
    </motion.div>
  );
};

export default UploadStep;