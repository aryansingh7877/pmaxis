import React from 'react';

export default function FooterSection() {
  return (
    <footer className="w-full bg-[#000000] text-[#F5F3EE] pt-16 sm:pt-20 pb-12 px-4 sm:px-8 xl:px-14 lg:pr-36 xl:pr-40 select-none overflow-hidden relative">
      {/* Scoped Static Brand Gradient Styles for PMAXIS Wordmark */}
      <style>{`
        .pmaxis-brand-text {
          background: linear-gradient(
            135deg,
            #F4F1E8 0%,     /* Warm Off-White */
            #9EF0C2 26%,    /* Pale Mint */
            #00E676 62%,    /* Electric Neon Green */
            #0D3B24 100%    /* Deep Forest Emerald */
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          display: inline-block;
        }

        .pmaxis-brand-glow {
          background: linear-gradient(
            135deg,
            #F4F1E8 0%,
            #9EF0C2 26%,
            #00E676 62%,
            #0D3B24 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          filter: blur(32px);
          opacity: 0.35;
          display: inline-block;
        }
      `}</style>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* ================================================================ */}
        {/* UPPER FOOTER GRID (EXACT LAYOUT FROM USER SCREENSHOT)            */}
        {/* ================================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between pb-16 sm:pb-20 gap-10 lg:gap-16">
          
          {/* Left Brand Column */}
          <div className="max-w-sm">
            {/* Logo: X Mark with Green Center Dot + PMAXIS */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-5 h-5 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-white stroke-[2.8]"
                  stroke="currentColor"
                  fill="none"
                >
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </svg>
                <span className="absolute w-1.5 h-1.5 rounded-full bg-[#00E676] shadow-[0_0_6px_#00E676]" />
              </div>
              <span className="font-mono text-base sm:text-lg font-black tracking-wider text-white">
                PMAXIS
              </span>
            </div>

            {/* Tagline */}
            <p className="mt-3 font-sans text-xs sm:text-[13px] text-[#82867F] leading-relaxed">
              One API for every prediction market.
            </p>
          </div>

          {/* Right Navigation Columns (3 Columns from Screenshot) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-14 lg:gap-24">
            
            {/* Column 1: Product */}
            <div>
              <div className="font-sans text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">
                Product
              </div>
              <ul className="space-y-2 sm:space-y-2.5 font-sans text-xs sm:text-[13px] text-[#82867F]">
                <li>
                  <a href="#product" className="hover:text-[#00E676] transition-colors">
                    Product
                  </a>
                </li>
                <li>
                  <a href="#data" className="hover:text-[#00E676] transition-colors">
                    Data
                  </a>
                </li>
                <li>
                  <a href="#dev" className="hover:text-[#00E676] transition-colors">
                    Developers
                  </a>
                </li>
                <li>
                  <a href="#price" className="hover:text-[#00E676] transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div>
              <div className="font-sans text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">
                Resources
              </div>
              <ul className="space-y-2 sm:space-y-2.5 font-sans text-xs sm:text-[13px] text-[#82867F]">
                <li>
                  <a
                    href="https://docs.pmaxis.trade"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#00E676] transition-colors"
                  >
                    Docs
                  </a>
                </li>
                <li>
                  <a href="#dev" className="hover:text-[#00E676] transition-colors">
                    MCP
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.pmaxis.trade"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#00E676] transition-colors"
                  >
                    Developer resources
                  </a>
                </li>
                <li>
                  <a
                    href="https://status.pmaxis.trade"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#00E676] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Status</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
                  </a>
                </li>
                <li>
                  <a href="#data" className="hover:text-[#00E676] transition-colors">
                    Explorer
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Account */}
            <div>
              <div className="font-sans text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">
                Account
              </div>
              <ul className="space-y-2 sm:space-y-2.5 font-sans text-xs sm:text-[13px] text-[#82867F]">
                <li>
                  <a
                    href="https://api.pmaxis.trade/login"
                    className="hover:text-[#00E676] transition-colors"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="https://api.pmaxis.trade/dashboard"
                    className="hover:text-[#00E676] transition-colors"
                  >
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* ================================================================ */}
        {/* ENORMOUS BRUTALIST WORDMARK AT THE BASE                           */}
        {/* ================================================================ */}
        <div className="pt-8 border-t border-[#181818] select-none pointer-events-none relative overflow-hidden flex items-center justify-center max-w-full">
          
          {/* Subtle Ambient Static Glow Layer */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
          >
            <span className="font-display font-black text-[min(17vw,220px)] leading-none uppercase tracking-tighter pmaxis-brand-glow">
              PMAXIS
            </span>
          </div>

          {/* Crisp Foreground Static Gradient Wordmark */}
          <div className="relative z-10 flex items-center justify-center">
            <span className="font-display font-black text-[min(17vw,220px)] leading-none uppercase tracking-tighter pmaxis-brand-text relative inline-block">
              PMAXIS
              {/* Steady Neon Green Beacon Dot above the 'S' */}
              <span className="absolute -top-[5%] -right-[2%] w-[2vw] h-[2vw] max-w-[24px] max-h-[24px] min-w-[8px] min-h-[8px] rounded-full bg-[#00E676] shadow-[0_0_14px_#00E676] pointer-events-none" />
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
