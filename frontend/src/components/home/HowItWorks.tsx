import React, { useEffect, useRef } from 'react';
import { UserPlus, PlusCircle, FileSpreadsheet, Share2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.step-card-anim'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Create Account',
      desc: 'Set up your shop name and GST details in less than 60 seconds.',
      icon: UserPlus,
    },
    {
      num: '02',
      title: 'Add Products',
      desc: 'Import catalogs via Excel sheet or scan items in using barcode guns.',
      icon: PlusCircle,
    },
    {
      num: '03',
      title: 'Generate Invoice',
      desc: 'Scan, hit enter, and watch CGST/SGST splits calculate live.',
      icon: FileSpreadsheet,
    },
    {
      num: '04',
      title: 'Print or Share',
      desc: 'Send links straight to client WhatsApp or fire ESC/POS thermal printers.',
      icon: Share2,
    },
  ];

  return (
    <div
      ref={containerRef}
      id="how-it-works"
      className="relative bg-cyber-yellow text-dark-text py-28 px-6 md:px-12 curved-top-lg curved-bottom-lg"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-2xl mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-3">
            Workflow
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            Up and running in minutes.
          </h2>
          <p className="text-dark-text/80 font-medium text-sm md:text-base">
            No complex installations or database configurations required. Just sign up, list stocks, and print invoices.
          </p>
        </div>

        {/* 4 Steps Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="step-card-anim bg-dark-bg text-white p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[220px] border border-white/5 shadow-xl hover:scale-[1.03] transition-transform duration-300 group"
              >
                {/* Large Background Number */}
                <div className="absolute right-4 top-2 text-6xl font-black text-white/5 select-none font-mono group-hover:text-cyber-yellow/10 transition-colors duration-300">
                  {step.num}
                </div>

                <div className="p-3 bg-cyber-yellow/10 text-cyber-yellow rounded-xl w-max mb-6">
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-semibold">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
