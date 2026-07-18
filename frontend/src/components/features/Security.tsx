import React, { useEffect, useRef } from 'react';
import { Shield, Cloud, Lock, Key, Database, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Security: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.sec-reveal'),
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

  const trustSpecs = [
    { title: 'Cloud Backups', desc: 'Secure Singapore AWS snapshot nodes.', icon: Cloud },
    { title: 'Encrypted Storage', desc: 'Bank-grade AES 256-bit database encryption.', icon: Lock },
    { title: 'Role Permissions', desc: 'Hide metrics panels from billing desk operators.', icon: Key },
    { title: 'Daily Checkpoints', desc: 'Auto-create snapshots so records are never lost.', icon: Database },
    { title: '99.9% Uptime SLA', desc: 'Guaranteed checkout availability offline or online.', icon: Zap },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-cyber-yellow text-dark-text py-28 px-6 md:px-12 curved-top-lg curved-bottom-lg overflow-hidden"
    >
      <div className="absolute right-[-10%] top-[-10%] w-[60vw] h-[60vw] rounded-full bg-yellow-300 opacity-60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Column: Rotating Shield Graphic */}
        <div className="sec-reveal lg:col-span-5 flex justify-center relative select-none">
          <div className="relative w-72 h-72 rounded-full border-2 border-dark-text/5 flex items-center justify-center">
            {/* Spinning Outer Ring */}
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-dark-text/20 animate-spin" style={{ animationDuration: '30s' }} />
            {/* Spinning Inner Ring */}
            <div className="absolute inset-8 rounded-full border-2 border-dotted border-dark-text/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
            
            {/* Central Shield Card */}
            <div className="w-40 h-40 bg-dark-bg text-cyber-yellow rounded-full border-4 border-cyber-yellow flex items-center justify-center shadow-2xl relative z-10 hover:scale-105 transition-transform duration-300">
              <Shield className="w-16 h-16 fill-current animate-pulse" />
            </div>
          </div>
        </div>

        {/* Right Column: Copy & Trust Badges */}
        <div className="sec-reveal lg:col-span-7 text-left flex flex-col items-start">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-4">
            Security & Trust
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 select-none">
            Bank-grade billing security.
          </h2>
          <p className="text-dark-text/80 font-medium text-sm md:text-base mb-8 max-w-xl leading-relaxed">
            Protect your shop records from sudden hard drive failures, electricity outages, or unauthorized staff entries. Billora keeps your registers locked and synced.
          </p>

          {/* Pillars List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {trustSpecs.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-dark-bg/5 border border-dark-text/10 p-4 rounded-2xl hover:bg-dark-text/10 transition-colors duration-300"
                >
                  <div className="p-2 bg-dark-text text-cyber-yellow rounded-xl shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-dark-text">{spec.title}</h4>
                    <p className="text-[11px] text-dark-text/70 font-semibold leading-relaxed mt-0.5">{spec.desc}</p>
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
