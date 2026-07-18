import React, { useState, useEffect, useRef } from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const DashboardShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [salesCount, setSalesCount] = useState(128450);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse Parallax Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    // Dynamic counter incrementation
    const interval = setInterval(() => {
      setSalesCount((prev) => prev + Math.floor(Math.random() * 80) + 10);
    }, 3000);

    // GSAP reveal on scroll
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll('.showcase-anim'),
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }

    return () => clearInterval(interval);
  }, []);

  // Parallax calculations
  const calculateTransform = (factor: number) => {
    const tx = mousePosition.x * factor * 50;
    const ty = mousePosition.y * factor * 50;
    return `translate3d(${tx}px, ${ty}px, 0)`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-dark-bg text-white py-32 px-6 md:px-12 overflow-hidden border-t border-white/5"
    >
      {/* Background radial highlight */}
      <div
        className="absolute w-[60vw] h-[60vw] rounded-full bg-cyber-yellow/5 opacity-50 blur-3xl pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mousePosition.x * 100}px, ${mousePosition.y * 100}px, 0)`,
          top: '20%',
          left: '20%',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text details */}
          <div className="lg:col-span-5 text-left showcase-anim">
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-cyber-yellow block mb-3">
              Full-Suite Control
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              Track sales as they happen.
            </h2>
            <p className="text-gray-400 font-medium text-base mb-8 leading-relaxed">
              Sit back and watch your dashboards auto-update as transactions complete. Complete inventory sync, automated tax splitting, and cloud backup are run completely in the background.
            </p>

            <div className="space-y-6">
              <div className="bg-surface border border-white/10 p-6 rounded-2xl">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Live Sales Counter</span>
                <div className="text-4xl font-black text-cyber-yellow mt-2 font-mono">
                  ₹{salesCount.toLocaleString('en-IN')}
                </div>
                <span className="text-xs text-emerald-400 font-bold mt-1 inline-flex items-center gap-1">
                  ● Tracking live checkouts
                </span>
              </div>
            </div>
          </div>

          {/* Right Parallax Canvas */}
          <div className="lg:col-span-7 relative h-[480px] w-full flex items-center justify-center">
            
            {/* Base Shadow Graph Panel */}
            <div
              style={{ transform: calculateTransform(0.25) }}
              className="absolute w-full max-w-lg aspect-[1.5] bg-surface border border-white/10 rounded-3xl p-6 shadow-2xl transition-transform duration-300 ease-out flex flex-col justify-between"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Revenue Trend</h4>
                  <span className="text-lg font-black text-white">₹14.8L Completed</span>
                </div>
                <span className="text-[10px] text-cyber-yellow bg-cyber-yellow/10 border border-cyber-yellow/20 px-2 py-0.5 rounded-full font-bold">
                  Monthly View
                </span>
              </div>

              {/* Chart Bars */}
              <div className="flex items-end justify-between h-[120px] px-2 border-b border-white/5 pb-2">
                {[45, 60, 50, 75, 90, 85, 110, 95, 120, 130, 115, 140].map((val, idx) => (
                  <div
                    key={idx}
                    className="w-2.5 bg-white/10 rounded-t hover:bg-cyber-yellow transition-colors duration-200"
                    style={{ height: `${(val / 140) * 100}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[8px] text-gray-400 font-bold font-mono">
                <span>01 AM</span>
                <span>08 AM</span>
                <span>04 PM</span>
                <span>11 PM</span>
              </div>
            </div>

            {/* Floating Glass Card 1 (UPI Success - Top Right) */}
            <div
              style={{ transform: calculateTransform(0.6) }}
              className="absolute top-10 right-4 lg:right-10 glass-panel bg-white/5 border border-white/15 rounded-2xl p-4 min-w-[190px] shadow-2xl transition-transform duration-300 ease-out"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-gray-400 block font-bold uppercase tracking-wider">UPI Collected</span>
                  <span className="text-xs font-extrabold text-white">₹4,890.00</span>
                </div>
              </div>
            </div>

            {/* Floating Glass Card 2 (Invoice Preview - Bottom Left) */}
            <div
              style={{ transform: calculateTransform(0.8) }}
              className="absolute bottom-6 left-2 lg:left-8 glass-panel bg-white/5 border border-white/15 rounded-2xl p-4 min-w-[210px] shadow-2xl transition-transform duration-300 ease-out text-left"
            >
              <div className="flex justify-between items-start mb-3 border-b border-white/5 pb-2">
                <div>
                  <span className="text-[9px] text-gray-400 block font-bold uppercase tracking-wider">Invoice Spec</span>
                  <span className="text-[10px] font-mono text-white">INV-2026-904</span>
                </div>
                <FileText className="w-4 h-4 text-cyber-yellow" />
              </div>
              <div className="space-y-1.5 text-[9px] text-gray-300 font-semibold mb-3">
                <div className="flex justify-between">
                  <span>Basmati Rice (2kg)</span>
                  <span className="font-mono text-white">₹220.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunflower Oil (1L)</span>
                  <span className="font-mono text-white">₹140.00</span>
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-black border-t border-white/5 pt-2">
                <span>Total Payable:</span>
                <span className="text-cyber-yellow font-mono">₹360.00</span>
              </div>
            </div>

            {/* Floating Metric Card 3 (Transactions Counter - Top Left) */}
            <div
              style={{ transform: calculateTransform(0.4) }}
              className="absolute top-6 left-6 lg:left-12 glass-panel bg-white/5 border border-white/15 rounded-2xl p-4 min-w-[160px] shadow-2xl transition-transform duration-300 ease-out"
            >
              <span className="text-[9px] text-gray-400 block font-bold uppercase tracking-wider text-left">Today's Bills</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-black text-white">418</span>
                <span className="text-[10px] text-emerald-400 font-bold font-mono">+12%</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
