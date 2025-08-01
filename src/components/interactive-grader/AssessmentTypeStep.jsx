import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Microscope, BrainCircuit } from 'lucide-react';
const assessmentTypes = [{
  name: 'IAs',
  icon: Microscope,
  description: 'Internal Assessments'
}, {
  name: 'EE',
  icon: Book,
  description: 'Extended Essay'
}, {
  name: 'TOK',
  icon: BrainCircuit,
  description: 'Theory of Knowledge'
}];
const AssessmentTypeStep = ({
  onSelect
}) => {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: -20
  }} transition={{
    duration: 0.5
  }} className="text-center">
      <h2 className="text-3xl font-bold mb-2">Get Instant Examiner-Level Feedback On Your IB Paper</h2>
      <p className="text-xl text-gray-400 mb-8">What would you like to get graded?</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {assessmentTypes.map(type => <motion.div key={type.name} whileHover={{
        y: -5,
        scale: 1.05
      }} transition={{
        type: 'spring',
        stiffness: 300
      }}>
            <Card className="glass-card p-6 cursor-pointer h-full flex flex-col items-center justify-center" onClick={() => onSelect(type.name)}>
              <CardContent className="p-0 flex flex-col items-center justify-center text-center">
                <type.icon className="w-16 h-16 mb-4 text-blue-400" />
                <p className="text-2xl font-bold">{type.name}</p>
                <p className="text-gray-400">{type.description}</p>
              </CardContent>
            </Card>
          </motion.div>)}
      </div>
    </motion.div>;
};
export default AssessmentTypeStep;