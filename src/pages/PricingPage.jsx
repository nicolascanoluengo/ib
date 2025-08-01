import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Header from '@/components/pricing/Header';
import StudentPlans from '@/components/pricing/StudentPlans';
import InstitutionPlans from '@/components/pricing/InstitutionPlans';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const PricingPage = () => {
  const { user } = useAuth();
  const paddingTopClass = user ? 'pt-40' : 'pt-24';
  return (
    <>
      <Helmet>
        <title>Pricing - IB Assessment AI | Plans for Students & Schools</title>
        <meta name="description" content="Find the perfect plan for your IB essay feedback needs. Choose from flexible feedback bundles or an unlimited subscription for students, plus custom plans for schools." />
      </Helmet>

      <Navigation />

      <main className={`${paddingTopClass} pb-20`}>
        <Header />
        <StudentPlans />
        <InstitutionPlans />
        {/* Placeholder for FAQ section */}
      </main>

      <Footer />
    </>
  );
};

export default PricingPage;