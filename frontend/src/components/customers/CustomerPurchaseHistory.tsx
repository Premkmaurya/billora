import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HistoryRecord {
  timeframe: string;
  invoice: string;
  date: string;
  items: string[];
  amount: string;
  status: 'paid' | 'pending';
}

export const CustomerPurchaseHistory: React.FC = () => {
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>('INV-2026-098');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.hist-reveal'),
      { opacity: 0, y: 25 },
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

  const history: HistoryRecord[] = [
    {
      timeframe: 'Today',
      invoice: 'INV-2026-098',
      date: '18 July 2026, 11:32 AM',
      items: ['Basmati Rice 5kg (x1)', 'Fortune Soyabean Oil 1L (x2)', 'Tata Salt 1kg (x1)'],
      amount: '₹1,020.00',
      status: 'paid',
    },
    {
      timeframe: 'Yesterday',
      invoice: 'INV-2026-085',
      date: '17 July 2026, 04:15 PM',
      items: ['Dettol Liquid Handwash (x1)', 'Ariel Matic Detergent 2kg (x1)'],
      amount: '₹750.00',
      status: 'paid',
    },
    {
      timeframe: 'Last Week',
      invoice: 'INV-2026-042',
      date: '12 July 2026, 09:30 AM',
      items: ['Britannia Marie Gold 250g (x5)', 'Amul Butter 500g (x2)'],
      amount: '₹620.00',
      status: 'paid',
    },
    {
      timeframe: 'Last Month',
      invoice: 'INV-2026-011',
      date: '18 June 2026, 06:10 PM',
      items: ['Cadbury Dairy Milk Silk (x3)', 'Coca Cola 2L Bottle (x2)'],
      amount: '₹840.00',
      status: 'pending',
    },
  ];

  const toggleExpand = (invoice: string) => {
    setExpandedInvoice(expandedInvoice === invoice ? null : invoice);
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-dark-bg text-white py-28 px-6 md:px-12 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="hist-reveal text-center max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-cyber-yellow block mb-3">
            Purchase History
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            Timeline of transactions.
          </h2>
          <p className="text-gray-400 font-medium text-xs md:text-sm">
            Retrieve past sales logs in single clicks. Every transaction maps detail lines automatically.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="hist-reveal w-full space-y-4">
          {history.map((record, idx) => {
            const isExpanded = expandedInvoice === record.invoice;
            return (
              <div
                key={idx}
                className="bg-surface/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors duration-300"
              >
                {/* Header row */}
                <div
                  onClick={() => toggleExpand(record.invoice)}
                  className="p-5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-[10px] text-cyber-yellow font-black uppercase tracking-wider block min-w-[70px]">
                      {record.timeframe}
                    </span>
                    <div>
                      <h4 className="text-xs font-black text-white">{record.invoice}</h4>
                      <span className="text-[10px] text-gray-500 font-medium mt-0.5 block">{record.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-black text-white">{record.amount}</span>
                    {record.status === 'paid' ? (
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold text-[9px] uppercase">
                        Paid
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded font-bold text-[9px] uppercase animate-pulse">
                        Pending
                      </span>
                    )}
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-white/5 text-left bg-white/2 animate-fade-in">
                    <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest block mb-3">Items list</span>
                    <ul className="space-y-2 text-xs font-semibold text-gray-300">
                      {record.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex justify-between">
                          <span>{item}</span>
                          <span className="text-gray-500">Verified</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
