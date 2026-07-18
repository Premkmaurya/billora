import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'Do I need an active internet connection to generate bills?',
      answer: 'No. Billora is built offline-first. You can perform high-speed checkouts, scan items via barcodes, and print receipt copies completely offline. Your store data will sync securely to the cloud when internet connection is restored.',
    },
    {
      question: 'Does Billora support standard thermal receipt printers?',
      answer: 'Yes! Billora supports all standard USB and Bluetooth thermal printers (2-inch and 3-inch sizes). It connects natively using ESC/POS protocols. You can customize the store header, footer notes, and logo in settings.',
    },
    {
      question: 'How are UPI payments integrated on the receipts?',
      answer: 'Billora dynamically generates a secure BHIM UPI QR code containing your transaction value. This QR is shown on screen and printed directly onto thermal receipts. Customers scan to pay, avoiding manual card machines.',
    },
    {
      question: 'Is Indian GST split calculated automatically?',
      answer: 'Yes, fully automated. Configure GST brackets (5%, 12%, 18%, 28%) and HSN codes for your products. The billing screen auto-calculates total tax, splitting the details into CGST, SGST, and IGST headers instantly.',
    },
    {
      question: 'Can I import my existing catalog using Excel?',
      answer: 'Absolutely. You can import thousands of items in under a minute by downloading our standard excel template, mapping your product columns, and uploading the file directly on the dashboard.',
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
          Frequently Asked Questions
        </h2>

        {/* Accordion List */}
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
                      <div className="px-6 pb-6 text-xs md:text-sm text-dark-text/75 leading-relaxed font-medium">
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
