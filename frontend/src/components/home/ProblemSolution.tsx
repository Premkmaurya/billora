import React, { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, XCircle, Zap, ShieldAlert, FileSpreadsheet, FileText, Smartphone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProblemSolution: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.comparison-row'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const comparisons = [
    {
      pain: 'Slow Billing Lines',
      painDesc: 'Long queues during peak hours due to laggy legacy systems.',
      painIcon: XCircle,
      gain: '10-Second Checkout',
      gainDesc: 'Scan, hit enter, and print. Complete checkouts at POS speed.',
      gainIcon: Zap,
    },
    {
      pain: 'Manual GST Calculations',
      painDesc: 'Wasting minutes splitting CGST/SGST by hand on every item.',
      painIcon: ShieldAlert,
      gain: 'Automatic Tax Splits',
      gainDesc: 'HSN mapping and tax divisions computed automatically.',
      gainIcon: CheckCircle2,
    },
    {
      pain: 'Excel Ledger Crashes',
      painDesc: 'Losing daily sale sheets due to sudden system crashes.',
      painIcon: FileSpreadsheet,
      gain: 'Offline-First Cloud Sync',
      gainDesc: 'No internet connection needed. Save locally, auto-sync when online.',
      gainIcon: TrendingUp,
    },
    {
      pain: 'Paper receipts cost',
      painDesc: 'Spending thousands of rupees on printing paper rolls.',
      painIcon: FileText,
      gain: 'WhatsApp Invoice links',
      gainDesc: 'Deliver official billing links directly to customer WhatsApp.',
      gainIcon: Smartphone,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-dark-bg text-white py-28 px-6 md:px-12 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-2xl mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-cyber-yellow block mb-3">
            Comparison
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            Stop dealing with legacy friction.
          </h2>
          <p className="text-gray-400 font-medium text-sm md:text-base">
            See how upgrading to Billora simplifies checkout operations compared to legacy desktop setups.
          </p>
        </div>

        {/* Storytelling Rows */}
        <div className="w-full max-w-4xl space-y-6">
          {comparisons.map((row, idx) => {
            const PainIcon = row.painIcon;
            const GainIcon = row.gainIcon;
            return (
              <div
                key={idx}
                className="comparison-row grid grid-cols-1 md:grid-cols-11 gap-4 items-center bg-surface/40 border border-white/5 hover:border-white/10 p-6 md:p-8 rounded-3xl transition-all duration-300"
              >
                {/* Left Pain Block */}
                <div className="md:col-span-5 flex items-start gap-4 text-left">
                  <div className="p-3 bg-red-500/10 text-red-400 rounded-2xl shrink-0 mt-0.5">
                    <PainIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-300 mb-1">{row.pain}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-semibold">{row.painDesc}</p>
                  </div>
                </div>

                {/* Arrow Connector */}
                <div className="md:col-span-1 flex justify-center py-2 md:py-0 select-none">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyber-yellow animate-pulse">
                    <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0" />
                  </div>
                </div>

                {/* Right Gain Block */}
                <div className="md:col-span-5 flex items-start gap-4 text-left">
                  <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-2xl shrink-0 mt-0.5">
                    <GainIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">{row.gain}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-semibold">{row.gainDesc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
