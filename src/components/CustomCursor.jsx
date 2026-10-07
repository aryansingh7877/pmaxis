import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });

  useEffect(() => {
    // Only desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animId;
    const render = () => {
      const pos = posRef.current;
      pos.x += (pos.targetX - pos.x) * 0.25;
      pos.y += (pos.targetY - pos.y) * 0.25;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="hidden lg:block fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      {/* Exact replica of uploaded reference: black circular core with neon green blur halo */}
      <div className="relative flex items-center justify-center">
        {/* Outer vibrant green blur halo */}
        <div className="absolute w-6 h-6 rounded-full bg-[#00E676] blur-[6px] opacity-85 animate-pulse" />
        <div className="absolute w-4 h-4 rounded-full bg-[#00E676] blur-[2px] opacity-90" />
        {/* Solid black core dot */}
        <div className="relative w-2.5 h-2.5 rounded-full bg-[#080909] border border-[#00E676]/60 shadow-[0_0_8px_#00E676]" />
      </div>
    </div>
  );
}
