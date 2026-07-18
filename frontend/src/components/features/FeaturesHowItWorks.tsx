import React, { useEffect, useRef } from 'react';
import { UserPlus, Settings, PlusCircle, CreditCard, Printer, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FeaturesHowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.timeline-node'),
      { opacity: 0, scale: 0.9, y: 25 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const steps = [
    { label: 'Signup', desc: 'Register your mobile number and email in under 10 seconds.', icon: UserPlus },
    { label: 'Setup Business', desc: 'Input your store name, address, and optional GSTIN.', icon: Settings },
    { label: 'Add Products', desc: 'Scan items, import an Excel file, or type catalog lines.', icon: PlusCircle },
    { label: 'Create Bills', desc: 'Click items, enter counts, and let taxes split automatically.', icon: CreditCard },
    { label: 'Print', desc: 'Generate high-speed thermal receipts or send PDF invoices.', icon: Printer },
    { label: 'Done', desc: 'Monitor your dashboard as sales ledger logs update instantly.', icon: CheckCircle },
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
            Onboarding Timeline
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Zero setup overhead.
          </h2>
          <p className="text-gray-400 font-medium text-xs md:text-sm">
            Getting your checkout counter up and running is incredibly fast. Follow these simple steps.
          </p>
        </div>

        {/* Timeline Line & Grid */}
        <div className="relative w-full max-w-5xl">
          {/* Vertical timeline line for desktop */}
          <div className="hidden lg:block absolute left-4 right-4 top-1/2 h-0.5 bg-white/10 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="timeline-node bg-surface border border-white/10 p-6 rounded-2xl flex flex-col justify-between items-start text-left min-h-[220px] hover:border-cyber-yellow/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-cyber-yellow/10 text-cyber-yellow flex items-center justify-center font-bold mb-4 group-hover:bg-cyber-yellow group-hover:text-dark-text transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2">
                      <span className="text-gray-500 font-mono text-[10px] block mb-0.5">STEP 0{idx + 1}</span>
                      {step.label}
                    </h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-semibold">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
