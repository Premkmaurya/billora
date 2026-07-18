import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      monthlyPrice: '₹0',
      yearlyPrice: '₹0',
      period: 'forever',
      desc: 'Perfect for small local vendors and kiosks starting out.',
      features: [
        'Up to 100 invoices/month',
        'Thermal printer printing',
        'UPI QR payments code',
        'Basic sales ledger',
        '1 Device login',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Starter',
      monthlyPrice: '₹499',
      yearlyPrice: '₹399',
      period: 'month',
      desc: 'Best for growing retail shops and local stores.',
      features: [
        'Unlimited invoices',
        'Offline billing mode support',
        'WhatsApp invoice sharing',
        'GSTR-1 Excel reports export',
        'Basic inventory warnings',
        '3 Device logins',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Professional',
      monthlyPrice: '₹999',
      yearlyPrice: '₹799',
      period: 'month',
      desc: 'Advanced controls for chains and larger operations.',
      features: [
        'Everything in Starter',
        'Multi-device real-time sync',
        'Automated re-order inventory alerts',
        'Customer credit balance accounts',
        'Custom invoice layouts logo',
        'Dedicated 24/7 priority support',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div
      id="pricing"
      className="relative bg-dark-bg text-white py-32 px-6 md:px-12 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-cyber-yellow block mb-3">
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 select-none">
            Simple, predictable pricing.
          </h2>
          <p className="text-gray-400 font-medium text-sm md:text-base">
            Choose the plan that suits your billing desk. Save 20% by subscribing to yearly billing plans.
          </p>
        </div>

        {/* Dynamic Billing Toggle Switch */}
        <div className="flex items-center gap-3 bg-surface border border-white/10 p-1.5 rounded-full mb-16 select-none">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2.5 rounded-full font-bold text-xs transition-all ${
              billingCycle === 'monthly'
                ? 'bg-cyber-yellow text-dark-text shadow-md scale-105'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all ${
              billingCycle === 'yearly'
                ? 'bg-cyber-yellow text-dark-text shadow-md scale-105'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Yearly Billing
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 font-black rounded uppercase text-[8px]">
              Save 20%
            </span>
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl items-stretch">
          {plans.map((plan, idx) => {
            const currentPrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
            return (
              <div
                key={idx}
                className={`bg-surface border p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative shadow-xl hover:scale-[1.02] ${
                  plan.popular
                    ? 'border-cyber-yellow ring-2 ring-cyber-yellow/20'
                    : 'border-white/5 hover:border-white/15'
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-cyber-yellow text-dark-text text-[9px] font-black tracking-widest uppercase rounded-full shadow-lg">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-semibold mb-6">{plan.desc}</p>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-8">
                    <span className="text-4xl md:text-5xl font-black text-white font-mono">{currentPrice}</span>
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      / {plan.period}
                    </span>
                  </div>

                  <div className="h-px bg-white/5 mb-8" />

                  {/* Features list */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-xs text-gray-300 font-medium">
                        <Check className="w-4 h-4 text-cyber-yellow shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to action */}
                <a
                  href="#trial"
                  className={`w-full py-4 text-center text-xs font-black rounded-full transition-transform duration-200 hover:scale-[1.02] flex items-center justify-center gap-1.5 ${
                    plan.popular
                      ? 'bg-cyber-yellow text-dark-text'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
