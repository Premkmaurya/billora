import React, { useEffect, useRef } from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.story-reveal'),
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

  const legacyPains = [
    'Handwritten carbon-paper billing blocks',
    'Buggy Excel ledger files prone to crash',
    'Sluggish legacy desktop software panels',
    'Arithmetic mistakes during manual GST splits',
  ];

  return (
    <div
      ref={containerRef}
      id="our-story"
      className="relative bg-dark-bg text-white py-28 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Story copy columns */}
        <div className="story-reveal lg:col-span-6 text-left flex flex-col items-start">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-cyber-yellow block mb-4">
            Our Story
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8 leading-tight select-none">
            Why we built Billora.
          </h2>
          
          <div className="space-y-6 text-sm md:text-base text-gray-400 font-semibold leading-relaxed max-w-xl">
            <p>
              Local store owners in India spend hours handling checkout queues and calculating taxes manually. During peak hours, slow desktop POS software or paper invoice ledgers lead to queues and arithmetic mistakes.
            </p>
            <p>
              We believed billing desks shouldn't require complex bookkeeping setups or cause stress. A checkout counter should be fast, simple, and reliable.
            </p>
            <p className="text-white font-extrabold text-base">
              That is why Billora was created—designed to deliver speed and clarity at local checkouts.
            </p>
          </div>
        </div>

        {/* Side Story visual panel */}
        <div className="story-reveal lg:col-span-6 bg-surface/50 border border-white/5 p-8 rounded-3xl text-left relative overflow-hidden group shadow-xl">
          <h3 className="text-sm font-bold mb-6 text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-cyber-yellow animate-pulse" /> Legacy Billing Friction
          </h3>

          <ul className="space-y-4">
            {legacyPains.map((pain, idx) => (
              <li key={idx} className="flex items-start gap-3.5 text-xs font-semibold text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/30 border border-red-500/60 mt-1 shrink-0" />
                <span>{pain}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-white/5 text-xs text-cyber-yellow font-bold flex items-center gap-1.5">
            <span>Billing shouldn't take more than 10 seconds</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

      </div>
    </div>
  );
};
