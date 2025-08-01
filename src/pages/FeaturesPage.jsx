import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Header from '@/components/features/Header';
import MainFeatures from '@/components/features/MainFeatures';
import FeatureGrid from '@/components/features/FeatureGrid';
import Comparison from '@/components/features/Comparison';
import VisualRubrics from '@/components/features/VisualRubrics';
import Cta from '@/components/features/Cta';

const FeaturesPage = () => {
  return (
    <>
      <Helmet>
        <title>Features - IB Assessment AI | Advanced Essay Analysis</title>
        <meta name="description" content="Discover powerful features of IB Assessment AI: examiner-level feedback, grade prediction, IB-specific rubrics, and instant results for IA, EE, and TOK essays." />
      </Helmet>

      <Navigation />

      <div className="pt-24 pb-20">
        <Header />
        <MainFeatures />
        <FeatureGrid />
        <Comparison />
        <VisualRubrics />
        <Cta />
      </div>

      <Footer />
    </>
  );
};

export default FeaturesPage;