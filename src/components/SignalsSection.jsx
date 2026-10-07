import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search,
  Activity,
  Zap,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  Clock,
  Radio,
  ArrowUpRight,
  Crosshair,
  BarChart3
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SignalsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const searchRef = useRef(null);
  const heroRef = useRef(null);
  const railRef = useRef(null);
  const ringRef = useRef(null);

  // Selected market (default: SOL ETF as specified)
  const [selectedMarketId, setSelectedMarketId] = useState('sol-etf');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSwitching, setIsSwitching] = useState(false);
  const [hudView, setHudView] = useState('all'); // 'all' | 'orderbook' | 'trades'

  // Exact 5 reference markets
  const markets = [
    {
      id: 'sol-etf',
      code: 'SOL ETF',
      title: 'A spot SOL ETF approved in the US?',
      category: 'CRYPTO',
      price: '55.1¢',
      priceNum: 55.1,
      volume24h: '$2.21M',
      liquidity: '$780.0K',
      spread: '0.5¢',
      yesPercent: 55,
      noPercent: 45,
      orderbook: {
        bids: [
          { price: '54.7¢', size: '763', depth: 65 },
          { price: '54.3¢', size: '1,480', depth: 82 },
          { price: '53.9¢', size: '2,739', depth: 95 },
        ],
        asks: [
          { price: '55.5¢', size: '890', depth: 55 },
          { price: '55.9¢', size: '1,620', depth: 75 },
          { price: '56.3¢', size: '2,410', depth: 90 },
        ],
      },
      recentTrades: [
        { side: 'YES', price: '54.9¢', amount: '$3.8K', time: '4s' },
        { side: 'NO', price: '54.8¢', amount: '$4.6K', time: '18s' },
        { side: 'NO', price: '55.1¢', amount: '$4.1K', time: '45s' },
      ],
    },
    {
      id: 'fed-cut',
      code: 'FED RATE',
      title: 'Fed rate cut before September?',
      category: 'MACRO',
      price: '63.4¢',
      priceNum: 63.4,
      volume24h: '$4.82M',
      liquidity: '$1.27M',
      spread: '0.8¢',
      yesPercent: 63,
      noPercent: 37,
      orderbook: {
        bids: [
          { price: '63.0¢', size: '2,417', depth: 85 },
          { price: '62.8¢', size: '1,893', depth: 70 },
          { price: '62.4¢', size: '3,189', depth: 98 },
        ],
        asks: [
          { price: '63.8¢', size: '1,534', depth: 58 },
          { price: '64.0¢', size: '2,143', depth: 76 },
          { price: '64.5¢', size: '1,771', depth: 68 },
        ],
      },
      recentTrades: [
        { side: 'YES', price: '63.4¢', amount: '$5.2K', time: '8s' },
        { side: 'YES', price: '63.5¢', amount: '$2.4K', time: '22s' },
        { side: 'NO', price: '36.8¢', amount: '$3.1K', time: '50s' },
      ],
    },
    {
      id: 'btc-120k',
      code: 'BITCOIN',
      title: 'Will Bitcoin trade above $120K in 2026?',
      category: 'CRYPTO',
      price: '73.8¢',
      priceNum: 73.8,
      volume24h: '$3.11M',
      liquidity: '$940.0K',
      spread: '0.4¢',
      yesPercent: 74,
      noPercent: 26,
      orderbook: {
        bids: [
          { price: '73.6¢', size: '2,711', depth: 90 },
          { price: '73.4¢', size: '1,877', depth: 68 },
          { price: '73.0¢', size: '3,450', depth: 96 },
        ],
        asks: [
          { price: '74.0¢', size: '2,361', depth: 80 },
          { price: '74.2¢', size: '1,300', depth: 52 },
          { price: '74.6¢', size: '2,098', depth: 72 },
        ],
      },
      recentTrades: [
        { side: 'YES', price: '73.8¢', amount: '$8.4K', time: '2s' },
        { side: 'YES', price: '73.7¢', amount: '$1.8K', time: '14s' },
        { side: 'NO', price: '26.4¢', amount: '$2.9K', time: '35s' },
      ],
    },
    {
      id: 'frontier-model',
      code: 'AI FRONTIER',
      title: 'New frontier model shipped this quarter?',
      category: 'TECH',
      price: '81.2¢',
      priceNum: 81.2,
      volume24h: '$1.54M',
      liquidity: '$610.0K',
      spread: '0.3¢',
      yesPercent: 81,
      noPercent: 19,
      orderbook: {
        bids: [
          { price: '81.0¢', size: '1,950', depth: 80 },
          { price: '80.8¢', size: '1,420', depth: 60 },
          { price: '80.5¢', size: '2,800', depth: 92 },
        ],
        asks: [
          { price: '81.3¢', size: '1,250', depth: 52 },
          { price: '81.5¢', size: '1,890', depth: 74 },
          { price: '82.0¢', size: '2,400', depth: 88 },
        ],
      },
      recentTrades: [
        { side: 'YES', price: '81.2¢', amount: '$4.2K', time: '11s' },
        { side: 'YES', price: '81.1¢', amount: '$1.9K', time: '29s' },
        { side: 'NO', price: '18.9¢', amount: '$1.4K', time: '1m' },
      ],
    },
    {
      id: 'nber-recession',
      code: 'NBER RECESSION',
      title: 'NBER declares a recession before year end?',
      category: 'ECONOMY',
      price: '18.2¢',
      priceNum: 18.2,
      volume24h: '$980.0K',
      liquidity: '$410.0K',
      spread: '0.6¢',
      yesPercent: 18,
      noPercent: 82,
      orderbook: {
        bids: [
          { price: '18.0¢', size: '3,200', depth: 92 },
          { price: '17.8¢', size: '2,100', depth: 72 },
          { price: '17.5¢', size: '1,800', depth: 62 },
        ],
        asks: [
          { price: '18.6¢', size: '1,400', depth: 50 },
          { price: '18.8¢', size: '2,600', depth: 82 },
          { price: '19.2¢', size: '1,950', depth: 66 },
        ],
      },
      recentTrades: [
        { side: 'NO', price: '82.1¢', amount: '$6.2K', time: '6s' },
        { side: 'YES', price: '18.2¢', amount: '$1.1K', time: '25s' },
        { side: 'NO', price: '81.9¢', amount: '$4.3K', time: '48s' },
      ],
    },
  ];

  const currentMarket = markets.find((m) => m.id === selectedMarketId) || markets[0];

  const filteredMarkets = markets.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectMarket = (id) => {
    if (id === selectedMarketId || isSwitching) return;
    setIsSwitching(true);
    setSelectedMarketId(id);

    // Re-animate the circular probability ring
    if (ringRef.current) {
      gsap.fromTo(
        ringRef.current,
        { strokeDashoffset: 440 },
        {
          strokeDashoffset: 440 - (440 * (markets.find((m) => m.id === id)?.yesPercent || 50)) / 100,
          duration: 0.8,
          ease: 'power3.out',
        }
      );
    }

    setTimeout(() => {
      setIsSwitching(false);
    }, 260);
  };

  // Cinematic GSAP ScrollTrigger Sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Search bar materialization
      if (searchRef.current) {
        gsap.fromTo(
          searchRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Central Hero Market Arena Materialization
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 45, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 4. Circular HUD probability ring drawing
      if (ringRef.current) {
        gsap.fromTo(
          ringRef.current,
          { strokeDashoffset: 440 },
          {
            strokeDashoffset: 440 - (440 * currentMarket.yesPercent) / 100,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 5. Market Rail Tiles materialization
      if (railRef.current) {
        gsap.fromTo(
          railRef.current.children,
          { opacity: 0, y: 30, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Geometry for Circular Probability HUD Ring
  // Circumference = 2 * PI * 70 ≈ 440
  const ringCircumference = 440;
  const strokeOffset = ringCircumference - (ringCircumference * currentMarket.yesPercent) / 100;

  return (
    <section
      ref={sectionRef}
      id="signals"
      className="relative bg-[#060707] text-[#F4F1E8] select-none overflow-hidden border-b border-[#141A16] w-full min-h-screen lg:h-screen lg:min-h-[720px] lg:max-h-screen py-10 lg:py-5 px-4 sm:px-8 xl:px-14 flex flex-col justify-between items-center"
      style={{ perspective: '1600px' }}
    >
      {/* ======================================================== */}
      {/* 1. CINEMATIC BACKGROUND: PURE BLACK + ELECTRIC GREEN      */}
      {/* ======================================================== */}
      


      {/* Controlled Atmospheric Green Light Pool behind Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[400px] bg-[#00E676]/[0.035] rounded-full blur-[150px] pointer-events-none" />

      {/* Giant Faint Low-Opacity Architectural Typography */}
      <div
        className="absolute top-6 inset-x-0 pointer-events-none select-none text-center overflow-hidden opacity-[0.018]"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[22vw] leading-none uppercase text-[#F4F1E8] tracking-tighter">
          ARENA
        </span>
      </div>



      {/* Main Responsive Wrapper */}
      <div className="w-full max-w-[1440px] mx-auto relative z-10 flex flex-col justify-between h-full min-h-0">
        
        {/* ======================================================== */}
        {/* 2. SECTION HEADER (GOOGLE UX DISCIPLINE: CLEAN & SCANNABLE) */}
        {/* ======================================================== */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto pt-1 lg:pt-2 shrink-0">
          {/* Main Heading */}
          <h2 className="font-display text-2xl sm:text-4xl lg:text-4xl xl:text-5xl font-black text-[#F4F1E8] tracking-tight leading-tight mb-1.5">
            Don’t take our word for it.<br />
            {/* "Explore" with neon green accent & glowing underline */}
            <span className="relative inline-block text-[#F4F1E8]">
              <span className="relative z-10 text-[#00E676] drop-shadow-[0_0_20px_rgba(0,230,118,0.45)]">
                Explore
              </span>
              <span className="absolute left-0 bottom-0.5 w-full h-[2.5px] bg-gradient-to-r from-[#00E676] via-[#9EF0C2] to-[#00E676] rounded-full shadow-[0_0_10px_rgba(0,230,118,0.7)]" />
            </span>{' '}
            the data.
          </h2>

          {/* Subtitle */}
          <p className="font-mono text-[11px] sm:text-xs text-[#9EAEA4] max-w-lg mx-auto">
            Search any market. Instantly get the data that moves it.
          </p>

          {/* Market Search Bar */}
          <div ref={searchRef} className="mt-3 max-w-md mx-auto relative">
            <Search className="w-3.5 h-3.5 text-[#5A6960] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search markets or type symbol..."
              className="w-full bg-[#0B0F0D] border border-[#1A241E] rounded-full py-1.5 pl-9 pr-4 font-mono text-xs text-[#F4F1E8] placeholder-[#5A6960] outline-none focus:border-[#00E676]/70 focus:shadow-[0_0_15px_rgba(0,230,118,0.2)] transition-all"
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. HERO ACTIVE MARKET ARENA (BOSS SCREEN HUD COMPOSITION)*/}
        {/* Flanked by Compact Live Telemetry Wings                  */}
        {/* ======================================================== */}
        <div
          ref={heroRef}
          className="flex-1 flex flex-col justify-center items-center w-full min-h-0 my-2 lg:my-3 relative"
        >
          {/* Main Hero HUD Container */}
          <div
            className={`w-full max-w-[1260px] rounded-2xl bg-[#090D0B]/90 backdrop-blur-xl border border-[#18221C] p-4 sm:p-6 lg:p-6 shadow-[0_20px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(0,230,118,0.04)] relative transition-all duration-300 ${
              isSwitching ? 'opacity-60 scale-[0.98]' : 'opacity-100 scale-100'
            }`}
          >
            {/* Top Luminous Green Energy Line */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00E676]/80 to-transparent pointer-events-none" />

            {/* Tri-Column Arena Stage: Left Telemetry | Center Hero HUD | Right Tape */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              
              {/* ---------------------------------------------------- */}
              {/* LEFT HUD WING: COMPACT LIVE ORDERBOOK TELEMETRY      */}
              {/* ---------------------------------------------------- */}
              <div className="hidden lg:flex lg:col-span-3 flex-col justify-between p-3.5 rounded-xl bg-[#0B0F0D] border border-[#18221C] font-mono min-h-[260px]">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#141C17] text-[11px] font-bold">
                    <span className="text-[#00E676] flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5" />
                      ORDERBOOK
                    </span>
                    <span className="text-[10px] text-[#5A6960]">L2 CLOB</span>
                  </div>

                  <div className="grid grid-cols-2 text-[9px] text-[#5A6960] uppercase pb-1 mb-1 border-b border-[#141C17]">
                    <div>BIDS (SIZE)</div>
                    <div className="text-right">ASKS (SIZE)</div>
                  </div>

                  {/* Orderbook Depth Rows */}
                  <div className="space-y-1 text-[11px]">
                    {currentMarket.orderbook.bids.map((b, idx) => {
                      const ask = currentMarket.orderbook.asks[idx] || currentMarket.orderbook.asks[0];
                      return (
                        <div
                          key={idx}
                          className="grid grid-cols-2 items-center py-1 px-1.5 rounded relative overflow-hidden text-[11px]"
                        >
                          {/* Green bid depth bar */}
                          <div
                            className="absolute left-0 top-0 bottom-0 bg-[#00E676]/15 -z-0 transition-all duration-500"
                            style={{ width: `${b.depth}%` }}
                          />
                          {/* Red ask depth bar */}
                          <div
                            className="absolute right-0 top-0 bottom-0 bg-[#EF4444]/15 -z-0 transition-all duration-500"
                            style={{ width: `${ask.depth}%` }}
                          />

                          <div className="text-[#00E676] font-bold z-10">
                            {b.price} <span className="text-[#5A6960] text-[9px] font-normal">({b.size})</span>
                          </div>
                          <div className="text-right text-[#EF4444] font-bold z-10">
                            <span className="text-[#5A6960] text-[9px] font-normal">({ask.size})</span> {ask.price}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#141C17] flex items-center justify-between text-[10px] text-[#5A6960]">
                  <span>SPREAD</span>
                  <span className="text-[#00E676] font-bold">{currentMarket.spread}</span>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* CENTER HERO OBJECT: DOMINANT QUESTION & PROBABILITY  */}
              {/* ---------------------------------------------------- */}
              <div className="lg:col-span-6 flex flex-col items-center text-center px-2">
                
                {/* Category Pill */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 font-mono text-[10px] font-bold text-[#00E676] mb-2 uppercase tracking-wider">
                  <span className="w-1 h-1 rounded-full bg-[#00E676] shadow-[0_0_6px_#00E676] animate-pulse" />
                  <span>{currentMarket.category}</span>
                </div>

                {/* Hero Market Question (Large & Bold) */}
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-[#F4F1E8] tracking-tight leading-tight mb-3 max-w-xl">
                  {currentMarket.title}
                </h3>

                {/* Circular HUD Probability Visualization + Big Price */}
                <div className="relative my-2 flex items-center justify-center">
                  
                  {/* SVG Circular Targeting HUD Ring */}
                  <svg className="w-36 h-36 sm:w-40 sm:h-40 -rotate-90" viewBox="0 0 160 160">
                    {/* Background Track Circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#131B16"
                      strokeWidth="9"
                    />
                    {/* NO Outcome Red Arc */}
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="9"
                      strokeDasharray={ringCircumference}
                      strokeDashoffset="0"
                      strokeOpacity="0.4"
                    />
                    {/* YES Outcome Green Glowing Arc */}
                    <circle
                      ref={ringRef}
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="url(#arenaGreenGrad)"
                      strokeWidth="10"
                      strokeDasharray={ringCircumference}
                      strokeDashoffset={strokeOffset}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                    <defs>
                      <linearGradient id="arenaGreenGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#00E676" />
                        <stop offset="100%" stopColor="#9EF0C2" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Inner Ring Hero Metrics (Price + Probability HUD) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                    <span className="font-mono text-[10px] text-[#5A6960] uppercase tracking-wider font-semibold">
                      CURRENT PRICE
                    </span>
                    <span className="font-mono text-2xl sm:text-3xl font-black text-[#F4F1E8] tracking-tight">
                      {currentMarket.price}
                    </span>
                    <div className="flex items-center gap-1 font-mono text-[11px] font-bold mt-0.5">
                      <span className="text-[#00E676]">YES {currentMarket.yesPercent}%</span>
                      <span className="text-[#3E4C44]">/</span>
                      <span className="text-[#EF4444]">NO {currentMarket.noPercent}%</span>
                    </div>
                  </div>
                </div>

                {/* 3 Core Secondary Metrics (Google UX: Obvious & Clean) */}
                <div className="flex items-center justify-center gap-3 sm:gap-10 mt-3 pt-3 border-t border-[#18221C] w-full max-w-md font-mono text-center">
                  <div>
                    <div className="text-[9px] text-[#5A6960] uppercase">24H VOLUME</div>
                    <div className="text-sm sm:text-base font-bold text-[#F4F1E8] mt-0.5">
                      {currentMarket.volume24h}
                    </div>
                  </div>

                  <div className="h-6 w-px bg-[#18221C]" />

                  <div>
                    <div className="text-[9px] text-[#5A6960] uppercase">LIQUIDITY</div>
                    <div className="text-sm sm:text-base font-bold text-[#F4F1E8] mt-0.5">
                      {currentMarket.liquidity}
                    </div>
                  </div>

                  <div className="h-6 w-px bg-[#18221C]" />

                  <div>
                    <div className="text-[9px] text-[#5A6960] uppercase">SPREAD</div>
                    <div className="text-sm sm:text-base font-bold text-[#00E676] mt-0.5">
                      {currentMarket.spread}
                    </div>
                  </div>
                </div>

              </div>

              {/* ---------------------------------------------------- */}
              {/* RIGHT HUD WING: COMPACT LIVE RECENT TRADES TAPE      */}
              {/* ---------------------------------------------------- */}
              <div className="hidden lg:flex lg:col-span-3 flex-col justify-between p-3.5 rounded-xl bg-[#0B0F0D] border border-[#18221C] font-mono min-h-[260px]">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#141C17] text-[11px] font-bold">
                    <span className="text-[#F4F1E8] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#00E676]" />
                      RECENT TRADES
                    </span>
                    <span className="flex items-center gap-1 text-[9px] text-[#00E676]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] shadow-[0_0_6px_#00E676] animate-pulse" />
                      LIVE
                    </span>
                  </div>

                  <div className="grid grid-cols-4 text-[9px] text-[#5A6960] uppercase pb-1 mb-1 border-b border-[#141C17]">
                    <div>SIDE</div>
                    <div>PRICE</div>
                    <div>SIZE</div>
                    <div className="text-right">TIME</div>
                  </div>

                  {/* Trades Log */}
                  <div className="space-y-1.5 text-[11px]">
                    {currentMarket.recentTrades.map((t, idx) => (
                      <div key={idx} className="grid grid-cols-4 items-center py-1">
                        <div className={`font-bold ${t.side === 'YES' ? 'text-[#00E676]' : 'text-[#EF4444]'}`}>
                          {t.side}
                        </div>
                        <div className="text-[#F4F1E8] font-medium">{t.price}</div>
                        <div className="text-[#9EAEA4]">{t.amount}</div>
                        <div className="text-right text-[#5A6960] text-[10px]">{t.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#141C17] flex items-center justify-between text-[10px] text-[#5A6960]">
                  <span>EXECUTION</span>
                  <span className="text-[#F4F1E8] font-medium">100% ON-CHAIN</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. MARKET STREAM / ARENA: HORIZONTAL SELECTION RAIL       */}
        {/* Interactive game selection tiles at the bottom            */}
        {/* ======================================================== */}
        <div className="w-full shrink-0 pt-2 pb-1">
          <div className="text-center mb-1.5 font-mono text-[9px] uppercase tracking-wider text-[#5A6960]">
            SELECT ARENA TARGET // INSTANT PROBABILITY RESOLUTION
          </div>

          <div
            ref={railRef}
            className="grid grid-cols-3 sm:flex sm:items-center sm:justify-center gap-1.5 sm:gap-3 max-w-full px-2 sm:px-0 py-1"
          >
            {markets.map((m) => {
              const isSelected = m.id === selectedMarketId;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleSelectMarket(m.id)}
                  className={`group relative px-1 sm:px-4 py-1.5 sm:py-2.5 rounded-xl transition-all duration-300 cursor-pointer outline-none flex flex-col items-center w-full sm:w-auto sm:min-w-[140px] text-center select-none ${
                    isSelected
                      ? 'bg-[#0C1611] border border-[#00E676] shadow-[0_0_20px_rgba(0,230,118,0.25)] -translate-y-0.5 sm:-translate-y-1'
                      : 'bg-[#0A0E0C] border border-[#16201A] hover:bg-[#0E1511] hover:border-[#22352A] hover:-translate-y-0.5'
                  }`}
                >
                  {/* Active Top Green Glow Indicator */}
                  {isSelected && (
                    <div className="absolute top-0 inset-x-2 sm:inset-x-4 h-[2px] bg-[#00E676] shadow-[0_0_8px_#00E676]" />
                  )}

                  {/* Market Short Code */}
                  <span
                    className={`font-mono text-[9px] sm:text-[11px] font-bold tracking-wider uppercase transition-colors ${
                      isSelected ? 'text-[#00E676]' : 'text-[#7A8A80] group-hover:text-[#F4F1E8]'
                    }`}
                  >
                    {m.code}
                  </span>

                  {/* Live Price Tag */}
                  <span
                    className={`font-mono text-xs sm:text-sm font-black mt-0.5 transition-colors ${
                      isSelected ? 'text-[#F4F1E8]' : 'text-[#9EAEA4] group-hover:text-[#F4F1E8]'
                    }`}
                  >
                    {m.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
