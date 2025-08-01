import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Brain, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const mainFeaturesData = [
  {
    icon: Target,
    title: "IB-Specific Rubrics",
    description: "Analysis based on official IB assessment criteria for IA, EE, and TOK essays.",
    details: [
      "Official IB rubric alignment",
      "Subject-specific criteria",
      "Criterion-by-criterion breakdown",
      "Grade boundaries mapping"
    ],
    image: "AI interface showing IB rubric analysis with detailed criterion breakdown"
  },
  {
    icon: Brain,
    title: "Examiner-Level Feedback",
    description: "AI trained with real IB examiners to provide authentic, detailed feedback.",
    details: [
      "Trained on 45,000+ real essays",
      "Examiner language patterns",
      "Constructive improvement suggestions",
      "Professional tone and depth"
    ],
    image: "Professional examiner reviewing essay with detailed feedback comments"
  },
  {
    icon: Award,
    title: "Grade Prediction",
    description: "Accurate grade predictions with detailed breakdown by assessment criteria.",
    details: [
      "98% accuracy rate",
      "Confidence intervals",
      "Grade justification",
      "Improvement pathways"
    ],
    image: "Grade prediction dashboard showing score breakdown and confidence levels"
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get comprehensive feedback in under 30 seconds, not weeks.",
    details: [
      "Sub-30 second analysis",
      "Real-time processing",
      "Immediate download",
      "24/7 availability"
    ],
    image: "Stopwatch showing 30 seconds with completed analysis results"
  }
];

const MainFeatures = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {mainFeaturesData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center mb-6">
                  <feature.icon className="h-12 w-12 text-blue-400 mr-4" />
                  <h2 className="text-3xl md:text-4xl font-bold">{feature.title}</h2>
                </div>
                <p className="text-xl text-gray-300 mb-8">{feature.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="relative">
                  <img  class="rounded-lg shadow-2xl w-full" alt={`${feature.title} demonstration`} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-lg"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainFeatures;