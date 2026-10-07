import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export default function LaptopTerminal() {
  const [yesPrice, setYesPrice] = useState(65.9);
  const [tickActive, setTickActive] = useState(false);
  const [tickUp, setTickUp] = useState(true);

  // Live market fluctuations inside laptop
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * 0.4;
      const isUp = delta >= 0;
      setYesPrice((prev) => {
        const next = Math.min(68.5, Math.max(59.5, prev + delta));
        return parseFloat(next.toFixed(1));
      });
      setTickUp(isUp);
      setTickActive(true);
      setTimeout(() => setTickActive(false), 500);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const noPrice = (100 - yesPrice).toFixed(1);

  // SVG Chart points
  const points = [
    { x: 0, y: 55 },
    { x: 12, y: 57 },
    { x: 25, y: 56 },
    { x: 38, y: 59 },
    { x: 50, y: 58 },
    { x: 62, y: 61 },
    { x: 75, y: 62 },
    { x: 88, y: 63.8 },
    { x: 100, y: yesPrice },
  ];

  const getYPos = (val) => 100 - ((val - 45) / 30) * 85 - 5;
  const pathD = `M ${points.map((p) => `${p.x},${getYPos(p.y)}`).join(' L ')}`;
  const areaD = `M 0,100 L ${points.map((p) => `${p.x},${getYPos(p.y)}`).join(' L ')} L 100,100 Z`;

  return (
    <div className="relative w-full max-w-[620px] mx-auto select-none">
      
      {/* ======================================================== */}
      {/* FLOATING HUD METADATA LABELS AROUND LAPTOP (PER REFERENCE) */}
      {/* ======================================================== */}
      
      {/* Top-Left Floating HUD Tag */}
      <div className="absolute -top-8 left-1 sm:-top-10 sm:-left-12 z-30 font-mono text-[8.5px] sm:text-[9px] text-[#080909] font-bold bg-[#F4F2EC]/90 backdrop-blur-sm border border-[#080909]/20 px-2.5 py-1.5 shadow-sm space-y-0.5 pointer-events-none">
        <div className="flex items-center gap-1.5 text-[#00E676]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
          <span className="text-[#080909] font-black">MARKET // LIVE</span>
        </div>
        <div>PRICE // {yesPrice}¢</div>
        <div>VOLUME // $5.53M</div>
        <div className="text-[#00E676]">TREND // UP</div>
      </div>

      {/* Top-Right Floating HUD Tag */}
      <div className="hidden sm:block absolute -top-8 -right-8 sm:-right-14 z-30 font-mono text-[9px] text-[#080909] font-bold bg-[#F4F2EC]/90 backdrop-blur-sm border border-[#080909]/20 px-3 py-2 shadow-sm space-y-0.5 pointer-events-none">
        <div className="flex items-center gap-1 text-[#00E676] font-black pb-1 mb-1 border-b border-[#080909]/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
          <span className="text-[#080909]">REAL-TIME DATA</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-[#666]">TRADES</span>
          <span>18,839</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-[#666]">LIQUIDITY</span>
          <span>$1.33M</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-[#666]">LATENCY</span>
          <span className="text-[#00E676]">&lt;6ms</span>
        </div>
      </div>



      {/* ======================================================== */}
      {/* 3D FLOATING LAPTOP CHASSIS (PER REFERENCE IMAGE)         */}
      {/* ======================================================== */}
      <div 
        className="relative transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: 'perspective(1400px) rotateY(-9deg) rotateX(8deg) rotateZ(-1.8deg)',
        }}
      >
        {/* Ambient Dark Neon Green Glow Under Laptop */}
        <div className="absolute inset-x-8 -bottom-6 h-12 bg-[#00E676]/25 blur-2xl rounded-full pointer-events-none" />

        {/* Laptop Outer Bezel / Display Lid */}
        <div className="relative rounded-t-2xl rounded-b-md bg-[#161718] p-2.5 sm:p-3.5 border border-[#3A3D3C] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45),0_0_20px_rgba(0,230,118,0.15)]">
          
          {/* Top Notch & Camera */}
          <div className="absolute top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 w-20 h-2 bg-[#0F1010] rounded-b-md flex items-center justify-center z-20">
            <div className="w-1 h-1 rounded-full bg-[#2A2B2A]" />
          </div>

          {/* Screen Inner Display Frame */}
          <div className="relative rounded-lg bg-[#0A0D0B] border border-[#222724] p-3 sm:p-4 text-[#F4F2EC] overflow-hidden shadow-inner">
            
            {/* Screen Top Status / Brand Nav Bar */}
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#1E2521] text-[9px] font-mono">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-[#00E676] shadow-[0_0_6px_#00E676]" />
                  <span className="font-bold tracking-wider text-white">PMAXIS</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[#7E8580] text-[8px]">
                  <span>Markets</span>
                  <span>Data</span>
                  <span>Signals</span>
                  <span>API</span>
                </div>
              </div>

              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#00E676]/15 border border-[#00E676]/30 text-[#00E676] text-[8px] font-bold">
                <span className="w-1 h-1 rounded-full bg-[#00E676] animate-pulse" />
                <span>Live</span>
              </div>
            </div>

            {/* Contract Title & Verified Oracle Badge */}
            <div className="flex items-start justify-between gap-2 mb-2.5">
              <div>
                <div className="font-mono text-[8px] text-[#7A827C] tracking-wider uppercase">
                  MARKET CONTRACT #PM-9842
                </div>
                <div className="font-display text-xs sm:text-sm font-bold text-white tracking-tight mt-0.5">
                  Fed rate cut before September?
                </div>
              </div>

              <span className="font-mono text-[8px] text-[#00E676] font-bold flex items-center gap-1 bg-[#00E676]/10 px-1.5 py-0.5 rounded border border-[#00E676]/25 whitespace-nowrap">
                <span className="w-1 h-1 rounded-full bg-[#00E676]" />
                VERIFIED
              </span>
            </div>

            {/* Outcome Probabilities: YES / NO */}
            <div className="grid grid-cols-2 gap-2 mb-2.5 font-mono">
              
              {/* YES Outcome */}
              <div className={`p-2 rounded bg-[#111613] border border-[#222E26] transition-colors ${
                tickActive ? 'border-[#00E676]/70 shadow-[0_0_10px_rgba(0,230,118,0.2)]' : ''
              }`}>
                <div className="flex items-center justify-between text-[8px] text-[#8C948E]">
                  <span className="font-bold text-white">YES</span>
                  <span className="text-[#00E676] font-bold flex items-center">
                    <ArrowUpRight className="w-2.5 h-2.5" />
                    +2.8%
                  </span>
                </div>
                <div className="font-mono-num text-lg sm:text-xl font-extrabold text-white my-0.5">
                  {yesPrice}¢
                </div>
                <div className="h-1 w-full bg-[#1C2520] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00E676] shadow-[0_0_8px_#00E676] transition-all duration-300"
                    style={{ width: `${yesPrice}%` }}
                  />
                </div>
              </div>

              {/* NO Outcome */}
              <div className="p-2 rounded bg-[#111613] border border-[#222E26]">
                <div className="flex items-center justify-between text-[8px] text-[#8C948E]">
                  <span className="font-bold text-[#8C948E]">NO</span>
                  <span className="text-[#7A827C]">-2.8%</span>
                </div>
                <div className="font-mono-num text-lg sm:text-xl font-extrabold text-[#9CA59F] my-0.5">
                  {noPrice}¢
                </div>
                <div className="h-1 w-full bg-[#1C2520] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#525D56] transition-all duration-300"
                    style={{ width: `${noPrice}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-3 gap-1 py-1.5 px-2 rounded bg-[#101412] border border-[#1C2420] text-center font-mono mb-2 text-[8px]">
              <div>
                <div className="text-[#6D7570] text-[7px] uppercase">24H VOLUME</div>
                <div className="font-bold text-white text-[10px] mt-0.5">$5.53M</div>
              </div>
              <div className="border-x border-[#1E2622]">
                <div className="text-[#6D7570] text-[7px] uppercase">TRADES</div>
                <div className="font-bold text-white text-[10px] mt-0.5">18,839</div>
              </div>
              <div>
                <div className="text-[#6D7570] text-[7px] uppercase">LIQUIDITY</div>
                <div className="font-bold text-white text-[10px] mt-0.5">$1.33M</div>
              </div>
            </div>

            {/* Glowing Neon Green Probability SVG Curve */}
            <div className="relative h-16 sm:h-20 w-full rounded bg-[#0D120F] border border-[#1E2822] overflow-hidden p-1.5">
              <svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none" 
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                <defs>
                  <linearGradient id="laptopChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E676" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#00E676" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d={areaD} fill="url(#laptopChartGrad)" stroke="none" />
                <path 
                  d={pathD} 
                  fill="none" 
                  stroke="#00E676" 
                  strokeWidth="2.5" 
                  vectorEffect="non-scaling-stroke"
                  className="filter drop-shadow-[0_0_4px_#00E676]"
                />
                <circle 
                  cx="100" 
                  cy={getYPos(yesPrice)} 
                  r="3.5" 
                  fill="#00E676" 
                  className="animate-pulse"
                />
              </svg>

              {/* Dynamic Price Pill on Chart */}
              <div 
                className="absolute right-1 px-1 py-0.2 rounded bg-[#00E676] text-[#0A0D0B] font-mono text-[8px] font-black shadow-[0_0_8px_#00E676] pointer-events-none transform -translate-y-1/2"
                style={{ top: `${Math.max(20, Math.min(80, getYPos(yesPrice)))}%` }}
              >
                {yesPrice}¢
              </div>
            </div>

          </div>

        </div>

        {/* Laptop Base / Keyboard Aluminum Bottom Edge */}
        <div className="relative h-3.5 sm:h-4 bg-gradient-to-b from-[#2B2E2C] to-[#181A19] rounded-b-xl border-t border-[#464A48] shadow-lg flex items-center justify-center">
          <div className="w-14 h-1 bg-[#141615] rounded-b-sm" />
        </div>

      </div>

    </div>
  );
}
