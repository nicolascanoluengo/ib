import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
            Our Methodology
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The Science Behind Your <span className="gradient-text">Top Score</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Our AI isn't just smart—it's IB-smart. Learn how we've encoded the expertise of top examiners into our platform.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Header;