import React, { useEffect, useRef } from 'react';
import { ShoppingBag, HeartPulse, Wrench, Shirt, Tv, BookOpen } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CustomerBuiltFor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.built-for-card'),
      { opacity: 0, scale: 0.95, y: 30 },
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

  const items = [
    { title: 'Grocery Kirana', desc: 'Identify VIP repeat clients automatically and apply monthly credit limits.', icon: ShoppingBag },
    { title: 'Pharmacies', desc: 'Store drug preferences and contact details for regular prescription deliveries.', icon: HeartPulse },
    { title: 'Hardware Stores', desc: 'Oversee building contractor ledger dues, outstanding credit lines, and logs.', icon: Wrench },
    { title: 'Apparel Boutiques', desc: 'Notify regular shoppers about sizing availability and new season arrivals directly.', icon: Shirt },
    { title: 'Electronics Shops', desc: 'Link buyer phone records directly to device IMEI codes and warranty receipts.', icon: Tv },
    { title: 'Stationery Shops', desc: 'Record school and institutional bulk orders with pre-set payment schedules.', icon: BookOpen },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-cyber-yellow text-dark-text py-28 px-6 md:px-12 curved-top-lg curved-bottom-lg border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="built-for-card text-center max-w-2xl mb-16 animate-on-scroll">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-3">
            Tailored Profiles
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            Built for retail checkouts.
          </h2>
          <p className="text-dark-text/80 font-medium text-xs md:text-sm">
            Discover how local retail categories use Billora directory controls to run checkout queues.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="built-for-card bg-dark-bg text-white p-6 rounded-3xl text-left flex flex-col justify-between min-h-[190px] transition-all duration-300 hover:scale-[1.03] group shadow-xl border border-white/5"
              >
                <div className="p-3.5 bg-cyber-yellow/10 text-cyber-yellow rounded-2xl w-max mb-6 group-hover:bg-cyber-yellow group-hover:text-dark-text transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-semibold">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
