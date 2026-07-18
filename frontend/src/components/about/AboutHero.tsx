import React, { useEffect, useRef } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

export const AboutHero: React.FC = () => {
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

    gsap.fromTo(
      '.about-hero-fade',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'cubic-bezier(0.22, 1, 0.36, 1)', delay: 0.4 }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[75vh] bg-cyber-yellow text-dark-text pt-40 pb-28 px-6 md:px-12 flex flex-col justify-center overflow-hidden curved-bottom-lg"
    >
      <div className="absolute right-[-10%] top-[-10%] w-[70vw] h-[70vw] rounded-full bg-yellow-300 opacity-60 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        <span className="about-hero-fade text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-6">
          Our Purpose
        </span>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-8 select-none max-w-3xl"
        >
          Helping local businesses bill faster every day.
        </h1>

        <p className="about-hero-fade text-lg md:text-xl text-dark-text/80 font-medium max-w-2xl mb-10 leading-relaxed">
          We built Billora for retail counters, grocery stores, and local shops. Our platform is crafted to eliminate checkouts line queues, split taxes automatically, and print receipts instantly.
        </p>

        <div className="about-hero-fade flex flex-col sm:flex-row gap-4 w-full sm:w-auto font-bold text-sm">
          <Link
            to="/signup"
            className="px-8 py-4 bg-dark-text text-cyber-yellow rounded-full hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 shadow-lg flex items-center justify-center gap-2 group"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/features"
            className="px-8 py-4 bg-transparent border-2 border-dark-text/25 text-dark-text rounded-full hover:bg-dark-text/5 hover:border-dark-text/40 transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            View Features
          </Link>
        </div>
      </div>
    </div>
  );
};
