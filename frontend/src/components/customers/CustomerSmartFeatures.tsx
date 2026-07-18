import React, { useEffect, useRef } from 'react';
import { Search, FileText, CheckCircle, Bell, UserCheck, BarChart2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CustomerSmartFeatures: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.smart-reveal'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const features = [
    { title: 'Keyboard Lookup Search', desc: 'Query numbers immediately during checkout using shortcuts.', icon: Search, span: 'md:col-span-2' },
    { title: 'Custom Loyalty Notes', desc: 'Add client notes (e.g. credit limit limits, delivery address tags).', icon: FileText, span: 'md:col-span-1' },
    { title: 'GST Number Directory', desc: 'Store corporate client GSTINs once; splits apply automated splits.', icon: CheckCircle, span: 'md:col-span-1' },
    { title: 'Outstanding Due Warnings', desc: 'Flashing alert cues if customer tries to buy on overlimit credit.', icon: Bell, span: 'md:col-span-2' },
    { title: 'Automated Loyalty Tags', desc: 'Add tags (e.g. VIP, Regular, Staff) to classify margin lists.', icon: UserCheck, span: 'md:col-span-2' },
    { title: 'Purchase Margins analytics', desc: 'Observe LTV, order counts, and seasonal volume trends.', icon: BarChart2, span: 'md:col-span-1' },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-dark-bg text-white py-28 px-6 md:px-12 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="smart-reveal text-center max-w-2xl mb-16 animate-on-scroll">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-cyber-yellow block mb-3">
            Utilities
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            Smart directory tools.
          </h2>
          <p className="text-gray-400 font-medium text-xs md:text-sm">
            Everything you need to handle accounts, recover outstanding, and improve store retention.
          </p>
        </div>

        {/* Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`smart-reveal ${item.span} bg-surface/50 border border-white/5 hover:border-white/12 p-6 rounded-3xl flex flex-col justify-between min-h-[190px] transition-all duration-300 hover:scale-[1.01] group shadow-xl`}
              >
                <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-2xl w-max mb-6 group-hover:bg-cyber-yellow group-hover:text-dark-text transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-semibold">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
