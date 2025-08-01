import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, BarChart3, FileText, Users, CheckCircle } from 'lucide-react';

const additionalFeatures = [
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Enterprise-grade security with complete privacy protection.",
    details: ["End-to-end encryption", "No data retention", "GDPR compliant", "Secure file handling"]
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your improvement over time with detailed analytics.",
    details: ["Performance trends", "Strength identification", "Weakness tracking", "Goal setting"]
  },
  {
    icon: FileText,
    title: "Multiple Formats",
    description: "Support for Word, PDF, and text files up to 10MB.",
    details: ["Word documents", "PDF files", "Plain text", "Batch processing"]
  },
  {
    icon: Users,
    title: "School Integration",
    description: "Special features for teachers and educational institutions.",
    details: ["Teacher dashboards", "Class management", "Bulk analysis", "Progress reports"]
  }
];

const FeatureGrid = () => {
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
            More Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Additional capabilities that make IB Assessment AI the complete solution
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card feature-card-hover h-full">
                <CardHeader className="text-center">
                  <feature.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;