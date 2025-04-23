import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import logo from '../assets/images/logo.png';

// Animation variants for dropdown and mobile menu
const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeOut' } },
};

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const classList = document.documentElement.classList;
    if (darkMode) {
      classList.add('dark');
    } else {
      classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const menuItems = [
    {
      label: 'Why Orion',
      links: [
        ['Our Vision', '/vision'],
        ['Testimonials', '/testimonials'],
        ['Case Studies', '/case-studies'],
        ['Partnerships', '/partnerships'],
        ['FAQs', '/faqs'],
      ],
    },
    {
      label: 'Trading',
      links: [
        ['Market Overview', '/market-overview'],
        ['Stock Trading', '/stock-trading'],
        ['Forex Trading', '/forex-trading'],
        ['Crypto Trading', '/crypto-trading'],
        ['Trading Strategies', '/trading-strategies'],
      ],
    },
    {
      label: 'Services',
      links: [
        ['Portfolio Management', '/portfolio-management'],
        ['Financial Advisory', '/financial-advisory'],
        ['Market Research', '/market-research'],
        ['Investment Plans', '/investment-plans'],
        ['Risk Assessment', '/risk-assessment'],
      ],
    },
    {
      label: 'Careers',
      links: [
        ['Job Openings', '/job-openings'],
        ['Internships', '/internships'],
        ['Company Culture', '/company-culture'],
        ['Employee Benefits', '/employee-benefits'],
        ['Join Us', '/join-us'],
      ],
    },
    {
      label: 'About Us',
      links: [
        ['Our Story', '/our-story'],
        ['Meet the Team', '/meet-the-team'],
        ['Press Releases', '/press-releases'],
        ['Contact Us', '/contact-us'],
        ['Privacy Policy', '/privacy-policy'],
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-indigo-900/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg transition-colors duration-300 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Dark Mode Toggle */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="Orion Logo" className="h-11 w-auto" />
          <button
            onClick={toggleDarkMode}
            className="text-gray-200 dark:text-white hover:text-indigo-400 dark:hover:text-yellow-400 transition-colors"
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-200 dark:text-white">
          {menuItems.map((menu, i) => (
            <div key={i} className="group relative">
              <button className="hover:text-indigo-400 dark:hover:text-yellow-400 transition-colors">
                {menu.label}
              </button>
              <AnimatePresence>
                <motion.div
                  className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 shadow-xl rounded-lg hidden group-hover:flex flex-col w-52 z-50"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {menu.links.map(([name, path], j) => (
                    <Link
                      key={j}
                      to={path}
                      className="px-4 py-2 text-gray-700 dark:text-white hover:bg-indigo-100 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                      {name}
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex gap-3">
          <Link to="/signin">
            <button className="px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors">
              Log In
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors">
              Open Account
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-200 dark:text-white hover:text-indigo-400"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="md:hidden bg-indigo-900/90 dark:bg-gray-900/90 backdrop-blur-md px-6 py-4"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {menuItems.map((menu, i) => (
              <div key={i} className="py-2">
                <button className="text-gray-200 dark:text-white font-medium hover:text-indigo-400 transition-colors">
                  {menu.label}
                </button>
                <div className="mt-2 flex flex-col">
                  {menu.links.map(([name, path], j) => (
                    <Link
                      key={j}
                      to={path}
                      className="px-4 py-2 text-gray-300 dark:text-gray-200 hover:bg-indigo-800 dark:hover:bg-gray-700 rounded transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors">
                  Log In
                </button>
              </Link>
              <Link to="/application" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors">
                  Open Account
                </button>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;