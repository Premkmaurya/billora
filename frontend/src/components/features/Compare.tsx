import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Compare: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.compare-row'),
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const rows = [
    { name: 'Instant Invoicing', manual: '❌ (Slow)', excel: '❌ (Manual Typing)', billora: '✅ (Under 10s)' },
    { name: 'Automated Reports', manual: '❌ (None)', excel: '❌ (Needs Formulas)', billora: '✅ (Real-time)' },
    { name: 'Indian GST splits', manual: '⚠️ (High Errors)', excel: '❌ (Manual setup)', billora: '✅ (1-click split)' },
    { name: 'Inventory control', manual: '⚠️ (Manual ledger)', excel: '❌ (Stale data)', billora: '✅ (Auto deduction)' },
    { name: 'Thermal Printing', manual: '❌ (Handwritten)', excel: '❌ (A4 Only)', billora: '✅ (Native print)' },
    { name: 'WhatsApp Sharing', manual: '❌ (None)', excel: '❌ (Manual Attach)', billora: '✅ (Automated PDF)' },
    { name: 'Offline Backup', manual: '❌ (Fire Risk)', excel: '❌ (Drive Crash Risk)', billora: '✅ (Auto Cloud sync)' },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-dark-bg text-white py-28 px-6 md:px-12 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-2xl mb-16 compare-row animate-on-scroll">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-cyber-yellow block mb-3">
            Comparison
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            See how Billora compares.
          </h2>
          <p className="text-gray-400 font-medium text-sm md:text-base">
            Stop losing hours on calculations and paper invoices. Compare us to manual books and Excel spreadsheets.
          </p>
        </div>

        {/* Table Frame */}
        <div className="compare-row w-full bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white font-bold uppercase tracking-wider">
                  <th className="py-5 px-6 font-black text-sm sticky left-0 bg-neutral-900 border-r border-white/10 z-20">
                    Capability
                  </th>
                  <th className="py-5 px-6">Manual Books</th>
                  <th className="py-5 px-6">Excel Sheets</th>
                  <th className="py-5 px-6 text-cyber-yellow font-black text-sm bg-cyber-yellow/5 border-x border-cyber-yellow/10">
                    Billora POS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((row, idx) => (
                  <tr key={idx} className="compare-row hover:bg-white/5 transition-colors duration-200">
                    <td className="py-4.5 px-6 font-bold text-gray-200 sticky left-0 bg-surface border-r border-white/10 z-10">
                      {row.name}
                    </td>
                    <td className="py-4.5 px-6 font-semibold text-gray-400">{row.manual}</td>
                    <td className="py-4.5 px-6 font-semibold text-gray-400">{row.excel}</td>
                    <td className="py-4.5 px-6 font-black text-cyber-yellow text-xs md:text-sm bg-cyber-yellow/5 border-x border-cyber-yellow/10">
                      {row.billora}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
