import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Loader2 } from 'lucide-react';

const FeedbackOptionsStep = ({ onSubmit, onBack, isLoading }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-3xl font-bold mb-8">Choose Your Feedback Level</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Card className="glass-card p-6 cursor-pointer h-full" onClick={() => !isLoading && onSubmit('free')}>
            <CardContent className="p-0 text-center">
              <h3 className="text-2xl font-bold mb-2">Free Score</h3>
              <p className="text-gray-400 mb-4">Get a quick, AI-predicted grade for your work.</p>
              <Button variant="outline" className="w-full border-white/20 hover:bg-white/10" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...</> : 'Get Free Score'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Card className="glass-card p-6 cursor-pointer h-full border-yellow-400/50" onClick={() => !isLoading && onSubmit('premium')}>
            <CardContent className="p-0 text-center">
              <h3 className="text-2xl font-bold mb-2 flex items-center justify-center text-yellow-400">
                <Zap className="w-6 h-6 mr-2 fill-yellow-400" />
                Sophisticated Feedback
              </h3>
              <p className="text-gray-400 mb-4">Receive a detailed, criterion-by-criterion analysis.</p>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...</> : 'Get Full Feedback'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Button variant="link" onClick={onBack} className="mt-8 text-gray-400" disabled={isLoading}>Go Back</Button>
    </motion.div>
  );
};

export default FeedbackOptionsStep;