import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const comparisonTools = [
  {
    tool: "ChatGPT",
    limitations: ["Generic feedback", "No IB knowledge", "Inconsistent quality", "No grade prediction"],
    ourAdvantage: "IB-specific training with examiner-level feedback"
  },
  {
    tool: "Grammarly",
    limitations: ["Grammar only", "No content analysis", "No IB rubrics", "Surface-level feedback"],
    ourAdvantage: "Deep content analysis with IB rubric alignment"
  },
  {
    tool: "Traditional Tutoring",
    limitations: ["Expensive (€50-100/hour)", "Scheduling conflicts", "Variable quality", "Slow turnaround"],
    ourAdvantage: "Instant, consistent, affordable examiner-level feedback"
  }
];

const Comparison = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Choose <span className="gradient-text">IB Assessment AI</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how we compare to other tools and services
          </p>
        </motion.div>

        <div className="space-y-8">
          {comparisonTools.map((comparison, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-red-400">{comparison.tool}</h3>
                      <h4 className="text-lg font-semibold mb-4 text-gray-400">Limitations:</h4>
                      <ul className="space-y-2">
                        {comparison.limitations.map((limitation, limitationIndex) => (
                          <li key={limitationIndex} className="flex items-center text-gray-300">
                            <div className="h-2 w-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></div>
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 gradient-text">IB Assessment AI</h3>
                      <h4 className="text-lg font-semibold mb-4 text-gray-400">Our Advantage:</h4>
                      <div className="flex items-center text-green-400">
                        <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                        <span className="text-lg">{comparison.ourAdvantage}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comparison;