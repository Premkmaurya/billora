import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FeaturesFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'Does Billora support Indian GST?',
      answer: 'Yes, fully. Configure SGST, CGST, and IGST rates by HSN codes. The system splits taxes automatically on invoice lines and lets you download returns-ready GSTR-1 Excel templates.',
    },
    {
      question: 'Can I print invoices with standard billing printers?',
      answer: 'Absolutely. Billora connects natively with standard 2-inch and 3-inch thermal POS receipt printers using USB, Bluetooth, or network ports, with customized receipt footers.',
    },
    {
      question: 'Does Billora work without active internet?',
      answer: 'Yes, offline billing is a core feature. Run checkouts, search inventory items, and print bills offline. All data syncs safely to the cloud when connections resume.',
    },
    {
      question: 'Can multiple employees use the software simultaneously?',
      answer: 'Yes. Add billing employees, assign role-based credentials (like billing-only desks or manager controls), and sync sales data across devices in real time.',
    },
    {
      question: 'Can I import my existing store inventory catalog?',
      answer: 'Yes. Download our standard spreadsheet import sheet, paste your catalog data, and upload the file to add hundreds of products with details in seconds.',
    },
    {
      question: 'Can I share invoices directly to WhatsApp?',
      answer: 'Yes. Billora generates secure PDF share links that can be sent automatically to customer numbers via SMS or WhatsApp, saving A4 paper sheets.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      id="faq"
      className="relative bg-cyber-yellow text-dark-text py-28 px-6 md:px-12 curved-top-lg curved-bottom-lg"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-3">
          FAQ
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16 text-center">
          Features FAQ
        </h2>

        <div className="w-full space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-dark-bg/5 hover:bg-dark-bg/10 border border-dark-text/10 rounded-2xl overflow-hidden transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm md:text-base text-dark-text focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-dark-text"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 text-xs md:text-sm text-dark-text/75 leading-relaxed font-semibold">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
