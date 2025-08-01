import React from 'react';
import { motion } from 'framer-motion';

const statsData = [
    { number: "75,000+", label: "Students Empowered" },
    { number: "98%", label: "Accuracy vs. Examiners" },
    { number: "170+", label: "Countries" },
    { number: "4.9/5", label: "Average Rating" }
];

const Stats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
    >
      {statsData.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            {stat.number}
          </div>
          <div className="text-gray-400">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
};

export default Stats;