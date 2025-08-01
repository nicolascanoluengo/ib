import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, BrainCircuit, FileCheck2, Star } from 'lucide-react';

const mechanismPoints = [
  {
    icon: GraduationCap,
    title: "Trained by 45-Scorers & Examiners",
    description: "Our core team consists of IB graduates who achieved perfect 45/45 scores, current IB examiners, and experienced teachers. They provide the human expertise that guides our AI's development."
  },
  {
    icon: BookOpen,
    title: "Proprietary IB Knowledge Base",
    description: "Our AI is trained on a unique dataset built from key IB resources to ensure the most accurate and effective feedback. This includes:",
    subPoints: [
      "Deeply analyzed rubrics for every criterion",
      "All official examiner reports, with emphasis on recent trends",
      "Proven checklists developed by experienced IB teachers",
      "Exclusive tips from 45-scoring students on acing each criterion",
      "Extensive analysis of past high-scoring sample essays"
    ]
  },
  {
    icon: FileCheck2,
    title: "Analysis of 10,000+ Sample Essays",
    description: "Our AI has been trained on over 10,000 anonymized essays across all grade bands (from 1 to 7), learning the subtle patterns that distinguish a top-scoring paper from an average one."
  },
  {
    icon: BrainCircuit,
    title: "Continuous Learning Loop",
    description: "The AI constantly refines its understanding. Every piece of feedback is cross-referenced with our expert guidelines, ensuring the advice you get is always accurate, relevant, and up-to-date."
  }
];

const Mechanism = () => {
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
            The Mechanism: How We Achieve Examiner-Level Accuracy
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our advantage lies in the quality of our data and the expertise of our team. Here’s what powers our AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mechanismPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card feature-card-hover h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <point.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{point.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{point.description}</p>
                  {point.subPoints && (
                    <ul className="mt-4 space-y-2">
                      {point.subPoints.map((subPoint, subIndex) => (
                        <li key={subIndex} className="flex items-start text-gray-300">
                          <Star className="h-4 w-4 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                          <span>{subPoint}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mechanism;