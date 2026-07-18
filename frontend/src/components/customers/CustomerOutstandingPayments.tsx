import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, CreditCard } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CustomerOutstandingPayments: React.FC = () => {
  const [payStatus, setPayStatus] = useState<'pending' | 'paid'>('pending');
  const [whatsappSent, setWhatsappSent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.out-reveal'),
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

  const handleWhatsapp = () => {
    setWhatsappSent(true);
    setTimeout(() => setWhatsappSent(false), 3000);
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-cyber-yellow text-dark-text py-28 px-6 md:px-12 curved-top-lg curved-bottom-lg border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Copy */}
        <div className="out-reveal lg:col-span-5 text-left flex flex-col items-start">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-4">
            Outstanding Recovery
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight select-none">
            Recover outstanding payments 3x faster.
          </h2>
          <p className="text-dark-text/80 font-medium text-sm md:text-base mb-8 leading-relaxed max-w-md">
            Never forget credits ledger outstanding sums. Send secure PDF payment reminders straight to WhatsApp with single clicks, or mark logs as settled.
          </p>

          <div className="px-4 py-2 rounded-xl text-xs font-black border bg-dark-text/5 border-dark-text/10 text-dark-text">
            Result: 80% reduction in customer payment follow-up time.
          </div>
        </div>

        {/* Right Side: Showcase */}
        <div className="out-reveal lg:col-span-7 bg-neutral-950 text-white rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden text-left min-h-[320px] flex flex-col justify-between">
          <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
            <span className="text-[10px] text-gray-500 font-mono">Dues Collector</span>
            <span className="text-[9px] text-cyber-yellow font-bold uppercase">Account ID: Rahul Verma</span>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
              <div>
                <span className="text-[9px] text-gray-400 block uppercase font-bold">Outstanding balance</span>
                <span className="text-2xl font-black text-white font-mono mt-1 block">₹12,450.00</span>
              </div>
              <span className={`px-2.5 py-1 border rounded-full text-[10px] uppercase font-bold ${
                payStatus === 'paid'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/10 border-red-500/20 text-red-400 animate-pulse'
              }`}>
                {payStatus === 'paid' ? 'Paid' : 'Overdue (12 Days)'}
              </span>
            </div>

            {/* Reminder CTA Panel */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleWhatsapp}
                disabled={payStatus === 'paid'}
                className="flex-1 px-4 py-2.5 bg-cyber-yellow text-dark-text rounded-xl font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                <MessageSquare className="w-4 h-4" />
                {whatsappSent ? 'Reminder Sent!' : 'Send WhatsApp Reminder'}
              </button>
              <button
                onClick={() => setPayStatus(payStatus === 'pending' ? 'paid' : 'pending')}
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-cyber-yellow" />
                {payStatus === 'paid' ? 'Revert to Pending' : 'Mark as Paid'}
              </button>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center text-[10px] text-gray-500 font-bold border-t border-white/5 pt-4">
            <span>Automatic credit balances sync</span>
            <span className="text-emerald-400">Secure Ledger API</span>
          </div>
        </div>

      </div>
    </div>
  );
};
