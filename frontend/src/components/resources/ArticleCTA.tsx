import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const ArticleCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.cta-reveal'),
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

  return (
    <div
      ref={containerRef}
      id="article-cta"
      className="relative bg-cyber-yellow text-dark-text py-32 px-6 md:px-12 flex flex-col items-center overflow-hidden curved-bottom-lg"
    >
      <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-yellow-300 opacity-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-yellow-400 opacity-60 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        <span className="cta-reveal text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-6 animate-on-scroll">
          Get Started
        </span>

        <h2 className="cta-reveal text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1] select-none">
          Ready to simplify billing?
        </h2>

        <p className="cta-reveal text-lg md:text-xl text-dark-text/80 font-medium max-w-xl mb-10 leading-relaxed">
          Try Billora free today. Setup shop profiles and create invoices in under 10 seconds.
        </p>

        <div className="cta-reveal flex flex-col sm:flex-row gap-4 w-full sm:w-auto font-bold text-sm">
          <Link
            to="/signup"
            className="px-8 py-4 bg-dark-text text-cyber-yellow rounded-full hover:scale-[1.03] active:scale-[0.98] transition-transform shadow-lg text-center flex items-center justify-center gap-1.5 group"
          >
            Start Free
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <a
            href="#demo"
            className="px-8 py-4 bg-transparent border-2 border-dark-text/25 text-dark-text rounded-full hover:bg-dark-text/5 hover:border-dark-text/40 transition-all text-center flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Book Demo
          </a>
        </div>
      </div>
    </div>
  );
};
