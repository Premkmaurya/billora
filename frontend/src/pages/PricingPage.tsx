import React from 'react';

const PricingPage: React.FC = () => (
  <section className="bg-dark-bg min-h-[80vh] text-white py-24 px-6 md:px-12">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-black mb-6">Pricing Plans</h1>
      <p className="text-lg text-white/80 leading-relaxed mb-6">
        Choose the plan that fits your team. Billora offers transparent billing tiers and powerful features for teams of every size.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyber-yellow font-semibold mb-4">Starter</p>
          <p className="text-4xl font-black mb-4">Free</p>
          <p className="text-sm text-white/70 leading-relaxed">Basic billing tools for individuals and small teams.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyber-yellow font-semibold mb-4">Growth</p>
          <p className="text-4xl font-black mb-4">$29/mo</p>
          <p className="text-sm text-white/70 leading-relaxed">Advanced automation and reporting for scaling businesses.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyber-yellow font-semibold mb-4">Enterprise</p>
          <p className="text-4xl font-black mb-4">Custom</p>
          <p className="text-sm text-white/70 leading-relaxed">Tailored workflows, dedicated support, and enterprise compliance.</p>
        </div>
      </div>
    </div>
  </section>
);

export default PricingPage;
