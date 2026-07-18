import React, { useEffect, useRef } from 'react';
import { Clock, ShieldCheck, Database, Smartphone, Printer, Settings } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutWhyChoose: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.why-choose-card'),
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

  const outcomes = [
    { title: 'Invoices under 10 seconds', desc: 'Accelerated desk checkouts with hotkeys.', icon: Clock },
    { title: 'Automatic GST splits', desc: 'CGST/SGST tax divisions computed live.', icon: ShieldCheck },
    { title: 'Secure AWS Cloud backup', desc: 'No manual database snapshot exports needed.', icon: Database },
    { title: 'Direct WhatsApp links', desc: 'Deliver PDF receipts to client phone logs.', icon: Smartphone },
    { title: 'Thermal Printer setup', desc: 'Plug & play connection via USB/Bluetooth.', icon: Printer },
    { title: '1-minute Onboarding', desc: 'Setup shop profiles in less than 60s.', icon: Settings },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-cyber-yellow text-dark-text py-28 px-6 md:px-12 curved-top-lg curved-bottom-lg border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="why-choose-card text-center max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-3">
            Outcomes Focus
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            Why businesses choose us.
          </h2>
          <p className="text-dark-text/80 font-medium text-xs md:text-sm">
            Stop focus on product lines features. Focus on store productivity outcomes. Here is what we deliver.
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {outcomes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="why-choose-card bg-dark-bg text-white p-6 rounded-3xl text-left flex flex-col justify-between min-h-[190px] transition-all duration-300 hover:scale-[1.03] group shadow-xl border border-white/5"
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
