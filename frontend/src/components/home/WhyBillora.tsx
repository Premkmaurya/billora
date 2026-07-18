import React, { useEffect, useRef } from 'react';
import { Clock, Zap, AlertOctagon, HelpCircle, Send, WifiOff } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const WhyBillora: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.why-card'),
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
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

  const outcomes = [
    { title: 'Save 3 Hours Every Day', desc: 'No more manual calculations or writing receipts. Save hours of staff work every single day.', icon: Clock },
    { title: 'Create Bills in 10 Seconds', desc: 'Tap high-speed hotkeys, scan barcodes, and print thermal receipt papers at checkout speeds.', icon: Zap },
    { title: 'Reduce Billing Mistakes', desc: 'Automate CGST/SGST splits and inventory deductions. Stop losing money to manual register arithmetic.', icon: AlertOctagon },
    { title: 'Automatic GST splits', desc: 'Instantly splits CGST, SGST, and IGST details. GSTR spreadsheets are compiled and ready to export.', icon: HelpCircle },
    { title: 'WhatsApp Instantly', desc: 'Auto-share PDF invoice links directly to client phone numbers. Avoid paper wastage cost.', icon: Send },
    { title: 'Works Offline', desc: 'Wifi drops out? The counter never stops. Save receipts locally and sync to cloud backups when online.', icon: WifiOff },
  ];

  return (
    <div
      ref={containerRef}
      id="why-billora"
      className="relative bg-cyber-yellow text-dark-text py-28 px-6 md:px-12 curved-top-lg curved-bottom-lg"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-3">
            Outcomes
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            Designed to grow your store.
          </h2>
          <p className="text-dark-text/80 font-medium text-sm md:text-base">
            Stop focus on technology. Focus on business outcomes. Here is how Billora saves time and boosts retail margins.
          </p>
        </div>

        {/* Outcomes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {outcomes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="why-card bg-dark-bg text-white p-6 rounded-2xl flex flex-col justify-between items-start text-left hover:scale-[1.03] transition-all duration-300 min-h-[200px] border border-white/5 shadow-xl group"
              >
                <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl mb-4 group-hover:bg-cyber-yellow group-hover:text-dark-text transition-colors duration-300">
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
