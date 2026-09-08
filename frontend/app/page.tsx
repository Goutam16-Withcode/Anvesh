import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TrustSection } from '@/components/TrustSection';
import { WhatIsSection } from '@/components/WhatIsSection';
import { CoreFeatures } from '@/components/CoreFeatures';
import { AdvancedFeatures } from '@/components/AdvancedFeatures';
import { HowItWorks } from '@/components/HowItWorks';
import { ProductShowcase } from '@/components/ProductShowcase';
import { SecuritySection } from '@/components/SecuritySection';
import { FAQSection } from '@/components/FAQSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900 overflow-x-hidden selection:bg-brand-500 selection:text-white">
      {/* Sticky Responsive Header */}
      <Navbar />

      {/* 1. Hero Section with Interactive Visuals & Real-time Metrics */}
      <Hero />

      {/* 2. Trust / Architectural Proof Section */}
      <TrustSection />

      {/* 3. What is ANVESH? Comparison & Value Proposition */}
      <WhatIsSection />

      {/* 4. Core Features Bento Grid */}
      <CoreFeatures />

      {/* 5. Advanced Capabilities: What-If, Agent, Pathways */}
      <AdvancedFeatures />

      {/* 6. How It Works 4-Step Connected Workflow */}
      <HowItWorks />

      {/* 7. Product & Dashboard Interactive Showcase Sandbox */}
      <ProductShowcase />

      {/* 8. Security, Confidentiality & Compliance */}
      <SecuritySection />

      {/* 9. FAQ Section */}
      <FAQSection />

      {/* 10. High-Impact SaaS CTA Banner */}
      <CTASection />

      {/* 11. Multi-Column Footer */}
      <Footer />
    </main>
  );
}
