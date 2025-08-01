import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Header from '@/components/howitworks/Header';
import Mechanism from '@/components/howitworks/Mechanism';
import Cta from '@/components/howitworks/Cta';

const HowItWorksPage = () => {
  return (
    <>
      <Helmet>
        <title>How It Works - IB Assessment AI | Our Methodology</title>
        <meta name="description" content="Learn how our AI, trained by 45-scorers and IB examiners using insider documents, provides unparalleled feedback on your essays." />
      </Helmet>

      <Navigation />

      <main className="pt-24 pb-20">
        <Header />
        <Mechanism />
        {/* Placeholder for other sections like step-by-step, video demo, etc. */}
        <Cta />
      </main>

      <Footer />
    </>
  );
};

export default HowItWorksPage;