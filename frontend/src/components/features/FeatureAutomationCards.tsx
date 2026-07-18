import React, { useEffect, useRef } from 'react';
import { Lock, Cloud, MessageSquare } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FeatureAutomationCards: React.FC = () => {
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

  const items = [
    {
      title: 'Staff Role Control',
      desc: 'Limit billing access levels. Assign distinct cash drawer privileges for operators and accountants.',
      icon: Lock,
    },
    {
      title: 'Cloud Synchronization',
      desc: 'No manual file exporting. Daily transactions auto-backed to Singapore AWS nodes securely.',
      icon: Cloud,
    },
    {
      title: 'WhatsApp Automation',
      desc: 'Delivering PDF links directly to client chat screens. Save printing paper roll costs.',
      icon: MessageSquare,
    },
  ];

  return (
    <div
      ref={blockRef}
      id="automation-dive"
      className="py-32 px-6 md:px-12 bg-dark-bg text-white border-b border-white/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="dive-reveal text-center max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-cyber-yellow block mb-4">
            Business Tools
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 select-none">
            Configure secure employee desks with zero setup overhead.
          </h2>
          <p className="text-gray-400 font-medium text-sm md:text-base mb-8 leading-relaxed">
            Create profiles, grant permissions, and sit back. Billora takes care of daily cash accounts and backups securely in the background.
          </p>
        </div>

        {/* 3 cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="dive-reveal bg-surface/50 border border-white/5 hover:border-white/15 p-6 rounded-3xl text-left flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:scale-[1.03] group shadow-xl"
              >
                <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-2xl w-max mb-6 group-hover:bg-cyber-yellow group-hover:text-dark-text transition-colors duration-300">
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
