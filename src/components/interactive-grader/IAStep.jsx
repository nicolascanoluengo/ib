import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const iaGroups = {
  'Group 1: Studies in Language and Literature': ['English A: Literature', 'English A: Language and Literature', 'Spanish A: Literature'],
  'Group 2: Language Acquisition': ['English B', 'Spanish B', 'French B', 'German B'],
  'Group 3: Individuals and Societies': ['History', 'Geography', 'Economics', 'Business Management', 'Psychology', 'Global Politics'],
  'Group 4: Sciences': ['Biology', 'Chemistry', 'Physics', 'Computer Science', 'Design Technology'],
  'Group 5: Mathematics': ['Mathematics: Analysis and Approaches', 'Mathematics: Applications and Interpretation'],
  'Group 6: The Arts': ['Visual Arts', 'Music', 'Theatre'],
};

const IAStep = ({ onComplete }) => {
  const [group, setGroup] = useState('');
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');

  const handleComplete = () => {
    if (group && subject && level) {
      onComplete({ group, subject, level });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8">Internal Assessment Details</h2>
      <div className="space-y-6 text-left">
        <div>
          <Label>Select Group</Label>
          <Select onValueChange={setGroup} value={group}>
            <SelectTrigger className="w-full bg-slate-800/50 border-white/20">
              <SelectValue placeholder="Choose your subject group..." />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(iaGroups).map((groupName) => (
                <SelectItem key={groupName} value={groupName}>{groupName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {group && (
          <div>
            <Label>Select Subject</Label>
            <Select onValueChange={setSubject} value={subject} disabled={!group}>
              <SelectTrigger className="w-full bg-slate-800/50 border-white/20">
                <SelectValue placeholder="Choose your subject..." />
              </SelectTrigger>
              <SelectContent>
                {iaGroups[group].map((subjectName) => (
                  <SelectItem key={subjectName} value={subjectName}>{subjectName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {subject && (
          <div>
            <Label>Select Level</Label>
            <Select onValueChange={setLevel} value={level} disabled={!subject}>
              <SelectTrigger className="w-full bg-slate-800/50 border-white/20">
                <SelectValue placeholder="Choose your level..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SL">Standard Level (SL)</SelectItem>
                <SelectItem value="HL">Higher Level (HL)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
       <p className="text-gray-400 mt-4 text-sm">More subjects coming soon... 🚧</p>
      <Button
        onClick={handleComplete}
        disabled={!group || !subject || !level}
        className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600"
      >
        Next
      </Button>
    </motion.div>
  );
};

export default IAStep;