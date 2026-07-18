import React, { useEffect, useRef } from 'react';
import { Lightbulb, Laptop, Users, Target, Rocket, Milestone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.journey-node'),
      { opacity: 0, scale: 0.95, y: 25 },
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

  const milestones = [
    { year: '2025', title: 'The Idea', desc: 'Realized retail checkout lines were slow during a provision shop visit.', icon: Lightbulb },
    { year: '2025', title: 'Prototype', desc: 'Built the first keyboard-only offline billing terminal engine.', icon: Laptop },
    { year: '2025', title: 'First Customer', desc: 'Deployed at a local kirana grocers store in Delhi.', icon: Users },
    { year: '2026', title: '100 Shops', desc: 'Expanded locally based on direct cashier feedback.', icon: Target },
    { year: '2026', title: '1,000+ Counters', desc: 'Transitioned to Singapore AWS primary database servers.', icon: Rocket },
    { year: 'Future', title: 'Our Vision', desc: 'Supporting checkouts across India with zero friction.', icon: Milestone },
  ];

  return (
    <div
      ref={containerRef}
      id="journey"
      className="relative bg-dark-bg text-white py-28 px-6 md:px-12 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="journey-node text-center max-w-2xl mb-20 animate-on-scroll">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-cyber-yellow block mb-3">
            Milestones
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            The journey so far.
          </h2>
          <p className="text-gray-400 font-medium text-xs md:text-sm">
            How we went from watching slow lines to building the fastest offline billing workstation in India.
          </p>
        </div>

        {/* Milestone Cards Grid */}
        <div className="relative w-full max-w-5xl">
          <div className="hidden lg:block absolute left-6 right-6 top-1/2 h-0.5 bg-white/10 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {milestones.map((node, idx) => {
              const Icon = node.icon;
              return (
                <div
                  key={idx}
                  className="journey-node bg-surface border border-white/10 p-6 rounded-2xl flex flex-col justify-between items-start text-left min-h-[220px] hover:border-cyber-yellow/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-cyber-yellow/10 text-cyber-yellow flex items-center justify-center font-bold mb-4 group-hover:bg-cyber-yellow group-hover:text-dark-text transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2">
                      <span className="text-cyber-yellow font-mono text-[9px] block mb-0.5">{node.year}</span>
                      {node.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-semibold">{node.desc}</p>
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
