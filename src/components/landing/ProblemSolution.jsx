import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const ProblemSolution = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Pain of IB Essays is Real. <br />
              <span className="gradient-text">So is the Solution.</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              You spend months writing, rewriting, and stressing over your essays, with little to no feedback. Is it good enough? Will it score a 7? This uncertainty is the biggest hurdle.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <span className="text-gray-300">Eliminate grade uncertainty with precise predictions.</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <span className="text-gray-300">Get instant feedback, not weeks of waiting for a teacher.</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <span className="text-gray-300">Access examiner-level insights without the high cost of tutors.</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img  class="rounded-lg shadow-2xl animate-float" alt="Student looking confident and relieved after using the AI tool" src="https://images.unsplash.com/photo-1525103781435-f2643ea8306b" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;