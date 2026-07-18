import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Receipt, BarChart3, Package, FolderKanban, Send, Printer, RefreshCw } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type TabType = 'dashboard' | 'billing' | 'products' | 'reports' | 'inventory';

export const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.showcase-reveal'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'billing', label: 'Billing', icon: Receipt },
    { id: 'products', label: 'Products', icon: FolderKanban },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'inventory', label: 'Inventory', icon: Package },
  ];

  return (
    <div
      ref={sectionRef}
      id="features"
      className="relative bg-cyber-yellow text-dark-text py-28 px-6 md:px-12 curved-top-lg curved-bottom-lg"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="showcase-reveal text-center max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-3">
            Cinematic Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            The software is the hero.
          </h2>
          <p className="text-dark-text/80 font-medium text-sm md:text-base">
            Click the options below to experience the smooth, high-fidelity UI that makes Billora the fastest billing desk in local retail.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="showcase-reveal flex flex-wrap justify-center gap-2 p-1.5 bg-dark-text/5 rounded-2xl mb-12 border border-dark-text/10 max-w-3xl w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-dark-text text-cyber-yellow shadow-md scale-105'
                    : 'text-dark-text/70 hover:text-dark-text hover:bg-dark-text/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Viewport */}
        <div className="showcase-reveal w-full max-w-5xl bg-neutral-950 rounded-3xl border border-white/10 shadow-2xl p-6 md:p-8 min-h-[460px] flex flex-col relative overflow-hidden">
          {/* Browser header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="px-6 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-mono text-gray-400">
              billora.app/{activeTab}
            </div>
            <div className="w-12 h-2" />
          </div>

          {/* Active Content Display */}
          <div className="flex-1 text-white text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                {activeTab === 'dashboard' && <DashboardMock />}
                {activeTab === 'billing' && <BillingMock />}
                {activeTab === 'products' && <ProductsMock />}
                {activeTab === 'reports' && <ReportsMock />}
                {activeTab === 'inventory' && <InventoryMock />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- SUB COMPONENTS FOR SHOWCASE TABS --- */

const DashboardMock: React.FC = () => {
  const [profit, setProfit] = useState(48200);

  useEffect(() => {
    const timer = setInterval(() => {
      setProfit((prev) => prev + Math.floor(Math.random() * 60) + 10);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      <div className="bg-surface border border-white/10 p-6 rounded-2xl relative overflow-hidden">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Gross Profits</span>
        <div className="text-3xl font-black mt-2 text-white font-mono">₹{profit.toLocaleString()}</div>
        <span className="text-[10px] text-emerald-400 font-bold mt-1.5 inline-block">● Auto-ticking live desk data</span>
      </div>

      <div className="bg-surface border border-white/10 p-6 rounded-2xl">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Active Invoices</span>
        <div className="text-3xl font-black mt-2 text-cyber-yellow font-mono">148 today</div>
        <span className="text-[10px] text-gray-400 font-medium mt-1.5 inline-block">Avg checkout speed: 9.8s</span>
      </div>

      <div className="bg-surface border border-white/10 p-6 rounded-2xl">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">UPI Collections</span>
        <div className="text-3xl font-black mt-2 text-white font-mono">₹38,450</div>
        <span className="text-[10px] text-cyber-yellow font-medium mt-1.5 inline-block">82% total share</span>
      </div>

      <div className="md:col-span-3 bg-surface border border-white/10 p-5 rounded-2xl flex items-center justify-between text-xs">
        <div className="text-left">
          <span className="text-gray-400 block">Cloud Server Connection</span>
          <span className="font-bold text-white mt-1 inline-block">Singapore AWS Nodes (Primary Sync)</span>
        </div>
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 font-black rounded uppercase text-[9px]">
          Operational
        </span>
      </div>
    </div>
  );
};

const BillingMock: React.FC = () => {
  const [items, setItems] = useState([
    { name: 'Basmati Rice (Gold) 5kg', qty: 2, price: 540 },
    { name: 'Cold Pressed Mustard Oil 1L', qty: 1, price: 240 },
  ]);
  const [scanLaser, setScanLaser] = useState(false);

  const simulateScan = () => {
    setScanLaser(true);
    setTimeout(() => {
      setScanLaser(false);
      setItems((prev) => [...prev, { name: 'Premium Tea Leaves 500g', qty: 1, price: 180 }]);
    }, 1200);
  };

  const total = items.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
      {/* Scanner red laser sweep indicator */}
      {scanLaser && (
        <div className="absolute left-0 top-0 w-[63%] h-1 bg-red-500/80 shadow-[0_0_10px_#ef4444] animate-bounce z-20" style={{ animationDuration: '0.8s' }} />
      )}

      <div className="lg:col-span-8 bg-surface border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-sm">Active Invoices Desk</h3>
            <button
              onClick={simulateScan}
              disabled={scanLaser}
              className="px-3 py-1 bg-cyber-yellow hover:bg-cyber-yellow/90 text-dark-text font-black text-[9px] uppercase tracking-wider rounded-lg disabled:opacity-50"
            >
              {scanLaser ? 'Scanning barcode...' : '+ Simulate Barcode Scan'}
            </button>
          </div>

          <div className="space-y-3.5 mb-6">
            <div className="grid grid-cols-12 text-[9px] uppercase text-gray-400 font-bold border-b border-white/5 pb-2">
              <span className="col-span-6">Description</span>
              <span className="col-span-2 text-right">Qty</span>
              <span className="col-span-4 text-right">Price</span>
            </div>
            {items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 text-xs font-semibold py-1 border-b border-white/5">
                <span className="col-span-6 text-white">{item.name}</span>
                <span className="col-span-2 text-right text-cyber-yellow">x{item.qty}</span>
                <span className="col-span-4 text-right font-mono">₹{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button className="flex-1 py-3 bg-cyber-yellow text-dark-text font-black rounded-xl text-xs flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] transition-transform">
            <Send className="w-3.5 h-3.5" /> Save & Share (F8)
          </button>
          <button className="py-3 px-5 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 hover:bg-white/10 transition-colors">
            <Printer className="w-3.5 h-3.5" /> Print Receipt
          </button>
        </div>
      </div>

      <div className="lg:col-span-4 bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Payments Total</span>
          <div className="text-3xl font-black text-cyber-yellow font-mono mt-2 mb-6">₹{total.toFixed(2)}</div>
          
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">CGST (9% split):</span>
              <span className="font-mono text-white">₹{(total * 0.09).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">SGST (9% split):</span>
              <span className="font-mono text-white">₹{(total * 0.09).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-surface p-3.5 rounded-xl border border-white/10 text-center">
          <div className="w-20 h-20 bg-white mx-auto mb-2 rounded flex items-center justify-center font-bold text-[8px] text-black">
            [UPI QR CODE]
          </div>
          <span className="text-[10px] text-gray-400 font-medium">Auto-generated scans payment QR</span>
        </div>
      </div>
    </div>
  );
};

const ProductsMock: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState(1); // 1kg vs 5kg

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-surface border border-white/10 p-6 rounded-2xl">
        <h3 className="font-bold text-sm mb-4">Product Catalog Details</h3>
        <div className="space-y-4">
          <div>
            <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Product Title</label>
            <div className="w-full bg-white/5 border border-white/10 px-3 py-2.5 rounded-lg text-xs font-bold text-white">
              Basmati Rice (Gold Packaging)
            </div>
          </div>
          <div>
            <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">HSN Directory Code</label>
            <div className="w-full bg-white/5 border border-white/10 px-3 py-2.5 rounded-lg text-xs font-mono text-white">
              HSN-10063010 (18% inclusive GST)
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-white/10 p-6 rounded-2xl flex flex-col justify-between text-left">
        <div>
          <h3 className="font-bold text-sm mb-4">Pricing Variants</h3>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedVariant(1)}
              className={`w-full p-3 rounded-xl border text-left flex justify-between items-center transition-all ${
                selectedVariant === 1 ? 'border-cyber-yellow bg-cyber-yellow/5' : 'border-white/5 bg-white/5'
              }`}
            >
              <div>
                <span className="text-xs font-bold block">1kg Variant Pack</span>
                <span className="text-[9px] text-gray-400 font-mono">Barcode: BAR-890201</span>
              </div>
              <span className="text-xs font-black text-cyber-yellow">₹110.00</span>
            </button>
            <button
              onClick={() => setSelectedVariant(5)}
              className={`w-full p-3 rounded-xl border text-left flex justify-between items-center transition-all ${
                selectedVariant === 5 ? 'border-cyber-yellow bg-cyber-yellow/5' : 'border-white/5 bg-white/5'
              }`}
            >
              <div>
                <span className="text-xs font-bold block">5kg Variant Pack</span>
                <span className="text-[9px] text-gray-400 font-mono">Barcode: BAR-890205</span>
              </div>
              <span className="text-xs font-black text-cyber-yellow">₹540.00</span>
            </button>
          </div>
        </div>
        <span className="text-[9px] text-gray-400 font-medium block mt-6 text-center">Auto-synced across 3 outlets</span>
      </div>
    </div>
  );
};

const ReportsMock: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-surface border border-white/10 p-6 rounded-2xl flex flex-col justify-between min-h-[300px]">
        <div>
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Real-time charts</span>
          <h3 className="text-base font-black text-white mt-1">Marginal Revenue Breakdown</h3>
        </div>
        <div className="flex items-end justify-between h-[150px] px-2 pt-6 border-b border-white/5 relative">
          {[
            { label: 'Oil', val: 75, col: 'bg-cyber-yellow' },
            { label: 'Flour', val: 55, col: 'bg-white/40' },
            { label: 'Tea', val: 40, col: 'bg-white/20' },
            { label: 'Sugar', val: 65, col: 'bg-cyber-yellow' },
            { label: 'Rice', val: 90, col: 'bg-cyber-yellow' },
          ].map((bar, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 w-1/5">
              <div className={`w-6 rounded-t ${bar.col} transition-all duration-1000`} style={{ height: `${bar.val}%` }} />
              <span className="text-[9px] text-gray-400 font-bold">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm mb-4">GSTR Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-xs border-b border-white/5 pb-2">
              <span className="text-gray-400">Total Tax:</span>
              <span className="font-bold text-white font-mono">₹4,890.00</span>
            </div>
            <div className="flex justify-between text-xs border-b border-white/5 pb-2">
              <span className="text-gray-400">CGST (9% share):</span>
              <span className="font-bold text-white font-mono">₹2,445.00</span>
            </div>
            <div className="flex justify-between text-xs border-b border-white/5 pb-2">
              <span className="text-gray-400">SGST (9% share):</span>
              <span className="font-bold text-white font-mono">₹2,445.00</span>
            </div>
          </div>
        </div>
        <button className="w-full py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5" /> Export GSTR-1 Excel
        </button>
      </div>
    </div>
  );
};

const InventoryMock: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      <div className="md:col-span-2 bg-surface border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm mb-4">Real-time Stock Deductions</h3>
          <div className="space-y-3">
            {[
              { name: 'Basmati Rice (5kg)', stock: 45, status: 'Healthy', col: 'text-emerald-400' },
              { name: 'Wheat Flour (10kg)', stock: 5, status: 'Critical Low', col: 'text-yellow-400' },
              { name: 'Cold Pressed Coconut Oil 1L', stock: 12, status: 'Healthy', col: 'text-emerald-400' },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs bg-white/5 p-3 rounded-xl border border-white/5">
                <div>
                  <span className="font-bold block text-white">{item.name}</span>
                  <span className="text-[9px] text-gray-400 block mt-0.5">Safety Limit: 10 units</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-white font-mono">{item.stock} left</span>
                  <span className={`text-[9px] font-bold block mt-0.5 ${item.col}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-surface border border-white/10 p-6 rounded-2xl flex flex-col justify-between text-left">
        <div>
          <h3 className="font-bold text-sm mb-4">Inventory Trigger Alert</h3>
          <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl mb-4 animate-pulse">
            <span className="text-[9px] font-black text-yellow-400 block uppercase mb-1">Safety Breach</span>
            <p className="text-[10px] text-gray-300 leading-relaxed">"Wheat Flour (10kg)" has breached safety levels of 10. Re-order recommended.</p>
          </div>
        </div>
        <button className="w-full py-2.5 bg-cyber-yellow text-dark-text font-black rounded-xl text-xs transition-transform hover:scale-[1.02] active:scale-[0.98]">
          Re-order Items
        </button>
      </div>
    </div>
  );
};
