import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, ArrowDown, Activity, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function OnChainSection() {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const heroCardRef = useRef(null);
  const metricsRowRef = useRef(null);
  const bgTextRef = useRef(null);
  const greenConduitRef = useRef(null);
  const treeItemsRef = useRef([]);

  // Active tree branch highlight state
  const [activeBranch, setActiveBranch] = useState(1); // default 'Prices'

  // Exact content items from user screenshot
  const metrics = [
    { value: '1M++', label: 'MARKETS' },
    { value: '15M++', label: 'ON-CHAIN TRADES' },
    { value: '<6s', label: 'LATENCY' },
    { value: '24/7', label: 'LIVE STREAM' },
  ];

  const treeNodes = [
    { id: 0, name: 'Markets', meta: 'POLYGON · BASE · ARBITRUM', value: '1,240+' },
    { id: 1, name: 'Prices', meta: 'IMPLIED PROBABILITY', value: '63.4¢' },
    { id: 2, name: 'Trades', meta: 'INDEXED VOLUME 24H', value: '$4.82M' },
    { id: 3, name: 'Orderbooks', meta: 'LEVEL 2 DEPTH @ 60Hz', value: '$1.27M' },
    { id: 4, name: 'Signals', meta: 'MOMENTUM VELOCITY', value: '+3.2%' },
    { id: 5, name: 'On-chain', meta: 'CONTRACT EXECUTION', value: '0x89e1…' },
    { id: 6, name: 'Historical', meta: 'PARQUET S3 ARCHIVE', value: '15M+ TICKS' },
  ];

  // Mouse Parallax (Layered Depth)
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
        bgTextRef.current.style.transform = `translate(${curX * 4}px, ${curY * 4}px)`;
      }
      if (heroCardRef.current) {
        heroCardRef.current.style.transform = `translate(${curX * 10}px, ${curY * 8}px)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // GSAP ScrollTrigger Pinned Timeline (Smooth momentum scrub across equal diagonal split)
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDesktop) return; // Desktop only: keep mobile native & smooth without pinned scroll hijacking

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1000',
          pin: true,
          scrub: prefersReducedMotion ? false : 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Entrance of metrics row
      if (metricsRowRef.current) {
        tl.fromTo(
          metricsRowRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.25, stagger: 0.05, ease: 'power2.out' },
          0
        );
      }

      // 2. Physical smooth glide of hero tree card across the diagonal split
      if (heroCardRef.current) {
        tl.to(
          heroCardRef.current,
          {
            x: isDesktop ? 35 : 0,
            y: isDesktop ? 20 : 10,
            rotation: isDesktop ? 1.8 : 0,
            scale: 1.02,
            duration: 0.7,
            ease: 'power1.inOut',
          },
          0.08
        );
      }

      // 3. Staggered sequential highlight down the tree branch nodes
      treeItemsRef.current.forEach((el, idx) => {
        if (!el) return;
        tl.to(
          el,
          {
            backgroundColor: 'rgba(0, 230, 118, 0.14)',
            borderColor: '#00E676',
            duration: 0.12,
            ease: 'power1.inOut',
            onStart: () => setActiveBranch(idx),
          },
          0.12 + idx * 0.08
        );
      });

      // 4. Neon green connecting laser line extends down toward next section
      if (greenConduitRef.current) {
        tl.to(
          greenConduitRef.current,
          {
            scaleY: 1.4,
            y: 28,
            opacity: 1,
            duration: 0.25,
            ease: 'power2.out',
          },
          0.75
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="onchain"
      className="relative w-full min-h-screen bg-[#060707] text-[#F4F2EC] select-none overflow-hidden border-b border-[#EEECE5]/10"
    >
      {/* ================================================================== */}
      {/* PINNED HERO STAGE                                                  */}
      {/* ================================================================== */}
      <div
        ref={pinWrapperRef}
        className="w-full h-auto py-6 sm:py-14 pb-24 lg:pb-14 lg:h-screen lg:min-h-[720px] lg:max-h-screen relative flex flex-col justify-between overflow-hidden px-4 sm:px-8 xl:px-14 lg:pr-32 xl:pr-36"
      >
        {/* ================================================================ */}
        {/* LAYER 1: BASE DEEP DARK WORLD (EXACT 50% LEFT HALF)              */}
        {/* ================================================================ */}
        <div className="absolute inset-0 bg-[#060707] z-0 overflow-hidden pointer-events-none">


          {/* Massive Architectural Wordmark "BUILT ON" */}
          <div
            ref={bgTextRef}
            className="absolute top-1/2 left-8 -translate-y-1/2 select-none opacity-[0.025] will-change-transform"
          >
            <span className="font-display font-black text-[22vw] leading-none uppercase text-[#F4F2EC] tracking-tighter">
              MARKET
            </span>
          </div>

          {/* Ambient Restrained Neon Green Glow Spot */}
          <div className="absolute top-1/3 left-1/4 w-[480px] h-[340px] bg-[#00E676]/[0.035] rounded-full blur-[140px]" />
        </div>

        {/* ================================================================ */}
        {/* LAYER 2: MATHEMATICALLY EQUAL 50/50 DIAGONAL SPLIT OVERLAY       */}
        {/* Cuts from (75% 0%) to (25% 100%), dividing area exactly in half!  */}
        {/* ================================================================ */}
        <div
          style={{
            clipPath: 'polygon(75% 0%, 100% 0%, 100% 100%, 25% 100%)',
          }}
          className="absolute inset-0 bg-[#F4F1E8] text-[#080909] z-10 overflow-hidden pointer-events-none transition-none will-change-[clip-path]"
        >


          {/* Watermark in Light Plane */}
          <div className="absolute bottom-8 right-12 opacity-[0.05] select-none">
            <span className="font-display font-black text-[16vw] leading-none uppercase text-[#080909] tracking-tighter">
              PROTOCOL
            </span>
          </div>
        </div>

        {/* ================================================================ */}
        {/* EXACT EQUAL DIAGONAL SEAM CALIBRATION LINE & TICKS               */}
        {/* Drawn precisely from (75% 0) to (25% 100)                        */}
        {/* ================================================================ */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {/* Hairline Equal Diagonal Seam Guide */}
          <line
            x1="75"
            y1="0"
            x2="25"
            y2="100"
            stroke="#00E676"
            strokeWidth="0.15"
            strokeOpacity="0.45"
            strokeDasharray="1 1.5"
          />
        </svg>



        {/* Green Laser Conduit Crossing the Diagonal */}
        <div
          ref={greenConduitRef}
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-transparent via-[#00E676] to-transparent z-25 pointer-events-none opacity-80 shadow-[0_0_10px_#00E676] will-change-transform"
        />

        {/* ================================================================ */}
        {/* 1. TOP HEADER & MAIN TITLE (EXACT USER CONTENT)                  */}
        {/* ================================================================ */}
        <div className="relative z-30 w-full text-center pt-2 sm:pt-4">
          {/* Section Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111612] border border-[#00E676]/30 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#00E676] mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse shadow-[0_0_8px_#00E676]" />
            <span>05 // APPLICATION & PROTOCOL LAYER</span>
          </div>

          {/* Exact Headline from User Screenshot */}
          <h1 className="font-display text-2xl sm:text-5xl lg:text-6xl font-black text-[#F4F2EC] tracking-tight leading-tight">
            Built on the market.
          </h1>
        </div>

        {/* ================================================================ */}
        {/* 2. TOP METRICS ROW (EXACT 4 COLUMNS FROM USER SCREENSHOT)        */}
        {/* 1M++ MARKETS | 15M++ ON-CHAIN TRADES | <6s LATENCY | 24/7 STREAM */}
        {/* ================================================================ */}
        <div
          ref={metricsRowRef}
          className="relative z-30 w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-6 text-center my-2 sm:my-5"
        >
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0B0F0C]/80 backdrop-blur-md border border-white/[0.08] shadow-sm hover:border-[#00E676]/40 transition-colors"
            >
              <div className="font-mono font-black text-xl sm:text-3xl lg:text-4xl text-[#F4F2EC] tracking-tight">
                {m.value}
              </div>
              <div className="font-mono text-[8.5px] sm:text-[10.5px] text-[#A6AAA4] font-bold uppercase tracking-wider mt-0.5 sm:mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* ================================================================ */}
        {/* 3. CENTER / CROSS-BORDER: PREDICTION MARKETS TREE STRUCTURE      */}
        {/* Straddles the Equal Diagonal Split (Exact user screenshot card)  */}
        {/* ================================================================ */}
        <div className="relative z-30 w-full max-w-xl mx-auto flex items-center justify-center pb-2">
          <div
            ref={heroCardRef}
            className="w-full rounded-2xl bg-[#0B0F0C]/95 backdrop-blur-xl border border-white/[0.12] p-4 sm:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.8)] will-change-transform"
          >
            {/* Tree Card Header */}
            <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00E676]" />
                <span className="font-mono text-xs sm:text-sm font-black text-[#F4F2EC] tracking-wide">
                  Prediction Markets
                </span>
              </div>
              <span className="font-mono text-[9.5px] bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30 px-2 py-0.5 rounded font-bold">
                STRUCTURED SPEC
              </span>
            </div>

            {/* Tree Branch Hierarchy (Exact structure from user screenshot) */}
            <div className="space-y-1 font-mono text-xs sm:text-sm pl-2">
              {treeNodes.map((node, idx) => {
                const isLast = idx === treeNodes.length - 1;
                const isCurrent = activeBranch === idx;

                return (
                  <div
                    key={node.id}
                    ref={(el) => (treeItemsRef.current[idx] = el)}
                    onClick={() => setActiveBranch(idx)}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                      isCurrent
                        ? 'bg-[#00E676]/10 border-[#00E676] text-[#FFFFFF]'
                        : 'bg-transparent border-transparent text-[#A6AAA4] hover:text-[#F4F2EC] hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* Left: Tree branch ASCII lines */}
                    <div className="flex items-center gap-2">
                      <span className="text-[#555E57] select-none font-bold">
                        {isLast ? '└──' : '├──'}
                      </span>
                      <span className={`font-bold ${isCurrent ? 'text-[#00FF88]' : 'text-[#E2E6E3]'}`}>
                        {node.name}
                      </span>
                    </div>

                    {/* Right: Technical Metadata & Fixed Value */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className="hidden sm:inline text-[9px] text-[#717670]">
                        {node.meta}
                      </span>
                      <span
                        className={`font-mono font-bold text-xs ${
                          isCurrent ? 'text-[#00E676]' : 'text-[#DDD9CE]'
                        }`}
                      >
                        {node.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Card Footer */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-[#717670]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
                CANONICAL JSON-RPC // REAL-TIME
              </span>
              <span className="text-[#F4F2EC] font-bold">PMAXIS V1.0</span>
            </div>
          </div>
        </div>

        {/* Section Bottom Handoff Conduit */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none bg-gradient-to-b from-transparent to-[#060707]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
