import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const startFreeButtonRef = useRef<HTMLAnchorElement>(null);
  const arrowOutRef = useRef<SVGSVGElement>(null);
  const arrowInRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const button = startFreeButtonRef.current;
    const arrowOut = arrowOutRef.current;
    const arrowIn = arrowInRef.current;
    if (!button || !arrowOut || !arrowIn) return;

    const hoverIn = () => {
      gsap.to(arrowOut, {
        y: -12,
        x: 5,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(arrowIn, {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.08,
        ease: "power2.out",
      });
    };

    const hoverOut = () => {
      gsap.to(arrowOut, {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(arrowIn, {
        y: 12,
        x: 5,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    button.addEventListener("mouseenter", hoverIn);
    button.addEventListener("mouseleave", hoverOut);

    return () => {
      button.removeEventListener("mouseenter", hoverIn);
      button.removeEventListener("mouseleave", hoverOut);
    };
  }, []);

  const navLinks = [
    { name: "Features", href: "/features", isRouter: true },
    { name: "Customers", href: "/customers", isRouter: true },
    { name: "Resources", href: "/resources", isRouter: true },
    { name: "About", href: "/about", isRouter: true },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-dark-bg/60 backdrop-blur-2xl border-b border-white/10 py-4"
            : "bg-transparent border-b border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-cyber-yellow flex items-center justify-center font-black text-dark-text text-xl transition-transform duration-300 group-hover:scale-105">
              B
            </div>
            <span className={`font-extrabold text-xl tracking-tight transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-black'}`}>
              Billora
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isRouter ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`navbar-link text-sm font-medium duration-200 transition-colors ${isScrolled ? 'text-white' : 'text-black'}`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`navbar-link text-sm font-medium duration-200 transition-colors ${isScrolled ? 'text-white' : 'text-black'}`}
                >
                  {link.name}
                </a>
              )
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-black'}`}>
              Login
            </Link>
            <Link
              to="/signup"
              ref={startFreeButtonRef}
              className="px-5 py-2.5 bg-cyber-yellow text-dark-text text-sm font-semibold rounded-full hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              <span className="flex items-center gap-2">
                <span>Start Free</span>
                <span className="relative w-4 h-4">
                  <ArrowUpRight
                    ref={arrowOutRef}
                    className="absolute inset-0 w-4 h-4"
                  />
                  <ArrowUpRight
                    ref={arrowInRef}
                    className="absolute inset-0 w-4 h-4 opacity-0"
                  />
                </span>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-cyber-yellow transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-screen bg-dark-bg z-30 pt-28 px-6 flex flex-col gap-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                link.isRouter ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="navbar-link text-2xl font-bold text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="navbar-link text-2xl font-bold text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
            <div className="w-full h-px bg-white/10 my-4" />
            <div className="flex flex-col gap-4">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 border border-white/10 rounded-full font-medium text-white hover:bg-white/5 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-cyber-yellow text-dark-text rounded-full font-semibold hover:bg-cyber-yellow/90 transition-colors"
              >
                Start Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
