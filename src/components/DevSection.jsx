import React, { useState, useEffect } from 'react';
import { Copy, Check, Terminal, Code2, Zap } from 'lucide-react';

export default function DevSection() {
  const [activeTab, setActiveTab] = useState('python');
  const [isCopied, setIsCopied] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);

  const snippets = {
    python: `import pmaxis

client = pmaxis.Client(api_key="pm_live_xxxxxx")

# Query real-time probability for Fed rate cut contract
market = client.markets.get("fed-rate-cut-sep")
print(f"Contract: {market.title}")
print(f"YES Price: {market.yes_price}¢ | Implied Probability: {market.probability}%")

# Stream live Level 2 orderbook ticks at 60Hz
async for tick in client.stream.orderbook("fed-rate-cut-sep"):
    print(f"Bid: {tick.best_bid} | Ask: {tick.best_ask} | Microsec: {tick.timestamp_us}")`,

    typescript: `import { PMAxisClient } from '@pmaxis/sdk';

const pmaxis = new PMAxisClient({ apiKey: process.env.PMAXIS_API_KEY });

// Subscribe to real-time probability curve & orderbook
const feed = await pmaxis.markets.subscribe('fed-rate-cut-sep', {
  depth: 'L2',
  interval: '100ms'
});

feed.on('tick', ({ probability, yesPrice, volume24h }) => {
  console.log(\`[PMAXIS] YES: \${yesPrice}¢ | Volume: \$\${volume24h}\`);
});`,

    curl: `curl -X GET "https://api.pmaxis.trade/v1/markets/fed-rate-cut-sep/price" \\
  -H "Authorization: Bearer pm_live_xxxxxx" \\
  -H "Accept: application/json"`,

    mcp: `{
  "mcpServers": {
    "pmaxis": {
      "command": "npx",
      "args": ["-y", "@pmaxis/mcp-server"],
      "env": {
        "PMAXIS_API_KEY": "pm_live_xxxxxx"
      }
    }
  }
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section 
      id="dev" 
      className="relative bg-[#080909] text-white py-24 sm:py-32 px-4 sm:px-8 xl:px-14 lg:pr-32 xl:pr-36 select-none overflow-hidden border-b border-[#00E676]/20"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#00E676]/6 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1640px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 mb-12 border-b border-[#1C241E] gap-6">
          <div>
            <div className="font-mono text-xs font-bold text-[#00E676] flex items-center gap-2 uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
              <span>#7 // DEVELOPER TERMINAL</span>
            </div>
            <h2 className="font-display text-2xl sm:text-5xl xl:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              One unified API & MCP SDK.<br />
              <span className="text-[#00E676]">Standardized for AI agents.</span>
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs text-[#8A948D] leading-relaxed">
            NATIVE MODEL CONTEXT PROTOCOL (MCP) + HIGH-FREQUENCY REST & WEBSOCKET STREAMING. TURNKEY INTEGRATION FOR QUANT DESKS & AUTONOMOUS REASONING ENGINES.
          </p>
        </div>

        {/* Developer Terminal Console Frame */}
        <div className="rounded-2xl bg-[#0D120F] border border-[#1E2B22] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
          
          {/* Top Bar */}
          <div className="px-4 sm:px-5 py-3 bg-[#121915] border-b border-[#1E2B22] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1 font-mono text-xs overflow-x-auto no-scrollbar max-w-full py-0.5">
              {[
                { id: 'python', label: 'PYTHON SDK' },
                { id: 'typescript', label: 'TYPESCRIPT' },
                { id: 'curl', label: 'cURL' },
                { id: 'mcp', label: 'MCP SERVER' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 px-2.5 sm:px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer text-[11px] sm:text-xs ${
                    activeTab === tab.id
                      ? 'bg-[#00E676] text-[#080909] shadow-[0_0_12px_rgba(0,230,118,0.4)]'
                      : 'text-[#8A968F] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18241D] hover:bg-[#203227] text-xs font-mono font-bold text-white transition-colors cursor-pointer border border-[#2B3E31]"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-[#00E676]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>

          {/* Code Viewer Body */}
          <div className="p-6 font-mono text-xs sm:text-[13px] leading-relaxed text-[#D2DDD5] overflow-x-auto bg-[#0A0E0B]">
            <pre className="selection:bg-[#00E676] selection:text-[#080909]">
              <code>{snippets[activeTab]}</code>
            </pre>
          </div>

          {/* Simulated Live Terminal Telemetry Output */}
          <div className="px-5 py-3 bg-[#080B09] border-t border-[#18231C] font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[#7E8A82]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
              <span>TLS 1.3 SECURE // WSS://API.PMAXIS.TRADE/STREAM</span>
            </div>
            <div className="text-[#00E676] font-bold">
              SPEED: &lt;4.8ms // STATUS: 200 OK
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
