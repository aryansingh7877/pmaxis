import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity,
  Database,
  Bot,
  ArrowRight,
  TrendingUp,
  Compass,
  BookOpen,
  ArrowLeftRight,
  LineChart,
  Bell,
  Search,
  Send,
  Radio,
  Share2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BuildOnMarketSection() {
  // Current active mode: 'trading' | 'analytics' | 'agents'
  const [activeMode, setActiveMode] = useState('trading');
  const [isTransforming, setIsTransforming] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('orderbook'); // 'orderbook' | 'trades'

  // Refs for section, parallax layers, and machine animation
  const sectionRef = useRef(null);
  const farLayerRef = useRef(null);
  const midLayerRef = useRef(null);
  const machineRef = useRef(null);
  const sweepRef = useRef(null);

  // Responsive scale to guarantee full viewport fit on desktop without scroll
  const [desktopScale, setDesktopScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 1024) {
        setDesktopScale(1);
        return;
      }
      // Available height for preview = window.innerHeight - headerHeight (~130px) - padding (~40px)
      const availableH = window.innerHeight - 175;
      const targetH = 580; // natural height of the preview machine

      if (availableH < targetH) {
        setDesktopScale(Math.max(0.72, availableH / targetH));
      } else if (availableH >= targetH + 100) {
        setDesktopScale(Math.min(1.05, availableH / (targetH + 50)));
      } else {
        setDesktopScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Subtle mouse parallax state (Far: 2-4px, Mid: 5-8px, Foreground: stable)
  const [parallax, setParallax] = useState({ farX: 0, farY: 0, midX: 0, midY: 0, uiRotX: 0, uiRotY: 0 });

  const handleMouseMove = (e) => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setParallax({
      farX: normX * 3,        // 2–4px movement
      farY: normY * 2.5,
      midX: normX * 6,        // 5–8px movement
      midY: normY * 5,
      uiRotX: -normY * 0.6,   // almost no movement (subtle 0.6 deg max)
      uiRotY: normX * 0.8,
    });
  };

  const handleMouseLeave = () => {
    setParallax({ farX: 0, farY: 0, midX: 0, midY: 0, uiRotX: 0, uiRotY: 0 });
  };

  // Orderbook micro-fluctuations
  const [orderbookBids, setOrderbookBids] = useState([
    { size: '430', price: '81.2¢', depth: 28 },
    { size: '2,711', price: '81.2¢', depth: 88 },
    { size: '1,877', price: '81.2¢', depth: 64 },
    { size: '659', price: '81.2¢', depth: 36 },
    { size: '2,715', price: '81.2¢', depth: 92 },
  ]);

  const [orderbookAsks, setOrderbookAsks] = useState([
    { size: '1,271', price: '81.5¢', depth: 46 },
    { size: '2,361', price: '81.5¢', depth: 78 },
    { size: '1,300', price: '81.5¢', depth: 52 },
    { size: '2,098', price: '81.5¢', depth: 72 },
    { size: '1,029', price: '81.5¢', depth: 38 },
  ]);

  // Subtle live trade feed state
  const [recentTrades, setRecentTrades] = useState([
    { side: 'YES', price: '81.4¢', size: '3,765', time: '18m ago' },
    { side: 'YES', price: '81.5¢', size: '765', time: '17m ago' },
    { side: 'NO', price: '80.8¢', size: '2,835', time: '16m ago' },
    { side: 'NO', price: '81.5¢', size: '4,572', time: '15m ago' },
    { side: 'YES', price: '81.3¢', size: '4,844', time: '14m ago' },
  ]);

  // AI Agent Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'user',
      text: 'What is the best bid/ask for “Fed rate cut before September?”',
    },
    {
      id: 2,
      sender: 'agent',
      intro: 'Here\'s the current best bid/ask for “Fed rate cut before September?” on Polymarket:',
      metrics: {
        bid: '63.0¢',
        ask: '63.8¢',
        spread: '1.27%',
      },
    },
    {
      id: 3,
      sender: 'user',
      text: 'Show me price and volume over the last 24h.',
    },
    {
      id: 4,
      sender: 'agent',
      chart: {
        price: '63.4¢',
        volume: '24h Volume $4.82M',
      },
    },
  ]);

  // Live orderbook tick simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderbookBids((prev) =>
        prev.map((b) => ({
          ...b,
          depth: Math.min(95, Math.max(18, b.depth + (Math.random() - 0.5) * 6)),
        }))
      );
      setOrderbookAsks((prev) =>
        prev.map((a) => ({
          ...a,
          depth: Math.min(95, Math.max(18, a.depth + (Math.random() - 0.5) * 6)),
        }))
      );
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Mode switching with smooth transition
  const switchMode = (newMode) => {
    if (newMode === activeMode || isTransforming) return;
    setIsTransforming(true);

    const machine = machineRef.current;
    const sweep = sweepRef.current;
    if (!machine) {
      setActiveMode(newMode);
      setIsTransforming(false);
      return;
    }

    const modes = ['trading', 'analytics', 'agents'];
    const oldIdx = modes.indexOf(activeMode);
    const newIdx = modes.indexOf(newMode);
    const rotDirection = newIdx > oldIdx ? 1 : -1;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransforming(false);
      },
    });

    // 1. Subtle physical rotation and depth retreat (controlled 6-8 deg)
    tl.to(machine, {
      duration: 0.26,
      rotateY: rotDirection * 6,
      scale: 0.985,
      opacity: 0.8,
      ease: 'power2.in',
    });

    // 2. Midway: update mode state
    tl.add(() => {
      setActiveMode(newMode);
    });

    // 3. Reset entry angle
    tl.set(machine, {
      rotateY: -rotDirection * 5,
      scale: 0.988,
      opacity: 0.85,
    });

    // 4. Subtle green light sweep
    if (sweep) {
      tl.fromTo(
        sweep,
        { xPercent: -130, opacity: 0 },
        { xPercent: 130, opacity: 0.5, duration: 0.38, ease: 'power2.inOut' },
        '-=0.08'
      );
    }

    // 5. Machine settles into crisp alignment
    tl.to(
      machine,
      {
        duration: 0.4,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
      },
      '-=0.22'
    );
  };

  // Scroll animations: entrance and horizontal typography shift
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Section entrance: background typography, soft lines, ambient lights fade in
      if (farLayerRef.current) {
        gsap.fromTo(
          farLayerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Horizontal shift on scroll across section
        gsap.to(farLayerRef.current, {
          x: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // 2. Mid layer data lines and soft lights entrance
      if (midLayerRef.current) {
        gsap.fromTo(
          midLayerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const newId = Date.now();
    const userMsg = { id: newId, sender: 'user', text: query };

    const agentMsg = {
      id: newId + 1,
      sender: 'agent',
      intro: `Polymarket L2 normalized consensus for "${query}":`,
      metrics: {
        bid: '58.4¢',
        ask: '59.1¢',
        spread: '1.18%',
      },
      chart: {
        price: '58.8¢',
        volume: '24h Volume $2.14M',
      },
    };

    setChatMessages((prev) => [...prev, userMsg, agentMsg]);
    setChatInput('');
  };

  // SVG Chart Paths for Analytics
  const analyticsLinePrimary =
    '0,95 50,82 100,90 150,65 200,70 250,48 300,58 350,36 400,42 450,25 500,32 550,18 600,12';
  const analyticsAreaPrimary = `0,95 50,82 100,90 150,65 200,70 250,48 300,58 350,36 400,42 450,25 500,32 550,18 600,12 600,110 0,110`;
  const analyticsLineSecondary =
    '0,105 50,96 100,100 150,85 200,88 250,72 300,78 350,62 400,66 450,52 500,55 550,42 600,38';

  // Dynamic motion styling based on active mode
  const getLineDuration = () => {
    if (activeMode === 'trading') return '14s';     // slightly faster horizontal data movement
    if (activeMode === 'analytics') return '24s';   // slower, structured line movement
    return '18s';                                   // fluid light movement
  };

  return (
    <section
      ref={sectionRef}
      id="build"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#050706] text-white select-none overflow-hidden border-b border-[#00E676]/20 w-full min-h-screen lg:h-screen lg:min-h-[720px] lg:max-h-screen py-10 lg:py-4 xl:py-6 px-4 sm:px-6 lg:px-10 xl:px-14 flex flex-col justify-between"
      style={{ perspective: '1400px' }}
    >
      {/* ======================================================== */}
      {/* LAYER 1: FAR LAYER — OVERSIZED BACKGROUND TYPOGRAPHY     */}
      {/* Architectural scale, 3–8% opacity, subtle parallax       */}
      {/* ======================================================== */}
      <div
        ref={farLayerRef}
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 flex items-start justify-end pr-4 sm:pr-12 pt-8 sm:pt-14"
        style={{
          transform: `translate3d(${parallax.farX}px, ${parallax.farY}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        aria-hidden="true"
      >
        <div className="font-display font-black text-[15vw] sm:text-[12vw] xl:text-[10vw] leading-[0.82] tracking-tighter uppercase text-right opacity-[0.04]">
          <div className="text-white/80 drop-shadow-[0_0_80px_rgba(0,230,118,0.08)]">APPLICATION</div>
          <div className="text-[#00E676]/90">LAYER</div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* LAYER 2: MID LAYER — SUBTLE DATA LINES & SOFT LIGHT      */}
      {/* Apple-spatial ambient light, thin elegant data lines     */}
      {/* ======================================================== */}
      <div
        ref={midLayerRef}
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
        style={{
          transform: `translate3d(${parallax.midX}px, ${parallax.midY}px, 0)`,
          transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        aria-hidden="true"
      >
        {/* Soft Ambient Light Area 1: Top-Right / Center-Right wash */}
        <div
          className={`absolute top-[10%] right-[5%] w-[580px] h-[440px] rounded-full bg-[#00E676]/[0.045] blur-[150px] transition-opacity duration-1000 ${
            activeMode === 'agents' ? 'opacity-100 scale-105' : 'opacity-80 scale-100'
          }`}
        />

        {/* Soft Ambient Light Area 2: Mid-Left / Lower-Left aura */}
        <div
          className={`absolute top-[45%] left-[-8%] w-[540px] h-[400px] rounded-full bg-[#00E676]/[0.035] blur-[160px] transition-opacity duration-1000 ${
            activeMode === 'trading' ? 'opacity-100' : 'opacity-70'
          }`}
        />

        {/* Soft Ambient Light Area 3: Base floor reflection sheen */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[850px] h-[160px] rounded-[100%] bg-gradient-to-t from-[#00E676]/[0.05] via-[#00E676]/[0.02] to-transparent blur-[110px]" />

        {/* Thin Data Line 1: Upper subtle horizontal rail */}
        <div className="absolute top-[22%] inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00E676]/[0.16] to-transparent">
          <div
            className="h-full w-48 bg-gradient-to-r from-transparent via-[#00E676]/40 to-transparent"
            style={{
              animation: `slide-right ${getLineDuration()} linear infinite`,
            }}
          />
        </div>

        {/* Thin Data Line 2: Gentle diagonal trajectory */}
        <div className="absolute top-[40%] -left-[10%] -right-[10%] h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent rotate-[-3deg]">
          <div
            className="h-full w-36 bg-gradient-to-r from-transparent via-[#00E676]/30 to-transparent"
            style={{
              animation: `slide-right ${getLineDuration()} linear infinite reverse`,
            }}
          />
        </div>

        {/* Thin Data Line 3: Lower horizontal rail behind terminal */}
        <div className="absolute top-[72%] inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00E676]/[0.12] to-transparent">
          <div
            className="h-full w-56 bg-gradient-to-r from-transparent via-[#00E676]/35 to-transparent"
            style={{
              animation: `slide-right 20s linear infinite`,
            }}
          />
        </div>

        {/* Subtle Floor Rail Line */}
        <div className="absolute bottom-8 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00E676]/[0.2] to-transparent" />
      </div>

      {/* ======================================================== */}
      {/* LAYER 3: FOREGROUND — HEADER, TABS & ONE-FRAME PREVIEW    */}
      {/* Fits completely inside 100vh on Desktop without scroll   */}
      {/* ======================================================== */}
      <div className="w-full max-w-[1540px] mx-auto relative z-10 flex flex-col justify-between h-full min-h-0">
        
        {/* ======================================================== */}
        {/* 1. COMPACT HEADER & INLINE MODE SWITCHER TABS             */}
        {/* Structure: Label, Heading, Description + Inline Tabs     */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-2 lg:mb-3 shrink-0">
          
          {/* Header Typography */}
          <div className="max-w-xl">
            {/* Small technical label */}
            <div className="font-mono text-[10px] sm:text-xs font-bold text-[#00E676] flex items-center gap-2 uppercase tracking-wider mb-1">
              <span className="text-[#00E676] font-black">//</span>
              <span>03 // APPLICATION LAYER</span>
            </div>

            {/* Large headline */}
            <h2 className="font-display text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black text-white tracking-tight leading-tight mb-1">
              Build on top of the <span className="text-[#00E676] drop-shadow-[0_0_20px_rgba(0,230,118,0.35)]">market.</span>
            </h2>

            {/* Subtitle */}
            <p className="font-mono text-[11px] sm:text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
              PMAxis gives you the real-time building blocks to power trading systems,
              analytics and AI agents.
            </p>
          </div>

          {/* Technical Mode Switcher Tabs (Inline with header) */}
          <div className="shrink-0 w-full lg:w-auto py-0.5">
            <div className="grid grid-cols-3 sm:inline-flex items-center bg-[#070D09]/90 backdrop-blur-xl p-1 rounded-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)] gap-1 sm:gap-1.5 w-full sm:w-auto">
              
              {/* 01 TRADING SYSTEMS */}
              <button
                type="button"
                onClick={() => switchMode('trading')}
                className={`flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4 py-1.5 rounded-lg font-mono text-[9px] sm:text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer outline-none ${
                  activeMode === 'trading'
                    ? 'bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/70 shadow-[0_0_15px_rgba(0,230,118,0.2)]'
                    : 'text-[#8E9B95] border border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeMode === 'trading' ? 'bg-[#00E676] animate-pulse' : 'bg-[#8E9B95]'}`} />
                <span className="text-[8.5px] sm:text-[10px] opacity-70">01</span>
                <span className="truncate">
                  <span className="sm:hidden">TRADING</span>
                  <span className="hidden sm:inline">TRADING SYSTEMS</span>
                </span>
              </button>

              {/* 02 ANALYTICS */}
              <button
                type="button"
                onClick={() => switchMode('analytics')}
                className={`flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4 py-1.5 rounded-lg font-mono text-[9px] sm:text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer outline-none ${
                  activeMode === 'analytics'
                    ? 'bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/70 shadow-[0_0_15px_rgba(0,230,118,0.2)]'
                    : 'text-[#8E9B95] border border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeMode === 'analytics' ? 'bg-[#00E676] animate-pulse' : 'bg-[#8E9B95]'}`} />
                <span className="text-[8.5px] sm:text-[10px] opacity-70">02</span>
                <span className="truncate">ANALYTICS</span>
              </button>

              {/* 03 AI AGENTS */}
              <button
                type="button"
                onClick={() => switchMode('agents')}
                className={`flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4 py-1.5 rounded-lg font-mono text-[9px] sm:text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer outline-none ${
                  activeMode === 'agents'
                    ? 'bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/70 shadow-[0_0_15px_rgba(0,230,118,0.2)]'
                    : 'text-[#8E9B95] border border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeMode === 'agents' ? 'bg-[#00E676] animate-pulse' : 'bg-[#8E9B95]'}`} />
                <span className="text-[8.5px] sm:text-[10px] opacity-70">03</span>
                <span className="truncate">
                  <span className="sm:hidden">AGENTS</span>
                  <span className="hidden sm:inline">AI AGENTS</span>
                </span>
              </button>

            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. MAIN PREVIEW PANEL (ONE MACHINE, PROPORTIONAL FIT)    */}
        {/* Fits 100% inside viewport, no internal scrollbars        */}
        {/* ======================================================== */}
        <div
          className="flex-1 flex flex-col justify-center items-center w-full min-h-0 relative"
          style={{
            transform: desktopScale !== 1 ? `scale(${desktopScale})` : undefined,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease-out',
          }}
        >
          {/* Central Transforming Machine Interface (One Physical Slab) */}
          <div
            ref={machineRef}
            className="w-full max-w-[1320px] rounded-2xl bg-[#070B09]/95 backdrop-blur-2xl border border-[#00E676]/30 shadow-[0_20px_70px_rgba(0,0,0,0.92),0_0_35px_rgba(0,230,118,0.08)] relative overflow-hidden transition-shadow"
            style={{
              transform: `perspective(1400px) rotateY(${parallax.uiRotY}deg) rotateX(${parallax.uiRotX}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Top Luminous Green Bevel Highlight Line */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00E676]/80 to-transparent pointer-events-none z-30" />

            {/* Glowing Sweep Light Beam (animates during mode switch) */}
            <div
              ref={sweepRef}
              className="absolute top-0 bottom-0 w-36 bg-gradient-to-r from-transparent via-[#00E676]/25 to-transparent pointer-events-none z-40 opacity-0 -skew-x-12"
            />

            {/* ==================================================== */}
            {/* OPERATING STATE 01: TRADING SYSTEMS                  */}
            {/* ==================================================== */}
            {activeMode === 'trading' && (
              <div className="p-4 sm:p-5 lg:p-5 xl:p-6">
                
                {/* Terminal Header Strip */}
                <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-[#142318] gap-3">
                  {/* Left: Terminal Title & Live Market Data */}
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
                    <span className="font-mono text-xs font-bold text-white tracking-wider">
                      TRADING SYSTEM
                    </span>
                    <span className="font-mono text-xs text-[#6B7D73]">•</span>
                    <span className="font-mono text-xs text-[#8E9B95] tracking-wider">
                      LIVE MARKET DATA
                    </span>
                  </div>

                  {/* Center: Technical Tabs (Orderbook / Trades) */}
                  <div className="flex items-center bg-[#09110D] p-1 rounded-lg border border-[#182C1E]">
                    <button
                      type="button"
                      onClick={() => setActiveSubTab('orderbook')}
                      className={`px-3 py-1 rounded font-mono text-[10px] font-bold tracking-wider transition-colors cursor-pointer ${
                        activeSubTab === 'orderbook'
                          ? 'bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/40'
                          : 'text-[#8E9B95] hover:text-white'
                      }`}
                    >
                      ORDERBOOK
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSubTab('trades')}
                      className={`px-3 py-1 rounded font-mono text-[10px] font-bold tracking-wider transition-colors cursor-pointer ${
                        activeSubTab === 'trades'
                          ? 'bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/40'
                          : 'text-[#8E9B95] hover:text-white'
                      }`}
                    >
                      TRADES
                    </button>
                  </div>

                  {/* Right: Live Status Badge */}
                  <div className="flex items-center gap-2 font-mono text-xs text-[#00E676]">
                    <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse shadow-[0_0_8px_#00E676]" />
                    <span className="font-bold">LIVE</span>
                  </div>
                </div>

                {/* 3-Column Terminal Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 xl:gap-5">
                  
                  {/* COLUMN 1: MARKET CARD + RECENT TRADES (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
                    {/* Market Card */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-[#09100C] border border-[#16271B]">
                      {/* Market Name & Bitcoin Icon */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 rounded-full bg-[#F7931A]/20 text-[#F7931A] flex items-center justify-center font-bold text-[10px] border border-[#F7931A]/30">
                          ₿
                        </div>
                        <h4 className="font-display text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                          Will Bitcoin trade above $120K in 2026?
                        </h4>
                      </div>

                      {/* Main Price & Yes Indicator */}
                      <div className="flex items-baseline justify-between mb-2">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-2xl sm:text-3xl font-black text-white">
                            73.8¢
                          </span>
                          <span className="font-mono text-[11px] text-[#00E676] font-bold">
                            YES PRICE 74¢
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 font-mono text-[11px] font-bold">
                          <span className="text-[#00E676]">YES 81%</span>
                          <span className="text-[#EF4444]">NO 19%</span>
                        </div>
                      </div>

                      {/* Dual Outcome Probability Bar */}
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden flex mb-3">
                        <div className="h-full bg-[#00E676]" style={{ width: '81%' }} />
                        <div className="h-full bg-[#EF4444]" style={{ width: '19%' }} />
                      </div>

                      {/* 3 Metrics: Volume, Trades, Liquidity */}
                      <div className="grid grid-cols-3 gap-1.5 pt-2.5 border-t border-[#142318] font-mono text-center">
                        <div>
                          <div className="text-[9px] text-[#8E9B95] uppercase">24h Volume</div>
                          <div className="text-xs font-bold text-white mt-0.5">$1.54M</div>
                          <div className="text-[9px] text-[#00E676] font-semibold">+18.6%</div>
                        </div>
                        <div>
                          <div className="text-[9px] text-[#8E9B95] uppercase">24h Trades</div>
                          <div className="text-xs font-bold text-white mt-0.5">4,110</div>
                          <div className="text-[9px] text-[#00E676] font-semibold">+12.3%</div>
                        </div>
                        <div>
                          <div className="text-[9px] text-[#8E9B95] uppercase">Liquidity</div>
                          <div className="text-xs font-bold text-white mt-0.5">$610.0K</div>
                          <div className="text-[9px] text-[#00E676] font-semibold">+8.7%</div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Trades Table */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-[#09100C] border border-[#16271B] flex-1 flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-[11px] font-bold text-white uppercase tracking-wider mb-2">
                          RECENT TRADES
                        </div>

                        <div className="grid grid-cols-4 font-mono text-[9px] uppercase text-[#6B7D73] pb-1.5 border-b border-[#142318]">
                          <div>SIDE</div>
                          <div>PRICE</div>
                          <div>SIZE</div>
                          <div className="text-right">TIME</div>
                        </div>

                        <div className="space-y-1 mt-1.5 font-mono text-[11px]">
                          {recentTrades.map((t, idx) => (
                            <div key={idx} className="grid grid-cols-4 items-center py-0.5">
                              <div className={`font-bold flex items-center gap-1.5 ${t.side === 'YES' ? 'text-[#00E676]' : 'text-[#EF4444]'}`}>
                                <span className={`w-1 h-1 rounded-full ${t.side === 'YES' ? 'bg-[#00E676]' : 'bg-[#EF4444]'}`} />
                                {t.side}
                              </div>
                              <div className="text-white">{t.price}</div>
                              <div className="text-[#94A3B8]">{t.size}</div>
                              <div className="text-right text-[#64748B] text-[10px]">{t.time}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <a
                        href="#dev"
                        className="mt-2 pt-2 border-t border-[#142318] flex items-center justify-between font-mono text-[11px] text-[#00E676] hover:text-white transition-colors"
                      >
                        <span>VIEW FULL FEED →</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* COLUMN 2: PROFESSIONAL ORDERBOOK (4 cols) */}
                  <div className="lg:col-span-4 p-3.5 sm:p-4 rounded-xl bg-[#09100C] border border-[#16271B] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#142318]">
                        <span className="font-mono text-[11px] font-bold text-white tracking-wider">
                          ORDERBOOK
                        </span>
                        <span className="font-mono text-[10px] text-[#00E676] font-semibold">
                          SPREAD 0.3¢ (0.30%)
                        </span>
                      </div>

                      <div className="grid grid-cols-3 font-mono text-[9px] uppercase text-[#6B7D73] pb-1.5 mb-1.5 border-b border-[#142318]">
                        <div>BIDS</div>
                        <div className="text-center">MID PRICE</div>
                        <div className="text-right">ASKS</div>
                      </div>

                      {/* Orderbook Depth Rows */}
                      <div className="space-y-1 font-mono text-[11px]">
                        {orderbookBids.map((b, idx) => {
                          const ask = orderbookAsks[idx] || orderbookAsks[0];
                          return (
                            <div
                              key={idx}
                              className="grid grid-cols-3 items-center py-1 px-1.5 rounded hover:bg-white/[0.02] relative overflow-hidden"
                            >
                              <div
                                className="absolute left-0 top-0 bottom-0 bg-[#00E676]/10 -z-0 transition-all duration-500"
                                style={{ width: `${b.depth}%` }}
                              />
                              <div
                                className="absolute right-0 top-0 bottom-0 bg-[#EF4444]/10 -z-0 transition-all duration-500"
                                style={{ width: `${ask.depth}%` }}
                              />

                              <div className="text-[#00E676] font-bold z-10">{b.size}</div>
                              <div className="text-center text-white/90 font-medium z-10">{b.price}</div>
                              <div className="text-right text-[#EF4444] font-bold z-10">{ask.size}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2.5 mt-2 border-t border-[#142318] text-center">
                      <span className="font-mono text-[10px] text-[#8E9B95]">
                        REAL-TIME CLOB DEPTH // POLYMARKET
                      </span>
                    </div>
                  </div>

                  {/* COLUMN 3: POLYMARKET SPECS (3 cols) */}
                  <div className="lg:col-span-3 p-3.5 sm:p-4 rounded-xl bg-[#09100C] border border-[#16271B] flex flex-col justify-between">
                    <div>
                      {/* Polymarket badge */}
                      <div className="flex items-center gap-2 pb-2 mb-3 border-b border-[#142318]">
                        <div className="w-4 h-4 rounded-md bg-[#00E676]/15 text-[#00E676] flex items-center justify-center font-bold text-[10px] border border-[#00E676]/30">
                          ◆
                        </div>
                        <span className="font-mono text-[11px] font-bold text-white tracking-wider">
                          POLYMARKET
                        </span>
                      </div>

                      {/* Contract metadata list */}
                      <div className="space-y-2.5 font-mono text-[11px]">
                        <div>
                          <div className="text-[9px] text-[#6B7D73] uppercase mb-0.5">MARKET</div>
                          <div className="text-white font-medium truncate">Bitcoin &gt; $120K in 2026</div>
                        </div>

                        <div>
                          <div className="text-[9px] text-[#6B7D73] uppercase mb-0.5">CONTRACT ID</div>
                          <div className="text-[#00E676] font-mono text-[10px]">0x51b0...9a4</div>
                        </div>

                        <div>
                          <div className="text-[9px] text-[#6B7D73] uppercase mb-0.5">PROBABILITY</div>
                          <div className="text-white font-bold text-xs">73.8%</div>
                        </div>

                        <div>
                          <div className="text-[9px] text-[#6B7D73] uppercase mb-0.5">TOTAL VOLUME</div>
                          <div className="text-white font-bold text-xs">$1.54M</div>
                        </div>

                        <div>
                          <div className="text-[9px] text-[#6B7D73] uppercase mb-0.5">TOTAL TRADES</div>
                          <div className="text-white font-bold text-xs">4,110</div>
                        </div>

                        <div>
                          <div className="text-[9px] text-[#6B7D73] uppercase mb-0.5">LIQUIDITY</div>
                          <div className="text-white font-bold text-xs">$610.0K</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-[#142318] flex items-center justify-between font-mono text-[10px] text-[#8E9B95]">
                      <span>STATUS</span>
                      <span className="text-[#00E676] font-bold">SETTLEMENT READY</span>
                    </div>
                  </div>

                </div>

                {/* Integrated Bottom Pill Bar */}
                <div className="flex justify-center mt-3 pt-3 border-t border-[#142318]/60">
                  <div className="inline-flex flex-wrap items-center justify-center bg-[#070D0A]/90 px-4 py-1.5 rounded-full border border-white/10 gap-2 sm:gap-4 font-mono text-[11px]">
                    <span className="text-[#8E9B95] font-medium mr-1">Easy integration</span>
                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#0D1611] border border-[#182C1E] text-white">
                      <span className="text-yellow-400 text-[10px]">🐍</span>
                      <span>Python</span>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#0D1611] border border-[#182C1E] text-white">
                      <span className="bg-[#3178C6] text-white font-bold text-[8px] px-0.5 rounded-xs">TS</span>
                      <span>TypeScript</span>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#0D1611] border border-[#182C1E] text-white">
                      <span className="text-[#5FA04E] text-[10px]">⬢</span>
                      <span>Node.js</span>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#0D1611] border border-[#182C1E] text-white">
                      <Radio className="w-3 h-3 text-[#00E676]" />
                      <span>REST API</span>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#0D1611] border border-[#182C1E] text-white">
                      <Share2 className="w-3 h-3 text-[#00E676]" />
                      <span>WebSocket</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ==================================================== */}
            {/* OPERATING STATE 02: ANALYTICS                        */}
            {/* ==================================================== */}
            {activeMode === 'analytics' && (
              <div className="p-4 sm:p-5 lg:p-5 xl:p-6">
                
                {/* Analytics Header Strip */}
                <div className="flex flex-wrap items-center justify-between pb-3 mb-3.5 border-b border-[#142318] gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
                    <span className="font-mono text-xs font-bold text-white tracking-wider">
                      QUANT ANALYTICS
                    </span>
                    <span className="font-mono text-xs text-[#6B7D73]">•</span>
                    <span className="font-mono text-xs text-[#8E9B95] tracking-wider">
                      DATA WORKSTATION // LIVE
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-[#00E676]">
                    <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse shadow-[0_0_8px_#00E676]" />
                    <span className="font-bold">LIVE TICK ARCHIVE</span>
                  </div>
                </div>

                {/* 4 Key Institutional Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-3.5">
                  <div className="p-3 rounded-xl bg-[#09100C] border border-[#16271B]">
                    <div className="font-mono text-[9px] text-[#8E9B95] uppercase">TOTAL MARKETS</div>
                    <div className="font-mono text-lg sm:text-xl font-black text-white mt-0.5">1,022,416</div>
                    <div className="font-mono text-[10px] text-[#00E676] font-bold mt-0.5 flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5" /> +12.4%
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#09100C] border border-[#16271B]">
                    <div className="font-mono text-[9px] text-[#8E9B95] uppercase">TOTAL VOLUME (24H)</div>
                    <div className="font-mono text-lg sm:text-xl font-black text-white mt-0.5">$12.66M</div>
                    <div className="font-mono text-[10px] text-[#00E676] font-bold mt-0.5 flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5" /> +23.7%
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#09100C] border border-[#16271B]">
                    <div className="font-mono text-[9px] text-[#8E9B95] uppercase">TOTAL TRADES (24H)</div>
                    <div className="font-mono text-lg sm:text-xl font-black text-white mt-0.5">40,933</div>
                    <div className="font-mono text-[10px] text-[#00E676] font-bold mt-0.5 flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5" /> +15.3%
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#09100C] border border-[#16271B]">
                    <div className="font-mono text-[9px] text-[#8E9B95] uppercase">ACTIVE TRADERS (24H)</div>
                    <div className="font-mono text-lg sm:text-xl font-black text-white mt-0.5">29,990</div>
                    <div className="font-mono text-[10px] text-[#00E676] font-bold mt-0.5 flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5" /> +9.8%
                    </div>
                  </div>
                </div>

                {/* Technical Chart: VOLUME OVER TIME (24H) */}
                <div className="p-3.5 rounded-xl bg-[#09100C] border border-[#16271B] mb-3.5">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#142318]">
                    <div className="font-mono text-[11px] font-bold text-white tracking-wider">
                      VOLUME OVER TIME
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#00E676]/15 text-[#00E676] font-mono text-[10px] font-bold border border-[#00E676]/30">
                      24H
                    </span>
                  </div>

                  {/* SVG Line Chart */}
                  <div className="w-full h-24 sm:h-28 relative overflow-hidden">
                    <svg viewBox="0 0 600 110" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="analyticsGradCompact" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00E676" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#00E676" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <polygon points={analyticsAreaPrimary} fill="url(#analyticsGradCompact)" />
                      <polyline
                        points={analyticsLineSecondary}
                        fill="none"
                        stroke="rgba(255,255,255,0.18)"
                        strokeWidth="1.2"
                        strokeDasharray="4 3"
                      />
                      <polyline
                        points={analyticsLinePrimary}
                        fill="none"
                        stroke="#00E676"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Timestamps */}
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#8E9B95] pt-1.5 border-t border-[#142318]">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>24:00</span>
                  </div>
                </div>

                {/* VOLUME BY OUTCOME + TOP MARKETS BY VOLUME */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 mb-3">
                  {/* VOLUME BY OUTCOME (4 cols) */}
                  <div className="lg:col-span-4 p-3.5 rounded-xl bg-[#09100C] border border-[#16271B]">
                    <div className="font-mono text-[11px] font-bold text-white mb-2.5 tracking-wider">
                      VOLUME BY OUTCOME
                    </div>
                    <div className="space-y-2.5 font-mono">
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-[#00E676] font-bold">YES</span>
                          <span className="text-white font-bold">$6.58M</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className="h-full bg-[#00E676]" style={{ width: '52%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-[#EF4444] font-bold">NO</span>
                          <span className="text-white font-bold">$6.08M</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className="h-full bg-[#EF4444]" style={{ width: '48%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TOP MARKETS BY VOLUME (24H) (8 cols) */}
                  <div className="lg:col-span-8 p-3.5 rounded-xl bg-[#09100C] border border-[#16271B]">
                    <div className="font-mono text-[11px] font-bold text-white mb-2 tracking-wider">
                      TOP MARKETS BY VOLUME (24H)
                    </div>
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.02] border border-white/5">
                        <span className="text-white font-medium truncate max-w-[220px] sm:max-w-none">Will Bitcoin trade above $120K in 2026?</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">$3.11M</span>
                          <span className="text-[#00E676] font-semibold">+7.3%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.02] border border-white/5">
                        <span className="text-white font-medium truncate max-w-[220px] sm:max-w-none">NBER declares a recession before year end?</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">$980.0K</span>
                          <span className="text-[#00E676] font-semibold">+14.2%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.02] border border-white/5">
                        <span className="text-white font-medium truncate max-w-[220px] sm:max-w-none">New frontier model shipped this quarter?</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">$1.54M</span>
                          <span className="text-[#00E676] font-semibold">+9.6%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.02] border border-white/5">
                        <span className="text-white font-medium truncate max-w-[220px] sm:max-w-none">Fed rate cut before September?</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">$4.82M</span>
                          <span className="text-[#00E676] font-semibold">+6.1%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom: Export & integrate */}
                <div className="p-2.5 rounded-xl bg-[#09100C] border border-[#16271B] flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                  <span className="text-[#8E9B95] uppercase">Export &amp; integrate:</span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {['REST API', 'WebSocket', 'S3 Export', 'BigQuery', 'Snowflake'].map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded bg-black/40 border border-[#1C2C20] text-white font-bold hover:border-[#00E676] transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ==================================================== */}
            {/* OPERATING STATE 03: AI AGENTS                        */}
            {/* ==================================================== */}
            {activeMode === 'agents' && (
              <div className="p-4 sm:p-5 lg:p-5 xl:p-6">
                
                {/* AI Agents Header Strip */}
                <div className="flex flex-wrap items-center justify-between pb-3 mb-3.5 border-b border-[#142318] gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
                    <span className="font-mono text-xs font-bold text-white tracking-wider">
                      AI AGENTS
                    </span>
                    <span className="font-mono text-xs text-[#6B7D73]">•</span>
                    <span className="font-mono text-xs text-[#8E9B95] tracking-wider">
                      MARKET DATA AGENT
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs">
                    <div className="px-2 py-0.5 rounded bg-[#09110D] border border-[#182C1E] text-[#94A3B8] text-[11px]">
                      PROTOCOL: <span className="text-white font-bold">NATIVE MCP SERVER</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#00E676] font-bold text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse shadow-[0_0_8px_#00E676]" />
                      <span>140ms LLM LATENCY</span>
                    </div>
                  </div>
                </div>

                {/* Split Terminal: Left (Chat Session), Right (Capabilities) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  
                  {/* LEFT: CONVERSATIONAL AGENT SESSION (7 cols) */}
                  <div className="lg:col-span-7 p-3.5 sm:p-4 rounded-xl bg-[#09100C] border border-[#16271B] flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[11px] font-bold text-white uppercase tracking-wider mb-2.5 pb-1.5 border-b border-[#142318]">
                        CHAT WITH YOUR MARKET DATA AGENT
                      </div>

                      <div className="space-y-2.5">
                        {chatMessages.map((msg) => {
                          if (msg.sender === 'user') {
                            return (
                              <div key={msg.id} className="flex justify-end">
                                <div className="max-w-[88%] bg-[#00E676]/15 border border-[#00E676]/40 text-white text-[11px] font-mono px-3 py-1.5 rounded-xl rounded-tr-none shadow-sm">
                                  {msg.text}
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div key={msg.id} className="flex items-start gap-2.5">
                              <div className="w-5 h-5 rounded-md bg-[#00E676]/15 text-[#00E676] flex items-center justify-center shrink-0 mt-0.5 border border-[#00E676]/30">
                                <Bot className="w-3 h-3" />
                              </div>
                              <div className="flex-1 space-y-1.5 font-mono text-[11px]">
                                {msg.intro && (
                                  <p className="text-[#D1D5DB] leading-relaxed">
                                    {msg.intro}
                                  </p>
                                )}

                                {/* Metric Breakdown */}
                                {msg.metrics && (
                                  <div className="p-2.5 rounded-lg bg-[#060A08] border border-[#142318] grid grid-cols-3 gap-1.5 text-center">
                                    <div>
                                      <div className="text-[9px] text-[#8E9B95] uppercase">BEST BID</div>
                                      <div className="text-xs font-bold text-white mt-0.5">{msg.metrics.bid}</div>
                                    </div>
                                    <div>
                                      <div className="text-[9px] text-[#8E9B95] uppercase">BEST ASK</div>
                                      <div className="text-xs font-bold text-white mt-0.5">{msg.metrics.ask}</div>
                                    </div>
                                    <div>
                                      <div className="text-[9px] text-[#8E9B95] uppercase">SPREAD</div>
                                      <div className="text-xs font-bold text-[#00E676] mt-0.5">{msg.metrics.spread}</div>
                                    </div>
                                  </div>
                                )}

                                {/* Line Chart Preview */}
                                {msg.chart && (
                                  <div className="p-2 rounded-lg bg-[#060A08] border border-[#142318]">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-bold text-white text-[11px]">{msg.chart.price}</span>
                                      <span className="text-[#8E9B95] text-[10px]">{msg.chart.volume}</span>
                                    </div>
                                    <div className="w-full h-8 relative overflow-hidden">
                                      <svg viewBox="0 0 300 35" className="w-full h-full" preserveAspectRatio="none">
                                        <polyline
                                          points="0,25 30,22 60,24 90,16 120,20 150,12 180,16 210,8 240,11 270,5 300,7"
                                          fill="none"
                                          stroke="#00E676"
                                          strokeWidth="1.8"
                                          strokeLinecap="round"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Chat Input */}
                    <div className="mt-2.5 pt-2 border-t border-[#142318]">
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="ASK YOUR MARKET DATA AGENT…"
                          className="w-full bg-[#060A08] border border-[#16271B] rounded-lg py-2 pl-3 pr-9 font-mono text-[11px] text-white placeholder-[#64748B] outline-none focus:border-[#00E676]/60 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => handleSendMessage()}
                          className="absolute right-1 p-1 rounded-md bg-[#00E676] text-[#050706] hover:bg-[#00c968] font-bold transition-colors cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: AVAILABLE CAPABILITIES & MARKETPLACES (5 cols) */}
                  <div className="lg:col-span-5 p-3.5 sm:p-4 rounded-xl bg-[#09100C] border border-[#16271B] flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-white mb-2.5">
                        AVAILABLE CAPABILITIES
                      </div>
                      
                      <div className="space-y-1.5 mb-3 font-mono">
                        <div className="flex items-start gap-2">
                          <Compass className="w-3.5 h-3.5 text-[#00E676] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[11px] font-semibold text-white">MARKET OVERVIEW</div>
                            <div className="text-[9px] text-[#8E9B95]">Get market summary and key stats</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-[#00E676] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[11px] font-semibold text-white">ORDERBOOK SNAPSHOT</div>
                            <div className="text-[9px] text-[#8E9B95]">Best bid/ask, depth and spread</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <ArrowLeftRight className="w-3.5 h-3.5 text-[#00E676] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[11px] font-semibold text-white">RECENT TRADES</div>
                            <div className="text-[9px] text-[#8E9B95]">Latest trades and volumes</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <LineChart className="w-3.5 h-3.5 text-[#00E676] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[11px] font-semibold text-white">PRICE &amp; VOLUME CHART</div>
                            <div className="text-[9px] text-[#8E9B95]">Historical charts and metrics</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Bell className="w-3.5 h-3.5 text-[#00E676] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[11px] font-semibold text-white">SIGNALS &amp; ALERTS</div>
                            <div className="text-[9px] text-[#8E9B95]">Unusual activity and signals</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Search className="w-3.5 h-3.5 text-[#00E676] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[11px] font-semibold text-white">MARKET SEARCH</div>
                            <div className="text-[9px] text-[#8E9B95]">Find markets and assets</div>
                          </div>
                        </div>
                      </div>

                      {/* Connected Marketplaces */}
                      <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-white mb-1.5 pt-2 border-t border-[#142318]">
                        CONNECTED MARKETPLACES
                      </div>
                      <div className="space-y-1 font-mono text-[10px]">
                        <div className="flex items-center justify-between text-white">
                          <span>POLYMARKET</span>
                          <span className="font-bold text-[#00E676] flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-[#00E676] animate-pulse" />
                            LIVE
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[#8E9B95]">
                          <span>KALSHI</span>
                          <span className="text-[#F59E0B]">SOON</span>
                        </div>
                        <div className="flex items-center justify-between text-[#8E9B95]">
                          <span>LIMITLESS</span>
                          <span className="text-[#F59E0B]">SOON</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
