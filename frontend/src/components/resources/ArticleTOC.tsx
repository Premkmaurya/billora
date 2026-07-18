import React, { useState, useEffect } from 'react';
import { Menu, ChevronDown, ChevronUp } from 'lucide-react';

interface TOCItem {
  id: string;
  label: string;
}

export const ArticleTOC: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('intro');
  const [isOpen, setIsOpen] = useState(false);

  const items: TOCItem[] = [
    { id: 'intro', label: '1. Introduction to GST' },
    { id: 'hsn-mapping', label: '2. HSN Catalog Mapping' },
    { id: 'tax-splits', label: '3. Automating Tax Splits' },
    { id: 'receipt-printing', label: '4. Thermal Printing Setup' },
    { id: 'compliance-audit', label: '5. Auditing & GSTR Exports' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full">
      {/* Mobile Accordion */}
      <div className="lg:hidden w-full bg-surface border border-white/10 rounded-2xl p-4 mb-8 text-left select-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center text-xs font-black uppercase tracking-wider"
        >
          <span className="flex items-center gap-2"><Menu className="w-4 h-4 text-cyber-yellow" /> Table of Contents</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isOpen && (
          <ul className="mt-4 space-y-2.5 border-t border-white/5 pt-4 text-xs font-bold">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left w-full transition-colors ${
                    activeId === item.id ? 'text-cyber-yellow' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block w-full text-left">
        <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 font-mono select-none">
          ON THIS PAGE
        </h4>
        <ul className="space-y-4 text-xs font-bold select-none">
          {items.map((item) => (
            <li key={item.id} className="relative pl-4">
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeId === item.id ? 'bg-cyber-yellow scale-100' : 'bg-transparent scale-0'
                }`}
              />
              <button
                onClick={() => scrollToSection(item.id)}
                className={`text-left transition-colors duration-200 ${
                  activeId === item.id ? 'text-cyber-yellow' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
