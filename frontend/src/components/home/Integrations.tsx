import React, { useEffect, useRef } from 'react';
import { MessageSquare, Printer, Scan, QrCode, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Integrations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.integ-reveal'),
      { opacity: 0, y: 30 },
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

  const items = [
    { name: 'WhatsApp Web PDFs', desc: 'Delivering bills via official chat lines.', icon: MessageSquare },
    { name: 'ESC/POS Printers', desc: 'Compatible with standard USB/BT thermal rollers.', icon: Printer },
    { name: 'Barcode Hardware', desc: 'Native support for standard handheld scanning guns.', icon: Scan },
    { name: 'Dynamic UPI QR', desc: 'Generates instant scan QR codes on printed bills.', icon: QrCode },
    { name: 'Tax Compliance Nodes', desc: 'Auto-formats invoices with custom CGST/SGST layouts.', icon: ShieldCheck },
    { name: 'Excel GSTR Sheets', desc: 'Allows direct spreadsheet downloads for file records.', icon: FileSpreadsheet },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-cyber-yellow text-dark-text py-28 px-6 md:px-12 curved-top-lg curved-bottom-lg"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="integ-reveal text-center max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-3">
            Compatibility
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            Plug and play hardware.
          </h2>
          <p className="text-dark-text/80 font-medium text-sm md:text-base">
            No custom configuration files or drivers needed. Connect standard cash drawers, printers, and scanners instantly.
          </p>
        </div>

        {/* Badges Grid */}
        <div className="integ-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-dark-bg text-white p-6 rounded-3xl flex items-start gap-4 text-left hover:scale-[1.02] transition-transform duration-300 border border-white/5 shadow-xl"
              >
                <div className="p-3.5 bg-cyber-yellow/10 text-cyber-yellow rounded-2xl shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-[11px] text-gray-400 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
