
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const SubmissionsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = useCallback(async () => {
    if (user) {
      const { data, error } = await supabase
        .from('Submissions')
        .select('*')
        .eq('user_email', user.email)
        .order('create_at', { ascending: false });

      if (error) {
        console.error("Error fetching submissions:", error);
        toast({ title: "Error", description: "Could not fetch submissions.", variant: "destructive" });
      } else {
        setSubmissions(data);
      }
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    setLoading(true);
    fetchSubmissions();
  }, [fetchSubmissions]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase.channel(`submissions_user_${user.id}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'Submissions',
        filter: `user_email=eq.${user.email}`
      }, (payload) => {
        console.log('Change received!', payload);
        setSubmissions(currentSubmissions =>
          currentSubmissions.map(sub =>
            sub.id === payload.new.id ? payload.new : sub
          )
        );
        if (payload.new.status === 'completed') {
            toast({
                title: "Analysis Complete!",
                description: "Your feedback is ready to view.",
            });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, toast]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-300 border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <>
      <Helmet>
        <title>My Submissions - IB Assessment AI</title>
        <meta name="description" content="View all your essay submissions and their feedback status." />
      </Helmet>

      <Navigation />

      <div className="pt-40 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
              <FileText className="w-8 h-8 mr-3 text-blue-400" />
              My Submissions
            </h1>
            <p className="text-xl text-gray-300">
              Track the status of all your analyzed essays.
            </p>
          </motion.div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>All Submitted Essays</CardTitle>
              <CardDescription>
                Here you can find a list of all your submissions and their current status. Feedback may take a few minutes to generate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-16 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin mr-4" />
                  Loading your submissions...
                </div>
              ) : submissions.length > 0 ? (
                <div className="space-y-4">
                  {submissions.map(sub => (
                    <Card key={sub.id} className="bg-slate-800/50 hover:bg-slate-800/80 transition-colors">
                      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-grow">
                          <p className="font-semibold text-lg">{sub.type} - {sub.subject || sub.tok_type}</p>
                          <p className="text-sm text-gray-400">
                            Submitted on {new Date(sub.create_at).toLocaleString()}
                          </p>
                           <p className="text-sm text-gray-500">ID: {sub.id}</p>
                        </div>
                        <div className="flex items-center gap-4 self-end sm:self-center">
                          {getStatusBadge(sub.status)}
                           {sub.status === 'completed' && (
                              <Link to={`/results/${sub.id}`}>
                                  <Button size="sm">View Results <ArrowRight className="h-4 w-4 ml-2" /></Button>
                              </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Submissions Found</h3>
                  <p className="text-gray-400 mb-6">
                    You haven't submitted any essays for analysis yet.
                  </p>
                  <Link to="/">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600">
                      Submit Your First Essay
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubmissionsPage;
