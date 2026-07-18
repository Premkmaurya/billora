import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FeatureReportsShowcase: React.FC = () => {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blockRef.current) return;

    gsap.fromTo(
      blockRef.current.querySelectorAll('.dive-reveal'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrollTrigger: {
          trigger: blockRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <div
      ref={blockRef}
      id="reports-dive"
      className="py-32 px-6 md:px-12 bg-cyber-yellow text-dark-text curved-top-lg curved-bottom-lg border-b border-black/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header content */}
        <div className="dive-reveal text-center max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-4">
            Reports & Analytics
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 select-none">
            Know today's profit before closing your store.
          </h2>
          <p className="text-dark-text/80 font-medium text-sm md:text-base mb-8 leading-relaxed">
            Monitor shop sales speed automatically. Tally gross profit margins, trace top-selling products, and let the cloud write daily logs, eliminating manual arithmetic headaches.
          </p>
        </div>

        {/* Wide visual showcase */}
        <div className="dive-reveal w-full max-w-4xl bg-neutral-950 text-white rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl text-left">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Gross Profits Tally</span>
              <h4 className="text-xl font-black text-white mt-1">₹4,28,450.00 Generated</h4>
            </div>
            <span className="px-3 py-1 bg-cyber-yellow/10 text-cyber-yellow border border-cyber-yellow/20 rounded-full font-bold text-[10px] uppercase">
              Live Margin Sync
            </span>
          </div>

          {/* Simple Grid chart representation */}
          <div className="h-32 flex items-end justify-between gap-2 border-b border-white/5 pb-2 pt-6">
            {[35, 50, 45, 60, 80, 70, 95, 85, 110, 120, 100, 130].map((val, idx) => (
              <div
                key={idx}
                className="w-1/12 bg-white/10 hover:bg-cyber-yellow transition-colors duration-300 rounded-t"
                style={{ height: `${(val / 130) * 100}%` }}
              />
            ))}
          </div>

          <div className="flex justify-between text-[8px] text-gray-500 font-bold font-mono mt-2">
            <span>09:00 AM</span>
            <span>01:00 PM</span>
            <span>05:00 PM</span>
            <span>09:00 PM</span>
          </div>
        </div>

      </div>
    </div>
  );
};
