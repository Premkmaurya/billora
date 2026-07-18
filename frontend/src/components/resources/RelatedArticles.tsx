import React, { useEffect, useRef } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const RelatedArticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.rel-card'),
      { opacity: 0, scale: 0.96, y: 25 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  const articles = [
    {
      category: 'GST Compliance',
      readTime: '8 Min Read',
      title: 'Simplifying GST tax splits for grocery retail.',
      desc: 'How CGST and SGST rules map to packs and loose grains catalog inventory.',
      link: '/resources/simplifying-gst-splits',
    },
    {
      category: 'Inventory Controls',
      readTime: '6 Min Read',
      title: 'Managing critical safety drug ex-dates limits.',
      desc: 'Set dynamic alert warnings on pharmaceuticals batch logs before stocks expire.',
      link: '/resources/managing-drug-expiry',
    },
    {
      category: 'Billing tips',
      readTime: '5 Min Read',
      title: 'Accelerating retail queues checkouts.',
      desc: 'Actionable hotkeys setup guides to trim billing times under 10 seconds.',
      link: '/resources/accelerating-checkout-queues',
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-dark-bg text-white py-28 px-6 md:px-12 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="rel-card text-center max-w-2xl mb-16 select-none">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-cyber-yellow block mb-3">
            Read Next
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Related articles.
          </h2>
          <p className="text-gray-400 font-medium text-xs md:text-sm">
            Continue learning about compliance rules, cash checkouts, and inventory controls.
          </p>
        </div>

        {/* 3 columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left">
          {articles.map((art, idx) => (
            <div
              key={idx}
              className="rel-card bg-surface/50 border border-white/5 hover:border-white/12 p-6 rounded-3xl flex flex-col justify-between min-h-[240px] transition-all duration-300 hover:scale-[1.02] group shadow-xl"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-4 select-none">
                  <span className="text-cyber-yellow">{art.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {art.readTime}</span>
                </div>
                
                <h3 className="text-base font-bold text-white mb-2 leading-tight group-hover:text-cyber-yellow transition-colors duration-200">
                  {art.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-semibold">{art.desc}</p>
              </div>

              {/* Link CTA */}
              <Link
                to={art.link}
                className="mt-6 text-xs text-cyber-yellow font-bold flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-300"
              >
                Read Article
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
