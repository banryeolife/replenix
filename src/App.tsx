import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkingCapitalSummaryCard } from './components/WorkingCapitalSummaryCard';
import { EngineSimulator } from './components/EngineSimulator';
import { TechMoatSection } from './components/TechMoatSection';
import { PilotProofSection } from './components/PilotProofSection';
import { FounderStory } from './components/FounderStory';
import { InvestorThesisSection } from './components/InvestorThesisSection';
import { StoreAuditModal } from './components/StoreAuditModal';
import { InvestorDeckModal } from './components/InvestorDeckModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isInvestorOpen, setIsInvestorOpen] = useState(false);
  const [isInvestorMode, setIsInvestorMode] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white relative">
      {/* Main Navigation */}
      <Navbar
        onOpenAudit={() => setIsAuditOpen(true)}
        onOpenInvestor={() => setIsInvestorOpen(true)}
        isInvestorMode={isInvestorMode}
        setIsInvestorMode={setIsInvestorMode}
      />

      <main>
        {/* 1. Hero */}
        <Hero
          onOpenAudit={() => setIsAuditOpen(true)}
          onOpenInvestor={() => setIsInvestorOpen(true)}
        />

        {/* 2. Working Capital Value & Revenue Contribution Summary */}
        <WorkingCapitalSummaryCard />

        {/* 3. Interactive Calculator / Live Simulator */}
        <EngineSimulator />

        {/* 3. How It Works (Calculation Logic) */}
        <TechMoatSection />

        {/* 4. Customer Results (Traction & Track Record) */}
        <PilotProofSection />

        {/* 5. Founder Story (7 Years in the Warehouse) */}
        <FounderStory />

        {/* 6. Pricing & Plans */}
        <InvestorThesisSection
          onOpenInvestorModal={() => setIsInvestorOpen(true)}
          isHighlight={isInvestorMode}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAudit={() => setIsAuditOpen(true)}
        onOpenInvestor={() => setIsInvestorOpen(true)}
      />

      {/* Interactive Modals */}
      <StoreAuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
      />

      <InvestorDeckModal
        isOpen={isInvestorOpen}
        onClose={() => setIsInvestorOpen(false)}
      />
    </div>
  );
}

