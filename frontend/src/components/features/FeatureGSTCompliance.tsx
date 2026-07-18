import React, { useEffect, useRef } from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FeatureGSTCompliance: React.FC = () => {
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
      id="gst-dive"
      className="py-32 px-6 md:px-12 bg-dark-bg text-white border-b border-white/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header info */}
        <div className="dive-reveal text-center max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-cyber-yellow block mb-4">
            GST Compliance
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 select-none">
            Generate GST invoices automatically.
          </h2>
          <p className="text-gray-400 font-medium text-sm md:text-base mb-8 leading-relaxed">
            Stop losing hours mapping tax rates or risking audit penalties. Let Billora map standard HSN structures and split rates automatically.
          </p>
        </div>

        {/* Two-Column Comparison */}
        <div className="dive-reveal grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl items-stretch text-left">
          {/* Manual Side */}
          <div className="bg-surface/50 border border-white/10 p-8 rounded-3xl flex flex-col justify-between min-h-[260px] relative overflow-hidden group">
            <div>
              <div className="p-3.5 bg-red-500/10 text-red-400 rounded-2xl w-max mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Old Manual Way</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                Looking up tax brackets, calculating SGST and CGST fractions by hand for every transaction, and risking compliance gaps.
              </p>
            </div>
            <span className="text-[10px] text-red-400 font-bold block mt-6">⚠️ Lost hours & arithmetic errors</span>
          </div>

          {/* Billora Auto Side */}
          <div className="bg-surface/50 border border-cyber-yellow/40 p-8 rounded-3xl flex flex-col justify-between min-h-[260px] relative overflow-hidden group shadow-lg ring-2 ring-cyber-yellow/10">
            <div>
              <div className="p-3.5 bg-cyber-yellow/10 text-cyber-yellow rounded-2xl w-max mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">The Billora Way</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-semibold">
                Billora auto-computes taxes split instantly by product HSN. Export files straight to standard GSTR-1 Excel templates.
              </p>
            </div>
            <span className="text-[10px] text-cyber-yellow font-bold block mt-6">✓ One-click compliance ready</span>
          </div>
        </div>

      </div>
    </div>
  );
};
