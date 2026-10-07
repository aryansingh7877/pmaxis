import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './components/HeroSection';
import DataSection from './components/DataSection';
import EventStreamSection from './components/EventStreamSection';
import OrderbookTradesSection from './components/OrderbookTradesSection';
import SignalsSection from './components/SignalsSection';
import OnChainSection from './components/OnChainSection';
import StitchingSection from './components/StitchingSection';
import DevSection from './components/DevSection';
import BuildOnMarketSection from './components/BuildOnMarketSection';
import PricingSection from './components/PricingSection';
import BuildOnPredictionSection from './components/BuildOnPredictionSection';
import FooterSection from './components/FooterSection';
import RightVerticalNav from './components/RightVerticalNav';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.25,
      infinite: false,
    });

    window.__lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 2. Active Section Tracker
    const navSections = [
      { id: 'home', elementId: 'home' },
      { id: 'data', elementId: 'data' },
      { id: 'product', elementId: 'build' },
      { id: 'dev', elementId: 'dev' },
      { id: 'price', elementId: 'price' },
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Always active on 'home' when at the top of the page
      if (scrollY < 180) {
        setActiveSection('home');
        return;
      }

      // If near bottom of the page, activate 'price'
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveSection('price');
        return;
      }

      const triggerY = window.innerHeight * 0.35;

      // Check sections from bottom to top using viewport bounding rect
      for (let i = navSections.length - 1; i >= 0; i--) {
        const item = navSections[i];
        const el = document.getElementById(item.elementId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    lenis.on('scroll', handleScroll);
    handleScroll();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      delete window.__lenis;
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F4F2EC] text-[#080909] relative selection:bg-[#00E676] selection:text-[#080909]">
      {/* Exact Custom Cursor: Black core with neon green blur halo */}
      <CustomCursor />

      {/* Floating Right-Side Vertical Navigation Control */}
      <RightVerticalNav 
        activeItem={activeSection} 
        onSelectItem={(id) => setActiveSection(id)} 
      />

      {/* Cinematic Rhythm: Alternating Light & Dark Sections */}
      <main className="w-full max-w-full overflow-x-hidden">
        {/* SECTION 01 — HERO (Light #F4F2EC + Floating 3D Laptop + Wireframe) */}
        <HeroSection />

        {/* SECTION 02 — DATA (Dark #050706 Cyber Stream + Flowing Green Fibers) */}
        <DataSection />

        {/* SECTION 02.B — FROM MARKET EVENT TO STRUCTURED DATA */}
        <EventStreamSection />

        {/* SECTION 02.C — BUILD ON TOP OF THE MARKET (3 Product Modes: Trading Systems, Analytics, AI Agents) */}
        <BuildOnMarketSection />

        {/* SECTION 03 & 04 — ORDERBOOK & TRADES (Light #F4F2EC Depth + Wireframe + Tape) */}
        <OrderbookTradesSection />

        {/* SECTION 05 — SIGNALS (Dark #080909 Aggressive Waves & Momentum) */}
        <SignalsSection />

        {/* SECTION 06 — ON-CHAIN (Light #F4F2EC 3D Network + Cryptographic Proofs) */}
        <OnChainSection />

        {/* SECTION 06.B — STOP STITCHING PREDICTION-MARKET DATA TOGETHER */}
        <StitchingSection />

        {/* SECTION 07 — DEVELOPERS (Dark #080909 Terminal + Code Stream + MCP) */}
        <DevSection />

        {/* SECTION 09 — PRICING (Light #F4F2EC Editorial "BUILD ON THE MARKET") */}
        <PricingSection />

        {/* SECTION 10 — BUILD ON PREDICTION MARKETS (Warm Off-White CTA) */}
        <BuildOnPredictionSection />
      </main>

      {/* Footer Colophon (Dark #080909 + Giant PMAXIS Wordmark) */}
      <FooterSection />
    </div>
  );
}
