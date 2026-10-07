import React, { useState } from 'react';
import BrandLogo from './BrandLogo';
import LaptopTerminal from './LaptopTerminal';
import HeroWireframe from './HeroWireframe';
import { ArrowRight, Terminal, ChevronDown } from 'lucide-react';

export default function HeroSection({ onExploreDataClick }) {
  const [showCodePreview, setShowCodePreview] = useState(false);

  return (
    <section 
      id="home"
      className="relative min-h-screen bg-[#F4F2EC] pt-6 sm:pt-8 pb-16 px-4 sm:px-8 xl:px-14 lg:pr-32 xl:pr-36 select-none overflow-hidden"
    >
      {/* ======================================================== */}
      {/* TOP HEADER & TECHNICAL STATUS SYSTEM                     */}
      {/* ======================================================== */}
      <header className="relative z-20 w-full max-w-[1640px] mx-auto flex items-center justify-between pb-6 sm:pb-8 border-b border-[#080909]/10">
        {/* Brand Logo in Upper-Left */}
        <div className="flex items-center gap-4">
          <a href="#home" className="outline-none" title="PMAXIS - The Data Layer for Prediction Markets">
            <BrandLogo />
          </a>
        </div>

        {/* ======================================================== */}
        {/* ACTUAL SITE HEADER NAVIGATION (PER REAL SITE SCREENSHOT) */}
        {/* ======================================================== */}
        <div className="flex items-center gap-3 sm:gap-7">
          <a 
            href="#dev" 
            data-cursor="DOCS"
            className="text-xs sm:text-sm font-medium text-[#080909] hover:text-[#00E676] transition-colors tracking-tight font-sans cursor-pointer"
          >
            Docs
          </a>
          
          <a 
            href="#dev" 
            data-cursor="LOGIN"
            className="text-xs sm:text-sm font-medium text-[#080909] hover:text-[#00E676] transition-colors tracking-tight font-sans cursor-pointer"
          >
            Login
          </a>

          <a
            href="#dev"
            data-cursor="API KEY"
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#0F2218] hover:bg-[#00E676] border border-[#00E676]/40 hover:border-[#00E676] text-white hover:text-[#080909] text-[11px] sm:text-sm font-semibold tracking-tight transition-all duration-200 shadow-[0_2px_12px_rgba(0,230,118,0.15)] hover:shadow-[0_4px_20px_rgba(0,230,118,0.35)] active:scale-95 cursor-pointer flex items-center justify-center font-sans"
          >
            Get API Key
          </a>
        </div>
      </header>

      {/* ======================================================== */}
      {/* MAIN HERO COMPOSITION (PER EXACT REFERENCE MOCKUP)       */}
      {/* ======================================================== */}
      <div className="relative z-10 w-full max-w-[1640px] mx-auto pt-6 sm:pt-14 lg:pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* ====================================================== */}
          {/* LEFT COLUMN: EDITORIAL TYPOGRAPHY & CALLS TO ACTION   */}
          {/* ====================================================== */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5 sm:space-y-7 relative z-20">
            
            {/* Telemetry Micro-Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#EAE8E1] border border-[#D5D3CB] text-[9.5px] sm:text-[11px] font-mono text-[#080909] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
              <span>INFRASTRUCTURE FOR PREDICTION MARKETS & AI AGENTS</span>
            </div>

            {/* Giant Editorial Headline with Neon Green Brush Underline */}
            <div className="space-y-1">
              <h1 className="font-display text-[2.2rem] sm:text-6xl xl:text-[76px] font-black uppercase text-[#080909] leading-[0.93] tracking-tighter">
                THE DATA LAYER FOR<br />
                <span className="neon-brush-underline inline-block">
                  PREDICTION
                </span><br />
                MARKETS.
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#6C6E69] leading-relaxed max-w-lg font-medium">
              Live markets, trades, orderbooks, and signals.<br className="hidden sm:inline" />
              One API for AI agents.
            </p>

            {/* Tactile Action Control Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#dev"
                data-cursor="BUILD"
                className="px-6 py-3.5 rounded-full bg-[#080909] hover:bg-[#00E676] text-white hover:text-[#080909] text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-3 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.15)] group cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#00E676] group-hover:bg-[#080909] shadow-[0_0_6px_#00E676]" />
                <span>Start building free</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                data-cursor="EXPLORE"
                onClick={() => {
                  setShowCodePreview(!showCodePreview);
                  if (onExploreDataClick) onExploreDataClick();
                }}
                className="px-6 py-3.5 rounded-full bg-white/70 hover:bg-white text-[#080909] border border-[#080909]/20 text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer outline-none"
              >
                <span className="text-[#00E676] font-black">&gt;</span>
                <span>{showCodePreview ? 'Hide API Payload' : 'Explore the data'}</span>
              </button>
            </div>

            {/* Interactive Code Preview Drawer */}
            {showCodePreview && (
              <div className="mt-4 p-4 rounded-xl bg-[#080909] text-[#F4F2EC] border border-[#00E676]/40 font-mono text-xs shadow-2xl animate-fadeIn">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#222] text-[10px] text-[#888]">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
                    GET /v1/markets/fed-rate-cut-sep/price
                  </span>
                  <span className="text-[#00E676] font-bold">200 OK · 4ms</span>
                </div>
                <pre className="text-[11px] text-[#D8DDD9] overflow-x-auto selection:bg-[#00E676] selection:text-[#080909]">
{`{
  "market": "fed-rate-cut-sep",
  "title": "Fed rate cut before September?",
  "price": 0.643,
  "probability_yes": 0.643,
  "volume_24h": 5530000,
  "trades_count": 18839,
  "liquidity_usd": 1330000,
  "timestamp": 1786968121
}`}
                </pre>
              </div>
            )}

            {/* Technical Verification Points */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-mono text-[#080909] font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00E676]" />
                <span>REST & WebSocket Streams</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00E676]" />
                <span>MCP Server for AI Agents</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00E676]" />
                <span>Zero Credit Card Required</span>
              </div>
            </div>

            {/* Scroll Indicator at bottom left */}
            <div className="pt-8 flex items-center gap-2 font-mono text-[9px] text-[#888] uppercase tracking-widest font-bold">
              <span>SCROLL TO EXPLORE</span>
              <ChevronDown className="w-3 h-3 text-[#00E676] animate-bounce" />
            </div>

          </div>

          {/* ====================================================== */}
          {/* RIGHT COLUMN: CINEMATIC 3D LAPTOP + 3D WIREFRAME MESH */}
          {/* ====================================================== */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[520px] lg:min-h-[640px]">
            
            {/* Background 3D Wireframe Geometry - Expanded bounds so 3D element is never cut */}
            <div className="absolute -inset-14 sm:-inset-20 lg:-inset-28 z-0 pointer-events-none flex items-center justify-center overflow-visible">
              <HeroWireframe className="w-full h-full" />
            </div>

            {/* Foreground Floating 3D Laptop */}
            <div className="relative z-10 w-full animate-laptop-float">
              <LaptopTerminal />
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
