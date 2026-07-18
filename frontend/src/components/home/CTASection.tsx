import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const CTASection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.cta-anim'),
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
      id="trial"
      className="relative bg-cyber-yellow text-dark-text py-32 px-6 md:px-12 flex flex-col items-center overflow-hidden curved-bottom-lg"
    >
      {/* Background visual circles */}
      <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-yellow-300 opacity-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-yellow-400 opacity-60 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        <span className="cta-anim text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-6">
          Get Started Today
        </span>

        <h2 className="cta-anim text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
          Start billing professionally today.
        </h2>

        <p className="cta-anim text-lg md:text-xl text-dark-text/80 font-medium max-w-xl mb-10 leading-relaxed">
          Create your first invoice in under three minutes. Zero setup friction. No credit card required.
        </p>

        <div className="cta-anim flex flex-col sm:flex-row gap-4 w-full sm:w-auto font-bold">
          <Link
            to="/signup"
            className="px-8 py-4 bg-dark-text text-cyber-yellow rounded-full hover:scale-[1.03] active:scale-[0.98] transition-transform shadow-lg text-center flex items-center justify-center gap-1.5 group text-sm"
          >
            Start Free
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <a
            href="#demo"
            className="px-8 py-4 bg-transparent border-2 border-dark-text/25 text-dark-text rounded-full hover:bg-dark-text/5 hover:border-dark-text/40 transition-all text-center flex items-center justify-center gap-2 text-sm"
          >
            <MessageSquare className="w-4 h-4" />
            Book Demo
          </a>
        </div>

        {/* Small Trust detail below buttons */}
        <div className="cta-anim mt-8 flex items-center gap-6 text-xs font-semibold text-dark-text/60">
          <span>✓ Instant Activation</span>
          <span>✓ Cancel Anytime</span>
          <span>✓ No CC Required</span>
        </div>
      </div>
    </div>
  );
};
