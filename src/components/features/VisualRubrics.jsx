import React from 'react';
import { motion } from 'framer-motion';

const VisualRubrics = () => {
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Visual Rubric Analysis
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See exactly how your essay performs against each IB criterion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img   
              className="rounded-lg shadow-2xl w-full" 
              alt="Visual rubric analysis interface"
              src="https://images.unsplash.com/photo-1686061593213-98dad7c599b9" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Color-Coded Feedback</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-400 rounded mr-3"></div>
                <span className="text-gray-300">Excellent (6-7 points)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-400 rounded mr-3"></div>
                <span className="text-gray-300">Good (4-5 points)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-400 rounded mr-3"></div>
                <span className="text-gray-300">Satisfactory (2-3 points)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-400 rounded mr-3"></div>
                <span className="text-gray-300">Needs Improvement (0-1 points)</span>
              </div>
            </div>
            <p className="text-gray-400 mt-6">
              Each criterion is analyzed separately with specific feedback and improvement suggestions, 
              just like a real IB examiner would provide.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisualRubrics;