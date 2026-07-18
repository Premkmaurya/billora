import React, { useState, useEffect, useRef } from 'react';
import { Send, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.news-reveal'),
      { opacity: 0, y: 25 },
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-cyber-yellow text-dark-text py-28 px-6 md:px-12 curved-top-lg curved-bottom-lg border-b border-black/5"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        <span className="news-reveal text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-6 animate-on-scroll">
          Newsletter
        </span>

        <h2 className="news-reveal text-4xl md:text-5xl font-black tracking-tight mb-4 select-none leading-tight">
          Never miss a new article.
        </h2>

        <p className="news-reveal text-dark-text/80 font-medium text-xs md:text-sm mb-10 max-w-md leading-relaxed">
          Sign up to receive monthly tax guides, offline checkout shortcuts, and inventory management tips.
        </p>

        {/* Input box form */}
        <form
          onSubmit={handleSubmit}
          className="news-reveal w-full max-w-md bg-dark-bg p-1.5 rounded-2xl flex items-center border border-white/10 shadow-xl"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitted}
            placeholder="Enter your email address..."
            className="flex-1 bg-transparent px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={submitted}
            className="px-6 py-2.5 bg-cyber-yellow text-dark-text rounded-xl font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 shrink-0 disabled:bg-emerald-500 disabled:text-white"
          >
            {submitted ? (
              <>
                <Check className="w-4 h-4" />
                Subscribed
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                Subscribe
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
