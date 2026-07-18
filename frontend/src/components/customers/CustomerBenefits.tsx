import React, { useEffect, useRef } from 'react';
import { Award, ShieldAlert, History, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CustomerBenefits: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.bene-card'),
      { opacity: 0, scale: 0.96, y: 25 },
      {
        opacity: 1,
        scale: 1,
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

  const outcomes = [
    { title: 'Never forget a loyal customer.', desc: 'Track customer lifetime value, store preferences, and apply automated VIP discounts.', icon: Award, size: 'md:col-span-2' },
    { title: 'Know who owes you money.', desc: 'Keep a clean digital ledger of unpaid credit balances. Monitor timelines and outstanding tags.', icon: ShieldAlert, size: 'md:col-span-1' },
    { title: 'Find purchase history instantly.', desc: 'Search customer history logs by phone number. Answer item disputes in under 5 seconds.', icon: History, size: 'md:col-span-1' },
    { title: 'Serve repeat customers faster.', desc: 'Load active customer cards automatically during checkouts. Skip re-typing phone logs.', icon: Clock, size: 'md:col-span-2' },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-dark-bg text-white py-28 px-6 md:px-12 border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="bene-card text-center max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-cyber-yellow block mb-3">
            Outcomes Focus
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            Why customer profiles matter.
          </h2>
          <p className="text-gray-400 font-medium text-xs md:text-sm">
            Stop losing shop transaction ledger lines. Track details, build trust, and recover outstanding dues faster.
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left">
          {outcomes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`bene-card ${item.size} bg-surface/50 border border-white/5 hover:border-white/12 p-8 rounded-3xl flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:scale-[1.01] group shadow-xl`}
              >
                <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-2xl w-max mb-6 group-hover:bg-cyber-yellow group-hover:text-dark-text transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
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
