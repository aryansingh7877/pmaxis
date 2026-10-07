import React, { useState } from 'react';
import { Home, Layers, Database, Code2, Tag } from 'lucide-react';

export default function RightVerticalNav({ activeItem = 'home', onSelectItem }) {
  const navItems = [
    { id: 'home', label: 'HOME', icon: Home, targetId: 'home' },
    { id: 'data', label: 'DATA', icon: Database, targetId: 'data' },
    { id: 'product', label: 'PRODUCT', icon: Layers, targetId: 'build' },
    { id: 'dev', label: 'DEVELOPERS', icon: Code2, targetId: 'dev' },
    { id: 'price', label: 'PRICING', icon: Tag, targetId: 'price' },
  ];

  const handleClick = (item) => {
    if (onSelectItem) {
      onSelectItem(item.id);
    }
    const targetElement = document.getElementById(item.targetId);
    if (targetElement) {
      if (window.__lenis) {
        window.__lenis.scrollTo(targetElement, { offset: 0, duration: 1.2 });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* ======================================================== */}
      {/* DESKTOP: FLOATING RIGHT-SIDE VERTICAL RAIL (PER MOCKUP)  */}
      {/* ======================================================== */}
      <nav
        aria-label="Primary Navigation Control"
        className="hidden lg:flex flex-col fixed right-5 xl:right-7 top-1/2 -translate-y-1/2 z-50 select-none"
      >
        <div className="w-[74px] xl:w-[78px] bg-white/95 backdrop-blur-md rounded-2xl border border-[#080909]/10 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col divide-y divide-[#080909]/5">
          {navItems.map((item) => {
            const isActive = activeItem === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleClick(item)}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative flex flex-col items-center justify-center py-3.5 px-2 text-center transition-all duration-200 cursor-pointer outline-none ${
                  isActive
                    ? 'bg-white text-[#080909]'
                    : 'bg-transparent text-[#7C807A] hover:text-[#080909] hover:bg-black/[0.02]'
                }`}
              >
                {/* Active Indicator on Left: Clean Green Curve/Notch */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r bg-[#00E676] shadow-[0_0_8px_#00E676]" />
                )}

                {/* Icon */}
                <div
                  className={`mb-1 transition-all ${
                    isActive ? 'text-[#00E676]' : 'text-[#8C908A] group-hover:text-[#080909]'
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>

                {/* Label */}
                <span
                  className={`font-mono text-[8.5px] xl:text-[9px] font-bold tracking-wider leading-none ${
                    isActive ? 'text-[#080909]' : 'text-[#7C807A] group-hover:text-[#080909]'
                  }`}
                >
                  {item.label}
                </span>

                {/* Active indicator micro dot on top-right */}
                {isActive && (
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#00E676]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ======================================================== */}
      {/* MOBILE: FLOATING BOTTOM CONTROL DOCK                     */}
      {/* ======================================================== */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="lg:hidden fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 select-none max-w-[calc(100vw-16px)]"
      >
        <div className="flex items-center bg-white/95 backdrop-blur-md rounded-2xl border border-[#080909]/10 shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-1 divide-x divide-[#080909]/5">
          {navItems.map((item) => {
            const isActive = activeItem === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleClick(item)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex flex-col items-center justify-center min-w-[48px] sm:min-w-[56px] min-h-[44px] px-2 sm:px-3 py-1.5 rounded-xl transition-all ${
                  isActive ? 'bg-[#080909] text-white shadow-sm' : 'text-[#7C807A] hover:text-[#080909]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00E676]' : ''}`} />
                <span className="font-mono text-[7.5px] sm:text-[8px] font-bold tracking-wider mt-0.5 leading-none">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
