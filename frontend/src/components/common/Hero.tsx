import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Play, Search, MessageSquareCode } from 'lucide-react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // States for live simulation
  const [salesCounter, setSalesCounter] = useState(248530);
  const [simStep, setSimStep] = useState(0); // 0: idle, 1: typing, 2: item added, 3: paid/sent
  const [simSearch, setSimSearch] = useState('');
  const [simItems, setSimItems] = useState<{ name: string; qty: number; price: number }[]>([]);

  useEffect(() => {
    // 1. Headline Split-Text Animation
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

    // 2. Entrance Animation for elements
    if (dashboardRef.current) {
      gsap.fromTo(
        dashboardRef.current,
        { opacity: 0, scale: 0.95, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'cubic-bezier(0.22, 1, 0.36, 1)', delay: 0.4 }
      );
    }
    gsap.fromTo(
      '.hero-fade-in',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'cubic-bezier(0.22, 1, 0.36, 1)', delay: 0.5 }
    );

    // 3. Dynamic Sales Counter ticking
    const salesInterval = setInterval(() => {
      setSalesCounter((prev) => prev + Math.floor(Math.random() * 90) + 10);
    }, 4000);

    // 4. Parallax card offsets
    gsap.fromTo('.hero-floating-card-1', { y: 10 }, { y: -10, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.fromTo('.hero-floating-card-2', { y: -8 }, { y: 12, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });

    return () => {
      clearInterval(salesInterval);
    };
  }, []);

  // 5. Automated 10-second invoice checkout simulation loop
  useEffect(() => {
    let timer: any;

    const runSimulation = () => {
      // Step 0: Idle Reset
      setSimStep(0);
      setSimSearch('');
      setSimItems([]);

      // Step 1: Start typing product
      timer = setTimeout(() => {
        setSimStep(1);
        let text = 'Basmati';
        let currentText = '';
        let i = 0;
        const typeInterval = setInterval(() => {
          if (i < text.length) {
            currentText += text[i];
            setSimSearch(currentText);
            i++;
          } else {
            clearInterval(typeInterval);
            // Step 2: Add item to invoice
            setSimStep(2);
            setSimItems([{ name: 'Premium Basmati Rice (5kg)', qty: 1, price: 540 }]);
            
            // Step 3: Fast finish & send to WhatsApp
            setTimeout(() => {
              setSimStep(3);
              setSimSearch('');
              // add success paid state or split payment
              setTimeout(runSimulation, 4000); // Wait 4s on screen, then repeat
            }, 1800);
          }
        }, 150);
      }, 2000);
    };

    runSimulation();
    return () => clearTimeout(timer);
  }, []);

  // calculations for invoice simulation
  const subtotal = simItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const gstRate = 0.18; // inclusive
  const gstAmount = subtotal - subtotal / (1 + gstRate);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-cyber-yellow text-dark-text pt-32 pb-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden curved-bottom-lg"
    >
      <div className="absolute right-[-10%] top-[-10%] w-[70vw] h-[70vw] rounded-full bg-yellow-300 opacity-60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Headline blocks */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <div className="hero-fade-in inline-flex items-center gap-2 bg-dark-text/5 px-4 py-1.5 rounded-full border border-dark-text/10 mb-6">
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/80">
              FAST • SIMPLE • PROFESSIONAL • MODERN
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 select-none"
          >
            Create professional invoices in under 10 seconds.
          </h1>

          <p className="hero-fade-in text-lg md:text-xl text-dark-text/80 font-medium max-w-md mb-8 leading-relaxed">
            The offline-first billing platform designed for retail counters. Eliminate lines, split GST, and print bills instantly.
          </p>

          <div className="hero-fade-in flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/signup"
              className="px-8 py-4 bg-dark-text text-cyber-yellow font-bold rounded-full hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 shadow-lg text-center flex items-center justify-center gap-2 group text-sm"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#demo"
              className="px-8 py-4 bg-transparent border-2 border-dark-text/25 text-dark-text font-bold rounded-full hover:bg-dark-text/5 hover:border-dark-text/40 transition-all text-center flex items-center justify-center gap-2 text-sm"
            >
              <Play className="w-4 h-4 fill-dark-text" />
              Book Demo
            </a>
          </div>
        </div>

        {/* Right Dashboard Mockup (Expanded by 40% using lg:col-span-7) */}
        <div ref={dashboardRef} className="lg:col-span-7 relative flex justify-center lg:justify-end">
          
          {/* Dashboard Panel */}
          <div className="w-full max-w-2xl aspect-[1.35] bg-neutral-950 rounded-3xl border border-white/10 shadow-2xl p-6 relative overflow-hidden flex flex-col">
            
            {/* Window bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="text-[10px] text-gray-500 font-mono ml-4">app.billora.com/billing</span>
              </div>
              <span className="text-[9px] text-cyber-yellow bg-cyber-yellow/10 px-2.5 py-0.5 rounded-full font-black tracking-wider uppercase">
                Speed Test POS
              </span>
            </div>

            {/* Invoicing Arena */}
            <div className="flex-1 grid grid-cols-12 gap-5 text-white text-left">
              
              {/* Product search & items desk */}
              <div className="col-span-8 flex flex-col gap-4">
                {/* Simulated search bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={simSearch}
                    readOnly
                    placeholder="Search by HSN, code, or name..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none"
                  />
                  {/* Dropdown popup indicator */}
                  {simStep === 1 && (
                    <div className="absolute top-full left-0 w-full bg-surface border border-white/10 rounded-xl mt-1.5 p-2 shadow-2xl z-20">
                      <div className="px-3 py-2 bg-cyber-yellow text-dark-text rounded-lg text-xs font-bold flex justify-between">
                        <span>🍚 Premium Basmati Rice (5kg)</span>
                        <span className="font-mono">₹540.00</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Items Box */}
                <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="grid grid-cols-12 text-[9px] uppercase tracking-wider font-bold text-gray-400 border-b border-white/5 pb-2">
                      <span className="col-span-6">Description</span>
                      <span className="col-span-2 text-right">Qty</span>
                      <span className="col-span-4 text-right">Total Price</span>
                    </div>

                    {simItems.length === 0 ? (
                      <div className="h-28 flex flex-col items-center justify-center text-center text-gray-500 gap-2">
                        <span className="text-xs">Counter ready. Type search terms above...</span>
                      </div>
                    ) : (
                      simItems.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-12 text-xs font-semibold py-1 border-b border-white/5 items-center">
                          <span className="col-span-6 text-white">{item.name}</span>
                          <span className="col-span-2 text-right text-cyber-yellow">x{item.qty}</span>
                          <span className="col-span-4 text-right font-mono">₹{item.price.toFixed(2)}</span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-semibold border-t border-white/5 pt-2">
                    <span>Keyboard Active: [F8] Print</span>
                    <span>Merchant QR: Active</span>
                  </div>
                </div>
              </div>

              {/* Side Calculations Box */}
              <div className="col-span-4 bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Calculations</h4>
                  <div className="space-y-3.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal:</span>
                      <span className="font-mono text-white">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">CGST (9% split):</span>
                      <span className="font-mono text-white">₹{(gstAmount / 2).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">SGST (9% split):</span>
                      <span className="font-mono text-white">₹{(gstAmount / 2).toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-white/10 my-2" />
                    <div className="flex justify-between font-black text-sm text-cyber-yellow">
                      <span>Payable:</span>
                      <span className="font-mono">₹{subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Instant Success Banner */}
                {simStep === 3 && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg flex items-center gap-2 text-[10px] text-emerald-400 font-bold animate-pulse">
                    <MessageSquareCode className="w-4.5 h-4.5" />
                    <span>WhatsApp INV Sent!</span>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Floating Parallax Card 1 (Google rating - Top Left) */}
          <div className="hero-floating-card-1 absolute top-[-25px] left-[-15px] glass-panel bg-white/10 backdrop-blur-2xl rounded-2xl p-4 shadow-xl border border-white/20 min-w-[190px]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">
                ★
              </div>
              <div className="text-left">
                <span className="text-[9px] text-gray-300 block uppercase font-bold tracking-wider">Google Rating</span>
                <span className="text-xs font-black text-white">4.9★ (2.5k reviews)</span>
              </div>
            </div>
          </div>

          {/* Floating Parallax Card 2 (Live Sales stats - Bottom Right) */}
          <div className="hero-floating-card-2 absolute bottom-[-20px] right-[25px] glass-panel bg-white/10 backdrop-blur-2xl rounded-2xl p-4 shadow-xl border border-white/20 min-w-[210px]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyber-yellow/20 flex items-center justify-center text-cyber-yellow text-sm">
                ₹
              </div>
              <div className="text-left">
                <span className="text-[9px] text-gray-300 block uppercase font-bold tracking-wider">Live Sales Counter</span>
                <span className="text-sm font-black text-white font-mono">
                  ₹{salesCounter.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
