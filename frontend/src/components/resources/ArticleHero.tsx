import React, { useState, useEffect, useRef } from 'react';
import { Bookmark, MessageSquare, Link as LinkIcon, Check } from 'lucide-react';
import { gsap } from 'gsap';

export const ArticleHero: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
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

    // Staggered fade in for rest of hero elements
    gsap.fromTo(
      '.article-hero-fade',
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-cyber-yellow text-dark-text pt-40 pb-20 px-6 md:px-12 border-b border-black/5 overflow-hidden curved-bottom-lg"
    >
      {/* Background blobs */}
      <div className="absolute right-[-10%] top-[-10%] w-[65vw] h-[65vw] rounded-full bg-yellow-300 opacity-60 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        
        {/* Breadcrumbs / Category */}
        <div className="article-hero-fade flex items-center gap-2 mb-6 text-[10px] font-bold tracking-wider uppercase select-none text-dark-text/70">
          <span>Resources</span>
          <span className="opacity-40">/</span>
          <span>GST Compliance</span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 select-none max-w-3xl text-dark-text"
        >
          How to create GST invoices in under 10 seconds.
        </h1>

        {/* Excerpt */}
        <p className="article-hero-fade text-lg md:text-xl text-dark-text/80 font-semibold mb-8 leading-relaxed max-w-2xl">
          Learn how to map standard HSN structures, calculate CGST/SGST splits, and automate compliance processes for your shop.
        </p>

        {/* Author / Date Meta Row */}
        <div className="article-hero-fade flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-y border-dark-text/10 py-6 w-full text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-dark-text text-cyber-yellow font-black flex items-center justify-center text-xs">
              AD
            </div>
            <div>
              <span className="text-sm font-black text-dark-text block">Aditya Sharma</span>
              <span className="text-[10px] text-dark-text/70 font-bold block">Tax Advisor • Billora Compliance</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-bold text-dark-text/60 font-mono">
            <div>
              <span className="text-dark-text/50 uppercase block">Published</span>
              <span className="text-dark-text mt-0.5 block">18 July 2026</span>
            </div>
            <div>
              <span className="text-dark-text/50 uppercase block">Updated</span>
              <span className="text-dark-text mt-0.5 block">18 July 2026</span>
            </div>
            <div>
              <span className="text-dark-text/50 uppercase block">Read Duration</span>
              <span className="text-dark-text font-black mt-0.5 block">10 Min Read</span>
            </div>
          </div>
        </div>

        {/* Social Share Toolbar */}
        <div className="article-hero-fade flex items-center justify-between gap-4 mt-6 select-none w-full">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 bg-dark-text/5 hover:bg-dark-text/10 border border-dark-text/10 rounded-xl transition-all ${
                isBookmarked ? 'bg-dark-text text-cyber-yellow' : 'text-dark-text/70'
              }`}
              title="Bookmark Article"
            >
              <Bookmark className="w-4.5 h-4.5 fill-current" />
            </button>
            <span className="text-[10px] font-bold text-dark-text/50 font-mono">SAVE ARTICLE</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-dark-text/50 font-mono mr-2 hidden sm:inline">SHARE ARTICLE</span>
            
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-dark-text/5 hover:bg-dark-text/10 border border-dark-text/10 text-dark-text/70 hover:text-dark-text rounded-xl transition-all"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-dark-text/5 hover:bg-dark-text/10 border border-dark-text/10 text-dark-text/70 hover:text-dark-text rounded-xl transition-all"
              aria-label="Share on X"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-dark-text/5 hover:bg-dark-text/10 border border-dark-text/10 text-dark-text/70 hover:text-dark-text rounded-xl transition-all"
              aria-label="Share on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="p-2 bg-dark-text/5 hover:bg-dark-text/10 border border-dark-text/10 text-dark-text/70 hover:text-dark-text rounded-xl transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 animate-pulse" /> : <LinkIcon className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
