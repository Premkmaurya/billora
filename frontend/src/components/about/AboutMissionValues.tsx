import React, { useEffect, useRef } from 'react';
import { Target, Eye, Zap, Heart, Shield, Users, RefreshCw } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutMissionValues: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.val-reveal'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
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

  const values = [
    { title: 'Speed', desc: 'Every second matters at the billing counter.', icon: Zap },
    { title: 'Simplicity', desc: 'Software should be easy enough for anyone to learn.', icon: Heart },
    { title: 'Reliability', desc: 'Your business data should always be safe.', icon: Shield },
    { title: 'Customer First', desc: 'We build features from real customer feedback.', icon: Users },
    { title: 'Weekly Updates', desc: 'Small improvements every week create a better product.', icon: RefreshCw },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-cyber-yellow text-dark-text py-28 px-6 md:px-12 curved-top-lg curved-bottom-lg border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Mission & Vision Row */}
        <div className="val-reveal grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-24 text-left">
          {/* Mission */}
          <div className="bg-dark-bg text-white p-8 rounded-3xl border border-white/5 flex flex-col justify-between min-h-[220px] hover:scale-[1.02] transition-transform shadow-2xl relative overflow-hidden group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-cyber-yellow font-extrabold block mb-2">
                Our Mission
              </span>
              <h3 className="text-xl md:text-2xl font-black max-w-sm">
                Make billing effortless for every local business.
              </h3>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-dark-bg text-white p-8 rounded-3xl border border-white/5 flex flex-col justify-between min-h-[220px] hover:scale-[1.02] transition-transform shadow-2xl relative overflow-hidden group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-cyber-yellow font-extrabold block mb-2">
                Our Vision
              </span>
              <h3 className="text-xl md:text-2xl font-black max-w-sm">
                Become the most trusted billing platform for local businesses.
              </h3>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="w-full max-w-6xl">
          <div className="val-reveal text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-3">
              Principles
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 select-none">
              Our core values.
            </h2>
            <p className="text-dark-text/80 font-medium text-xs md:text-sm">
              We design every panel and write every line of code guided by these basic retail operating guidelines.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full text-left">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="val-reveal bg-dark-bg text-white p-6 rounded-3xl flex flex-col justify-between min-h-[200px] hover:scale-[1.03] transition-transform duration-300 border border-white/5 shadow-xl group"
                >
                  <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-2xl w-max mb-6 group-hover:bg-cyber-yellow group-hover:text-dark-text transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">{val.title}</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-semibold">{val.desc}</p>
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
