import React, { useState, useEffect } from 'react';
import { ArrowRight, Activity, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function DataSection() {
  const [activeTab, setActiveTab] = useState('SIGNALS');

  const streamNodes = [
    { id: 'MARKETS', label: 'MARKETS', x: '56%', y: '14%' },
    { id: 'ORDERBOOKS', label: 'ORDERBOOKS', x: '67%', y: '30%' },
    { id: 'TRADES', label: 'TRADES', x: '70%', y: '48%' },
    { id: 'SIGNALS', label: 'SIGNALS', x: '65%', y: '66%' },
    { id: 'ON-CHAIN', label: 'ON-CHAIN', x: '58%', y: '84%' },
  ];

  return (
    <section 
      id="data" 
      className="relative bg-[#050706] text-white py-20 sm:py-28 px-4 sm:px-8 xl:px-14 lg:pr-32 xl:pr-36 select-none overflow-hidden border-y border-[#00E676]/20"
    >
      {/* Background Ambient Cyber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#00E676]/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Cyber Flowing SVG Light Wave Lines */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 overflow-visible"
        preserveAspectRatio="none"
        viewBox="0 0 1440 600"
      >
        <path 
          d="M -100 300 C 300 150, 600 450, 950 250 S 1400 400, 1600 280" 
          fill="none" 
          stroke="#00E676" 
          strokeWidth="1.8" 
          strokeOpacity="0.4"
          className="animate-stream-flow"
        />
        <path 
          d="M -50 360 C 350 200, 700 500, 1050 300 S 1450 350, 1650 320" 
          fill="none" 
          stroke="#00E676" 
          strokeWidth="2.4" 
          strokeOpacity="0.75"
          className="animate-stream-flow filter drop-shadow-[0_0_8px_#00E676]"
          style={{ animationDuration: '8s' }}
        />
        <path 
          d="M 0 240 C 400 100, 750 400, 1100 200 S 1500 450, 1700 260" 
          fill="none" 
          stroke="#00FF9C" 
          strokeWidth="1.2" 
          strokeOpacity="0.3"
          className="animate-stream-flow"
          style={{ animationDuration: '14s' }}
        />
      </svg>

      <div className="max-w-[1640px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ====================================================== */}
          {/* LEFT: 02 / DATA TYPOGRAPHY & CALLOUT                  */}
          {/* ====================================================== */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-mono text-xs font-bold text-[#00E676] flex items-center gap-1.5 uppercase tracking-wider">
              <span>02</span>
              <span>/</span>
              <span>DATA</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
              One data layer.<br />
              <span className="text-[#00E676]">Every signal you need.</span>
            </h2>

            <div className="space-y-2 text-sm sm:text-base leading-relaxed max-w-sm">
              <p className="text-white/90 font-medium">
                Live markets, trades, orderbooks, and signals.
              </p>
              <p className="text-xs sm:text-sm text-[#9CA39F]">
                Structured prediction-market data for trading systems, analytics, and AI agents.
              </p>
            </div>

            <div className="pt-2">
              <a 
                href="#dev" 
                data-cursor="EXPLORE"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#00E676] hover:text-white transition-colors group cursor-pointer"
              >
                <span>Explore the data</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* ====================================================== */}
          {/* CENTER: HUGE METALLIC 3D "DATA" WORD + DATA STREAM NODES*/}
          {/* ====================================================== */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center min-h-[220px] sm:min-h-[280px]">
            {/* Giant Metallic "DATA" Wordmark */}
            <div className="font-display font-black text-6xl sm:text-9xl xl:text-[140px] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#2A332D] via-[#85948B] to-[#2A332D] select-none opacity-90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              DATA
            </div>

            {/* Mobile stream node tabs */}
            <div className="sm:hidden w-full flex flex-wrap items-center justify-center gap-1.5 no-scrollbar py-2 px-2 mt-1">
              {streamNodes.map((node) => {
                const isActive = activeTab === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveTab(node.id)}
                    className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-[9px] font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#00E676] text-[#080909] shadow-[0_0_12px_#00E676]'
                        : 'bg-[#0D1611]/90 border border-[#00E676]/40 text-[#00E676]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#080909]' : 'bg-[#00E676]'}`} />
                    <span>{node.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Glowing Fiber Nodes along stream (Desktop reference mockup) */}
            <div className="hidden sm:block absolute inset-0 pointer-events-none">
              {streamNodes.map((node) => {
                const isActive = activeTab === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveTab(node.id)}
                    className={`absolute transform -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[9px] font-bold transition-all duration-200 pointer-events-auto cursor-pointer outline-none ${
                      isActive
                        ? 'bg-[#00E676] text-[#080909] shadow-[0_0_16px_#00E676] scale-105'
                        : 'bg-[#0D1611]/90 border border-[#00E676]/40 text-[#00E676] hover:border-[#00E676] hover:bg-[#132219] shadow-[0_0_12px_rgba(0,230,118,0.25)]'
                    }`}
                    style={{ left: node.x, top: node.y }}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#080909]' : 'bg-[#00E676] animate-pulse'}`} />
                    <span>{node.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ====================================================== */}
          {/* RIGHT: FLOATING GLOWING SIGNAL CARD (PER MOCKUP)      */}
          {/* ====================================================== */}
          <div className="lg:col-span-3">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#09120C]/90 border border-[#00E676]/50 shadow-[0_0_30px_rgba(0,230,118,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] relative overflow-hidden backdrop-blur-md">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1A2E20]">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#00E676]">
                  <span className="w-2 h-2 rounded-full bg-[#00E676] animate-ping" />
                  <span>
                    {activeTab === 'MARKETS' ? '01 // MARKETS' : 
                     activeTab === 'ORDERBOOKS' ? '02 // ORDERBOOKS' :
                     activeTab === 'TRADES' ? '03 // TRADES' :
                     activeTab === 'ON-CHAIN' ? '05 // ON-CHAIN' :
                     '04 // SIGNALS'}
                  </span>
                </div>
                <span className="text-[8px] font-mono text-[#8C9C90] px-1.5 py-0.5 rounded bg-[#102417] font-bold">
                  LIVE
                </span>
              </div>

              {/* Dynamic Content based on active capability tab while strictly maintaining card aesthetics */}
              {activeTab === 'MARKETS' ? (
                <div className="space-y-2.5 font-mono">
                  <div className="text-[9px] text-[#8C9C90] uppercase tracking-wider">
                    KNOW WHAT IS HAPPENING
                  </div>
                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex items-center justify-between p-1.5 rounded bg-[#101913] border border-[#1C2C20]">
                      <span className="text-[#CCC] truncate max-w-[130px]">Fed rate cut before Sep?</span>
                      <span className="text-[#00E676] font-bold">63.4¢</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded bg-[#101913] border border-[#1C2C20]">
                      <span className="text-[#CCC] truncate max-w-[130px]">BTC &gt; $120K in 2026?</span>
                      <span className="text-[#00E676] font-bold">73.8%</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded bg-[#101913] border border-[#1C2C20]">
                      <span className="text-[#CCC] truncate max-w-[130px]">Spot SOL ETF approved?</span>
                      <span className="text-[#00E676] font-bold">55.1%</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded bg-[#101913] border border-[#1C2C20]">
                      <span className="text-[#CCC] truncate max-w-[130px]">NBER recession declared?</span>
                      <span className="text-[#00E676] font-bold">18.2%</span>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'ORDERBOOKS' ? (
                <div className="space-y-2.5 font-mono">
                  <div className="text-[9px] text-[#8C9C90] uppercase tracking-wider">
                    WHERE THE MARKET IS MOVING
                  </div>
                  <div className="space-y-1 text-[10px]">
                    <div className="flex justify-between text-[#8C9C90] pb-1 border-b border-[#1A2E20] text-[8px]">
                      <span>BIDS</span>
                      <span>ASKS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#00E676] font-bold">64.8¢ · 2417</span>
                      <span className="text-[#FF6B6B] font-bold">64.8¢ · 1534</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#00E676] font-bold">64.4¢ · 1893</span>
                      <span className="text-[#FF6B6B] font-bold">64.5¢ · 2143</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#00E676] font-bold">64.0¢ · 3189</span>
                      <span className="text-[#FF6B6B] font-bold">64.1¢ · 1771</span>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'TRADES' ? (
                <div className="space-y-2.5 font-mono">
                  <div className="text-[9px] text-[#8C9C90] uppercase tracking-wider">
                    FOLLOW THE MONEY
                  </div>
                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-[#00E676] font-bold">YES · $342</span>
                      <span className="text-[#777]">15m ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#00E676] font-bold">YES · $2.0K</span>
                      <span className="text-[#777]">14m ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#FF6B6B] font-bold">NO · $655</span>
                      <span className="text-[#777]">13m ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#FF6B6B] font-bold">NO · $4.0K</span>
                      <span className="text-[#777]">12m ago</span>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'ON-CHAIN' ? (
                <div className="space-y-2.5 font-mono">
                  <div className="text-[9px] text-[#8C9C90] uppercase tracking-wider">
                    INDEXED ON-CHAIN PROOFS
                  </div>
                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex items-center justify-between p-1.5 rounded bg-[#101913] border border-[#1C2C20]">
                      <span className="text-white">0x41bd…7e2</span>
                      <span className="text-[#00E676] font-bold">● confirmed</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded bg-[#101913] border border-[#1C2C20]">
                      <span className="text-white">0xf90a…3c4</span>
                      <span className="text-[#00E676] font-bold">● confirmed</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded bg-[#101913] border border-[#1C2C20]">
                      <span className="text-white">0x2c7e…9a1</span>
                      <span className="text-[#00E676] font-bold">● confirmed</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Default Approved SIGNALS Panel Content */
                <div className="space-y-3 font-mono">
                  <div>
                    <div className="text-[9px] text-[#8C9C90] uppercase tracking-wider">MOMENTUM ↑</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#00E676] tracking-tight">
                      +3.2%
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#1A2E20] grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-[8px] text-[#8C9C90] uppercase tracking-wider">VOLUME SPIKE</div>
                      <div className="text-base sm:text-lg font-extrabold text-white tracking-tight mt-0.5">
                        3.8× AVG
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] text-[#8C9C90] uppercase tracking-wider">SPREAD WIDENING</div>
                      <div className="text-base sm:text-lg font-extrabold text-[#00E676] tracking-tight mt-0.5">
                        1.8¢
                      </div>
                    </div>
                  </div>

                  <div className="pt-1.5 flex items-center justify-between text-[9px] text-[#8C9C90]">
                    <span>UNUSUAL VOLUME</span>
                    <span className="text-[#00E676] font-bold bg-[#00E676]/15 px-1.5 py-0.5 rounded border border-[#00E676]/30">
                      FLAGGED
                    </span>
                  </div>
                </div>
              )}

              {/* Footer status inside card */}
              <div className="mt-3 pt-2 border-t border-[#1A2E20] flex items-center justify-between text-[9px] font-mono text-[#6E8073]">
                <span>TICK: 0.1s</span>
                <span className="text-[#00E676] font-bold">STATE: LOCKED</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
