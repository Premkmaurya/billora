import React, { useEffect, useRef } from 'react';
import { MessageSquare, QrCode, Printer } from 'lucide-react';
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

  const hardwareBrands = [
    { name: 'Epson Printers', type: 'Thermal Rollers' },
    { name: 'TVS Electronics', type: 'ESC/POS Rollers' },
    { name: 'Zebra Scanners', type: 'Laser Guns' },
    { name: 'NGX Devices', type: 'Handheld POS' },
    { name: 'WhatsApp API', type: 'Official Chat' },
    { name: 'Google Drive', type: 'Cloud Backups' },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-dark-bg text-white py-28 px-6 md:px-12 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="integ-reveal text-center max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-cyber-yellow block mb-3">
            Hardware & APIs
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            Compatible with standard retail hardware.
          </h2>
          <p className="text-gray-400 font-medium text-xs md:text-sm">
            Billora interfaces natively with thermal receipt rollers, handheld barcode scanners, UPI payment systems, and secure cloud repositories.
          </p>
        </div>

        {/* Brand Badges Loop */}
        <div className="integ-reveal w-full overflow-hidden relative py-6 mb-16 select-none">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 w-max animate-marquee whitespace-nowrap">
            {[...hardwareBrands, ...hardwareBrands].map((brand, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-surface border border-white/5 px-5 py-3 rounded-2xl"
              >
                <div className="w-2 h-2 rounded-full bg-cyber-yellow" />
                <div>
                  <span className="text-xs font-bold text-white block">{brand.name}</span>
                  <span className="text-[9px] text-gray-500 font-bold block">{brand.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Integrations Grid */}
        <div className="integ-reveal grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left">
          
          {/* Col 1 */}
          <div className="bg-surface/50 border border-white/5 hover:border-white/12 p-6 rounded-3xl flex flex-col justify-between min-h-[220px] transition-colors duration-300">
            <div>
              <MessageSquare className="w-8 h-8 text-cyber-yellow mb-4" />
              <h3 className="text-base font-bold mb-1">Software Channels</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                Share invoices directly to WhatsApp numbers, upload database sheets to Google Drive, and import catalogs via Excel.
              </p>
            </div>
            <div className="flex gap-2 mt-4 text-[9px] font-bold">
              <span className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded">WhatsApp</span>
              <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 rounded">GDrive</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="bg-surface/50 border border-white/5 hover:border-white/12 p-6 rounded-3xl flex flex-col justify-between min-h-[220px] transition-colors duration-300">
            <div>
              <QrCode className="w-8 h-8 text-cyber-yellow mb-4" />
              <h3 className="text-base font-bold mb-1">UPI Payments</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                Generate merchant QR codes dynamically to accept instant phone checkouts, mapping transaction totals automatically.
              </p>
            </div>
            <div className="flex gap-2 mt-4 text-[9px] font-bold">
              <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded">BHIM UPI</span>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded">Razorpay</span>
            </div>
          </div>

          {/* Col 3 */}
          <div className="bg-surface/50 border border-white/5 hover:border-white/12 p-6 rounded-3xl flex flex-col justify-between min-h-[220px] transition-colors duration-300">
            <div>
              <Printer className="w-8 h-8 text-cyber-yellow mb-4" />
              <h3 className="text-base font-bold mb-1">Receipt Hardware</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                Compatible with all ESC/POS thermal printers and handheld barcode scanners. Plug in via USB or sync via Bluetooth.
              </p>
            </div>
            <div className="flex gap-2 mt-4 text-[9px] font-bold">
              <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded">ESC/POS</span>
              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded">Bluetooth</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
