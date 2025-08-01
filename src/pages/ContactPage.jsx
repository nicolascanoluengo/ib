import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Send, User, Building, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';
import { supabase } from '@/lib/customSupabaseClient';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    institutionName: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase
      .from('contacts')
      .insert([
        { 
          name: formData.name, 
          institution_name: formData.institutionName, 
          message: formData.message 
        }
      ]);

    setIsLoading(false);

    if (error) {
      toast({
        title: "Error Sending Message",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We will get back to you shortly.",
      });
      setFormData({ name: '', institutionName: '', message: '' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - IB Assessment AI</title>
        <meta name="description" content="Contact us for inquiries about our plans for schools, districts, and teachers. We're here to help." />
      </Helmet>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          <Card className="glass-card">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl">Contact Sales</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Let's find the perfect solution for your institution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="e.g., Jane Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10 bg-slate-800/50 border-white/20 focus:border-blue-400"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institutionName">Institution Name</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="institutionName"
                        name="institutionName"
                        type="text"
                        placeholder="e.g., International School of Anytown"
                        value={formData.institutionName}
                        onChange={handleInputChange}
                        className="pl-10 bg-slate-800/50 border-white/20 focus:border-blue-400"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your needs, number of students, etc."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="pl-10 pt-3 bg-slate-800/50 border-white/20 focus:border-blue-400 min-h-[120px]"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default ContactPage;