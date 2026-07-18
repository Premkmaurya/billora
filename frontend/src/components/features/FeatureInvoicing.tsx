import React, { useEffect, useRef } from 'react';
import { Check, Keyboard, Printer } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FeatureInvoicing: React.FC = () => {
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

  const points = [
    'Fast keyboard-only invoicing shortcuts',
    'Integrated barcode scanner connectivity',
    'Native USB & Bluetooth thermal printing',
  ];

  return (
    <div
      ref={blockRef}
      id="billing-dive"
      className="py-32 px-6 md:px-12 bg-cyber-yellow text-dark-text curved-top-lg curved-bottom-lg border-b border-black/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Text */}
        <div className="dive-reveal lg:col-span-5 text-left flex flex-col items-start">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-4">
            Billing & Invoicing
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight select-none">
            Create invoices in under 10 seconds.
          </h2>
          <p className="text-dark-text/80 font-medium text-sm md:text-base mb-8 max-w-md leading-relaxed">
            Eliminate checkout lines during rush hours. Tap fast hotkeys, query barcode codes instantly, and let the system print receipt bills immediately.
          </p>

          <ul className="space-y-4 mb-8">
            {points.map((pt, idx) => (
              <li key={idx} className="flex items-center gap-3 text-xs md:text-sm font-bold">
                <Check className="w-5 h-5 text-dark-text shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <div className="px-4 py-2 rounded-xl text-xs font-black border bg-dark-text/5 border-dark-text/10 text-dark-text">
            Result: Save 2.5 hours of manual checkout work every day.
          </div>
        </div>

        {/* Visual Mockup */}
        <div className="dive-reveal lg:col-span-7 bg-neutral-950 text-white rounded-3xl border border-white/10 p-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
            <span className="text-[10px] text-gray-500 font-mono">Invoice Arena</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[9px] text-emerald-400 font-bold uppercase">POS Mode</span>
            </div>
          </div>

          <div className="space-y-3 text-left">
            <div className="grid grid-cols-12 text-[9px] uppercase tracking-wider font-bold text-gray-500 border-b border-white/5 pb-2">
              <span className="col-span-6">Item</span>
              <span className="col-span-2 text-right">Qty</span>
              <span className="col-span-4 text-right">Total Price</span>
            </div>
            
            <div className="grid grid-cols-12 text-xs font-semibold py-1 border-b border-white/5">
              <span className="col-span-6">Basmati Rice (Gold) 5kg</span>
              <span className="col-span-2 text-right text-cyber-yellow">x2</span>
              <span className="col-span-4 text-right font-mono">₹1,080.00</span>
            </div>

            <div className="grid grid-cols-12 text-xs font-semibold py-1 border-b border-white/5">
              <span className="col-span-6">Mustard Oil 1L Pack</span>
              <span className="col-span-2 text-right text-cyber-yellow">x1</span>
              <span className="col-span-4 text-right font-mono">₹240.00</span>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center text-[10px] text-gray-400 font-bold">
            <span className="flex items-center gap-1"><Keyboard className="w-3.5 h-3.5" /> [F8] Save & Print</span>
            <span className="text-cyber-yellow flex items-center gap-1"><Printer className="w-3.5 h-3.5" /> ESC/POS Connected</span>
          </div>
        </div>

      </div>
    </div>
  );
};
