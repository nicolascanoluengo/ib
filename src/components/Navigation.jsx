import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Brain, User, LogOut, Crown, Zap, BarChart3, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut, loading, feedbackRounds } = useAuth();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/');
    }
  };

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Features', path: '/features' },
    { name: 'How It Works', path: '/how-it-works' },
  ];

  const UserNav = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold gradient-text">IB Assessment AI</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  location.pathname === item.path ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
             <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-gray-300 hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-white/10"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full justify-start text-gray-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </div>
      <div className="bg-slate-900/80 backdrop-blur-sm border-b border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
             <Link to="/dashboard" className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-400 ${location.pathname === '/dashboard' ? 'text-blue-400' : 'text-gray-300'}`}>
                <LayoutDashboard className="h-4 w-4"/>
                Dashboard
             </Link>
             <Link to="/progress" className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-400 ${location.pathname === '/progress' ? 'text-blue-400' : 'text-gray-300'}`}>
                <BarChart3 className="h-4 w-4"/>
                My Progress
             </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10" onClick={() => navigate('/')}>
                <Zap className="h-4 w-4 mr-2" />
                Analyze Essay
            </Button>
            <Button size="sm" className="bg-yellow-500 text-black hover:bg-yellow-600 font-bold" onClick={() => navigate('/pricing')}>
                <Zap className="h-4 w-4 mr-2" />
                {feedbackRounds} Rounds Left
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );

  const GuestNav = () => (
     <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold gradient-text">IB Assessment AI</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  location.pathname === item.path ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="sm" className="bg-yellow-500 text-black hover:bg-yellow-600 font-bold">
                    <Crown className="h-4 w-4 mr-2" />
                    Get Feedback
                  </Button>
                </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-white/10"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full text-gray-300">
                      Login
                    </Button>
                  </Link>
                   <Link to="/pricing">
                      <Button size="sm" className="w-full bg-yellow-500 text-black hover:bg-yellow-600 font-bold">
                        <Crown className="h-4 w-4 mr-2" />
                        Get Feedback
                      </Button>
                    </Link>
                </>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );

  if (loading) {
     return <div className="fixed top-0 left-0 right-0 z-50 h-16 glass-card border-b border-white/10"></div>
  }

  return user ? <UserNav /> : <GuestNav />;
};

export default Navigation;