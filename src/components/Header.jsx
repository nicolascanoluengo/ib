import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BrainCircuit } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const navLinks = [
  { name: 'Features', path: '/features' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'About', path: '/about' },
];

const Header = () => {
  const location = useLocation();
  const { toast } = useToast();

  const handleDashboardClick = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Coming Soon!",
      description: "The dashboard is under construction. Check back soon! 🚀",
      variant: "destructive"
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-purple-400" />
          <span className="font-bold text-lg text-white">IBAssessAI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-purple-300 ${
                location.pathname === link.path ? 'text-purple-400' : 'text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:bg-gray-800 hover:text-purple-300">
              Log In
            </Button>
          </Link>
          <Link to="/signup">
             <Button className="bg-purple-600 text-white hover:bg-purple-700 from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out">
                Sign Up
            </Button>
          </Link>
          <Button onClick={handleDashboardClick} className="hidden lg:flex bg-gradient-to-r from-teal-400 to-blue-500 text-white hover:from-teal-500 hover:to-blue-600 transition-all duration-300 ease-in-out">
            Go to Dashboard
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;