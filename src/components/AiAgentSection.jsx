import React, { useState, useEffect, useRef } from 'react';
import DataArchitecture3D from './DataArchitecture3D';
import { 
  Activity, 
  Database, 
  Bot, 
  ChevronRight, 
  Send, 
  Sparkles,
  TrendingUp, 
  Layers, 
  Compass, 
  BookOpen, 
  ArrowLeftRight, 
  LineChart, 
  Bell, 
  Search,
  Zap,
  CheckCircle2,
  Clock,
  Cpu,
  Shield,
  Code2
} from 'lucide-react';

export default function AiAgentSection() {
  const [activeTab, setActiveTab] = useState('agents'); // 'trading' | 'analytics' | 'agents'
  
  // Interactive Chat State for AI Agents Preview
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'user',
      text: 'What is the best bid/ask for "NBER declares a recession before year end"?',
    },
    {
      id: 2,
      sender: 'agent',
      intro: 'Here\'s the current best bid/ask for "NBER declares a recession before year end" on Polymarket:',
      metrics: {
        bid: '17.0¢',
        ask: '18.6¢',
        spread: '4.49%',
      },
    },
    {
      id: 3,
      sender: 'user',
      text: 'Show me price and volume over the last 24h.',
    },
    {
      id: 4,
      sender: 'agent',
      chart: {
        price: '18.2¢',
        volume: '24h Volume: $350.0K',
      },
    },
  ]);

  // Suggested Prompts for Quick Testing
  const suggestedPrompts = [
    'What is the implied probability of Fed rate cut in Nov?',
    'Show orderbook depth skew across Polymarket & Kalshi',
    'Whale trades exceeding $50k in the last 2 hours',
  ];

  const handleSendMessage = (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const newMsgId = Date.now();
    const userMsg = { id: newMsgId, sender: 'user', text: query };
    
    // Simulated intelligent agent response based on query
    let agentReply;
    const lower = query.toLowerCase();

    if (lower.includes('fed') || lower.includes('rate cut')) {
      agentReply = {
        id: newMsgId + 1,
        sender: 'agent',
        intro: 'Live consensus across 3 venues for "Fed cuts interest rate by ≥25bps":',
        metrics: {
          bid: '88.4¢',
          ask: '89.1¢',
          spread: '0.78%',
        },
        chart: {
          price: '88.8¢',
          volume: '24h Volume: $1.82M',
        },
      };
    } else if (lower.includes('whale') || lower.includes('trade')) {
      agentReply = {
        id: newMsgId + 1,
        sender: 'agent',
        intro: 'Detected 3 institutional fills on Polymarket L2 in the past 120 minutes:',
        metrics: {
          bid: '$45,000 @ 64.2¢',
          ask: '$32,500 @ 64.5¢',
          spread: 'Whale Skew: +78% YES',
        },
      };
    } else {
      agentReply = {
        id: newMsgId + 1,
        sender: 'agent',
        intro: `Normalized live data fetched for "${query}":`,
        metrics: {
          bid: '54.2¢',
          ask: '55.0¢',
          spread: '1.45%',
        },
        chart: {
          price: '54.6¢',
          volume: '24h Volume: $482.0K',
        },
      };
    }

    setChatMessages((prev) => [...prev, userMsg, agentReply]);
    setChatInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Sparkline SVG coordinates
  const sparklinePoints = "0,42 20,38 40,41 60,32 80,35 100,28 120,30 140,24 160,28 180,22 200,26 220,18 240,20 260,15 280,18 300,12 320,14 340,8 360,10 380,4 400,6";
  const sparklineArea = `0,42 20,38 40,41 60,32 80,35 100,28 120,30 140,24 160,28 180,22 200,26 220,18 240,20 260,15 280,18 300,12 320,14 340,8 360,10 380,4 400,6 400,60 0,60`;

  return (
    <section 
      id="ai-agents" 
      className="relative bg-[#050706] text-white py-24 sm:py-32 px-4 sm:px-8 xl:px-14 lg:pr-32 xl:pr-36 select-none overflow-hidden border-b border-white/10"
    >
      {/* ======================================================== */}
      {/* 3D DATA ARCHITECTURE BACKGROUND (STRICTLY NO CIRCLES)   */}
      {/* ======================================================== */}
      <DataArchitecture3D activeTab={activeTab} />

      {/* Subtle depth vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050706]/40 to-[#050706] pointer-events-none" />

      {/* Main Content Surface */}
      <div className="max-w-[1480px] mx-auto relative z-10">
        
        {/* ======================================================== */}
        {/* SECTION HEADER (EXACTLY MATCHING SPEC & SCREENSHOT)     */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <h2 className="font-display text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight mb-4">
            Build on top of the market.
          </h2>
          <p className="font-mono text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
            PMAxis gives you the real-time building blocks to power trading systems, analytics and AI agents.
          </p>
        </div>

        {/* ======================================================== */}
        {/* MAIN INTERFACE: LEFT TABS + RIGHT PREVIEW DASHBOARD     */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: 3 INTERACTIVE TABS                         */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-3.5">
            
            {/* TAB 1: TRADING SYSTEMS */}
            <button
              type="button"
              onClick={() => setActiveTab('trading')}
              className={`text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative group cursor-pointer outline-none ${
                activeTab === 'trading'
                  ? 'bg-[#0B141E]/90 border-[#00E676]/40 shadow-[0_10px_30px_rgba(0,230,118,0.08)]'
                  : 'bg-[#090D12]/70 border-white/10 hover:border-white/20 hover:bg-[#0D131A]/80'
              }`}
            >
              {activeTab === 'trading' && (
                <span className="absolute left-0 top-3 bottom-3 w-[3.5px] rounded-r bg-[#00E676] shadow-[0_0_12px_#00E676]" />
              )}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${
                    activeTab === 'trading' 
                      ? 'bg-[#00E676]/15 text-[#00E676]' 
                      : 'bg-white/5 text-[#8E9B95] group-hover:text-white'
                  }`}>
                    <Activity className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white tracking-tight">
                    Trading Systems
                  </h3>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  activeTab === 'trading' ? 'text-[#00E676] translate-x-0.5' : 'text-[#64748B]'
                }`} />
              </div>
              <p className="font-mono text-xs text-[#8E9B95] leading-relaxed pl-1">
                Live prices, trades, orderbooks and signals for market-aware applications.
              </p>
            </button>

            {/* TAB 2: ANALYTICS */}
            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative group cursor-pointer outline-none ${
                activeTab === 'analytics'
                  ? 'bg-[#0B1522]/90 border-[#38BDF8]/40 shadow-[0_10px_30px_rgba(56,189,248,0.08)]'
                  : 'bg-[#090D12]/70 border-white/10 hover:border-white/20 hover:bg-[#0D131A]/80'
              }`}
            >
              {activeTab === 'analytics' && (
                <span className="absolute left-0 top-3 bottom-3 w-[3.5px] rounded-r bg-[#38BDF8] shadow-[0_0_12px_#38BDF8]" />
              )}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${
                    activeTab === 'analytics' 
                      ? 'bg-[#38BDF8]/15 text-[#38BDF8]' 
                      : 'bg-white/5 text-[#8E9B95] group-hover:text-white'
                  }`}>
                    <Database className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white tracking-tight">
                    Analytics
                  </h3>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  activeTab === 'analytics' ? 'text-[#38BDF8] translate-x-0.5' : 'text-[#64748B]'
                }`} />
              </div>
              <p className="font-mono text-xs text-[#8E9B95] leading-relaxed pl-1">
                Historical and real-time data for research, dashboards and insights.
              </p>
            </button>

            {/* TAB 3: AI AGENTS (ACTIVE IN SCREENSHOT) */}
            <button
              type="button"
              onClick={() => setActiveTab('agents')}
              className={`text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative group cursor-pointer outline-none ${
                activeTab === 'agents'
                  ? 'bg-[#0E1628]/90 border-[#3B82F6]/50 shadow-[0_10px_30px_rgba(59,130,246,0.1)]'
                  : 'bg-[#090D12]/70 border-white/10 hover:border-white/20 hover:bg-[#0D131A]/80'
              }`}
            >
              {activeTab === 'agents' && (
                <span className="absolute left-0 top-3 bottom-3 w-[3.5px] rounded-r bg-[#3B82F6] shadow-[0_0_12px_#3B82F6]" />
              )}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${
                    activeTab === 'agents' 
                      ? 'bg-[#3B82F6]/20 text-[#60A5FA]' 
                      : 'bg-white/5 text-[#8E9B95] group-hover:text-white'
                  }`}>
                    <Bot className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white tracking-tight">
                    AI Agents
                  </h3>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  activeTab === 'agents' ? 'text-[#3B82F6] translate-x-0.5' : 'text-[#64748B]'
                }`} />
              </div>
              <p className="font-mono text-xs text-[#8E9B95] leading-relaxed pl-1">
                Give your AI systems access to structured prediction-market data.
              </p>
            </button>

          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: PREVIEW DASHBOARD CONTAINER                */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 xl:col-span-8">
            <div className="rounded-2xl border border-white/10 bg-[#080B10]/95 backdrop-blur-2xl p-5 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative">
              
              {/* TOP HEADER INSIDE PREVIEW */}
              <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider uppercase mb-1">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${
                      activeTab === 'trading' 
                        ? 'bg-[#00E676] shadow-[0_0_8px_#00E676]' 
                        : activeTab === 'analytics'
                        ? 'bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]'
                        : 'bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]'
                    }`} />
                    <span className="text-white">
                      {activeTab === 'trading' && 'TRADING SYSTEMS PREVIEW'}
                      {activeTab === 'analytics' && 'ANALYTICS PREVIEW'}
                      {activeTab === 'agents' && 'AI AGENTS PREVIEW'}
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8]">
                    {activeTab === 'trading' && 'Sub-millisecond execution & streaming L2 orderbook'}
                    {activeTab === 'analytics' && 'Historical depth, volatility surface & liquidity skew'}
                    {activeTab === 'agents' && 'Chat with your market data agent'}
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-[10px] text-[#A1A1AA]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
                  <span>WS: CONNECTED</span>
                </div>
              </div>

              {/* TAB CONTENT PANELS */}
              {activeTab === 'agents' && (
                /* ======================================================== */
                /* AI AGENTS PREVIEW (EXACT REPLICA OF SCREENSHOT)         */
                /* ======================================================== */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* LEFT: INTERACTIVE AGENT CHAT */}
                  <div className="lg:col-span-8 flex flex-col justify-between min-h-[460px]">
                    <div className="space-y-4 overflow-y-auto max-h-[380px] pr-1 scrollbar-thin">
                      {chatMessages.map((msg) => {
                        if (msg.sender === 'user') {
                          return (
                            <div key={msg.id} className="flex justify-end">
                              <div className="max-w-[85%] sm:max-w-[78%] bg-[#2563EB] text-white text-xs sm:text-[13px] font-medium px-4 py-2.5 rounded-2xl rounded-tr-sm shadow-md leading-relaxed">
                                {msg.text}
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div key={msg.id} className="flex items-start gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-[#312E81] text-[#A5B4FC] flex items-center justify-center shrink-0 mt-0.5 border border-[#4338CA]/40">
                              <Bot className="w-4 h-4" />
                            </div>
                            <div className="flex-1 space-y-2">
                              {msg.intro && (
                                <p className="text-xs text-[#D1D5DB] leading-relaxed">
                                  {msg.intro}
                                </p>
                              )}

                              {/* Metric Box (Best bid / Best ask / Spread) */}
                              {msg.metrics && (
                                <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-white/10 grid grid-cols-3 gap-2 text-center">
                                  <div>
                                    <div className="font-mono text-[9.5px] uppercase tracking-wider text-[#9CA3AF] mb-0.5">
                                      Best bid
                                    </div>
                                    <div className="font-mono text-sm sm:text-base font-bold text-white">
                                      {msg.metrics.bid}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-mono text-[9.5px] uppercase tracking-wider text-[#9CA3AF] mb-0.5">
                                      Best ask
                                    </div>
                                    <div className="font-mono text-sm sm:text-base font-bold text-white">
                                      {msg.metrics.ask}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-mono text-[9.5px] uppercase tracking-wider text-[#9CA3AF] mb-0.5">
                                      Spread
                                    </div>
                                    <div className="font-mono text-sm sm:text-base font-bold text-[#00E676]">
                                      {msg.metrics.spread}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Mini Chart Card */}
                              {msg.chart && (
                                <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-white/10">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-mono text-sm font-bold text-white">
                                      {msg.chart.price}
                                    </span>
                                    <span className="font-mono text-[10px] text-[#9CA3AF]">
                                      {msg.chart.volume}
                                    </span>
                                  </div>
                                  
                                  {/* Clean SVG Area Chart */}
                                  <div className="w-full h-14 relative overflow-hidden">
                                    <svg viewBox="0 0 400 60" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                      <defs>
                                        <linearGradient id="agentChartGrad" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                                          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
                                        </linearGradient>
                                      </defs>
                                      <polygon points={sparklineArea} fill="url(#agentChartGrad)" />
                                      <polyline 
                                        points={sparklinePoints} 
                                        fill="none" 
                                        stroke="#38BDF8" 
                                        strokeWidth="2.2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                      />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Quick suggestion prompt chips */}
                    <div className="mt-4 pt-2">
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {suggestedPrompts.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSendMessage(p)}
                            className="font-mono text-[10px] text-[#94A3B8] bg-white/5 hover:bg-white/10 hover:text-white px-2.5 py-1 rounded-md border border-white/5 transition-all text-left truncate max-w-full"
                          >
                            + {p}
                          </button>
                        ))}
                      </div>

                      {/* Chat Input Bar */}
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Ask your market data agent..."
                          className="w-full bg-[#0A0E15] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs sm:text-sm text-white placeholder-[#64748B] outline-none focus:border-[#3B82F6]/60 transition-colors shadow-inner"
                        />
                        <button
                          type="button"
                          onClick={() => handleSendMessage()}
                          className="absolute right-2 p-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: AVAILABLE CAPABILITIES & CONNECTED MARKETPLACES */}
                  <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-6 flex flex-col justify-between">
                    <div>
                      {/* Available Capabilities */}
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
                        AVAILABLE CAPABILITIES
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-2.5">
                          <Compass className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-white">Market Overview</div>
                            <div className="text-[11px] text-[#94A3B8]">Get market summary and key stats</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <BookOpen className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-white">Orderbook Snapshot</div>
                            <div className="text-[11px] text-[#94A3B8]">Best bid/ask, depth and spread</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <ArrowLeftRight className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-white">Recent Trades</div>
                            <div className="text-[11px] text-[#94A3B8]">Latest trades and volumes</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <LineChart className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-white">Price & Volume Chart</div>
                            <div className="text-[11px] text-[#94A3B8]">Historical charts and metrics</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <Bell className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-white">Signals & Alerts</div>
                            <div className="text-[11px] text-[#94A3B8]">Unusual activity and signals</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <Search className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-white">Market Search</div>
                            <div className="text-[11px] text-[#94A3B8]">Find markets and assets</div>
                          </div>
                        </div>
                      </div>

                      {/* Connected Marketplaces */}
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-3 pt-4 border-t border-white/10">
                        CONNECTED MARKETPLACES
                      </div>
                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex items-center justify-between text-white">
                          <span>Polymarket</span>
                          <span className="text-[10px] font-bold text-[#00E676] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
                            LIVE
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[#94A3B8]">
                          <span>Kalshi</span>
                          <span className="text-[10px] font-bold text-[#F59E0B] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                            SOON
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[#94A3B8]">
                          <span>Limitless</span>
                          <span className="text-[10px] font-bold text-[#F59E0B] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                            SOON
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[#64748B]">
                          <span>More coming soon</span>
                          <span className="text-[10px] font-bold text-[#F59E0B] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                            SOON
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {activeTab === 'trading' && (
                /* ======================================================== */
                /* TRADING SYSTEMS PREVIEW                                 */
                /* ======================================================== */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 flex flex-col justify-between min-h-[460px]">
                    <div>
                      {/* Top Metric Strip */}
                      <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#0B0F17] border border-white/10 mb-4 font-mono text-center">
                        <div>
                          <div className="text-[10px] text-[#94A3B8] uppercase">P99 Latency</div>
                          <div className="text-base font-bold text-[#00E676]">5.2 ms</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#94A3B8] uppercase">Feed Protocol</div>
                          <div className="text-base font-bold text-white">WebSocket L2</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#94A3B8] uppercase">Update Cadence</div>
                          <div className="text-base font-bold text-white">60 Hz</div>
                        </div>
                      </div>

                      {/* Orderbook Depth Ladder */}
                      <div className="p-4 rounded-xl bg-[#0B0F17] border border-white/10 mb-4">
                        <div className="flex items-center justify-between font-mono text-[11px] text-[#94A3B8] pb-2 mb-2 border-b border-white/5">
                          <span>BID DEPTH</span>
                          <span>STRIKE: 63.5¢</span>
                          <span>ASK DEPTH</span>
                        </div>
                        <div className="space-y-1.5 font-mono text-xs">
                          <div className="flex items-center justify-between bg-[#00E676]/10 px-3 py-1.5 rounded border border-[#00E676]/20">
                            <span className="text-[#00E676] font-bold">63.4¢ &nbsp; ($24,100)</span>
                            <span className="text-[10px] text-[#94A3B8]">BEST BID</span>
                            <span className="text-white font-medium">420 bids</span>
                          </div>
                          <div className="flex items-center justify-between bg-red-500/10 px-3 py-1.5 rounded border border-red-500/20">
                            <span className="text-white font-medium">310 asks</span>
                            <span className="text-[10px] text-[#94A3B8]">BEST ASK</span>
                            <span className="text-red-400 font-bold">63.8¢ &nbsp; ($18,650)</span>
                          </div>
                        </div>
                      </div>

                      {/* Algorithmic Trigger Preview */}
                      <div className="p-3.5 rounded-xl bg-[#090D14] border border-white/10 font-mono text-xs">
                        <div className="text-[10px] font-bold text-[#00E676] uppercase tracking-wider mb-1.5 flex items-center gap-2">
                          <Zap className="w-3 h-3" />
                          <span>ACTIVE QUANT HOOK: SPREAD_ARBITRAGE</span>
                        </div>
                        <div className="bg-black/60 p-2.5 rounded border border-white/5 text-[#94A3B8] text-[11px] leading-relaxed">
                          <span className="text-[#38BDF8]">IF</span> delta_velocity &gt; <span className="text-[#00E676]">+3.2%</span> <span className="text-[#38BDF8]">AND</span> kalshi_spread &lt; <span className="text-white">0.8¢</span><br />
                          <span className="text-[#F59E0B]">THEN EXECUTE:</span> route_limit(side="BUY", venue="polymarket", size=25000)
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 font-mono text-[11px] text-[#94A3B8] flex items-center justify-between mt-4">
                      <span>Live execution tape: Polymarket / Kalshi cross-venue stream</span>
                      <span className="text-[#00E676] font-bold">ACTIVE</span>
                    </div>
                  </div>

                  {/* RIGHT: TRADING CAPABILITIES */}
                  <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-6 flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
                        AVAILABLE CAPABILITIES
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-2.5">
                          <Zap className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-white">Sub-6ms WebSocket</div>
                            <div className="text-[11px] text-[#94A3B8]">Direct book delta streaming</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Shield className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-white">FIX 4.4 Protocol Gateway</div>
                            <div className="text-[11px] text-[#94A3B8]">Institutional order routing</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Layers className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-white">L2 / L3 Depth Ladder</div>
                            <div className="text-[11px] text-[#94A3B8]">Full book depth aggregation</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Bell className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-white">Signal Webhooks</div>
                            <div className="text-[11px] text-[#94A3B8]">Microsecond volatility alerts</div>
                          </div>
                        </div>
                      </div>

                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-3 pt-4 border-t border-white/10">
                        CONNECTED VENUES
                      </div>
                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex items-center justify-between text-white">
                          <span>Polymarket</span>
                          <span className="text-[10px] font-bold text-[#00E676]">● LIVE</span>
                        </div>
                        <div className="flex items-center justify-between text-[#94A3B8]">
                          <span>Kalshi</span>
                          <span className="text-[10px] font-bold text-[#F59E0B]">● SOON</span>
                        </div>
                        <div className="flex items-center justify-between text-[#94A3B8]">
                          <span>Limitless</span>
                          <span className="text-[10px] font-bold text-[#F59E0B]">● SOON</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                /* ======================================================== */
                /* ANALYTICS PREVIEW                                       */
                /* ======================================================== */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 flex flex-col justify-between min-h-[460px]">
                    <div>
                      {/* Metric Strip */}
                      <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#0B0F17] border border-white/10 mb-4 font-mono text-center">
                        <div>
                          <div className="text-[10px] text-[#94A3B8] uppercase">Implied Volatility</div>
                          <div className="text-base font-bold text-[#38BDF8]">34.8%</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#94A3B8] uppercase">Total 24h Volume</div>
                          <div className="text-base font-bold text-white">$14.2M</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#94A3B8] uppercase">Liquidity Depth</div>
                          <div className="text-base font-bold text-[#00E676]">$1.42M</div>
                        </div>
                      </div>

                      {/* Multi-Resolution Probability Surface */}
                      <div className="p-4 rounded-xl bg-[#0B0F17] border border-white/10 mb-4">
                        <div className="flex items-center justify-between mb-3 font-mono text-xs">
                          <span className="text-white font-bold">Consensus Probability Spread</span>
                          <div className="flex items-center gap-1.5">
                            {['1H', '24H', '7D', '30D', 'ALL'].map((tf, i) => (
                              <span key={tf} className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                                i === 1 ? 'bg-[#38BDF8] text-[#050706] font-bold' : 'text-[#94A3B8] hover:text-white'
                              }`}>
                                {tf}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Multi-Curve Graphic */}
                        <div className="w-full h-28 relative">
                          <svg viewBox="0 0 500 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <path d="M0,70 Q120,80 250,45 T500,20" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
                            <path d="M0,80 Q140,60 270,55 T500,32" fill="none" stroke="#00E676" strokeWidth="1.8" strokeDasharray="4 2" />
                            <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                            <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                          </svg>
                        </div>
                      </div>

                      {/* Historical Resolution Analysis */}
                      <div className="p-3.5 rounded-xl bg-[#090D14] border border-white/10 font-mono text-xs">
                        <div className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-wider mb-1.5 flex items-center gap-2">
                          <TrendingUp className="w-3 h-3" />
                          <span>EVENT CALIBRATION & RESOLUTION METRICS</span>
                        </div>
                        <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                          Brier Score: <span className="text-white font-bold">0.084</span> | Historical Divergence: <span className="text-[#00E676] font-bold">-0.12%</span> | Calibration Index: <span className="text-white font-bold">99.1%</span>
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 font-mono text-[11px] text-[#94A3B8] flex items-center justify-between mt-4">
                      <span>Export: Apache Parquet & Daily S3 Snapshot Sync</span>
                      <span className="text-[#38BDF8] font-bold">SYNCED</span>
                    </div>
                  </div>

                  {/* RIGHT: ANALYTICS CAPABILITIES */}
                  <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-6 flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
                        AVAILABLE CAPABILITIES
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-2.5">
                          <Database className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-white">Tick-Level Archive</div>
                            <div className="text-[11px] text-[#94A3B8]">Nanosecond resolution market logs</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <LineChart className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-white">Volatility Models</div>
                            <div className="text-[11px] text-[#94A3B8]">Implied vs realized surfaces</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Layers className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-white">Liquidity Skew Heatmap</div>
                            <div className="text-[11px] text-[#94A3B8]">Depth imbalance across strikes</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Code2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-white">Vectorized Python SDK</div>
                            <div className="text-[11px] text-[#94A3B8]">Direct Pandas & Polars ingest</div>
                          </div>
                        </div>
                      </div>

                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-3 pt-4 border-t border-white/10">
                        DATA COVERAGE
                      </div>
                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex items-center justify-between text-white">
                          <span>Polymarket</span>
                          <span className="text-[10px] font-bold text-[#00E676]">● FULL ARCHIVE</span>
                        </div>
                        <div className="flex items-center justify-between text-[#94A3B8]">
                          <span>Kalshi</span>
                          <span className="text-[10px] font-bold text-[#38BDF8]">● 2024-2026</span>
                        </div>
                        <div className="flex items-center justify-between text-[#94A3B8]">
                          <span>Limitless</span>
                          <span className="text-[10px] font-bold text-[#38BDF8]">● REAL-TIME</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* ======================================================== */}
            {/* PAGINATION / CAROUSEL DOTS (MATCHING SCREENSHOT)        */}
            {/* ======================================================== */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                type="button"
                onClick={() => setActiveTab('trading')}
                aria-label="Switch to Trading Systems"
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === 'trading' ? 'w-6 bg-[#00E676]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
              <button
                type="button"
                onClick={() => setActiveTab('analytics')}
                aria-label="Switch to Analytics"
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === 'analytics' ? 'w-6 bg-[#38BDF8]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
              <button
                type="button"
                onClick={() => setActiveTab('agents')}
                aria-label="Switch to AI Agents"
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === 'agents' ? 'w-6 bg-[#3B82F6]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
