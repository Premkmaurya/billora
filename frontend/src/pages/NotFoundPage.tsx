import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <section className="bg-dark-bg min-h-screen text-white flex items-center justify-center px-6 py-24">
    <div className="max-w-2xl text-center">
      <h1 className="text-5xl font-black mb-6">404</h1>
      <p className="text-lg text-white/70 mb-8">
        The page you are looking for doesn’t exist. Head back to the homepage to continue.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-full bg-cyber-yellow px-6 py-3 text-sm font-semibold text-dark-bg transition hover:bg-yellow-300"
      >
        Go Home
      </Link>
    </div>
  </section>
);

export default NotFoundPage;
