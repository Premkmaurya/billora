import React from 'react';

export const AuthorCard: React.FC = () => {
  return (
    <div className="bg-surface/50 border border-white/5 p-6 md:p-8 rounded-3xl text-left max-w-[740px] mx-auto flex flex-col sm:flex-row gap-6 items-center shadow-xl select-none">
      {/* Photo Avatar */}
      <div className="w-16 h-16 rounded-full bg-cyber-yellow text-dark-text font-black flex items-center justify-center text-xl shrink-0">
        AD
      </div>

      {/* Info details */}
      <div className="flex-1 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-base font-black text-white">Aditya Sharma</h4>
            <span className="text-[10px] text-cyber-yellow font-bold uppercase tracking-wider">
              Tax Advisor & Writer
            </span>
          </div>

          <div className="flex gap-2">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
              aria-label="Author LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            
            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
              aria-label="Author Twitter"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-semibold">
          Aditya focuses on GST compliance, tax bracket updates, and digital bookkeeping setups for retail businesses in India.
        </p>
      </div>
    </div>
  );
};
