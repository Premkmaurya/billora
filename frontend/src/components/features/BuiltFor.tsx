import React, { useEffect, useRef } from 'react';
import { ShoppingBag, HeartPulse, Wrench, Tv, Shirt, BookOpen, Coffee, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BuiltFor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.niche-card'),
      { opacity: 0, scale: 0.97, y: 25 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-cyber-yellow text-dark-text py-28 px-6 md:px-12 curved-top-lg curved-bottom-lg"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-3">
            Niche Solutions
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            Built for local retail counters.
          </h2>
          <p className="text-dark-text/80 font-medium text-xs md:text-sm">
            Whether you run a corner grocery store or an apparel boutique, Billora adapts to your industry billing workflow.
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl text-left">
          
          {/* Card 1: Wide (Grocery) */}
          <div className="niche-card md:col-span-2 bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[260px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Grocery & Provisions</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold max-w-md">
                Speed up billing using handheld barcode guns. Dedect inventory counts and split CGST/SGST tax heads automatically without checking manual sheets.
              </p>
            </div>
            
            <div className="mt-6 flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-mono text-gray-300 w-max">
              <span>Barcode Active</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Card 2: Tall (Medical) */}
          <div className="niche-card md:row-span-2 bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[340px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pharmacies & Medicos</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                Track pharmaceutical details easily. Maintain drug batches registers, monitor drug safety limits, and configure expiry date alerts automatically.
              </p>
            </div>

            <div className="mt-8 bg-surface border border-white/10 p-4 rounded-2xl text-xs space-y-1.5 font-bold">
              <span className="text-[10px] text-gray-500 block">Expiries Tracker</span>
              <div className="flex justify-between">
                <span>Batch B-982</span>
                <span className="text-yellow-400">Exp: 30 days</span>
              </div>
            </div>
          </div>

          {/* Card 3: Compact (Hardware) */}
          <div className="niche-card bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[240px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Hardware Stores</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                Manage custom dimensions, bulk unit rates, and client credit ledgers.
              </p>
            </div>
          </div>

          {/* Card 4: Compact (Electronics) */}
          <div className="niche-card bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[240px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <Tv className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Electronics Shops</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                Track IMEI codes, document serial numbers, and print digital receipts.
              </p>
            </div>
          </div>

          {/* Card 5: Wide (Garments) */}
          <div className="niche-card md:col-span-2 bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[260px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <Shirt className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Apparel & Boutiques</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold max-w-md">
                Organize catalog lists by sizing variants, color profiles, and category types. Send invoice receipt links directly to customer WhatsApp, cutting down paperwork cost.
              </p>
            </div>

            <div className="mt-6 flex gap-2 flex-wrap text-[9px] font-bold">
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded">Size: M</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded">Size: L</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded">Size: XL</span>
            </div>
          </div>

          {/* Card 6: Compact (Stationery) */}
          <div className="niche-card bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[240px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Stationery Stores</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                Manage wholesale/retail prices and import large inventory items sheets.
              </p>
            </div>
          </div>

          {/* Card 7: Compact (Cafes) */}
          <div className="niche-card bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[240px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Cafes & Bakeries</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                Tally table orders, apply custom service rates, and generate UPI QR payments.
              </p>
            </div>
          </div>

          {/* Card 8: Compact (Services) */}
          <div className="niche-card bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[240px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Service Providers</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                Invoice hourly work, configure custom GST brackets, and export tax summaries.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
