import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, 
  Layers, 
  Database, 
  Bot, 
  TrendingUp, 
  Zap, 
  ArrowLeftRight, 
  BookOpen,
  Activity,
  Cpu,
  Wifi,
  Sparkles
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EventStreamSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const normalizedWordRef = useRef(null);
  const terminalRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const canvasRef = useRef(null);

  // Initial event log matching PMAXIS stream
  const initialEvents = [
    {
      id: 997689,
      time: '19:56:59.117',
      type: 'MARKET UPDATE',
      color: '#00E676',
      icon: TrendingUp,
      text: 'A spot SOL ETF approved in US? YES 55.1% → 56.0%',
      source: 'POLYMARKET'
    },
    {
      id: 934282,
      time: '19:56:56.091',
      type: 'ORDERBOOK',
      color: '#A78BFA',
      icon: BookOpen,
      text: 'Bid 63.1 Ask 63.7',
      source: 'POLYMARKET'
    },
    {
      id: 977356,
      time: '19:56:32.660',
      type: 'TRADE',
      color: '#C084FC',
      icon: ArrowLeftRight,
      text: '$14,250 @ 64.0¢',
      source: 'POLYMARKET'
    },
    {
      id: 942713,
      time: '19:55:32.650',
      type: 'SIGNAL',
      color: '#FBBF24',
      icon: Zap,
      text: 'Momentum ↑ 3.4% detected',
      source: 'POLYMARKET'
    },
    {
      id: 964911,
      time: '19:54:32.648',
      type: 'MARKET UPDATE',
      color: '#00E676',
      icon: TrendingUp,
      text: 'Fed rate cut before September? YES 63.4% → 64.1%',
      source: 'POLYMARKET'
    },
    {
      id: 926056,
      time: '19:53:32.634',
      type: 'TRADE',
      color: '#C084FC',
      icon: ArrowLeftRight,
      text: '$28,400 @ 56.0¢',
      source: 'POLYMARKET'
    },
    {
      id: 986582,
      time: '19:52:32.653',
      type: 'MARKET UPDATE',
      color: '#00E676',
      icon: TrendingUp,
      text: 'A spot SOL ETF approved in US? YES 55.1% → 56.0%',
      source: 'POLYMARKET'
    },
    {
      id: 949493,
      time: '19:51:32.649',
      type: 'ORDERBOOK',
      color: '#A78BFA',
      icon: BookOpen,
      text: 'Bid 63.1 Ask 63.7',
      source: 'POLYMARKET'
    }
  ];

  const [events, setEvents] = useState(initialEvents);
  const [highlightId, setHighlightId] = useState(null);
  const [activePipelineStep, setActivePipelineStep] = useState(0);
  const [dataFlowPulse, setDataFlowPulse] = useState(false);
  const [hoveredRowId, setHoveredRowId] = useState(null);

  // Stream generator pool
  const streamPool = [
    {
      type: 'MARKET UPDATE',
      color: '#00E676',
      icon: TrendingUp,
      text: 'Fed rate cut before September? YES 63.4% → 64.1%',
      source: 'POLYMARKET'
    },
    {
      type: 'SIGNAL',
      color: '#FBBF24',
      icon: Zap,
      text: 'Momentum ↑ 3.4% detected',
      source: 'POLYMARKET'
    },
    {
      type: 'TRADE',
      color: '#C084FC',
      icon: ArrowLeftRight,
      text: '$14,250 @ 64.0¢',
      source: 'POLYMARKET'
    },
    {
      type: 'ORDERBOOK',
      color: '#A78BFA',
      icon: BookOpen,
      text: 'Bid 63.1 Ask 63.7',
      source: 'POLYMARKET'
    },
    {
      type: 'MARKET UPDATE',
      color: '#00E676',
      icon: TrendingUp,
      text: 'A spot SOL ETF approved in US? YES 55.1% → 56.0%',
      source: 'POLYMARKET'
    },
    {
      type: 'TRADE',
      color: '#C084FC',
      icon: ArrowLeftRight,
      text: '$28,400 @ 56.0¢',
      source: 'POLYMARKET'
    }
  ];

  // Pipeline card metadata
  const pipelineSteps = [
    {
      number: '01',
      title: 'Live from markets',
      desc: 'Captured in real-time',
      tag: 'INGESTING',
      metric: '10 Gbps',
      icon: Radio
    },
    {
      number: '02',
      title: 'Normalized',
      desc: 'Standardized & enriched',
      tag: 'PARSED',
      metric: '100% Schema',
      icon: Layers
    },
    {
      number: '03',
      title: 'Structured',
      desc: 'Consistent & queryable',
      tag: 'INDEXED',
      metric: '< 1ms Latency',
      icon: Database
    },
    {
      number: '04',
      title: 'Agent ready',
      desc: 'Built for AI applications',
      tag: 'SYNCHRONIZED',
      metric: 'MCP Server',
      icon: Bot
    }
  ];

  // 1. GSAP ScrollTrigger Scroll Entrance & Sequential Progress Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal with blur-to-sharp & upward glide on scroll
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            opacity: 0,
            y: 40,
            filter: 'blur(12px)'
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%'
            }
          }
        );
      }

      // "normalized" electric surge pulse
      if (normalizedWordRef.current) {
        gsap.fromTo(
          normalizedWordRef.current,
          {
            textShadow: '0 0 0px #00E676',
            color: '#8C9C90'
          },
          {
            textShadow: '0 0 20px #00E676, 0 0 40px rgba(0,230,118,0.7)',
            color: '#00E676',
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          }
        );
      }

      // Terminal Table scale & opacity reveal on scroll
      if (terminalRef.current) {
        gsap.fromTo(
          terminalRef.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.96
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: terminalRef.current,
              start: 'top 82%'
            }
          }
        );
      }

      // 4 Pipeline Cards staggered reveal on scroll
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.children;
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 35,
            scale: 0.94
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 88%'
            }
          }
        );
      }

      // Smooth Scroll-Driven Stage Activation triggered as cards glide through viewport
      if (cardsContainerRef.current) {
        ScrollTrigger.create({
          trigger: cardsContainerRef.current,
          start: 'top 85%',
          end: 'bottom 45%',
          onUpdate: (self) => {
            const p = self.progress;
            let targetStep = 0;
            if (p < 0.25) targetStep = 0;
            else if (p < 0.50) targetStep = 1;
            else if (p < 0.75) targetStep = 2;
            else targetStep = 3;
            setActivePipelineStep((prev) => (prev !== targetStep ? targetStep : prev));
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Real-Time Event Engine Simulation + Multi-Stage Pulse Flow
  useEffect(() => {
    let poolIdx = 0;
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
      const template = streamPool[poolIdx % streamPool.length];
      poolIdx++;

      const newId = Math.floor(910000 + Math.random() * 89000);
      const newEvent = {
        ...template,
        id: newId,
        time: timeStr
      };

      setHighlightId(newId);
      setEvents(prev => [newEvent, ...prev.slice(0, 7)]);

      // Trigger data pulse flow from Table -> Card 1 -> Card 2 -> Card 3 -> Card 4
      setDataFlowPulse(true);

      // Remove row highlight after scan sweep
      setTimeout(() => {
        setHighlightId(null);
        setDataFlowPulse(false);
      }, 1400);

    }, 3800);

    return () => clearInterval(interval);
  }, []);

  // 3. Subtle Canvas Background Data Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.6,
      alpha: Math.random() * 0.35 + 0.08
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 230, 118, ${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particle points
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 230, 118, ${p.alpha})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // 4. Subtle Mouse Movement Parallax (Passive direct ref updates to preserve 60fps scroll)
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    if (terminalRef.current) {
      terminalRef.current.style.transform = `translate3d(${x * 2.5}px, ${y * 2.5}px, 0)`;
    }
    if (cardsContainerRef.current) {
      cardsContainerRef.current.style.transform = `translate3d(${x * 1.5}px, ${y * 1.5}px, 0)`;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="event-stream"
      onMouseMove={handleMouseMove}
      className="relative bg-[#050706] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 select-none overflow-hidden border-b border-[#00E676]/20"
    >
      {/* Interactive Background Particle Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
      />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[360px] bg-[#00E676]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[250px] bg-[#00E676]/5 blur-[120px] pointer-events-none rounded-full" />



      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* ======================================================== */}
        {/* 1. SECTION HEADER (Scroll Entrance & Reveal)              */}
        {/* ======================================================== */}
        <div ref={headingRef} className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 text-[10px] font-mono font-bold text-[#00E676] tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
            REAL-TIME DATA INGESTION ENGINE
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            From market event to structured data.
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#8C9C90] font-normal">
            Every event,{' '}
            <span 
              ref={normalizedWordRef} 
              className="text-[#00E676] font-semibold transition-all duration-300"
            >
              normalized
            </span>{' '}
            and ready for agents.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 2. LIVE EVENT STREAM TERMINAL (Data Engine Machine)       */}
        {/* ======================================================== */}
        <div 
          ref={terminalRef}
          className="w-full max-w-4xl mx-auto rounded-2xl bg-[#090F0C]/95 border border-[#182C1E] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,230,118,0.08)] backdrop-blur-md overflow-hidden relative group will-change-transform"
        >
          {/* Subtle Terminal CRT Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
            <div className="w-full h-12 bg-gradient-to-b from-transparent via-[#00E676]/15 to-transparent animate-terminal-scan" />
          </div>

          {/* Terminal Corner Registration Accents */}
          <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#182C1E] border border-[#24422E]" />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#182C1E] border border-[#24422E]" />

          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-[#142218] bg-[#0A130F]/90">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] font-bold tracking-widest text-[#7C8F82] uppercase">
                EVENT STREAM
              </span>
              <span className="hidden sm:inline-block font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#101F16] border border-[#1E3626] text-[#00E676]">
                POLYGON · MEMPOOL · CLOB
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#00E676]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E676]" />
                </span>
                <span>● LIVE</span>
              </div>
            </div>
          </div>

          {/* Rows Stream Container */}
          <div 
            className="divide-y divide-[#132017] font-mono text-xs overflow-x-auto relative"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)'
            }}
          >
            {events.map((evt) => {
              const Icon = evt.icon;
              const isNew = highlightId === evt.id;
              const isHovered = hoveredRowId === evt.id;

              return (
                <div
                  key={evt.id}
                  onMouseEnter={() => setHoveredRowId(evt.id)}
                  onMouseLeave={() => setHoveredRowId(null)}
                  className={`relative flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 transition-all duration-300 min-w-[620px] ${
                    isNew 
                      ? 'bg-[#00E676]/10' 
                      : isHovered
                        ? 'bg-[#101C15]'
                        : 'hover:bg-[#0E1812]/80'
                  }`}
                >
                  {/* Left-edge green indicator notch on hover or new arrival */}
                  <div 
                    className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-200 ${
                      isNew || isHovered 
                        ? 'bg-[#00E676] shadow-[0_0_8px_#00E676]' 
                        : 'bg-transparent'
                    }`} 
                  />

                  {/* Horizontal Glowing Scanning Beam */}
                  {isNew && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-[#00E676]/30 to-transparent animate-scan-beam" />
                    </div>
                  )}

                  {/* Left: Timestamp */}
                  <span className="w-24 shrink-0 text-[#6B7D72] text-[11px] tracking-tight">
                    {evt.time}
                  </span>

                  {/* Event Type Badge with Icon */}
                  <div 
                    className="flex items-center gap-1.5 w-36 shrink-0 font-bold text-[10.5px] tracking-wider"
                    style={{ color: evt.color }}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2.2} />
                    <span>{evt.type}</span>
                  </div>

                  {/* Main Event Payload / Content */}
                  <div className="flex-1 min-w-0 text-[#E0E6E2] text-[11.5px] truncate font-normal">
                    {evt.text}
                  </div>

                  {/* Source Badge (POLYMARKET) */}
                  <div className="shrink-0 px-1.5 py-0.5 rounded text-[9.5px] font-bold text-[#8C9C90] border border-[#1A2E20] bg-[#0C1610]">
                    {evt.source}
                  </div>

                  {/* Event Numeric ID */}
                  <span className="w-16 shrink-0 text-right text-[11px] text-[#5A6C61]">
                    {evt.id}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Terminal Footer Telemetry Strip */}
          <div className="px-4 sm:px-5 py-2 bg-[#08100C] border-t border-[#132017] flex items-center justify-between text-[9px] sm:text-[9.5px] font-mono text-[#5A6C61]">
            <div className="flex items-center gap-2 overflow-hidden mr-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00E676] shrink-0" />
              <span className="truncate">SUBSCRIPTION: WS-STREAM // ALL_EVENTS</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <span className="hidden sm:inline">LATENCY: 4.2ms</span>
              <span className="text-[#00E676] font-bold">18,839 MSG/S</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. SUBTLE ENERGY DATA BUS LINE (Table -> Pipeline)       */}
        {/* ======================================================== */}
        <div className="w-full flex justify-center py-4 relative pointer-events-none">
          <svg className="w-48 h-8 overflow-visible" viewBox="0 0 192 32" fill="none">
            {/* Center descending data connector line */}
            <path 
              d="M 96 0 L 96 32" 
              stroke="#182C1E" 
              strokeWidth="1.5" 
              strokeDasharray="3 3"
            />
            {/* Animated glowing particle traveling down */}
            <circle 
              cx="96" 
              cy={dataFlowPulse ? 28 : 8} 
              r="2.5" 
              fill="#00E676" 
              className="transition-all duration-700 shadow-[0_0_8px_#00E676]"
            />
          </svg>
        </div>

        {/* ======================================================== */}
        {/* 4. DATA PIPELINE CARDS (Sequential Stages on Scroll)     */}
        {/* ======================================================== */}
        <div 
          ref={cardsContainerRef}
          className="w-full max-w-4xl mx-auto will-change-transform relative pt-2"
        >
          {/* Subtle connecting energy pipeline track line */}
          <div className="hidden lg:block absolute top-0 inset-x-6 h-[2px] bg-[#122218] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00E676] via-[#9EF0C2] to-[#00E676] shadow-[0_0_12px_#00E676] transition-all duration-500 ease-out"
              style={{ width: `${((activePipelineStep + 1) / 4) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative">
            
            {pipelineSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activePipelineStep === idx;
              const isAgentReady = idx === 3;

              return (
                <div key={step.number} className="relative flex-1 group cursor-pointer">
                  
                  {/* Step Card */}
                  <div 
                    onClick={() => setActivePipelineStep(idx)}
                    className={`relative h-full p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between overflow-hidden transform-gpu will-change-transform ${
                      isAgentReady && isActive
                        ? 'bg-[#0E1B13] border-[#00E676] shadow-[0_0_30px_rgba(0,230,118,0.3)]'
                        : isActive 
                          ? 'bg-[#0C1611] border-[#00E676]/80 shadow-[0_0_20px_rgba(0,230,118,0.18)]' 
                          : 'bg-[#080E0B] border-[#15241B] hover:border-[#223B2B] hover:bg-[#0A120E]'
                    }`}
                  >
                    {/* Agent Ready Energy Perimeter Trace Animation */}
                    {isAgentReady && isActive && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl" preserveAspectRatio="none">
                        <rect 
                          x="1" 
                          y="1" 
                          width="98%" 
                          height="96%" 
                          rx="12" 
                          fill="none" 
                          stroke="#00E676" 
                          strokeWidth="1.5" 
                          className="animate-border-trace"
                        />
                      </svg>
                    )}

                    {/* Card Top: Number + Status Tag */}
                    <div className="flex items-center justify-between mb-3 text-[9px] font-mono">
                      <span className={`font-bold transition-colors ${
                        isActive ? 'text-[#00E676]' : 'text-[#687B70]'
                      }`}>
                        STEP {step.number}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded border transition-colors ${
                        isActive 
                          ? 'bg-[#00E676]/15 border-[#00E676]/40 text-[#00E676] font-bold' 
                          : 'bg-[#0D1812] border-[#18281E] text-[#6B7D72]'
                      }`}>
                        {step.tag}
                      </span>
                    </div>

                    {/* Card Middle: Icon + Title */}
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className={`relative w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                          isActive
                            ? 'bg-[#00E676]/20 border-[#00E676] text-[#00E676] shadow-[0_0_14px_rgba(0,230,118,0.4)]'
                            : 'bg-[#0D1812] border-[#1A2B20] text-[#00E676]'
                        }`}
                      >
                        {/* Radar Pulse on Card 01 */}
                        {idx === 0 && (
                          <div className="absolute inset-0 rounded-lg border border-[#00E676]/50 animate-radar-ring pointer-events-none" />
                        )}

                        {/* Database particle ingestion on Card 03 */}
                        {idx === 2 && isActive && (
                          <div className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#00E676] animate-db-packet pointer-events-none" />
                        )}

                        <Icon 
                          className={`w-5 h-5 transition-transform ${
                            idx === 1 ? 'animate-layer-float' : ''
                          } ${
                            isAgentReady ? 'animate-pulse' : ''
                          }`} 
                          strokeWidth={2} 
                        />
                      </div>

                      {/* Title & Desc */}
                      <div className="min-w-0">
                        <div className={`font-sans text-xs sm:text-[13px] font-bold tracking-tight truncate transition-colors ${
                          isActive ? 'text-white' : 'text-[#E0E6E2]'
                        }`}>
                          {step.title}
                        </div>
                        <div className="font-sans text-[11px] text-[#7C8F82] leading-tight mt-0.5 truncate">
                          {step.desc}
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom: Metric Telemetry Readout */}
                    <div className="pt-2 border-t border-[#132017] flex items-center justify-between text-[9px] font-mono text-[#5A6C61]">
                      <span>METRIC</span>
                      <span className={`font-bold transition-colors ${
                        isActive ? 'text-[#00E676]' : 'text-[#8C9C90]'
                      }`}>
                        {step.metric}
                      </span>
                    </div>

                  </div>

                  {/* Inter-card Animated Pulse Line for Desktop */}
                  {idx < pipelineSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-2 border-t border-dashed border-[#1D3224] z-20 pointer-events-none">
                      <div 
                        className={`w-1 h-1 rounded-full bg-[#00E676] transition-opacity duration-300 ${
                          activePipelineStep === idx ? 'opacity-100 shadow-[0_0_6px_#00E676]' : 'opacity-0'
                        }`} 
                      />
                    </div>
                  )}

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}
