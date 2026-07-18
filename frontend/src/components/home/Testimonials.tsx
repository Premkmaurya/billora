import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Star, MapPin } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  ownerName: string;
  businessName: string;
  businessType: string;
  location: string;
  avatarInitials: string;
  color: string;
}

export const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Billora cut down our billing time by 80%. Customers love receiving their invoices directly on WhatsApp. Thermal printing works plug-and-play without any driver setup.",
      ownerName: "Rajesh Kumar",
      businessName: "Kumar Provisions",
      businessType: "Grocery Retail",
      location: "Delhi, NCR",
      avatarInitials: "RK",
      color: "from-amber-500 to-orange-600",
    },
    {
      id: 2,
      quote: "The offline support is a lifesaver. Our store's internet connection drops constantly, but with Billora, the checkout counter never stops. It syncs to cloud automatically.",
      ownerName: "Priya Sharma",
      businessName: "Threadcraft Boutique",
      businessType: "Retail Apparel",
      location: "Mumbai, MH",
      avatarInitials: "PS",
      color: "from-pink-500 to-rose-600",
    },
    {
      id: 3,
      quote: "Managing manual GST calculations was our biggest checkout headache. Billora splits CGST and SGST automatically and generates perfect monthly GSTR-1 excel sheets.",
      ownerName: "Amit Patel",
      businessName: "Patel Pharmacy",
      businessType: "Retail Chemist",
      location: "Ahmedabad, GJ",
      avatarInitials: "AP",
      color: "from-sky-500 to-indigo-600",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <div
      id="testimonials"
      className="relative bg-cyber-yellow text-dark-text py-28 px-6 md:px-12 curved-top-lg curved-bottom-lg"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-dark-text/70 block mb-3">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            Trusted by the owners.
          </h2>
          <p className="text-dark-text/80 font-medium text-sm md:text-base">
            Read how retail shop owners across India are cutting down queues and filing GST using Billora.
          </p>
        </div>

        {/* Carousel box */}
        <div className="w-full bg-dark-bg text-white border border-white/10 rounded-3xl p-8 md:p-12 relative shadow-2xl overflow-hidden min-h-[340px] flex flex-col justify-between">
          <Quote className="w-12 h-12 text-cyber-yellow/10 absolute right-8 top-8 select-none" />

          {/* Testimonial text block */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="text-left"
              >
                {/* Stars */}
                <div className="flex text-cyber-yellow gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-gray-100 mb-8 max-w-3xl">
                  "{current.quote}"
                </blockquote>

                {/* Owner profile details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${current.color} flex items-center justify-center font-black text-white text-sm shadow-md`}>
                      {current.avatarInitials}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{current.ownerName}</h4>
                      <span className="text-xs text-cyber-yellow font-medium">
                        {current.businessName} • {current.businessType}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full w-max">
                    <MapPin className="w-3.5 h-3.5 text-cyber-yellow" />
                    <span>{current.location}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-white/5">
            <button
              onClick={handlePrev}
              className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 hover:border-white/20 transition-all active:scale-95"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-cyber-yellow text-dark-text rounded-full hover:scale-105 transition-all active:scale-95"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
