import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Clock, 
  Award, 
  TrendingUp, 
  Plus,
  BarChart3,
  CheckCircle,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';

const DashboardPage = () => {
  const { user, feedbackRounds } = useAuth();
  const navigate = useNavigate();
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (user) {
        setLoading(true);
        const { data, error } = await supabase
          .from('Submissions')
          .select('*')
          .eq('user_email', user.email)
          .order('create_at', { ascending: false })
          .limit(3);

        if (error) {
          console.error("Error fetching submissions:", error);
        } else {
          setRecentSubmissions(data);
        }
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [user]);

  const stats = [
    { title: "Feedback Rounds", value: feedbackRounds, icon: Zap, color: "text-yellow-400" },
    { title: "Essays Analyzed", value: recentSubmissions.length, icon: FileText, color: "text-blue-400" },
    { title: "Average Grade", value: "N/A", icon: Award, color: "text-green-400" },
    { title: "Improvement", value: "+0%", icon: TrendingUp, color: "text-purple-400" },
  ];

  const quickActions = [
    { title: "Analyze New Essay", description: "Upload and analyze your IA, EE, or TOK essay", icon: Upload, action: () => navigate('/'), primary: true },
    { title: "View Progress", description: "Track your improvement over time", icon: BarChart3, action: () => navigate('/progress') },
  ];
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - IB Assessment AI | Your Essay Analysis Hub</title>
        <meta name="description" content="Access your IB essay analysis dashboard. View recent analyses, track progress, and upload new essays for instant feedback." />
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, <span className="gradient-text">{user?.user_metadata?.full_name || user?.email}</span>
            </h1>
            <p className="text-xl text-gray-300">
              Ready to turn your drafts into top scores?
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card feature-card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-blue-400" />
                      Recent Submissions
                    </CardTitle>
                    <CardDescription>
                      Your latest essay feedback and results
                    </CardDescription>
                  </div>
                   <Link to="/submissions">
                      <Button variant="ghost">View All <ArrowRight className="h-4 w-4 ml-2" /></Button>
                   </Link>
                </CardHeader>
                <CardContent>
                  {loading ? (
                     <div className="text-center py-8">Loading submissions...</div>
                  ) : recentSubmissions.length > 0 ? (
                    <div className="space-y-4">
                      {recentSubmissions.map(sub => (
                        <Card key={sub.id} className="bg-slate-800/50">
                          <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="font-semibold">{sub.type} - {sub.subject || sub.tok_type}</p>
                                <p className="text-sm text-gray-400">Submitted on {new Date(sub.create_at).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                {getStatusBadge(sub.status)}
                                {sub.status === 'completed' && (
                                    <Link to={`/premium-results/${sub.id}`}>
                                        <Button size="sm">View Results</Button>
                                    </Link>
                                )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No submissions yet</h3>
                      <p className="text-gray-400 mb-4">
                        Upload your first essay to get started
                      </p>
                      <Link to="/">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                          <Plus className="mr-2 h-4 w-4" />
                          Analyze First Essay
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant={action.primary ? "default" : "ghost"}
                      className={`w-full justify-start h-auto p-4 ${
                        action.primary ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : ''
                      }`}
                      onClick={action.action}
                    >
                      <action.icon className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">{action.title}</div>
                        <div className="text-sm opacity-80">{action.description}</div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;