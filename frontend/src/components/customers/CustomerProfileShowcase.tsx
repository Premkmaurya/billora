import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProfileData {
  id: string;
  name: string;
  phone: string;
  dues: string;
  ltv: string;
  avgOrder: string;
  lastVisit: string;
  recentItem: string;
}

export const CustomerProfileShowcase: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState<string>('suresh');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.showcase-reveal'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  const profiles: Record<string, ProfileData> = {
    suresh: {
      id: 'suresh',
      name: 'Suresh Patel',
      phone: '98765 43210',
      dues: '₹4,500.00',
      ltv: '₹28,540.00',
      avgOrder: '₹980.00',
      lastVisit: 'Yesterday',
      recentItem: 'Basmati Rice (Gold) 5kg',
    },
    priya: {
      id: 'priya',
      name: 'Priya Sharma',
      phone: '98221 09832',
      dues: '₹0.00',
      ltv: '₹42,100.00',
      avgOrder: '₹1,450.00',
      lastVisit: '3 Days Ago',
      recentItem: 'Ariel Matic Detergent 2kg',
    },
    rahul: {
      id: 'rahul',
      name: 'Rahul Verma',
      phone: '90123 45678',
      dues: '₹12,450.00',
      ltv: '₹18,200.00',
      avgOrder: '₹1,200.00',
      lastVisit: 'Today',
      recentItem: 'Syska LED Bulb 15W',
    },
  };

  const active = profiles[activeProfile];

  return (
    <div
      ref={containerRef}
      className="relative bg-cyber-yellow text-dark-text py-28 px-6 md:px-12 curved-top-lg curved-bottom-lg border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="showcase-reveal text-center max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-3">
            Interactive Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            Observe customer accounts live.
          </h2>
          <p className="text-dark-text/80 font-medium text-xs md:text-sm">
            Click on customer names below to see how Billora profiles their historical margins, averages, and dues instantly.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="showcase-reveal flex justify-center gap-3 mb-10 w-full max-w-md select-none">
          {Object.values(profiles).map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProfile(p.id)}
              className={`flex-1 px-4 py-3 rounded-2xl font-bold text-xs transition-all ${
                activeProfile === p.id
                  ? 'bg-dark-text text-cyber-yellow shadow-lg'
                  : 'bg-dark-text/5 text-dark-text/70 hover:text-dark-text'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Large Visual Dashboard Card */}
        <div className="showcase-reveal w-full max-w-4xl bg-neutral-950 text-white rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl text-left flex flex-col md:flex-row gap-8 items-stretch">
          
          {/* Column 1: Client Card */}
          <div className="flex-1 flex flex-col justify-between bg-white/5 border border-white/5 p-6 rounded-2xl min-h-[220px]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-cyber-yellow text-dark-text font-black flex items-center justify-center text-sm">
                  {active.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-base font-black">{active.name}</h4>
                  <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">+91 {active.phone}</span>
                </div>
              </div>
              <div className="space-y-1.5 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Visited:</span>
                  <span>{active.lastVisit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Recent product:</span>
                  <span className="text-cyber-yellow">{active.recentItem}</span>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-gray-500 font-mono pt-4 border-t border-white/5 mt-4">
              Synced with offline local ledger cache
            </div>
          </div>

          {/* Column 2: Account Balances */}
          <div className="flex-1 flex flex-col justify-between bg-white/5 border border-white/5 p-6 rounded-2xl min-h-[220px]">
            <div>
              <span className="text-[9px] text-gray-500 font-black uppercase tracking-wider block mb-4">Sales stats</span>
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                <div>
                  <span className="text-gray-400 block uppercase text-[9px]">Lifetime Value</span>
                  <span className="text-lg font-black text-white font-mono block mt-1">{active.ltv}</span>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase text-[9px]">Avg Ticket</span>
                  <span className="text-lg font-black text-white font-mono block mt-1">{active.avgOrder}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl mt-6 border border-white/5 text-xs">
              <span className="text-gray-400 font-bold">Credit dues:</span>
              <span className={`font-mono font-black ${active.dues === '₹0.00' ? 'text-emerald-400' : 'text-red-400'}`}>
                {active.dues}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
