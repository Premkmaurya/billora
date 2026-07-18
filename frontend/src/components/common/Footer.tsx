import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const productLinks = [
    { name: 'Features', href: '/features', isRouter: true },
    { name: 'Pricing Plans', href: '/#pricing', isRouter: false },
    { name: 'Product Roadmap', href: '#', isRouter: false },
  ];

  const solutionsLinks = [
    { name: 'Grocery Shops', href: '/#about', isRouter: false },
    { name: 'Medical Stores', href: '/#about', isRouter: false },
    { name: 'Garment Outlets', href: '/#about', isRouter: false },
    { name: 'Food Restaurants', href: '/#about', isRouter: false },
  ];

  const resourceLinks = [
    { name: 'Documentation', href: '#', isRouter: false },
    { name: 'Developer APIs', href: '#', isRouter: false },
    { name: 'Business Blog', href: '/resources/how-to-create-gst-invoice', isRouter: true },
    { name: 'Support Center', href: '/#faq', isRouter: false },
  ];

  const companyLinks = [
    { name: 'Careers', href: '#', isRouter: false },
    { name: 'Privacy Policy', href: '#', isRouter: false },
    { name: 'Terms of Service', href: '#', isRouter: false },
    { name: 'Contact Sales', href: '/#trial', isRouter: false },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to the Billora Newsletter!');
  };

  return (
    <footer className="bg-dark-bg text-gray-400 py-20 px-6 md:px-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        
        {/* Logo and Newsletter */}
        <div className="md:col-span-5 flex flex-col items-start text-left">
          <Link to="/" className="flex items-center gap-2 group mb-6">
            <div className="w-8 h-8 rounded-lg bg-cyber-yellow flex items-center justify-center font-black text-dark-text text-xl transition-transform duration-300 group-hover:scale-105">
              B
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyber-yellow transition-colors">
              Billora
            </span>
          </Link>
          <p className="text-xs text-gray-400 max-w-sm mb-6 leading-relaxed font-medium">
            The ultra-speed offline-first billing platform designed for modern Indian commerce and local businesses.
          </p>

          <form onSubmit={handleSubscribe} className="w-full max-w-md">
            <label className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-gray-200 block mb-2">
              Subscribe to Newsletter
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter shop email"
                required
                className="w-full bg-surface border border-white/10 rounded-full px-5 py-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyber-yellow/40 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1.5 p-2.5 bg-cyber-yellow text-dark-text rounded-full hover:scale-105 active:scale-95 transition-all"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Links Columns */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 text-left">
          {/* Column 1 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Product</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  {link.isRouter ? (
                    <Link to={link.href} className="text-xs hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-xs hover:text-white transition-colors duration-200">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Solutions</h4>
            <ul className="space-y-2">
              {solutionsLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-xs hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-xs hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-xs hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[10px] font-semibold text-gray-500">
          © {new Date().getFullYear()} Billora Technologies Private Limited. All rights reserved.
        </span>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="w-8 h-8 rounded-full bg-surface border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/15 transition-all" aria-label="Twitter">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-surface border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/15 transition-all" aria-label="GitHub">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-surface border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/15 transition-all" aria-label="Support">
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
