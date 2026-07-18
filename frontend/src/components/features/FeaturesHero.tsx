import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

export const FeaturesHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Split text animation for title
    const title = titleRef.current;
    if (title) {
      const text = title.innerText;
      const words = text.split(' ');
      title.innerHTML = words
        .map(
          (word) =>
            `<span class="gsap-reveal-word overflow-hidden inline-flex" style="margin-right: 0.23em;"><span class="gsap-reveal-char inline-block translate-y-[105%]">${word}</span></span>`
        )
        .join(' ');

      gsap.to(title.querySelectorAll('.gsap-reveal-char'), {
        y: '0%',
        duration: 0.8,
        stagger: 0.04,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        delay: 0.1,
      });
    }

    // Fade-in items
    gsap.fromTo(
      '.feat-hero-fade',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        delay: 0.5,
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[70vh] bg-cyber-yellow text-dark-text pt-40 pb-28 px-6 md:px-12 flex flex-col justify-center overflow-hidden curved-bottom-lg"
    >
      {/* Background blobs */}
      <div className="absolute right-[-10%] top-[-10%] w-[65vw] h-[65vw] rounded-full bg-yellow-300 opacity-60 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Tagline */}
        <div className="feat-hero-fade inline-flex items-center gap-2 bg-dark-text/5 px-4 py-1.5 rounded-full border border-dark-text/10 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/80">
            Complete Capabilities
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-8 select-none max-w-3xl"
        >
          Everything you need to run your billing business.
        </h1>

        {/* Subtitle */}
        <p className="feat-hero-fade text-lg md:text-xl text-dark-text/80 font-medium max-w-2xl mb-10 leading-relaxed">
          Professional billing software built for Indian businesses. Fast, secure, and fully offline-compliant.
        </p>

        {/* Actions CTAs */}
        <div className="feat-hero-fade flex flex-col sm:flex-row gap-4 w-full sm:w-auto font-bold text-sm">
          <Link
            to="/signup"
            className="px-8 py-4 bg-dark-text text-cyber-yellow rounded-full hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 shadow-lg text-center flex items-center justify-center gap-2 group"
          >
            Start Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#demo"
            className="px-8 py-4 bg-transparent border-2 border-dark-text/20 text-dark-text rounded-full hover:bg-dark-text/5 hover:border-dark-text/40 transition-all text-center flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-dark-text" />
            Book Demo
          </a>
        </div>

      </div>
    </div>
  );
};
