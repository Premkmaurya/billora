import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, Info } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ArticleContent: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Interactive Calculator State
  const [billAmount, setBillAmount] = useState<number>(1000);
  const [taxRate, setTaxRate] = useState<number>(18);

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current.querySelectorAll('.content-reveal'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  // Compute splits
  const gstInclusiveAmount = billAmount;
  const taxableValue = gstInclusiveAmount / (1 + taxRate / 100);
  const totalGST = gstInclusiveAmount - taxableValue;
  const cgst = totalGST / 2;
  const sgst = totalGST / 2;

  return (
    <div
      ref={contentRef}
      className="prose prose-invert max-w-[740px] text-left text-gray-300 font-medium text-sm md:text-base leading-relaxed space-y-12"
    >
      
      {/* Intro */}
      <section id="intro" className="content-reveal space-y-4">
        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
          1. Introduction to GST Compliance in Retail
        </h2>
        <p>
          Managing billing desks at local provisions and medical shops in India requires accurate compliance with standard tax rules. Every invoice printed must correctly state standard tax divisions, HSN mappings, and registration headers. Doing this manually for cash checkouts causes line queues and auditing mistakes.
        </p>

        {/* Tip Callout */}
        <div className="bg-white/5 border-l-4 border-cyber-yellow p-4 rounded-r-xl flex items-start gap-3 my-6">
          <Info className="w-5 h-5 text-cyber-yellow shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm">
            <span className="font-black text-white block mb-0.5">Tip: Inclusive GST</span>
            <span>Always enter catalog items with tax-inclusive prices. It helps cashiers type final billing numbers faster without doing separate arithmetic formulas.</span>
          </div>
        </div>
      </section>

      {/* HSN Catalog Mapping */}
      <section id="hsn-mapping" className="content-reveal space-y-4">
        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
          2. HSN Catalog Mapping
        </h2>
        <p>
          An HSN (Harmonized System of Nomenclature) code categorizes retail products into standard tax levels. For instance:
        </p>

        {/* Table */}
        <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden my-6 select-none">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-white font-bold uppercase tracking-wider">
                <th className="py-3 px-4">HSN Code</th>
                <th className="py-3 px-4">Product Category</th>
                <th className="py-3 px-4">GST Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-semibold">
              <tr>
                <td className="py-3 px-4 font-mono">1006.30</td>
                <td className="py-3 px-4">Basmati Rice (Packed)</td>
                <td className="py-3 px-4 text-cyber-yellow">5% GST</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono">3401.11</td>
                <td className="py-3 px-4">Toilet Soaps</td>
                <td className="py-3 px-4 text-cyber-yellow">18% GST</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono">8518.21</td>
                <td className="py-3 px-4">LED Bulbs & Lamps</td>
                <td className="py-3 px-4 text-cyber-yellow">12% GST</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Automating Tax Splits & Demo */}
      <section id="tax-splits" className="content-reveal space-y-6">
        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
          3. Automating Tax Splits
        </h2>
        <p>
          For intrastate sales (within the same state), GST splits equally into CGST (Central GST) and SGST (State GST). Manually calculating this fraction for a bill of ₹1,180 with 18% inclusive tax takes time.
        </p>

        {/* Interactive Tax Splitter Calculator Demo */}
        <div className="bg-surface border border-white/10 p-6 rounded-3xl space-y-6 my-8 text-white select-none shadow-xl">
          <h4 className="text-xs font-black text-cyber-yellow uppercase tracking-widest flex items-center gap-1.5">
            Interactive Demo: GST Split Calculator
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-gray-400 font-bold block mb-1.5 uppercase">Bill Amount (₹)</label>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(Math.max(Number(e.target.value), 0))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-cyber-yellow focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 font-bold block mb-1.5 uppercase">GST Bracket (%)</label>
              <select
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-cyber-yellow focus:outline-none"
              >
                <option value="5">5% GST</option>
                <option value="12">12% GST</option>
                <option value="18">18% GST</option>
                <option value="28">28% GST</option>
              </select>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 p-4 rounded-2xl grid grid-cols-2 gap-4 text-xs font-bold font-mono">
            <div>
              <span className="text-[9px] text-gray-500 block uppercase font-bold">Taxable Value</span>
              <span className="text-sm font-black text-white mt-1 block">₹{taxableValue.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-[9px] text-gray-500 block uppercase font-bold">Total GST (SGST + CGST)</span>
              <span className="text-sm font-black text-cyber-yellow mt-1 block">₹{totalGST.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-[9px] text-gray-500 block uppercase font-bold">CGST Split ({taxRate/2}%)</span>
              <span className="text-sm font-black text-white mt-1 block">₹{cgst.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-[9px] text-gray-500 block uppercase font-bold">SGST Split ({taxRate/2}%)</span>
              <span className="text-sm font-black text-white mt-1 block">₹{sgst.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Thermal printing */}
      <section id="receipt-printing" className="content-reveal space-y-4">
        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
          4. Thermal Printing Setup
        </h2>
        <p>
          Once calculations are completed, the cashier issues thermal bills. High-speed printers use standardized ESC/POS layouts to roll and cut paper immediately.
        </p>

        {/* Warning Callout */}
        <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-3 my-6 text-red-200">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm">
            <span className="font-black text-white block mb-0.5">Warning: Printer DPI mismatches</span>
            <span>Configure margins correctly inside layout files to prevent print overlap truncation on 58mm vs 80mm roll rollers.</span>
          </div>
        </div>
      </section>

      {/* Compliance auditing */}
      <section id="compliance-audit" className="content-reveal space-y-4">
        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
          5. Auditing & GSTR Exports
        </h2>
        <p>
          At the end of the month, audit reports compile these transactions into structured spreadsheets. An automated system exports tax files straight to standard GSTR-1 templates, removing audit risks.
        </p>
      </section>

    </div>
  );
};
