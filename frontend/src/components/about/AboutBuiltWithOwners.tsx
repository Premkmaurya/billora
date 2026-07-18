import React, { useEffect, useRef } from 'react';
import { Eye, Search, Keyboard } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutBuiltWithOwners: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.built-reveal'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  const observations = [
    { title: 'Keyboard-First Layout', desc: 'No mouse needed. Cashiers complete sales entirely via physical shortcuts.', icon: Keyboard },
    { title: '1-Click Search Queries', desc: 'Find catalog items immediately by typing short names or code HSN.', icon: Search },
    { title: 'Observed Shop Workflows', desc: 'Designed after studying cash queues at local provisional shops.', icon: Eye },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-dark-bg text-white py-28 px-6 md:px-12 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Mockup Panel */}
        <div className="built-reveal lg:col-span-7 bg-surface/50 border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden text-left min-h-[300px] flex flex-col justify-between">
          <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
            <span className="text-[10px] text-gray-500 font-mono">Biller Workstation</span>
            <span className="text-[9px] text-cyber-yellow font-bold uppercase">Cashier UI Active</span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-xs font-bold text-cyber-yellow flex items-center justify-between">
                <span>⚡ Fast Billing active: keyboard focused</span>
                <span>F8 Print</span>
              </div>
              <div className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-xs font-bold text-gray-300 flex items-center justify-between">
                <span>🌾 Basmati Rice added to active receipt</span>
                <span className="font-mono">₹540.00</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center text-[10px] text-gray-500 font-bold border-t border-white/5 pt-4">
            <span>Observed at grocery checkouts</span>
            <span className="text-cyber-yellow">Zero unnecessary clicks</span>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="built-reveal lg:col-span-5 text-left flex flex-col items-start">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-cyber-yellow block mb-4">
            Designed for Cashiers
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 select-none leading-tight">
            Built with shop owners.
          </h2>
          <p className="text-gray-400 font-medium text-sm md:text-base mb-8 leading-relaxed max-w-md">
            We spent weeks behind retail counters observing cashiers. We realized billing software is usually bloated. That is why we stripped down the clutter to focus on speed.
          </p>

          <ul className="space-y-6">
            {observations.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li key={idx} className="flex items-start gap-4">
                  <div className="p-2.5 bg-cyber-yellow/10 text-cyber-yellow rounded-xl shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-[11px] text-gray-400 font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </div>
  );
};
