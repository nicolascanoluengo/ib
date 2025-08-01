import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const TOKStep = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-3xl font-bold mb-8">Select TOK Component</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Card className="glass-card p-6 cursor-pointer h-full" onClick={() => onComplete({ tok_type: 'Exhibition' })}>
            <CardContent className="p-0 text-center">
              <h3 className="text-2xl font-bold">Exhibition</h3>
              <p className="text-gray-400">Analysis of 3 objects.</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Card className="glass-card p-6 cursor-pointer h-full" onClick={() => onComplete({ tok_type: 'Essay' })}>
            <CardContent className="p-0 text-center">
              <h3 className="text-2xl font-bold">Essay</h3>
              <p className="text-gray-400">Response to a prescribed title.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TOKStep;