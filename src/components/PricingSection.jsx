import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PricingSection() {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const trackRef = useRef(null);
  const trackWrapperRef = useRef(null);
  const cardsRef = useRef([]);
  const bgTextRef = useRef(null);

  // Active card index (0: Free, 1: Hobby, 2: Pro, 3: Custom)
  const [activeCard, setActiveCard] = useState(0);

  // View mode: 'focus' (smooth horizontal carousel track) or 'grid' (all 4 side-by-side)
  const [viewMode, setViewMode] = useState('focus');

  // Track window width for responsive calculation
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 1024;
  const mobileCardWidth = Math.min(340, Math.max(280, windowWidth - 40));
  const mobileGap = 20;
  const mobileStep = mobileCardWidth + mobileGap;

  // Touch gesture support for mobile carousel
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeCard < plans.length - 1) {
        goToCard(activeCard + 1);
      } else if (diff < 0 && activeCard > 0) {
        goToCard(activeCard - 1);
      }
    }
  };

  // Exact content matching user screenshot (media_1791383172444.png)
  const plans = [
    {
      id: 'free',
      name: 'Free',
      tabLabel: '01 FREE',
      price: '$0',
      period: '',
      credits: '5,000 credits/mo',
      features: [
        '1 API key',
        '5 webhooks',
        '5 WebSocket connections',
        '5 requests/sec burst',
      ],
      cta: 'Get your free API key',
      highlighted: false,
    },
    {
      id: 'hobby',
      name: 'Hobby',
      tabLabel: '02 HOBBY',
      price: '$29',
      period: '/mo',
      credits: '25,000 credits/mo',
      features: [
        '1 API key',
        '50 webhooks',
        '15 WebSocket connections',
        '10 requests/sec burst',
      ],
      cta: 'Start Hobby',
      highlighted: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      tabLabel: '03 PRO',
      price: '$99',
      period: '/mo',
      credits: '100,000 credits/mo',
      badge: 'POPULAR',
      features: [
        '3 API keys',
        '2,500 webhooks',
        '50 WebSocket connections',
        '25 requests/sec burst',
      ],
      cta: 'Start Pro',
      highlighted: true,
    },
    {
      id: 'custom',
      name: 'Custom',
      tabLabel: '04 CUSTOM',
      price: "Let's talk",
      period: '',
      credits: 'Unlimited credits',
      features: [
        'Unlimited API keys',
        'Unlimited webhooks',
        'Unlimited WebSocket connections',
        'Custom burst limits',
      ],
      cta: 'Contact sales',
      highlighted: false,
    },
  ];

  // Mouse Parallax for layered architectural depth
  useEffect(() => {
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
        bgTextRef.current.style.transform = `translate(${curX * 6}px, ${curY * 6}px)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  const scrollTriggerInstanceRef = useRef(null);

  // Measure exact physical step distance between cards on desktop
  const calculateStep = () => {
    if (cardsRef.current[0] && cardsRef.current[1]) {
      const r0 = cardsRef.current[0].getBoundingClientRect();
      const r1 = cardsRef.current[1].getBoundingClientRect();
      const d = Math.abs(r1.left - r0.left);
      if (d > 50) return d;
    }
    return 432;
  };

  // GSAP ScrollTrigger Pinned Timeline for Desktop (Silky smooth momentum scrub with Lenis)
  useEffect(() => {
    if (!isDesktop) return; // Desktop only: keep mobile native & smooth without pinned scroll hijacking
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (viewMode === 'focus') {
        const step = calculateStep();
        const totalDistance = 3 * step;

        // Reset track position
        gsap.set(trackRef.current, { x: 0 });

        // Initial card visual states: Card 0 active (full scale & opacity), others muted
        cardsRef.current.forEach((card, idx) => {
          if (!card) return;
          if (idx === 0) {
            gsap.set(card, { scale: 1, opacity: 1 });
          } else {
            gsap.set(card, { scale: 0.92, opacity: 0.35 });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=1200',
            pin: true,
            scrub: prefersReducedMotion ? false : 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              let nextIdx = 0;
              if (p >= 0.82) nextIdx = 3;
              else if (p >= 0.49) nextIdx = 2;
              else if (p >= 0.16) nextIdx = 1;
              else nextIdx = 0;
              setActiveCard(nextIdx);
            },
          },
        });

        scrollTriggerInstanceRef.current = tl.scrollTrigger;

        // 1. Continuous momentum-scrubbed translation across all 3 steps
        tl.to(
          trackRef.current,
          {
            x: -totalDistance,
            ease: 'none',
            duration: 3,
          },
          0
        );

        // 2. Smooth scale and opacity interpolation as each card crosses center focus
        const c0 = cardsRef.current[0];
        const c1 = cardsRef.current[1];
        const c2 = cardsRef.current[2];
        const c3 = cardsRef.current[3];

        if (c0 && c1 && c2 && c3) {
          tl.to(c0, { scale: 0.92, opacity: 0.35, ease: 'power1.inOut', duration: 1 }, 0);
          tl.to(c1, { scale: 1, opacity: 1, ease: 'power1.inOut', duration: 1 }, 0);
          tl.to(c1, { scale: 0.92, opacity: 0.35, ease: 'power1.inOut', duration: 1 }, 1);
          tl.to(c2, { scale: 1, opacity: 1, ease: 'power1.inOut', duration: 1 }, 1);
          tl.to(c2, { scale: 0.92, opacity: 0.35, ease: 'power1.inOut', duration: 1 }, 2);
          tl.to(c3, { scale: 1, opacity: 1, ease: 'power1.inOut', duration: 1 }, 2);
        }
      } else {
        // Grid mode: All 4 cards visible, staggered subtle entrance
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [viewMode, isDesktop]);

  // Jump to specific card smoothly via Lenis on desktop, or state on mobile
  const goToCard = (index) => {
    setActiveCard(index);
    if (!isDesktop) return; // on mobile, instant reactive translation to centered card
    if (!scrollTriggerInstanceRef.current) return;
    const st = scrollTriggerInstanceRef.current;
    const targets = [0, 0.3333, 0.6667, 1];
    const targetProgress = targets[index] ?? 0;
    const targetScroll = st.start + (st.end - st.start) * targetProgress;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetScroll, { duration: 0.9 });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    if (activeCard > 0) goToCard(activeCard - 1);
  };

  const handleNext = () => {
    if (activeCard < plans.length - 1) goToCard(activeCard + 1);
  };

  return (
    <section
      ref={sectionRef}
      id="price"
      className="relative w-full min-h-screen bg-[#060707] text-[#F4F2EC] select-none overflow-hidden border-b border-[#EEECE5]/10"
    >
      {/* ================================================================== */}
      {/* HERO FRAME                                                         */}
      {/* ================================================================== */}
      <div
        ref={pinWrapperRef}
        className="w-full min-h-[620px] lg:h-screen lg:min-h-[680px] lg:max-h-screen relative flex flex-col justify-between overflow-hidden py-4 sm:py-6 px-4 sm:px-8 xl:px-14 lg:pr-32 xl:pr-36"
      >
        {/* ================================================================ */}
        {/* LAYER 1: BASE DEEP DARK WORLD (EXACT 50% LEFT HALF)              */}
        {/* ================================================================ */}
        <div className="absolute inset-0 bg-[#060707] z-0 overflow-hidden pointer-events-none">


          {/* Massive Architectural Wordmark "SCALE" */}
          <div
            ref={bgTextRef}
            className="absolute top-1/2 left-8 -translate-y-1/2 select-none opacity-[0.025] will-change-transform"
          >
            <span className="font-display font-black text-[22vw] leading-none uppercase text-[#F4F2EC] tracking-tighter">
              SCALE
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
            <span className="font-display font-black text-[18vw] leading-none uppercase text-[#080909] tracking-tighter">
              TIERS
            </span>
          </div>
        </div>

        {/* ================================================================ */}
        {/* EXACT EQUAL DIAGONAL SEAM CALIBRATION LINE & TICKS               */}
        {/* ================================================================ */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
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



        {/* ================================================================ */}
        {/* 1. TOP HEADER: TITLE & DYNAMIC TIER NAV TRACKER                  */}
        {/* ================================================================ */}
        <div className="relative z-30 w-full flex flex-col items-center text-center pt-1">
          {/* Subtitle / Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#111612]/90 border border-[#00E676]/30 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#00E676] mb-1.5 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse shadow-[0_0_8px_#00E676]" />
            <span>08 // ACCESS TIERS & CAPACITY</span>
          </div>

          {/* Exact Headline from User Screenshot */}
          <h2 className="font-display text-xl sm:text-4xl lg:text-5xl font-black text-[#F4F2EC] tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Start with the data. Scale when you need it.
          </h2>

          {/* Tier Tracker Pills, Prev/Next Arrows & View Toggle */}
          <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-2 mt-2 px-1">
            {/* 4 Step Indicator Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar max-w-full py-0.5 justify-start sm:justify-center mx-auto md:mx-0">
              {plans.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => goToCard(idx)}
                  className={`shrink-0 px-2.5 sm:px-3 py-1 rounded-full font-mono text-[10.5px] sm:text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    activeCard === idx
                      ? 'bg-[#00E676] text-[#060707] shadow-[0_0_15px_rgba(0,230,118,0.4)] scale-105'
                      : 'bg-[#0B0F0C]/80 backdrop-blur-md text-[#8A908A] hover:text-[#F4F2EC] border border-white/10'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeCard === idx ? 'bg-[#060707]' : 'bg-[#00E676]'
                    }`}
                  />
                  <span>{p.tabLabel}</span>
                  {p.badge && (
                    <span className="hidden sm:inline-block text-[8.5px] px-1 py-0.2 rounded bg-black/25 text-[#060707] font-black uppercase">
                      ★
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Quick Step Buttons & View Mode Toggle */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Previous & Next Chevron Controls */}
              {viewMode === 'focus' && (
                <div className="flex items-center gap-1 bg-[#0B0F0C]/80 border border-white/10 rounded-full p-0.5">
                  <button
                    onClick={handlePrev}
                    disabled={activeCard === 0}
                    aria-label="Previous Tier"
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      activeCard === 0
                        ? 'opacity-20 text-white/30 cursor-not-allowed'
                        : 'text-white hover:bg-[#00E676] hover:text-[#060707]'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={activeCard === plans.length - 1}
                    aria-label="Next Tier"
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      activeCard === plans.length - 1
                        ? 'opacity-20 text-white/30 cursor-not-allowed'
                        : 'text-white hover:bg-[#00E676] hover:text-[#060707]'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* View Mode Switcher: 1-BY-1 FOCUS vs ALL 4 GRID */}
              <div className="hidden md:flex items-center gap-1 p-0.5 rounded-full bg-[#0B0F0C]/80 border border-white/10 backdrop-blur-md">
                <button
                  onClick={() => setViewMode('focus')}
                  className={`px-3 py-1 rounded-full font-mono text-[10.5px] font-bold transition-all cursor-pointer ${
                    viewMode === 'focus'
                      ? 'bg-[#00E676] text-[#060707] shadow-sm'
                      : 'text-[#8A908A] hover:text-[#F4F2EC]'
                  }`}
                >
                  1-BY-1 FOCUS
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-full font-mono text-[10.5px] font-bold transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#00E676] text-[#060707] shadow-sm'
                      : 'text-[#8A908A] hover:text-[#F4F2EC]'
                  }`}
                >
                  ALL 4 GRID
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* 2. CENTER STAGE: CARDS DISPLAY                                    */}
        {/* ================================================================ */}
        <div className="relative z-30 w-full flex items-center justify-center my-auto py-1 overflow-hidden">
          {viewMode === 'focus' ? (
            /* ============================================================ */
            /* MODE A: BUTTERY SMOOTH HORIZONTAL BELT (ZERO OVERLAP EVER)   */
            /* Cards maintain fixed physical spacing and translate smoothly */
            /* ============================================================ */
            <div
              ref={trackWrapperRef}
              className="w-full flex items-center justify-start overflow-hidden py-3"
              style={{
                paddingLeft: isDesktop ? 'max(16px, calc(50vw - 200px))' : `calc(50vw - ${mobileCardWidth / 2}px)`,
                paddingRight: isDesktop ? 'max(16px, calc(50vw - 200px))' : `calc(50vw - ${mobileCardWidth / 2}px)`,
              }}
            >
              <div
                ref={trackRef}
                onTouchStart={!isDesktop ? handleTouchStart : undefined}
                onTouchEnd={!isDesktop ? handleTouchEnd : undefined}
                className="flex items-center gap-5 sm:gap-8 will-change-transform"
                style={{
                  transform: !isDesktop ? `translateX(-${activeCard * mobileStep}px)` : undefined,
                  transition: !isDesktop ? 'transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1)' : undefined,
                }}
              >
                {plans.map((plan, idx) => (
                  <div
                    key={plan.id}
                    ref={(el) => (cardsRef.current[idx] = el)}
                    onClick={() => goToCard(idx)}
                    style={{
                      width: !isDesktop ? `${mobileCardWidth}px` : undefined,
                      transform: !isDesktop ? (idx === activeCard ? 'scale(1)' : 'scale(0.93)') : undefined,
                      opacity: !isDesktop ? (idx === activeCard ? 1 : 0.38) : undefined,
                      transition: !isDesktop ? 'transform 0.35s ease, opacity 0.35s ease' : undefined,
                    }}
                    className={`w-[min(340px,calc(100vw-32px))] sm:w-[380px] lg:w-[400px] h-[420px] sm:h-[450px] shrink-0 rounded-2xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden cursor-pointer ${
                      plan.highlighted
                        ? 'bg-[#09150F] border-2 border-[#00E676] shadow-[0_0_40px_rgba(0,230,118,0.22),0_20px_50px_rgba(0,0,0,0.65)]'
                        : 'bg-[#0A0E0C] border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/25'
                    }`}
                  >
                    {/* Neon Top Edge Accent */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] ${
                        plan.highlighted
                          ? 'bg-[#00E676] shadow-[0_0_12px_#00E676]'
                          : 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
                      }`}
                    />

                    {/* Card Content Top */}
                    <div>
                      {/* Header: Name + Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans text-xl font-bold text-white tracking-tight">
                          {plan.name}
                        </span>
                        {plan.badge ? (
                          <span className="font-mono text-[10px] font-black uppercase text-[#060707] px-2.5 py-0.5 rounded-full bg-[#00E676] shadow-[0_0_12px_rgba(0,230,118,0.5)]">
                            {plan.badge}
                          </span>
                        ) : (
                          <span className="font-mono text-[9px] text-[#7A8078] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
                            TIER 0{idx + 1}
                          </span>
                        )}
                      </div>

                      {/* Price Display */}
                      <div className="flex items-baseline gap-1 my-1">
                        <span className="font-mono text-4xl sm:text-5xl font-black text-[#F4F2EC] tracking-tight">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="font-mono text-sm font-normal text-[#8A908A]">
                            {plan.period}
                          </span>
                        )}
                      </div>

                      {/* Credits Monospace Sub-label */}
                      <div className="font-mono text-xs sm:text-sm font-semibold text-[#00E676] tracking-wide mt-1 mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
                        <span>{plan.credits}</span>
                      </div>

                      {/* Features List with Green Checks */}
                      <div className="space-y-2.5 pt-3 border-t border-white/[0.08]">
                        {plan.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2.5">
                            <Check className="w-4 h-4 text-[#00E676] stroke-[2.8] shrink-0" />
                            <span className="font-sans text-sm text-[#D8DCD6] tracking-tight">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button Bottom */}
                    <div className="pt-3">
                      <button
                        className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group ${
                          plan.highlighted
                            ? 'bg-[#00E676] hover:bg-[#00c864] text-[#060707] shadow-[0_0_24px_rgba(0,230,118,0.4)] hover:shadow-[0_0_32px_rgba(0,230,118,0.6)]'
                            : 'bg-white/[0.04] hover:bg-white/[0.09] text-white border border-white/15 hover:border-[#00E676]/50'
                        }`}
                      >
                        <span>{plan.cta}</span>
                        <ArrowRight
                          className={`w-3.5 h-3.5 group-hover:translate-x-1 transition-transform ${
                            plan.highlighted ? 'text-[#060707]' : 'text-[#00E676]'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ============================================================ */
            /* MODE B: 4-COLUMN GRID (ALL 4 CARDS SIDE-BY-SIDE IN ONE FRAME)*/
            /* ============================================================ */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 w-full max-w-[1340px] mx-auto items-stretch">
              {plans.map((plan, idx) => (
                <div
                  key={plan.id}
                  ref={(el) => (cardsRef.current[idx] = el)}
                  className={`rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                    plan.highlighted
                      ? 'bg-[#0A1610] border-2 border-[#00E676] shadow-[0_0_35px_rgba(0,230,118,0.2),0_16px_40px_rgba(0,0,0,0.5)]'
                      : 'bg-[#0B0F0C] border border-white/[0.1] shadow-[0_12px_32px_rgba(0,0,0,0.3)] hover:border-[#00E676]/40'
                  }`}
                >
                  {/* Neon Top Edge Accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] ${
                      plan.highlighted
                        ? 'bg-[#00E676] shadow-[0_0_12px_#00E676]'
                        : 'bg-gradient-to-r from-transparent via-white/15 to-transparent'
                    }`}
                  />

                  {/* Card Content Top */}
                  <div>
                    {/* Header: Name + Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sans text-lg font-bold text-white tracking-tight">
                        {plan.name}
                      </span>
                      {plan.badge && (
                        <span className="font-mono text-[9px] font-black uppercase text-[#060707] px-2 py-0.5 rounded-full bg-[#00E676] shadow-[0_0_10px_rgba(0,230,118,0.4)]">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    {/* Price Display */}
                    <div className="flex items-baseline gap-1 my-1">
                      <span className="font-mono text-3xl sm:text-4xl font-black text-[#F4F2EC] tracking-tight">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="font-mono text-xs font-normal text-[#8A908A]">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    {/* Credits Monospace Sub-label */}
                    <div className="font-mono text-xs font-semibold text-[#00E676] tracking-wide mt-1 mb-4 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
                      <span>{plan.credits}</span>
                    </div>

                    {/* Features List with Green Checks */}
                    <div className="space-y-2 pt-2.5 border-t border-white/[0.08]">
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#00E676] stroke-[2.8] shrink-0" />
                          <span className="font-sans text-[12.5px] text-[#D8DCD6] tracking-tight">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button Bottom */}
                  <div className="pt-3">
                    <button
                      className={`w-full py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer group ${
                        plan.highlighted
                          ? 'bg-[#00E676] hover:bg-[#00c864] text-[#060707] shadow-[0_0_20px_rgba(0,230,118,0.35)]'
                          : 'bg-white/[0.04] hover:bg-white/[0.09] text-white border border-white/15 hover:border-[#00E676]/50'
                      }`}
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight
                        className={`w-3 h-3 group-hover:translate-x-0.5 transition-transform ${
                          plan.highlighted ? 'text-[#060707]' : 'text-[#00E676]'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================================================================ */}
        {/* 3. BOTTOM FOOTER TELEMETRY & SYSTEM CAPABILITIES                 */}
        {/* ================================================================ */}
        <div className="relative z-30 w-full max-w-5xl mx-auto flex items-center justify-between text-center pt-1 border-t border-white/[0.08] font-mono text-[9.5px] sm:text-[10.5px] text-[#7A8078]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
            <span>TICK-LEVEL REPLAY & ARCHIVES</span>
          </div>
          <div className="hidden sm:block text-[#9AA098]">
            POLYGON · KALSHI · BASE · ARBITRUM
          </div>
          <div className="flex items-center gap-2 text-[#00E676]">
            <span>99.99% HISTORICAL ACCURACY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
