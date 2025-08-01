import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/landing/Hero';
import Stats from '@/components/landing/Stats';
import ProblemSolution from '@/components/landing/ProblemSolution';
import Testimonials from '@/components/landing/Testimonials';
import Cta from '@/components/landing/Cta';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const HomePage = () => {
    const { user } = useAuth();
    const paddingTopClass = user ? 'pt-32' : 'pt-24';
  return (
    <>
      <Helmet>
        <title>IB Assessment AI - Stop Guessing. Start Scoring.</title>
        <meta name="description" content="Get instant, examiner-level feedback on your IB Internal Assessments, Extended Essays, and TOK essays. Turn months of uncertainty into a top score." />
      </Helmet>

      <Navigation />
      
      <main className={paddingTopClass}>
        <Hero />
        <Stats />
        <ProblemSolution />
        <Testimonials />
        <Cta />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;