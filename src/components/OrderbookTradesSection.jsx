import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Copy, Check, Play, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function OrderbookTradesSection() {
  const [activeTab, setActiveTab] = useState('REST');
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const terminalRef = useRef(null);

  // Endpoint configurations matching the exact user specification
  const tabData = {
    REST: {
      method: 'GET',
      endpoint: '/v1/markets/fed-rate-cut-sep/price',
      request: `curl -X GET https://api.pmaxis.trade/v1/markets/fed-rate-cut-sep/price \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Accept: application/json"`,
      response: `{
  "market": "fed-rate-cut-sep",
  "price": 0.634,
  "volume_24h": 4820000,
  "timestamp": 1786968121
}`
    },
    WEBSOCKET: {
      method: 'WSS',
      endpoint: 'wss://stream.pmaxis.trade/v1/markets/fed-rate-cut-sep',
      request: `wscat -c wss://stream.pmaxis.trade/v1/markets/fed-rate-cut-sep \\
  -H "X-API-Key: YOUR_API_KEY" \\
  --auth "Bearer <SESSION_TOKEN>"`,
      response: `{
  "event": "price_tick",
  "market": "fed-rate-cut-sep",
  "price": 0.634,
  "volume_24h": 4820000,
  "timestamp": 1786968121
}`
    },
    TRADES: {
      method: 'GET',
      endpoint: '/v1/markets/fed-rate-cut-sep/trades',
      request: `curl -X GET https://api.pmaxis.trade/v1/markets/fed-rate-cut-sep/trades \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Accept: application/json"`,
      response: `{
  "market": "fed-rate-cut-sep",
  "trades": [
    { "side": "YES", "price": 0.634, "size": 3765, "time": 1786968121 },
    { "side": "YES", "price": 0.635, "size": 765, "time": 1786968061 }
  ]
}`
    },
    ORDERBOOK: {
      method: 'GET',
      endpoint: '/v1/markets/fed-rate-cut-sep/orderbook',
      request: `curl -X GET https://api.pmaxis.trade/v1/markets/fed-rate-cut-sep/orderbook \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Accept: application/json"`,
      response: `{
  "market": "fed-rate-cut-sep",
  "bids": [[0.630, 2417], [0.628, 1893]],
  "asks": [[0.638, 1534], [0.640, 2143]],
  "spread": 0.008
}`
    },
    SIGNALS: {
      method: 'GET',
      endpoint: '/v1/markets/fed-rate-cut-sep/signals',
      request: `curl -X GET https://api.pmaxis.trade/v1/markets/fed-rate-cut-sep/signals \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Accept: application/json"`,
      response: `{
  "market": "fed-rate-cut-sep",
  "momentum": "bullish",
  "spread_bps": 127,
  "unusual_volume": true
}`
    }
  };

  const currentData = tabData[activeTab] || tabData.REST;

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentData.request);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTryIt = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
    }, 450);
  };

  // Smooth scroll entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (terminalRef.current) {
        gsap.fromTo(
          terminalRef.current,
          { opacity: 0, scale: 0.96, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative bg-[#F4F2EC] text-[#080909] select-none overflow-hidden border-b border-[#080909]/10 w-full min-h-screen lg:h-screen lg:min-h-[700px] lg:max-h-screen py-10 lg:py-6 px-4 sm:px-8 xl:px-14 flex flex-col justify-between items-center"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00E887]/[0.05] rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[1240px] mx-auto relative z-10 flex flex-col justify-between h-full min-h-0">
        
        {/* ======================================================== */}
        {/* 1. HEADER                                                */}
        {/* ======================================================== */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto pt-2 lg:pt-3 shrink-0">
          {/* Section label */}
          <div className="font-mono text-xs font-bold text-[#00E887] uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E887]" />
            <span>04 // API LAYER</span>
          </div>

          {/* Main Heading */}
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#080909] tracking-tight leading-tight mb-2">
            One API. No data stitching.
          </h2>

          {/* Subheading */}
          <p className="font-mono text-xs sm:text-sm text-[#6C6E69] leading-relaxed">
            All prediction market data through a single, unified API.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 2. DEVELOPER INTERFACE CARD (PREMIUM MAC TERMINAL)       */}
        {/* ======================================================== */}
        <div className="flex-1 flex flex-col justify-center items-center w-full min-h-0 py-3 lg:py-4">
          <div
            ref={terminalRef}
            className="w-full max-w-[1040px] rounded-2xl bg-[#090C0A] border border-[#1C241E] shadow-[0_25px_60px_rgba(0,0,0,0.2),0_0_40px_rgba(0,232,135,0.04)] relative overflow-hidden flex flex-col"
          >
            {/* Traveling Subtle Data-Pulse Line Along Top Border */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00E887]/80 to-transparent pointer-events-none z-20" />

            {/* Window Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#162019] bg-[#070908]">
              {/* Mac-Style Traffic Light Dots */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_6px_rgba(255,95,86,0.3)]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_6px_rgba(255,189,46,0.3)]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_6px_rgba(39,201,63,0.3)]" />
              </div>

              {/* Center Terminal Title */}
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#78887F]">
                <Terminal className="w-3.5 h-3.5 text-[#00E887]" />
                <span className="text-[#A2B3A9]">api.pmaxis.trade</span>
                <span className="text-[#4E5E54]">/</span>
                <span className="text-[#00E887] font-semibold">v1</span>
              </div>

              {/* Quick Copy Action */}
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 font-mono text-[11px] text-[#8C908A] hover:text-white transition-colors cursor-pointer"
                title="Copy request"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00E887]" />
                    <span className="text-[#00E887]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Terminal Horizontal Tabs */}
            <div className="flex items-center px-4 sm:px-6 border-b border-[#162019] bg-[#090C0A] overflow-x-auto scrollbar-none">
              {['REST', 'WEBSOCKET', 'TRADES', 'ORDERBOOK', 'SIGNALS'].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`relative py-2.5 px-4 sm:px-5 font-mono text-xs font-bold tracking-wider transition-colors cursor-pointer outline-none whitespace-nowrap ${
                      isActive ? 'text-white' : 'text-[#6C7E74] hover:text-[#A2B3A9]'
                    }`}
                  >
                    <span>{tab}</span>
                    {/* Active Thin Neon-Green Underline */}
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-2 h-[2px] bg-[#00E887] shadow-[0_0_10px_#00E887]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Endpoint Row with "</> Try it" */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-[#141C16] bg-[#0A0D0B] font-mono text-xs">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="px-2 py-0.5 rounded bg-[#00E887]/15 text-[#00E887] font-bold text-[11px] border border-[#00E887]/30 shrink-0">
                  {currentData.method}
                </span>
                <span className="text-white font-medium truncate">
                  {currentData.endpoint}
                </span>
              </div>

              <button
                type="button"
                onClick={handleTryIt}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#121914] hover:bg-[#18231C] text-[#00E887] font-mono text-xs font-bold border border-[#00E887]/30 hover:border-[#00E887] transition-all cursor-pointer shrink-0 shadow-[0_0_12px_rgba(0,232,135,0.15)] active:scale-95"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>&lt;/&gt; Try it</span>
              </button>
            </div>

            {/* Main Terminal Two-Column Body */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#141C16] bg-[#070908] p-4 sm:p-6 gap-4 lg:gap-0 font-mono text-xs sm:text-[13px] leading-relaxed">
              
              {/* LEFT COLUMN: REQUEST */}
              <div className="lg:pr-6 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-[#6E8075] uppercase tracking-wider font-bold mb-3 flex items-center justify-between">
                    <span>REQUEST</span>
                    <span className="text-[10px] text-[#4A574F]">cURL</span>
                  </div>

                  <pre className="text-[#E0E6E2] whitespace-pre-wrap break-all sm:break-normal font-mono text-xs sm:text-[13px] leading-relaxed selection:bg-[#00E887]/30">
                    <span className="text-[#00E887]">curl</span> -X <span className="text-[#38BDF8]">{currentData.method}</span> https://api.pmaxis.trade{currentData.endpoint} \<br />
                    &nbsp;&nbsp;-H <span className="text-[#A7F3D0]">"X-API-Key: YOUR_API_KEY"</span> \<br />
                    &nbsp;&nbsp;-H <span className="text-[#A7F3D0]">"Accept: application/json"</span>
                  </pre>
                </div>

                <div className="pt-4 mt-4 border-t border-[#121914] text-[11px] text-[#4E5E54] flex items-center justify-between">
                  <span>FORMAT: JSON</span>
                  <span>TLS 1.3 ENCRYPTED</span>
                </div>
              </div>

              {/* RIGHT COLUMN: RESPONSE */}
              <div className="lg:pl-6 pt-4 lg:pt-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-[11px] font-bold">
                    <span className="text-[#6E8075] uppercase tracking-wider">RESPONSE</span>
                    <span className="flex items-center gap-1.5 text-[#00E887]">
                      <span className="w-2 h-2 rounded-full bg-[#00E887] animate-pulse shadow-[0_0_8px_#00E887]" />
                      <span>200 OK</span>
                    </span>
                  </div>

                  <pre className={`text-[#81C784] whitespace-pre-wrap font-mono text-xs sm:text-[13px] leading-relaxed transition-opacity duration-200 ${isExecuting ? 'opacity-40' : 'opacity-100'}`}>
                    {currentData.response}
                  </pre>
                </div>

                <div className="pt-4 mt-4 border-t border-[#121914] text-[11px] text-[#4E5E54] flex items-center justify-between">
                  <span>LATENCY: 5.2ms</span>
                  <span>CACHE: CLOB EDGE</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. CENTERED FOOTER LINK                                  */}
        {/* ======================================================== */}
        <div className="text-center pb-2 lg:pb-3 shrink-0">
          <a
            href="#dev"
            className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold text-[#00E887] hover:text-[#00c968] transition-colors group"
          >
            <span>View full API documentation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
