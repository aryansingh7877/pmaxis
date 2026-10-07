import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Terminal, Copy, Check, Sparkles, Activity, ShieldCheck, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BuildOnPredictionSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const terminalRef = useRef(null);
  const bgTextRef = useRef(null);
  const pulseLineRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const [latency, setLatency] = useState(2.4);

  // Simulated live latency jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency((prev) => {
        const jitter = (Math.random() - 0.5) * 0.4;
        return Math.max(1.8, Math.min(3.2, +(prev + jitter).toFixed(1)));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install @pmaxis/sdk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Mouse Parallax for layered architectural depth
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    let rafId;

    const onMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const loop = () => {
      curX += (mouseX - curX) * 0.05;
      curY += (mouseY - curY) * 0.05;

      if (bgTextRef.current) {
        bgTextRef.current.style.transform = `translate(${curX * 8}px, ${curY * 8}px)`;
      }
      if (terminalRef.current) {
        terminalRef.current.style.transform = `translate(${curX * 4}px, ${curY * 4}px)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // GSAP ScrollTrigger Entrance Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Headline Staggered Reveal
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 35, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power3.out' },
          0
        );
      }

      // 2. Subtitle Fade In
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
          0.2
        );
      }

      // 3. CTA Buttons Fluid Lift
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 25, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)' },
          0.35
        );
      }

      // 4. Interactive Command Bar Float In
      if (terminalRef.current) {
        tl.fromTo(
          terminalRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.55
        );
      }

      // 5. Continuous Laser Pulse along the connecting conduit
      if (pulseLineRef.current && !prefersReducedMotion) {
        gsap.to(pulseLineRef.current, {
          strokeDashoffset: -200,
          repeat: -1,
          ease: 'none',
          duration: 4,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="build-cta"
      className="relative w-full min-h-[75vh] lg:min-h-[85vh] bg-[#F4F2EC] text-[#080909] select-none overflow-hidden border-b border-[#080909]/10 flex flex-col justify-between py-16 sm:py-24 px-4 sm:px-8 xl:px-14 lg:pr-32 xl:pr-36"
    >
      {/* ================================================================== */}
      {/* 1. ARCHITECTURAL WARM OFF-WHITE BACKGROUND LAYERS                  */}
      {/* ================================================================== */}

      {/* Massive Architectural Background Wordmark "PREDICTION" */}
      <div
        ref={bgTextRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.032] z-0 will-change-transform"
      >
        <span className="font-display font-black text-[22vw] leading-none uppercase text-[#080909] tracking-tighter">
          PREDICTION
        </span>
      </div>

      {/* Ambient Neon Green Glow Halo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[450px] bg-[#00E676]/[0.055] rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Background Top & Bottom Technical Seam Ticks */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#080909]/15 to-transparent z-10" />

      {/* ================================================================== */}
      {/* 2. MAIN CENTER HERO CONTENT CONTAINER                              */}
      {/* ================================================================== */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center my-auto py-8"
      >
        {/* Top Eyebrow Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE8E1] border border-[#D5D3CB] text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#080909] mb-6 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse shadow-[0_0_8px_#00E676]" />
          <span>10 // PROTOCOL INTEGRATION · PRODUCTION DEPLOY</span>
        </div>

        {/* Exact Headline from User Screenshot */}
        <h2
          ref={titleRef}
          className="font-display text-3xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-black text-[#080909] tracking-tight leading-[0.98] mb-4 sm:mb-5"
        >
          Build on prediction markets.
        </h2>

        {/* Exact Subtitle from User Screenshot */}
        <p
          ref={subtitleRef}
          className="font-sans sm:font-mono text-sm sm:text-lg lg:text-xl text-[#5A5F58] max-w-2xl mx-auto font-medium mb-8 sm:mb-10 leading-relaxed"
        >
          PMAxis gives your application the data layer it needs.
        </p>

        {/* ================================================================ */}
        {/* 3. TWO ACTION BUTTONS (EXACT STYLING FROM SCREENSHOT)            */}
        {/* ================================================================ */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          {/* Primary Button: Solid Neon Green */}
          <a
            href="https://api.pmaxis.trade/signup"
            data-cursor="DEPLOY"
            className="w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-mono text-xs sm:text-base font-bold bg-[#00E676] hover:bg-[#00c864] text-[#080909] shadow-[0_0_25px_rgba(0,230,118,0.35)] hover:shadow-[0_0_38px_rgba(0,230,118,0.55)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get your free API key</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#080909]" />
          </a>

          {/* Secondary Button: Clean Obsidian Dark */}
          <a
            href="https://docs.pmaxis.trade"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="DOCS"
            className="w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-mono text-xs sm:text-base font-semibold bg-[#080909] hover:bg-black text-[#F4F2EC] border border-[#080909] shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
          >
            <BookOpen className="w-4 h-4 text-[#A8AEA4] group-hover:text-white transition-colors" />
            <span>Explore the docs</span>
          </a>
        </div>

        {/* ================================================================ */}
        {/* 4. LIVE INTERACTIVE COMMAND TICKER & TELEMETRY                   */}
        {/* ================================================================ */}
        <div
          ref={terminalRef}
          className="mt-12 flex flex-col sm:flex-row items-center gap-3 font-mono text-xs text-[#5A5F58]"
        >
          {/* Quick Copy Command Pill */}
          <div
            onClick={handleCopy}
            className="group flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-xl bg-white/90 border border-[#080909]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-[#00E676]/60 transition-all cursor-pointer max-w-full"
          >
            <Terminal className="w-3.5 h-3.5 text-[#00E676] shrink-0" />
            <span className="text-[#080909] font-bold text-[11px] sm:text-xs truncate">npm install @pmaxis/sdk</span>
            <div className="ml-1 text-[#8A9088] group-hover:text-[#080909] transition-colors shrink-0">
              {copied ? (
                <span className="flex items-center gap-1 text-[#00E676] font-bold text-[11px]">
                  <Check className="w-3 h-3" /> COPIED
                </span>
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </div>
          </div>

          {/* Live Ping Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EAE8E1]/80 border border-[#D5D3CB]/60 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
            <span className="text-[#080909] font-bold">LATENCY // {latency}ms</span>
            <span className="text-[#8A9088]">· 60Hz TICK STREAM</span>
          </div>
        </div>

        {/* 4 Trust Micro-badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-[11px] text-[#787E74]">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#00E676]" />
            <span>5,000 FREE MONTHLY CREDITS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#00E676]" />
            <span>NO CREDIT CARD REQUIRED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#00E676]" />
            <span>SUB-6MS WEBSOCKET FEEDS</span>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* 5. BOTTOM TECHNICAL SEAM & PROTOCOL STATUS BAR                     */}
      {/* ================================================================== */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between text-center gap-2 sm:gap-0 pt-4 border-t border-[#080909]/10 font-mono text-[10px] sm:text-[11px] text-[#6A7066]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
          <span>INDEXED MARKETS: 1,240+ LIVE</span>
        </div>
        <div className="hidden sm:block text-[#8A9088]">
          POLYGON · KALSHI · BASE · ARBITRUM · OPINION
        </div>
        <div className="flex items-center gap-2 text-[#080909] font-bold">
          <span>99.99% UPSTREAM UPTIME SLA</span>
        </div>
      </div>
    </section>
  );
}
