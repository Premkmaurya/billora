import React, { useEffect, useRef } from 'react';
import { ShoppingCart, HeartPulse, Hammer, Smartphone, Shirt, Utensils, Scissors } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BuiltFor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.built-card'),
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const niches = [
    { name: 'Grocery Shops', desc: 'Fast checkout by barcode scanning. Instant quantity splits.', icon: ShoppingCart },
    { name: 'Medical Stores', desc: 'Auto-track batch numbers and expiry limits on medical stock.', icon: HeartPulse },
    { name: 'Hardware Stores', desc: 'Manage varied sizes, bulk pricing sheets, and custom receipts.', icon: Hammer },
    { name: 'Mobile Shops', desc: 'Verify IMEI details and serialized inventory stock lists.', icon: Smartphone },
    { name: 'Garment Stores', desc: 'Separate billing catalog by size, color and apparel variants.', icon: Shirt },
    { name: 'Restaurants', desc: 'Table-based order slips, custom service charges, and GST.', icon: Utensils },
    { name: 'Services & Cafes', desc: 'Bill client tasks, hourly reservations, and custom menu lists.', icon: Scissors },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-dark-bg text-white py-28 px-6 md:px-12 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-2xl mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-cyber-yellow block mb-3">
            Niches
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            Tailored for your business.
          </h2>
          <p className="text-gray-400 font-medium text-sm md:text-base">
            No generic interfaces. Billora adapts its invoice templates and shortcuts to fit your industry perfectly.
          </p>
        </div>

        {/* Niches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl">
          {niches.map((niche, idx) => {
            const Icon = niche.icon;
            return (
              <div
                key={idx}
                className="built-card bg-surface/50 border border-white/5 hover:border-white/15 p-6 rounded-3xl text-left flex flex-col justify-between min-h-[190px] transition-all duration-300 hover:scale-[1.03] group shadow-xl"
              >
                <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-2xl w-max mb-6 group-hover:bg-cyber-yellow group-hover:text-dark-text transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{niche.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-semibold">{niche.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
