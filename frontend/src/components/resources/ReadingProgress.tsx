import React, { useState, useEffect } from "react";
import { Sparkles, X, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight === 0) return;

      const currentScroll = window.scrollY;
      const scrollPercent = Math.min((currentScroll / totalHeight) * 100, 100);
      setProgress(scrollPercent);

      if (scrollPercent >= 98 && !hasFinished) {
        setHasFinished(true);
        setShowToast(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasFinished]);

  // Calculate minutes remaining (assuming a 10 min read total)
  const totalMin = 10;
  const minRemaining = Math.max(
    Math.ceil(totalMin - (progress / 100) * totalMin),
    0,
  );

  return (
    <>
      {/* 1. Thin sticky progress indicator bar under navbar */}
      <div className="fixed top-[72px] left-0 w-full h-1 bg-white/5 z-50 pointer-events-none">
        <div
          className="h-full bg-cyber-yellow transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 2. Floating percentage indicator (bottom-left) */}
      <div className="fixed bottom-6 left-6 z-40 bg-neutral-900/90 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-3 text-[10px] font-bold text-gray-300 font-mono select-none">
        <div className="w-1.5 h-1.5 rounded-full bg-cyber-yellow animate-pulse" />
        <span>{Math.round(progress)}% READ</span>
        <span className="text-white/20">|</span>
        <span>{minRemaining} MIN LEFT</span>
      </div>

      {/* 3. Toast pop-up at completion */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-40 bg-neutral-900/95 backdrop-blur-md border border-cyber-yellow/40 rounded-3xl p-6 shadow-2xl text-left max-w-sm w-[90vw] animate-slide-up text-white ring-2 ring-cyber-yellow/10">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-sm font-black text-white flex items-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-cyber-yellow" />
              You've finished reading!
            </h4>
            <button
              onClick={() => setShowToast(false)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-400 font-semibold mb-4 leading-relaxed">
            Ready to apply what you read? Experience faster checkouts with
            Billora POS today.
          </p>

          <div className="space-y-2 mb-6">
            <span className="text-[9px] text-gray-500 font-black uppercase tracking-wider block">
              Recommended Next
            </span>
            <ul className="text-xs font-bold text-cyber-yellow space-y-1.5">
              <li>
                <Link
                  to="/resources/gst-guide"
                  className="hover:underline flex items-center gap-1"
                >
                  • GST Invoicing Guide <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/billing-tips"
                  className="hover:underline flex items-center gap-1"
                >
                  • Kirana Checkout Tips <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          <Link
            to="/signup"
            onClick={() => setShowToast(false)}
            className="w-full py-3 bg-cyber-yellow text-dark-text text-center rounded-xl font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1"
          >
            Try Billora Free
          </Link>
        </div>
      )}
    </>
  );
};
