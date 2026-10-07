import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Activity, ArrowRight, Terminal } from 'lucide-react';

export default function SignalsAgentSection() {
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 1400);
    }, 4500);
    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <section 
      id="signals"
      className="relative bg-[#0A0A0A] text-[#F5F3EE] py-28 sm:py-36 px-4 sm:px-8 xl:px-14 lg:pr-36 xl:pr-40 select-none overflow-hidden border-b-2 border-[#0A0A0A]"
    >
      {/* Huge Background Typography in Dark Layer */}
      <div 
        className="absolute top-10 left-0 pointer-events-none opacity-[0.06] select-none"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[25vw] leading-none uppercase text-white">
          SIGNAL
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 mb-14 border-b border-[#333] gap-6">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#00E676] flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-[#00E676]" />
              <span>04 // AUTONOMOUS SIGNALS & AI INTELLIGENCE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl xl:text-7xl font-black uppercase text-white tracking-tighter leading-[0.9]">
              PREDICTIVE SIGNAL DETECTION.
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs text-[#999] leading-relaxed">
            AUTONOMOUS AI AGENTS REQUIRE STRUCTURED MARKET CONTEXT. PMAXIS EXTRACTS MICROSECOND DELTAS INTO DETERMINISTIC JSON SIGNALS.
          </p>
        </div>

        {/* Dual Cockpit: The Locked Signal Poster + Intelligence Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Stark Brutalist Signal Card */}
          <div className="lg:col-span-5">
            <div className={`p-8 bg-[#141414] border-2 transition-all duration-300 shadow-[10px_10px_0px_#00E676] ${
              pulseActive ? 'border-[#00E676]' : 'border-[#333]'
            }`}>
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#333]">
                <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#00E676]">
                  <span className="w-2 h-2 bg-[#00E676] animate-ping" />
                  <span>SIGNAL DETECTED // #PM-9842</span>
                </div>
                <span className="font-mono text-[9px] font-bold bg-[#00E676] text-[#0A0A0A] px-2 py-0.5">
                  LOCKED
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="font-mono text-[10px] text-[#888] uppercase tracking-wider font-bold mb-1">
                    MOMENTUM VELOCITY
                  </div>
                  <div className="font-mono-num text-5xl sm:text-6xl font-black text-[#00E676] tracking-tighter">
                    +3.2%
                  </div>
                  <div className="font-mono text-[10px] text-[#666] mt-1">
                    Implied probability shift in &lt;15 seconds
                  </div>
                </div>

                <div className="pt-4 border-t border-[#222]">
                  <div className="font-mono text-[10px] text-[#888] uppercase tracking-wider font-bold mb-1">
                    VOLUME CONVERGENCE
                  </div>
                  <div className="font-mono-num text-4xl sm:text-5xl font-black text-white tracking-tighter">
                    3.8× AVG
                  </div>
                  <div className="font-mono text-[10px] text-[#666] mt-1">
                    $1.2M institutional block absorption detected
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#333] flex items-center justify-between font-mono text-[10px] text-[#888] font-bold">
                <span>LATENCY // 1.8ms</span>
                <span className="text-[#00E676]">VERIFIED ENGINE</span>
              </div>
            </div>
          </div>

          {/* Right: Structured AI Agent Flow Architecture */}
          <div className="lg:col-span-7 space-y-4 font-mono">
            
            {/* Step 1: AI AGENT */}
            <div className="p-5 bg-[#141414] border border-[#333] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#00E676] text-[#0A0A0A] flex items-center justify-center font-black text-xs">
                  01
                </div>
                <div>
                  <div className="text-xs font-black text-white uppercase">AI AGENT LAYER</div>
                  <div className="text-[11px] text-[#888]">Autonomous bots, Claude / GPT models, quant solvers</div>
                </div>
              </div>
              <span className="text-[10px] text-[#00E676] border border-[#00E676] px-2 py-0.5 font-bold">
                INITIATOR
              </span>
            </div>

            {/* Connecting line */}
            <div className="flex justify-center my-0.5">
              <div className="w-0.5 h-4 bg-[#00E676]" />
            </div>

            {/* Step 2: PMAXIS SUBSTRATE */}
            <div className="p-5 bg-[#1A1A1A] border-2 border-[#00E676] flex items-center justify-between shadow-[4px_4px_0px_#00E676]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white text-[#0A0A0A] flex items-center justify-center font-black text-xs">
                  PM
                </div>
                <div>
                  <div className="text-xs font-black text-white uppercase">PMAXIS TELEMETRY ENGINE</div>
                  <div className="text-[11px] text-[#AAA]">Cross-market normalization, WebSocket feeds, MCP server</div>
                </div>
              </div>
              <span className="text-[10px] bg-[#00E676] text-[#0A0A0A] px-2 py-0.5 font-black">
                SUB-6MS PIPELINE
              </span>
            </div>

            {/* Connecting line */}
            <div className="flex justify-center my-0.5">
              <div className="w-0.5 h-4 bg-[#00E676]" />
            </div>

            {/* Step 3: MULTI-DIMENSIONAL CHANNELS */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] text-center font-bold">
              {['MARKETS', 'TRADES', 'ORDERBOOKS', 'SIGNALS', 'ON-CHAIN'].map((item) => (
                <div key={item} className="p-2.5 bg-[#141414] border border-[#333] text-[#AAA]">
                  {item}
                </div>
              ))}
            </div>

            {/* Connecting line */}
            <div className="flex justify-center my-0.5">
              <div className="w-0.5 h-4 bg-[#00E676]" />
            </div>

            {/* Step 4: STRUCTURED MARKET CONTEXT */}
            <div className="p-5 bg-[#141414] border border-[#333] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#00E676] text-[#0A0A0A] flex items-center justify-center font-black text-xs">
                  03
                </div>
                <div>
                  <div className="text-xs font-black text-white uppercase">STRUCTURED MARKET CONTEXT</div>
                  <div className="text-[11px] text-[#888]">Zero hallucination, deterministic JSON-RPC & MCP payloads</div>
                </div>
              </div>
              <span className="text-[10px] text-[#00E676] border border-[#00E676] px-2 py-0.5 font-bold">
                READY FOR EXECUTION
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
