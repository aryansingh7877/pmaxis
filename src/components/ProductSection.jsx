import React from 'react';
import { Layers, Zap, Cpu, Database, ArrowRight } from 'lucide-react';

export default function ProductSection() {
  const capabilities = [
    {
      num: '01',
      tag: 'AGGREGATOR // L1',
      title: 'CROSS-EXCHANGE NORMALIZATION',
      desc: 'Standardizes Polymarket, Kalshi, Opinion, and Limitless into a single canonical JSON-RPC schema. Eliminates multi-protocol client fragmentation.',
      metric: '4+ VENUES',
      accent: 'POLY · KALSHI · OPIN · LIMIT',
    },
    {
      num: '02',
      tag: 'STREAMING // 60Hz',
      title: 'SUB-6MS REAL-TIME ORDERBOOKS',
      desc: 'Direct WebSocket pipelines deliver full Level 1 & Level 2 orderbook depth, tick streams, and liquidity shifts with microsecond precision.',
      metric: '<6ms LATENCY',
      accent: 'CONTINUOUS FEED',
    },
    {
      num: '03',
      tag: 'AI AGENTS // STD',
      title: 'NATIVE MCP SERVER INTEGRATION',
      desc: 'Out-of-the-box Model Context Protocol (MCP) server designed specifically for autonomous AI agents, LLM researchers, and trading algorithms.',
      metric: 'STD-MCP-v1',
      accent: 'READY FOR CLAUDE & GPT',
    },
    {
      num: '04',
      tag: 'HISTORICAL // S3',
      title: 'TICK-BY-TICK QUANT ARCHIVES',
      desc: 'Millisecond-resolution orderbook snapshots and trade archives for institutional quants, statistical arbitrage, and predictive backtesting.',
      metric: '15M+ TICKS',
      accent: 'PARQUET & S3 DUMPS',
    },
  ];

  return (
    <section 
      id="product" 
      className="relative bg-[#F5F3EE] py-24 sm:py-32 px-4 sm:px-8 xl:px-14 lg:pr-36 xl:pr-40 border-b-2 border-[#0A0A0A] select-none overflow-hidden"
    >
      {/* Background oversized architectural word */}
      <div 
        className="absolute top-10 right-0 pointer-events-none opacity-[0.05] select-none"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[22vw] leading-none uppercase text-[#0A0A0A]">
          SYSTEM
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Section Header: Swiss Typographic Style */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-12 mb-14 border-b-2 border-[#0A0A0A] gap-6">
          <div className="max-w-3xl">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A] flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#00E676] border border-[#0A0A0A]" />
              <span>02 // ARCHITECTURE & ENGINE</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl xl:text-7xl font-black uppercase text-[#0A0A0A] tracking-tighter leading-[0.9]">
              BUILT FOR INSTITUTIONAL QUANTS & AUTONOMOUS AI AGENTS.
            </h2>
          </div>

          <div className="lg:max-w-xs font-mono text-xs text-[#343434] space-y-2">
            <p>
              ONE UNIFIED SUBSTRATE ELIMINATING FRAGMENTATION ACROSS ALL MAJOR PROTOCOLS.
            </p>
            <div className="text-[10px] text-[#888] font-bold">
              STANDARDIZED PROTOCOL SPEC // 2026
            </div>
          </div>
        </div>

        {/* Asymmetric Editorial Brutalist 4-Block Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((item, idx) => (
            <div 
              key={idx}
              className="editorial-card p-6 sm:p-8 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Header within card */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#0A0A0A]">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0A0A0A]">
                    <span className="w-6 h-6 bg-[#0A0A0A] text-[#F5F3EE] flex items-center justify-center text-[11px]">
                      {item.num}
                    </span>
                    <span>{item.tag}</span>
                  </div>

                  <span className="font-mono text-[9px] font-bold bg-[#00E676] text-[#0A0A0A] px-2 py-0.5 border border-[#0A0A0A]">
                    {item.metric}
                  </span>
                </div>

                {/* Card Title & Desc */}
                <h3 className="font-display text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#444] leading-relaxed mb-6 font-medium">
                  {item.desc}
                </p>
              </div>

              {/* Card Footer Bar */}
              <div className="pt-4 border-t border-[#0A0A0A] flex items-center justify-between font-mono text-[11px] font-bold">
                <span className="text-[#666] group-hover:text-[#0A0A0A] transition-colors">
                  {item.accent}
                </span>
                <span className="flex items-center gap-1 text-[#0A0A0A] group-hover:text-[#00E676] transition-colors">
                  <span>SPEC</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
