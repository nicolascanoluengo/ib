import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Mail, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900/50 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold gradient-text">IB Assessment AI</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Turn your IB essays into top scores with AI-powered feedback that matches examiner standards. 
              Get instant, detailed analysis for IA, EE, and TOK essays.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <span className="text-white font-semibold mb-4 block">Product</span>
            <div className="space-y-3">
              <Link to="/features" className="text-gray-400 hover:text-white transition-colors block">
                Features
              </Link>
              <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors block">
                Pricing
              </Link>
              <Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors block">
                How It Works
              </Link>
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">
                API
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <span className="text-white font-semibold mb-4 block">Company</span>
            <div className="space-y-3">
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors block">
                About
              </Link>
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">
                Blog
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">
                Careers
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors block">
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 IB Assessment AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;