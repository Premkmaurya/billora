import React, { useState, useEffect, useRef } from 'react';
import { CreditCard } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type PayMode = 'cash' | 'card' | 'upi';

export const FeaturePaymentsDemo: React.FC = () => {
  const [activeMode, setActiveMode] = useState<PayMode>('upi');
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
      id="payments-dive"
      className="py-32 px-6 md:px-12 bg-cyber-yellow text-dark-text curved-top-lg curved-bottom-lg border-b border-black/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Text column */}
        <div className="dive-reveal lg:col-span-5 text-left flex flex-col items-start">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-4">
            Payment Terminals
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight select-none">
            Split billing and print UPI payment QR codes instantly.
          </h2>
          <p className="text-dark-text/80 font-medium text-sm md:text-base mb-8 max-w-md leading-relaxed">
            Support cash, card, and digital transactions in parallel. Tally split totals automatically and show dynamic scan QR codes on screens or print receipts directly.
          </p>

          <div className="flex gap-2 p-1 bg-dark-text/5 rounded-xl border border-dark-text/10 mb-8 select-none">
            <button
              onClick={() => setActiveMode('upi')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                activeMode === 'upi' ? 'bg-dark-text text-cyber-yellow' : 'text-dark-text/70 hover:text-dark-text'
              }`}
            >
              UPI QR
            </button>
            <button
              onClick={() => setActiveMode('cash')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                activeMode === 'cash' ? 'bg-dark-text text-cyber-yellow' : 'text-dark-text/70 hover:text-dark-text'
              }`}
            >
              Cash Tally
            </button>
            <button
              onClick={() => setActiveMode('card')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                activeMode === 'card' ? 'bg-dark-text text-cyber-yellow' : 'text-dark-text/70 hover:text-dark-text'
              }`}
            >
              Card POS
            </button>
          </div>

          <div className="px-4 py-2 rounded-xl text-xs font-black border bg-dark-text/5 border-dark-text/10 text-dark-text">
            Result: Reduce checkout errors by automating split calculations.
          </div>
        </div>

        {/* Visual Mockup */}
        <div className="dive-reveal lg:col-span-7 bg-neutral-950 text-white rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden text-left min-h-[340px] flex flex-col justify-between">
          <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
            <span className="text-[10px] text-gray-500 font-mono">Dynamic Checkout API</span>
            <span className="text-[9px] text-cyber-yellow font-bold uppercase">Paymode: {activeMode}</span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {activeMode === 'upi' && (
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-around">
                <div className="w-28 h-28 bg-white rounded p-1 flex items-center justify-center text-black font-bold text-[8px]">
                  [UPI SCAN QR]
                </div>
                <div className="text-center sm:text-left">
                  <span className="text-[9px] text-gray-400 block font-bold uppercase">Dynamic UPI QR</span>
                  <div className="text-2xl font-black text-cyber-yellow font-mono mt-1">₹1,320.00</div>
                  <p className="text-[10px] text-gray-400 mt-2 leading-relaxed font-semibold max-w-[200px]">
                    Auto-generated checkout QR prints directly onto thermal receipts.
                  </p>
                </div>
              </div>
            )}

            {activeMode === 'cash' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Receivable total:</span>
                  <span className="font-mono font-bold text-white">₹1,320.00</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Cash Received:</span>
                  <span className="font-mono font-bold text-cyber-yellow">₹1,500.00</span>
                </div>
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between items-center text-xs font-black">
                  <span>Balance Change:</span>
                  <span className="font-mono text-emerald-400">₹180.00</span>
                </div>
              </div>
            )}

            {activeMode === 'card' && (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <CreditCard className="w-10 h-10 text-cyber-yellow mx-auto mb-2" />
                  <span className="text-xs font-bold block text-white">Swipe Terminal Active</span>
                  <span className="text-[9px] text-gray-400 font-mono mt-0.5 block">Card: **** **** **** 8920</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between items-center text-[10px] text-gray-400 font-bold border-t border-white/5 pt-4">
            <span>Dynamic calculations verified</span>
            <span className="text-emerald-400 font-bold">✓ Payment Settled</span>
          </div>
        </div>

      </div>
    </div>
  );
};
