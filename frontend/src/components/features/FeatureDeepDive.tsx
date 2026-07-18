import React, { useEffect, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DeepDiveItem {
  id: string;
  title: string;
  headline: string;
  desc: string;
  outcome: string;
  capabilities: string[];
  mockupType: 'billing' | 'inventory' | 'customers' | 'reports' | 'gst' | 'payments' | 'automation';
}

export const FeatureDeepDive: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const features: DeepDiveItem[] = [
    {
      id: 'billing',
      title: '🚀 Billing & Invoicing',
      headline: 'Create invoices in under 10 seconds.',
      desc: 'Speed up checkout queues. Use keyboard shortcuts, instant barcode queries, and native thermal printing to keep lines moving.',
      outcome: 'Result: Save 2.5 hours of manual checkout labor every day.',
      capabilities: ['Fast keyboard-only entry', 'Barcode scanner integration', 'Bluetooth & USB thermal prints', 'Direct discounts calculation', 'Quick item returns processing'],
      mockupType: 'billing',
    },
    {
      id: 'products',
      title: '📦 Inventory Control',
      headline: 'Never lose track of stock again.',
      desc: 'Sync transactions directly with catalog levels. Configure automated safety limits and receive alarms when popular items run thin.',
      outcome: 'Result: Eliminate stockouts and save lost sales.',
      capabilities: ['Variant & category configuration', 'Real-time stock deduction', 'Low stock warnings & alerts', 'Stock intake tracking', 'Price history logs'],
      mockupType: 'inventory',
    },
    {
      id: 'customers',
      title: '👥 Customer Relations',
      headline: 'Track ledger credit balances easily.',
      desc: 'Maintain digital profiles for regular clients. Manage outstanding balances, track individual histories, and search numbers in seconds.',
      outcome: 'Result: Recover dues 3x faster with transaction transparency.',
      capabilities: ['Outstanding credit ledger', 'Detailed purchase history', 'Contact profiles lookup', 'Personalized bills notes', 'Dynamic loyalty stats'],
      mockupType: 'customers',
    },
    {
      id: 'reports',
      title: '📊 Reports & Analytics',
      headline: 'Spot profit trends and item margins.',
      desc: 'Monitor daily operations automatically. Watch graphs update as sales occur, track profit margins, and export logs to Excel.',
      outcome: 'Result: Data-driven stock buying decisions based on margins.',
      capabilities: ['Daily operations velocity', 'Monthly summary trends', 'Top selling items tracking', 'Profit margin reports', 'Excel data export'],
      mockupType: 'reports',
    },
    {
      id: 'gst',
      title: '📄 GST Compliance',
      headline: 'Automatic CGST and SGST splits.',
      desc: 'Zero manual calculation mistakes. Match products to standard HSN structures and let the system split and calculate tax returns instantly.',
      outcome: 'Result: File monthly tax reports in under two minutes.',
      capabilities: ['CGST & SGST auto splits', 'HSN directory mapping', 'GSTR-1 Excel spreadsheets export', 'Zero tax invoice template', 'Tax brackets support'],
      mockupType: 'gst',
    },
    {
      id: 'payments',
      title: '💳 Payment Terminals',
      headline: 'Split payments and print UPI QRs.',
      desc: 'Let customers choose how they pay. Generate custom UPI codes directly on screens/thermal receipts or record split cash/card balances.',
      outcome: 'Result: Zero manual calculation slips while splitting bills.',
      capabilities: ['Custom dynamic UPI QR codes', 'Split payment logging', 'Pending dues logging', 'Card & digital payment tags', 'Daily cash drawer reports'],
      mockupType: 'payments',
    },
    {
      id: 'automation',
      title: '⚙️ Business Tools & Automation',
      headline: 'Automated receipts and multi-user roles.',
      desc: 'Set up billing desks for multiple employees. Limit user permissions, auto-sync data to cloud backup, and share PDF invoices directly on WhatsApp.',
      outcome: 'Result: High security and hands-free backup operations.',
      capabilities: ['Automated cloud synchronization', 'WhatsApp direct PDF sharing', 'Role-based access permissions', 'Multi-device concurrency', 'Auto backup checkpoints'],
      mockupType: 'automation',
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    features.forEach((feat) => {
      const block = document.getElementById(`dive-${feat.id}`);
      if (!block) return;

      const textCol = block.querySelector('.dive-text-col');
      const visualCol = block.querySelector('.dive-visual-col');

      if (textCol && visualCol) {
        // Text enters from one side
        gsap.fromTo(
          textCol,
          { opacity: 0, x: block.classList.contains('bg-cyber-yellow') ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
            scrollTrigger: {
              trigger: block,
              start: 'top 75%',
            },
          }
        );

        // Visual enters from the opposite side
        gsap.fromTo(
          visualCol,
          { opacity: 0, x: block.classList.contains('bg-cyber-yellow') ? 40 : -40, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
            scrollTrigger: {
              trigger: block,
              start: 'top 75%',
            },
          }
        );
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {features.map((feat, idx) => {
        const isYellow = idx % 2 === 0;
        return (
          <div
            key={feat.id}
            id={`dive-${feat.id}`}
            className={`py-32 px-6 md:px-12 curved-top-lg curved-bottom-lg border-b border-black/5 relative overflow-hidden ${
              isYellow ? 'bg-cyber-yellow text-dark-text' : 'bg-dark-bg text-white'
            }`}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Text Side */}
              <div
                className={`dive-text-col lg:col-span-5 text-left flex flex-col items-start ${
                  isYellow ? '' : 'order-first lg:order-last'
                }`}
              >
                <span className={`text-xs uppercase tracking-[0.3em] font-extrabold mb-4 block ${
                  isYellow ? 'text-dark-text/70' : 'text-cyber-yellow'
                }`}>
                  {feat.title}
                </span>
                
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
                  {feat.headline}
                </h2>
                
                <p className={`text-sm md:text-base font-semibold mb-6 max-w-md leading-relaxed ${
                  isYellow ? 'text-dark-text/80' : 'text-gray-400'
                }`}>
                  {feat.desc}
                </p>

                {/* Outcome Badge */}
                <div className={`px-4 py-2 rounded-xl text-xs font-bold mb-8 border ${
                  isYellow 
                    ? 'bg-dark-text/5 border-dark-text/10 text-dark-text' 
                    : 'bg-cyber-yellow/10 border-cyber-yellow/20 text-cyber-yellow'
                }`}>
                  {feat.outcome}
                </div>

                <ul className="space-y-3.5 mb-8">
                  {feat.capabilities.map((cap, cIdx) => (
                    <li key={cIdx} className="flex items-center gap-3 text-xs md:text-sm font-bold">
                      <Check className={`w-4 h-4 shrink-0 ${isYellow ? 'text-dark-text' : 'text-cyber-yellow'}`} />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#signup"
                  className={`px-6 py-3 rounded-full font-bold text-xs flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all ${
                    isYellow 
                      ? 'bg-dark-text text-cyber-yellow shadow-md' 
                      : 'bg-cyber-yellow text-dark-text hover:bg-cyber-yellow/90'
                  }`}
                >
                  Start Using {feat.title.split(' ')[1]}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Mockup visual side */}
              <div className="dive-visual-col lg:col-span-7 flex justify-center">
                <div className="w-full max-w-lg aspect-[1.3] bg-neutral-950 border border-white/10 rounded-3xl shadow-2xl p-6 flex flex-col relative overflow-hidden text-white">
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
                    <span className="text-[9px] text-gray-500 font-mono">billora.app/pos/{feat.id}</span>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500/70" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                      <span className="w-2 h-2 rounded-full bg-green-500/70" />
                    </div>
                  </div>

                  {/* Rendering Mockups dynamically based on feature type */}
                  <div className="flex-1 text-left text-xs">
                    {feat.mockupType === 'billing' && <BillingMockup />}
                    {feat.mockupType === 'inventory' && <InventoryMockup />}
                    {feat.mockupType === 'customers' && <CustomersMockup />}
                    {feat.mockupType === 'reports' && <ReportsMockup />}
                    {feat.mockupType === 'gst' && <GstMockup />}
                    {feat.mockupType === 'payments' && <PaymentsMockup />}
                    {feat.mockupType === 'automation' && <AutomationMockup />}
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

/* Mini Mockup components */

const BillingMockup: React.FC = () => (
  <div className="space-y-4">
    <div className="bg-surface border border-white/5 p-4 rounded-xl flex justify-between items-center">
      <div>
        <span className="text-[10px] text-gray-400 block font-bold">Quick add hotkey</span>
        <span className="text-white font-mono text-xs mt-0.5 inline-block">Press [F2] or Scan Item Barcode</span>
      </div>
      <div className="px-3 py-1 bg-cyber-yellow text-dark-text font-black rounded-lg text-[9px] uppercase tracking-wider">
        Active Desk
      </div>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between border-b border-white/5 pb-2 text-[10px] text-gray-400 font-bold">
        <span>PRODUCT</span>
        <span>QTY</span>
        <span>PRICE</span>
      </div>
      <div className="flex justify-between font-semibold">
        <span>Basmati Rice (Gold)</span>
        <span className="font-mono text-cyber-yellow">x2</span>
        <span className="font-mono">₹220.00</span>
      </div>
      <div className="flex justify-between font-semibold">
        <span>Cold Pressed Coconut Oil (500ml)</span>
        <span className="font-mono text-cyber-yellow">x1</span>
        <span className="font-mono">₹190.00</span>
      </div>
    </div>
    <div className="pt-4 border-t border-white/5 flex justify-between items-center text-sm font-black">
      <span>Total (3 items)</span>
      <span className="text-cyber-yellow font-mono text-lg">₹410.00</span>
    </div>
  </div>
);

const InventoryMockup: React.FC = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <span className="font-bold text-sm">Product Stock Manager</span>
      <span className="text-[9px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded font-black uppercase">
        2 Alerts Pending
      </span>
    </div>
    <div className="space-y-2.5">
      <div className="bg-surface border border-white/5 p-3 rounded-xl flex justify-between items-center">
        <div>
          <span className="font-bold block">Premium Wheat Flour (10kg)</span>
          <span className="text-[9px] text-gray-400 font-mono mt-0.5">PRD-024 • Grocery</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-yellow-400 block font-bold">5 units left</span>
          <span className="text-[9px] bg-yellow-500/10 text-yellow-400 px-1.5 py-0.5 rounded font-semibold inline-block mt-0.5">Low Stock</span>
        </div>
      </div>
      <div className="bg-surface border border-white/5 p-3 rounded-xl flex justify-between items-center">
        <div>
          <span className="font-bold block">Organic Forest Honey (500g)</span>
          <span className="text-[9px] text-gray-400 font-mono mt-0.5">PRD-109 • Organic</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-red-400 block font-bold">0 units left</span>
          <span className="text-[9px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded font-semibold inline-block mt-0.5">Out of Stock</span>
        </div>
      </div>
    </div>
  </div>
);

const CustomersMockup: React.FC = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center mb-2">
      <span className="font-bold text-sm">Customer Credit Ledger</span>
      <span className="text-xs text-cyber-yellow hover:underline cursor-pointer font-bold">+ New Customer</span>
    </div>
    <div className="bg-surface border border-white/5 p-4 rounded-xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div>
          <span className="font-black text-sm block">Subhash Chandra Bose</span>
          <span className="text-[9px] text-gray-400 font-mono">+91 98765 43210</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-gray-400 block font-bold">Outstanding credit</span>
          <span className="text-base font-black text-red-400 font-mono">₹4,500.00</span>
        </div>
      </div>
      <div className="pt-3 space-y-2 text-[10px] text-gray-300">
        <div className="flex justify-between">
          <span>Last Purchase: Basmati Rice x2 (INV-2489)</span>
          <span className="font-mono text-white">₹220.00</span>
        </div>
        <div className="flex justify-between">
          <span>Payment collected: UPI Transaction (REC-128)</span>
          <span className="font-mono text-emerald-400">-₹1,000.00</span>
        </div>
      </div>
    </div>
  </div>
);

const ReportsMockup: React.FC = () => (
  <div className="space-y-4 flex flex-col h-full justify-between">
    <div>
      <h4 className="font-bold text-sm mb-3">Item Revenue & Profit Margin</h4>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-[11px] mb-1 font-semibold">
            <span>1. Refined Sunflower Oil (5L)</span>
            <span className="font-mono">₹84,500 (24% Margin)</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <div className="bg-cyber-yellow h-2 rounded-full" style={{ width: '85%' }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[11px] mb-1 font-semibold">
            <span>2. Premium Basmati Rice (5kg)</span>
            <span className="font-mono">₹62,000 (18% Margin)</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <div className="bg-cyber-yellow h-2 rounded-full" style={{ width: '65%' }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[11px] mb-1 font-semibold">
            <span>3. Wheat Flour (10kg Pack)</span>
            <span className="font-mono">₹48,200 (15% Margin)</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <div className="bg-white/40 h-2 rounded-full" style={{ width: '50%' }} />
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-4 text-[10px] text-gray-400 font-bold">
      <span>Net Monthly Profit: ₹1,12,850</span>
      <span className="text-cyber-yellow hover:underline cursor-pointer">Download Full PDF</span>
    </div>
  </div>
);

const GstMockup: React.FC = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center border-b border-white/5 pb-2">
      <span className="font-bold text-sm">GST Invoice Summary</span>
      <span className="text-[10px] font-mono text-gray-400">HSN: 1006 (Rice)</span>
    </div>
    <div className="bg-surface border border-white/5 p-4 rounded-xl space-y-3">
      <div className="flex justify-between text-[11px] text-gray-300">
        <span>CGST (9% split value)</span>
        <span className="font-mono font-bold text-white">₹19.80</span>
      </div>
      <div className="flex justify-between text-[11px] text-gray-300">
        <span>SGST (9% split value)</span>
        <span className="font-mono font-bold text-white">₹19.80</span>
      </div>
      <div className="flex justify-between text-[11px] text-gray-300 border-b border-white/5 pb-2">
        <span>IGST (0% Inter-state)</span>
        <span className="font-mono font-bold text-white">₹0.00</span>
      </div>
      <div className="flex justify-between text-xs font-black pt-1">
        <span>Total Taxes Included</span>
        <span className="font-mono text-cyber-yellow text-sm">₹39.60</span>
      </div>
    </div>
    <button className="w-full py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-bold text-[10px] rounded-lg text-center uppercase tracking-wider">
      Export GSTR-1 Excel File
    </button>
  </div>
);

const PaymentsMockup: React.FC = () => (
  <div className="space-y-4">
    <span className="font-bold text-sm block">Payment Allocation Switcher</span>
    <div className="grid grid-cols-3 gap-2">
      <div className="bg-cyber-yellow/10 border border-cyber-yellow/30 p-2 rounded-xl text-center">
        <span className="text-[8px] text-gray-400 block font-bold">CASH</span>
        <span className="text-xs font-black text-cyber-yellow">₹150.00</span>
      </div>
      <div className="bg-white/5 border border-white/5 p-2 rounded-xl text-center">
        <span className="text-[8px] text-gray-400 block font-bold">UPI QR</span>
        <span className="text-xs font-black text-white">₹260.00</span>
      </div>
      <div className="bg-white/5 border border-white/5 p-2 rounded-xl text-center">
        <span className="text-[8px] text-gray-400 block font-bold">CARD</span>
        <span className="text-xs font-black text-white">₹0.00</span>
      </div>
    </div>
    <div className="bg-surface border border-white/5 p-3.5 rounded-xl space-y-2 text-[10px]">
      <div className="flex justify-between text-gray-400 font-bold">
        <span>Split Details:</span>
        <span className="text-emerald-400">All balances met</span>
      </div>
      <div className="flex justify-between">
        <span>Received: Cash (Biller Drawer)</span>
        <span className="font-mono text-white">₹150.00</span>
      </div>
      <div className="flex justify-between">
        <span>Received: BHIM UPI Scan (Auto QR)</span>
        <span className="font-mono text-white">₹260.00</span>
      </div>
    </div>
  </div>
);

const AutomationMockup: React.FC = () => (
  <div className="space-y-4">
    <span className="font-bold text-sm block">WhatsApp Share & Sync Status</span>
    <div className="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-xl text-left">
      <div className="flex items-center gap-2 mb-1.5 text-[9px] font-bold text-green-400">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        WhatsApp API Connected
      </div>
      <p className="text-[10px] text-gray-300">"Dear Customer, your invoice INV-2489 of ₹410.00 is ready. View PDF link: https://billora.in/inv/2489"</p>
    </div>
    <div className="bg-surface border border-white/5 p-3 rounded-xl flex items-center justify-between text-[11px]">
      <div className="flex flex-col">
        <span className="font-bold">Automated Cloud Backups</span>
        <span className="text-[9px] text-gray-400">Sync cycle: Every 15 seconds</span>
      </div>
      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[9px] font-black rounded uppercase">
        Synced
      </span>
    </div>
  </div>
);
