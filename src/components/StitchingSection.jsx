import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, CheckCircle2, Zap, Activity, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function StitchingSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const leftTerminalRef = useRef(null);
  const rightTerminalRef = useRef(null);
  const redThreadRef = useRef(null);
  const pmaxisCoreRef = useRef(null);
  const pipelineContainerRef = useRef(null);
  const singleDotRef = useRef(null);

  // Interactive hover state
  const [hoveredWithoutIdx, setHoveredWithoutIdx] = useState(null);

  // Exact 7 fragmented layers from user screenshot
  const withoutLayers = [
    { name: 'Polymarket API', issue: 'Rate limits & breaking endpoint changes' },
    { name: 'RPC', issue: 'Node dropouts, archive node timeouts & re-orgs' },
    { name: 'WebSocket', issue: 'Silent disconnects & missed orderbook ticks' },
    { name: 'Normalization', issue: 'Fragile JSON parsers & custom decimal math' },
    { name: 'Database', issue: 'High-write lock contention & bloated storage' },
    { name: 'Historical storage', issue: 'Uncompressed raw dumps without indexing' },
    { name: 'Your own processing', issue: 'CPU bottlenecks & manual cross-market stitch' },
  ];

  // GSAP Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Entrance animation on scroll
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      const terminals = [leftTerminalRef.current, rightTerminalRef.current];
      gsap.fromTo(
        terminals,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 2. Tangled Red Thread drawing (Left Mac Terminal)
      if (redThreadRef.current) {
        const redLen = redThreadRef.current.getTotalLength();
        redThreadRef.current.style.strokeDasharray = `${redLen}`;
        redThreadRef.current.style.strokeDashoffset = `${redLen}`;

        gsap.to(redThreadRef.current, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 3. ONE SINGLE DOT FLOWING ALONG CENTER PIPELINE (CONSTRAINED BETWEEN TIER 1 & TIER 3)
      if (!prefersReducedMotion && singleDotRef.current && pipelineContainerRef.current) {
        const tier1 = pipelineContainerRef.current.querySelector('[data-tier="1"]');
        const tier3 = pipelineContainerRef.current.querySelector('[data-tier="3"]');
        const startY = tier1 ? tier1.offsetTop + tier1.offsetHeight / 2 : 24;
        const endY = tier3 ? tier3.offsetTop + tier3.offsetHeight / 2 : 210;

        const dotTl = gsap.timeline({ repeat: -1 });
        dotTl
          .fromTo(
            singleDotRef.current,
            { y: startY, opacity: 0 },
            { y: startY + 16, opacity: 1, duration: 0.35, ease: 'power1.out' }
          )
          .to(singleDotRef.current, {
            y: endY - 16,
            opacity: 1,
            duration: 3.2,
            ease: 'none',
          })
          .to(singleDotRef.current, {
            y: endY,
            opacity: 0,
            duration: 0.35,
            ease: 'power1.in',
          });
      }

      // 4. PMAxis Core subtle breathing pulse
      if (pmaxisCoreRef.current) {
        gsap.to(pmaxisCoreRef.current, {
          boxShadow: '0 0 25px rgba(0, 230, 118, 0.35)',
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stitching"
      className="relative w-full min-h-screen lg:h-screen lg:min-h-[660px] lg:max-h-screen bg-[#F4F2EC] text-[#080909] select-none overflow-hidden border-b border-[#080909]/10 flex flex-col justify-between py-6 lg:py-6 px-4 sm:px-8 xl:px-14 lg:pr-32 xl:pr-36"
    >


      {/* Subtle Ambient Radial Glow on Right */}
      <div
        className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[520px] h-[440px] bg-[#00E676]/[0.05] rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Main Container - Sized to guarantee entire section fits in 1 frame */}
      <div className="w-full max-w-[1380px] mx-auto relative z-10 flex flex-col justify-between h-full min-h-0">
        
        {/* ================================================================ */}
        {/* COMPACT SECTION HEADER (FITS IN ONE FRAME)                       */}
        {/* ================================================================ */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto pt-1 lg:pt-2 shrink-0">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#EAE8E1] border border-[#D5D3CB] text-[10.5px] font-mono font-bold uppercase tracking-[0.18em] text-[#080909] mb-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse shadow-[0_0_6px_#00E676]" />
            <span>06 // DATA PIPELINE UNIFICATION</span>
          </div>

          {/* Main Headline */}
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-[2.6rem] font-black text-[#080909] tracking-tight leading-tight mb-1">
            Stop stitching prediction-market <span className="text-[#00E676]">data together.</span>
          </h2>

          {/* Subtitle */}
          <p className="font-mono text-xs sm:text-[13px] text-[#6C6E69] max-w-lg mx-auto leading-relaxed">
            Eliminate fragile custom scrapers, WebSocket reconnections, and multi-exchange schema stitching.
          </p>
        </div>

        {/* ================================================================ */}
        {/* DUAL MAC TERMINAL COMPARISON (FITS IN ONE FRAME)                 */}
        {/* ================================================================ */}
        <div className="flex-1 flex items-center my-2 lg:my-3 min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch w-full h-auto lg:h-full lg:max-h-[500px]">
            
            {/* ============================================================ */}
            {/* LEFT: WITHOUT PMAXIS (MAC TERMINAL INTERFACE)                */}
            {/* ============================================================ */}
            <div
              ref={leftTerminalRef}
              className="lg:col-span-6 rounded-2xl bg-[#090C0A] border border-[#EF4444]/30 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col justify-between overflow-hidden relative group hover:border-[#EF4444]/50 transition-colors h-full"
            >
              {/* Top Mac Titlebar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1A1F1B] bg-[#070908] select-none shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-[#8C9A91]">
                  <Terminal className="w-3 h-3 text-[#EF4444]" />
                  <span className="text-[#A2B3A9]">bash — legacy-stack</span>
                  <span className="text-[#4E5E54]">/</span>
                  <span className="text-[#EF4444] font-semibold">without-pmaxis</span>
                </div>

                <span className="font-mono text-[9px] text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/30 px-2 py-0.2 rounded font-bold">
                  HIGH FRICTION
                </span>
              </div>

              {/* Terminal Body: 7 Stack Items */}
              <div className="p-3.5 sm:p-4 relative flex-1 flex flex-col justify-between bg-[#0A0D0B] min-h-0">
                
                {/* Tangled SVG Thread */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 400 300"
                >
                  <path
                    ref={redThreadRef}
                    d="M 25,15 Q 375,35 25,60 T 375,105 T 25,150 T 375,195 T 25,240 L 200,280"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="1.4"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />
                </svg>

                {/* The 7 Stack Items */}
                <div className="relative z-10 space-y-1.5 flex-1 flex flex-col justify-between">
                  {withoutLayers.map((layer, idx) => {
                    const isHovered = hoveredWithoutIdx === idx;
                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredWithoutIdx(idx)}
                        onMouseLeave={() => setHoveredWithoutIdx(null)}
                        className={`relative z-10 py-1.5 px-3 rounded-lg border font-mono text-xs font-bold transition-all duration-150 cursor-pointer flex items-center justify-between ${
                          isHovered
                            ? 'bg-[#181112] border-[#EF4444] text-[#FFFFFF] shadow-[0_0_12px_rgba(239,68,68,0.25)]'
                            : 'bg-[#101411] border-white/[0.05] text-[#A6AAA4] hover:text-[#FFFFFF]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]/80" />
                          <span>{layer.name}</span>
                        </div>

                        <span className="text-[9.5px] text-[#EF4444] font-mono hidden sm:inline opacity-80">
                          {layer.issue}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Footer */}
                <div className="mt-2.5 pt-2 border-t border-[#1C241E] flex items-center justify-between font-mono text-[9.5px] text-[#A6AAA4] shrink-0">
                  <span className="flex items-center gap-1 text-[#EF4444] font-bold">
                    <Activity className="w-3 h-3" />
                    LATENCY // &gt; 450ms
                  </span>
                  <span className="text-[#7E8A82]">MULTIPLE FAILURE POINTS</span>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* RIGHT: WITH PMAXIS (MAC TERMINAL INTERFACE)                 */}
            {/* ============================================================ */}
            <div
              ref={rightTerminalRef}
              className="lg:col-span-6 rounded-2xl bg-[#090C0A] border border-[#00E676]/35 shadow-[0_20px_50px_rgba(0,230,118,0.12)] flex flex-col justify-between overflow-hidden relative group hover:border-[#00E676] transition-colors h-full"
            >
              {/* Top Mac Titlebar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#162019] bg-[#070908] select-none shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-[#78887F]">
                  <Terminal className="w-3 h-3 text-[#00E676]" />
                  <span className="text-[#A2B3A9]">zsh — pmaxis-stream</span>
                  <span className="text-[#4E5E54]">/</span>
                  <span className="text-[#00E676] font-semibold">with-pmaxis</span>
                </div>

                <span className="font-mono text-[9px] text-[#080909] bg-[#00E676] px-2 py-0.2 rounded font-black shadow-[0_0_6px_#00E676]">
                  ZERO OVERHEAD
                </span>
              </div>

              {/* Terminal Body: 3 Tiers with 1 Simple Center Line & Flowing Dot */}
              <div className="p-3.5 sm:p-4 relative flex-1 flex flex-col justify-between bg-[#0A0E0B] min-h-0">
                
                {/* 3 Tiers Stack with 1 Simple SVG Line & 1 Flowing Dot */}
                <div
                  ref={pipelineContainerRef}
                  className="relative flex-1 flex flex-col items-center justify-between py-2 w-full max-w-sm mx-auto z-10"
                >
                  {/* SIMPLE, CLEAN SVG CONNECTING LINE DOWN THE EXACT CENTER */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    overflow="visible"
                  >
                    {/* Single continuous vertical baseline line */}
                    <line
                      x1="50%"
                      y1="20"
                      x2="50%"
                      y2="calc(100% - 20px)"
                      stroke="#16261B"
                      strokeWidth="1.5"
                    />

                    {/* Active neon green laser line */}
                    <line
                      x1="50%"
                      y1="20"
                      x2="50%"
                      y2="calc(100% - 20px)"
                      stroke="#00E676"
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                    />
                  </svg>

                  {/* ONLY ONE SINGLE GLOWING MOVING DOT DOWN THE CENTER PIPELINE */}
                  <div
                    ref={singleDotRef}
                    className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none z-20 will-change-transform"
                    style={{ opacity: 0 }}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-[#00E676]/25 blur-[3px] absolute" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00E676] shadow-[0_0_10px_#00E676,0_0_16px_#00FF88] relative" />
                      <div className="w-1 h-1 rounded-full bg-white absolute" />
                    </div>
                  </div>

                  {/* TIER 1: Your Application */}
                  <div
                    data-tier="1"
                    className="w-full rounded-xl bg-[#0F1812] border border-[#00E676]/35 py-2.5 px-4 text-center shadow-md relative z-10 hover:border-[#00E676] transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse shadow-[0_0_6px_#00E676]" />
                      <span className="font-display font-bold text-sm text-[#FFFFFF] tracking-tight">
                        Your application
                      </span>
                    </div>
                    <div className="font-mono text-[9px] text-[#00E676] mt-0.5">
                      CLIENT AGENT // QUANT DESK
                    </div>
                  </div>

                  {/* Visible Data Pipeline Flow 1 -> 2 */}
                  <div className="relative flex flex-col items-center justify-center h-6 sm:h-8 w-full my-0.5 z-10">
                    <div className="w-[1.5px] h-full bg-[#16261B]" />
                    <div className="absolute inset-y-0 w-[1.5px] bg-gradient-to-b from-[#00E676]/70 via-[#00E676] to-[#00E676]/70 shadow-[0_0_8px_#00E676]" />
                  </div>

                  {/* TIER 2: ✕ PMAxis Core Engine */}
                  <div
                    ref={pmaxisCoreRef}
                    data-tier="2"
                    className="w-full rounded-xl bg-[#112419] border-2 border-[#00E676] py-3 px-4 text-center shadow-[0_0_20px_rgba(0,230,118,0.25)] relative z-10 will-change-transform cursor-pointer"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-mono font-black text-lg text-[#00E676] select-none">
                        ✕
                      </span>
                      <span className="font-display font-black text-base text-[#FFFFFF] tracking-tight">
                        PMAxis
                      </span>
                    </div>
                    <div className="font-mono text-[9.5px] text-[#A6AAA4] mt-0.5 flex items-center justify-center gap-2">
                      <span className="text-[#00E676] font-bold">NORMALIZED ENGINE</span>
                      <span>·</span>
                      <span>60Hz CLOB SYNC</span>
                    </div>
                  </div>

                  {/* Visible Data Pipeline Flow 2 -> 3 */}
                  <div className="relative flex flex-col items-center justify-center h-6 sm:h-8 w-full my-0.5 z-10">
                    <div className="w-[1.5px] h-full bg-[#16261B]" />
                    <div className="absolute inset-y-0 w-[1.5px] bg-gradient-to-b from-[#00E676]/70 via-[#00E676] to-[#00E676]/70 shadow-[0_0_8px_#00E676]" />
                  </div>

                  {/* TIER 3: Structured prediction-market data */}
                  <div
                    data-tier="3"
                    className="w-full rounded-xl bg-[#0F1812] border border-[#00E676]/35 py-2.5 px-4 text-center shadow-md relative z-10 hover:border-[#00E676] transition-colors"
                  >
                    <div className="font-display font-bold text-sm text-[#FFFFFF] tracking-tight">
                      Structured prediction-market data
                    </div>
                    <div className="font-mono text-[9px] text-[#00E676] mt-0.5 font-bold">
                      CANONICAL JSON-RPC // PARQUET // SUB-6ms
                    </div>
                  </div>

                </div>

                {/* Bottom Footer */}
                <div className="mt-2.5 pt-2 border-t border-[#1C241E] flex items-center justify-between font-mono text-[9.5px] text-[#A6AAA4] shrink-0">
                  <span className="flex items-center gap-1 text-[#00E676] font-bold">
                    <Zap className="w-3 h-3 fill-[#00E676]" />
                    SPEED // &lt; 4.8ms
                  </span>
                  <span className="text-[#F4F2EC] font-bold">1 SINGLE REST & WSS ENDPOINT</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
