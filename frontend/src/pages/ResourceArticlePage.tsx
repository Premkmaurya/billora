import React from 'react';
import { ReadingProgress } from '../components/resources/ReadingProgress';
import { ArticleHero } from '../components/resources/ArticleHero';
import { ArticleTOC } from '../components/resources/ArticleTOC';
import { ArticleContent } from '../components/resources/ArticleContent';
import { AuthorCard } from '../components/resources/AuthorCard';
import { RelatedArticles } from '../components/resources/RelatedArticles';
import { Newsletter } from '../components/resources/Newsletter';
import { ArticleCTA } from '../components/resources/ArticleCTA';

const ResourceArticlePage: React.FC = () => {
  return (
    <main className="w-full bg-dark-bg text-white min-h-screen relative">
      {/* Scroll tracking bar & progress indicators */}
      <ReadingProgress />

      {/* 2. Article Hero (Cover layout) */}
      <ArticleHero />

      {/* 3 & 4. Table of Contents + Article Content split */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Sticky TOC Column (span 3) */}
        <aside className="lg:col-span-3 lg:sticky lg:top-28">
          <ArticleTOC />
        </aside>

        {/* Right Article Content Column (span 9) */}
        <div className="lg:col-span-9 space-y-16 flex flex-col items-start">
          <ArticleContent />
          
          {/* 5. Author Card directly under content */}
          <AuthorCard />
        </div>
      </div>

      {/* 6. Related Articles */}
      <RelatedArticles />

      {/* 7. Newsletter Box */}
      <Newsletter />

      {/* 8. Final Conversion CTA */}
      <ArticleCTA />
    </main>
  );
};

export default ResourceArticlePage;
