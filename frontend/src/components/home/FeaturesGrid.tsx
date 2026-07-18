import React, { useEffect, useRef } from 'react';
import { Zap, ShieldCheck, Users, Box, Printer, MessageSquare, Cloud, Keyboard } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FeaturesGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.feat-grid-card'),
      { opacity: 0, y: 35, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
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

  return (
    <div
      ref={containerRef}
      className="relative bg-cyber-yellow text-dark-text py-28 px-6 md:px-12 curved-top-lg curved-bottom-lg"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-2xl mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-3">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            A layout built for clarity.
          </h2>
          <p className="text-dark-text/80 font-medium text-xs md:text-sm">
            Discover the deep features of the Billora POS system, structured to offer visual rhythm and Stripe-like clarity.
          </p>
        </div>

        {/* Broken Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          
          {/* Card 1: Wide (Fast Billing) */}
          <div className="feat-grid-card md:col-span-2 bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[300px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast Billing</h3>
              <p className="text-xs text-gray-400 max-w-md leading-relaxed font-semibold">
                Perform checkouts in under 10 seconds. Auto-scan barcodes, select quick item buttons, and let the system print thermal bills instantly.
              </p>
            </div>
            
            {/* Interactive Preview */}
            <div className="mt-8 flex gap-2 flex-wrap">
              <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono text-cyber-yellow font-bold uppercase tracking-wider">
                [F2] Add Item
              </span>
              <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono text-gray-300 font-bold uppercase tracking-wider">
                [F8] Checkout
              </span>
              <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono text-gray-300 font-bold uppercase tracking-wider">
                [F10] Quick Print
              </span>
            </div>
          </div>

          {/* Card 2: Tall (GST Splits) */}
          <div className="feat-grid-card md:row-span-2 bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[340px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% GST Ready</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                Generate CGST & SGST compliant tax invoices instantly. The system maps HSN directory tags and splits returns automatically without arithmetic slip-ups.
              </p>
            </div>

            {/* Interactive Preview */}
            <div className="mt-8 bg-surface border border-white/10 p-4 rounded-2xl text-left space-y-2">
              <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                <span>GST splits summary</span>
                <span>Active</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span>CGST (9% split)</span>
                <span className="font-mono text-white">₹19.80</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span>SGST (9% split)</span>
                <span className="font-mono text-white">₹19.80</span>
              </div>
            </div>
          </div>

          {/* Card 3: Square (Customers) */}
          <div className="feat-grid-card bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[280px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Customer Ledgers</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                Maintain balance history logs and credit profiles.
              </p>
            </div>
            
            {/* Interactive Preview */}
            <div className="flex items-center justify-between bg-white/5 border border-white/10 px-3 py-2 rounded-xl text-[10px] font-bold">
              <span>Suresh Kumar</span>
              <span className="text-red-400 font-mono">₹4,500 due</span>
            </div>
          </div>

          {/* Card 4: Square (Inventory) */}
          <div className="feat-grid-card bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[280px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Inventory Sync</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                Auto-deduct items and sync catalog levels live.
              </p>
            </div>
            
            {/* Interactive Preview */}
            <div className="flex items-center justify-between bg-white/5 border border-white/10 px-3 py-2 rounded-xl text-[10px] font-bold">
              <span>Wheat Flour (10kg)</span>
              <span className="text-yellow-400">Low Stock (5)</span>
            </div>
          </div>

          {/* Card 5: Wide (Thermal Printing) */}
          <div className="feat-grid-card md:col-span-2 bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[300px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <Printer className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Thermal Print Engine</h3>
              <p className="text-xs text-gray-400 max-w-md leading-relaxed font-semibold">
                Native connection protocols for all 2-inch and 3-inch ESC/POS thermal printers. Plug in via USB or sync via Bluetooth and print receipts immediately.
              </p>
            </div>

            {/* Interactive Preview */}
            <div className="mt-8 flex justify-between items-center text-[10px] text-gray-400 font-bold border-t border-white/5 pt-4">
              <span>Bluetooth Status: Connected</span>
              <span className="text-cyber-yellow">Custom Store Header Active</span>
            </div>
          </div>

          {/* Card 6: Square (WhatsApp) */}
          <div className="feat-grid-card bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[280px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">WhatsApp share</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                Share secure PDF invoices directly to customer numbers.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl text-[10px] text-emerald-400 font-bold">
              <span>● Auto-sent PDF Receipt</span>
            </div>
          </div>

          {/* Card 7: Square (Cloud Backup) */}
          <div className="feat-grid-card bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[280px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Cloud</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                Automated hourly sync secures billing records.
              </p>
            </div>
            <div className="flex items-center justify-between text-[9px] text-gray-400 font-mono">
              <span>AWS Nodes</span>
              <span className="text-emerald-400 font-bold">Secure</span>
            </div>
          </div>

          {/* Card 8: Square (Hotkeys) */}
          <div className="feat-grid-card bg-dark-bg text-white p-8 rounded-3xl flex flex-col justify-between min-h-[280px] border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 group">
            <div>
              <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                <Keyboard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Hotkey support</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                Operate billing desks completely mouse-free.
              </p>
            </div>
            <div className="flex items-center justify-between text-[9px] text-gray-400 font-mono">
              <span>Biller Hotkeys</span>
              <span className="text-cyber-yellow font-bold">F2 / F8 / F10</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
