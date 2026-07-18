import React, { useEffect, useRef } from 'react';
import { Box, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FeatureInventoryCustomers: React.FC = () => {
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
      id="inventory-dive"
      className="py-32 px-6 md:px-12 bg-dark-bg text-white border-b border-white/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Split grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          
          {/* Card 1: Inventory */}
          <div className="dive-reveal bg-surface border border-white/10 p-8 rounded-3xl flex flex-col justify-between min-h-[360px] text-left hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6 group-hover:bg-cyber-yellow group-hover:text-dark-text transition-colors duration-300">
                <Box className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-cyber-yellow font-extrabold block mb-2">
                Inventory Control
              </span>
              <h3 className="text-2xl font-black mb-4 select-none">Never run out of stock again.</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold mb-6">
                Auto-sync sales with stock levels. Set custom safety limits and receive system alarms when popular items run low.
              </p>
            </div>

            {/* Micro mock preview */}
            <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between text-[11px] font-bold">
              <div>
                <span className="block text-white">Wheat Flour (10kg)</span>
                <span className="text-[9px] text-gray-400 font-medium mt-0.5 block">Limit: 10 bags</span>
              </div>
              <span className="text-yellow-400 animate-pulse">Low stock (3 left)</span>
            </div>
          </div>

          {/* Card 2: Customer Ledger */}
          <div className="dive-reveal bg-surface border border-white/10 p-8 rounded-3xl flex flex-col justify-between min-h-[360px] text-left hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6 group-hover:bg-cyber-yellow group-hover:text-dark-text transition-colors duration-300">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-cyber-yellow font-extrabold block mb-2">
                Customer Relations
              </span>
              <h3 className="text-2xl font-black mb-4 select-none">Track outstanding ledger credit dues.</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold mb-6">
                Maintain balance history logs and credits profiles for regular clients. Access purchase histories and outstanding balances in seconds.
              </p>
            </div>

            {/* Micro mock preview */}
            <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between text-[11px] font-bold">
              <div>
                <span className="block text-white">Karan Johar</span>
                <span className="text-[9px] text-gray-400 font-medium mt-0.5 block">Last purchase: Yesterday</span>
              </div>
              <span className="text-red-400">₹2,850.00 Outstanding</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
