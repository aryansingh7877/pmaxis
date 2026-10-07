import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export default function MarketInstrument() {
  const [yesPrice, setYesPrice] = useState(63.4);
  const [tickDirection, setTickDirection] = useState('up');
  const [lastDelta, setLastDelta] = useState('+0.3¢');
  const [isTickActive, setIsTickActive] = useState(false);
  const [selectedRange, setSelectedRange] = useState('24H');

  // Dynamic live chart points
  const [chartPoints, setChartPoints] = useState([
    { x: 0, y: 55.4, time: '00:00' },
    { x: 12, y: 56.8, time: '03:00' },
    { x: 25, y: 56.2, time: '06:00' },
    { x: 38, y: 58.1, time: '09:00' },
    { x: 50, y: 57.5, time: '12:00' },
    { x: 62, y: 59.4, time: '15:00' },
    { x: 75, y: 61.2, time: '18:00' },
    { x: 88, y: 62.9, time: '21:00' },
    { x: 100, y: 63.4, time: 'NOW' },
  ]);

  // High-frequency live market simulation
  useEffect(() => {
    const tickInterval = setInterval(() => {
      const delta = (Math.random() - 0.47) * 0.5;
      const isUp = delta >= 0;

      setYesPrice((prev) => {
        const next = Math.min(68.2, Math.max(58.4, prev + delta));
        const formatted = parseFloat(next.toFixed(1));

        setTickDirection(isUp ? 'up' : 'down');
        setLastDelta(`${isUp ? '+' : ''}${delta.toFixed(1)}¢`);
        setIsTickActive(true);
        setTimeout(() => setIsTickActive(false), 500);

        setChartPoints((prevPoints) => {
          const updated = [...prevPoints];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            y: formatted,
          };
          return updated;
        });

        return formatted;
      });
    }, 1800);

    return () => clearInterval(tickInterval);
  }, []);

  const noPrice = (100 - yesPrice).toFixed(1);

  // SVG coordinate calculation
  const minY = 35;
  const maxY = 70;
  const getYPos = (val) => 100 - ((val - minY) / (maxY - minY)) * 85 - 5;
  const pathCoordinates = chartPoints.map((pt) => `${pt.x},${getYPos(pt.y)}`);
  const linePathD = `M ${pathCoordinates.join(' L ')}`;
  const areaPathD = `M 0,100 L ${pathCoordinates.join(' L ')} L 100,100 Z`;

  return (
    <div 
      data-cursor="LIVE"
      className="relative w-full select-none"
    >
      {/* Editorial Tech Brutalist Card Surface */}
      <div className="relative bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[10px_10px_0px_#0A0A0A] p-5 sm:p-7 overflow-hidden">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b-2 border-[#0A0A0A]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-[#00E676] border border-[#0A0A0A]" />
            <span className="font-mono text-xs font-black tracking-widest uppercase text-[#0A0A0A]">
              MARKET TERMINAL // LIVE
            </span>
            <span className="font-mono text-[9px] px-1.5 py-0.5 bg-[#0A0A0A] text-[#F5F3EE] font-bold">
              CLOB-L2
            </span>
          </div>

          <div className="flex items-center gap-1 font-mono text-[10px]">
            {['1H', '24H', '7D', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-2 py-0.5 font-bold transition-colors border cursor-pointer ${
                  selectedRange === range
                    ? 'bg-[#0A0A0A] text-[#00E676] border-[#0A0A0A]'
                    : 'bg-transparent text-[#666] border-transparent hover:border-[#0A0A0A]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Contract Title & Status Banner */}
        <div className="mb-5 p-3.5 bg-[#F5F3EE] border border-[#0A0A0A] flex flex-col justify-between gap-1">
          <div className="flex items-center justify-between text-[9px] font-mono text-[#666]">
            <span className="font-bold text-[#0A0A0A]">CONTRACT #PM-9842</span>
            <span className="text-[#0A0A0A] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
              VERIFIED ORACLE
            </span>
          </div>
          <h2 className="font-display text-lg sm:text-xl font-black text-[#0A0A0A] tracking-tight leading-tight">
            Fed rate cut before September?
          </h2>
        </div>

        {/* Dual Outcome Columns: YES / NO */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          
          {/* YES Box */}
          <div className={`p-4 border border-[#0A0A0A] transition-colors ${
            isTickActive && tickDirection === 'up' ? 'bg-[#00E676]/15' : 'bg-[#FFFFFF]'
          }`}>
            <div className="flex items-center justify-between mb-1 text-xs font-mono font-black">
              <span>YES</span>
              <span className="flex items-center text-[10px] text-[#0A0A0A] bg-[#00E676] px-1 py-0.2 border border-[#0A0A0A]">
                {tickDirection === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {lastDelta}
              </span>
            </div>

            <div className="font-mono-num text-3xl sm:text-4xl font-black tracking-tight text-[#0A0A0A] my-1">
              {yesPrice}¢
            </div>

            {/* Stark Progress Bar */}
            <div className="mt-2 h-2 w-full bg-[#E5E3DC] border border-[#0A0A0A] overflow-hidden">
              <div 
                className="h-full bg-[#00E676] transition-all duration-300" 
                style={{ width: `${yesPrice}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between font-mono text-[8px] text-[#666] font-bold">
              <span>PROBABILITY</span>
              <span className="text-[#0A0A0A]">{yesPrice}%</span>
            </div>
          </div>

          {/* NO Box */}
          <div className="p-4 border border-[#0A0A0A] bg-[#FFFFFF]">
            <div className="flex items-center justify-between mb-1 text-xs font-mono font-black text-[#666]">
              <span>NO</span>
              <span className="text-[10px] bg-[#E5E3DC] px-1 py-0.2 border border-[#0A0A0A] text-[#0A0A0A]">
                {tickDirection === 'up' ? '-' : '+'}{lastDelta.replace(/[+-]/, '')}
              </span>
            </div>

            <div className="font-mono-num text-3xl sm:text-4xl font-black tracking-tight text-[#343434] my-1">
              {noPrice}%
            </div>

            {/* Stark Progress Bar */}
            <div className="mt-2 h-2 w-full bg-[#E5E3DC] border border-[#0A0A0A] overflow-hidden">
              <div 
                className="h-full bg-[#343434] transition-all duration-300" 
                style={{ width: `${noPrice}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between font-mono text-[8px] text-[#666] font-bold">
              <span>PROBABILITY</span>
              <span className="text-[#0A0A0A]">{noPrice}%</span>
            </div>
          </div>

        </div>

        {/* 3 Telemetry Metrics Strip */}
        <div className="grid grid-cols-3 border-y-2 border-[#0A0A0A] py-2 mb-5 font-mono text-center">
          <div className="border-r border-[#0A0A0A] pr-2">
            <div className="text-[9px] uppercase tracking-wider text-[#666] font-bold">24H VOLUME</div>
            <div className="font-mono-num text-sm sm:text-base font-black text-[#0A0A0A] mt-0.5">$5.53M</div>
          </div>
          <div className="border-r border-[#0A0A0A] px-2">
            <div className="text-[9px] uppercase tracking-wider text-[#666] font-bold">TRADES</div>
            <div className="font-mono-num text-sm sm:text-base font-black text-[#0A0A0A] mt-0.5">18,839</div>
          </div>
          <div className="pl-2">
            <div className="text-[9px] uppercase tracking-wider text-[#666] font-bold">LIQUIDITY</div>
            <div className="font-mono-num text-sm sm:text-base font-black text-[#0A0A0A] mt-0.5">$1.33M</div>
          </div>
        </div>

        {/* Dynamic Graphic SVG Curve */}
        <div className="relative border border-[#0A0A0A] bg-[#F5F3EE] p-3">
          <div className="flex items-center justify-between text-[9px] font-mono font-bold text-[#666] mb-2">
            <span className="text-[#0A0A0A] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#00E676] border border-[#0A0A0A]" />
              PROBABILITY CURVE
            </span>
            <span>TICK: 0.1s // LIVE</span>
          </div>

          <div className="relative h-28 w-full overflow-hidden">
            <svg 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none" 
              className="absolute inset-0 h-full w-full overflow-visible"
            >
              {/* Curve area */}
              <path 
                d={areaPathD} 
                fill="#00E676" 
                fillOpacity="0.12" 
                stroke="none" 
              />
              {/* Curve stroke */}
              <path 
                d={linePathD} 
                fill="none" 
                stroke="#0A0A0A" 
                strokeWidth="2.5" 
                vectorEffect="non-scaling-stroke"
              />
              {/* Active point */}
              <circle 
                cx="100" 
                cy={getYPos(yesPrice)} 
                r="3.5" 
                fill="#00E676" 
                stroke="#0A0A0A"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Price flag tag */}
            <div 
              className="absolute right-1 transform -translate-y-1/2 px-1.5 py-0.5 bg-[#0A0A0A] text-[#00E676] font-mono text-[9px] font-black border border-[#0A0A0A] pointer-events-none"
              style={{ top: `${Math.max(15, Math.min(85, getYPos(yesPrice)))}%` }}
            >
              {yesPrice}¢
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-[#0A0A0A] flex items-center justify-between text-[8px] font-mono font-bold text-[#666]">
            <span>BID 63.1¢ / ASK 63.7¢</span>
            <span>SPREAD: 0.6¢</span>
            <span className="text-[#0A0A0A]">SPEED: &lt;5.2ms</span>
          </div>
        </div>

      </div>
    </div>
  );
}
