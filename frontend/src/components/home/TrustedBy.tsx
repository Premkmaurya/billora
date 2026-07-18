import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TrustedBy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.animate-on-scroll'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  const stats = [
    { num: '15,000+', label: 'Active Shops', desc: 'Indian retail counters billing daily.' },
    { num: '1.2M+', label: 'Invoices Created', desc: 'GST and non-GST invoices generated.' },
    { num: '4.9★', label: 'Average Rating', desc: 'Customer reviews across tech portals.' },
  ];

  const logos = [
    { name: 'Kirana Junction', icon: '🏪' },
    { name: 'Relief Medicos', icon: '💊' },
    { name: 'Gents Hub Tailoring', icon: '👗' },
    { name: 'Spicy Palace Cafe', icon: '🍔' },
    { name: 'Shiva Hardware', icon: '🛠️' },
    { name: 'Pencil & Pen Stores', icon: '✏️' },
  ];

  return (
    <div
      ref={containerRef}
      id="about"
      className="relative bg-dark-bg text-white py-24 px-6 md:px-12 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Badges Row */}
        <div className="animate-on-scroll flex flex-wrap justify-center gap-6 md:gap-12 mb-16 text-center select-none">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold">
            <span className="text-cyber-yellow font-black">Google</span>
            <div className="flex text-cyber-yellow">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-gray-300">4.9★</span>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold">
            <span className="text-rose-500 font-black">G2</span>
            <span className="text-gray-300">Leader 2026</span>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold">
            <span className="text-sky-400 font-black">Capterra</span>
            <span className="text-gray-300">Best Value App</span>
          </div>
        </div>

        {/* Stats Grid Counters */}
        <div className="animate-on-scroll grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-surface/50 border border-white/10 p-8 rounded-3xl text-center flex flex-col justify-between hover:border-white/20 transition-colors duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-cyber-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div>
                <div className="text-5xl md:text-6xl font-black text-cyber-yellow mb-2 font-mono">
                  {stat.num}
                </div>
                <div className="text-sm font-bold text-white mb-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
              <p className="text-xs text-gray-400 font-medium leading-relaxed mt-4">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Logo Marquee */}
        <div className="animate-on-scroll w-full overflow-hidden relative py-6 select-none">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />

          <div className="flex gap-8 w-max animate-marquee whitespace-nowrap">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-surface border border-white/5 px-6 py-4 rounded-2xl hover:border-white/15 transition-colors duration-300"
              >
                <span className="text-2xl">{logo.icon}</span>
                <span className="text-sm font-semibold tracking-wide text-gray-300">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
