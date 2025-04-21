import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {  Twitter, Linkedin, Instagram } from 'lucide-react';

// Animation variants for smooth entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    transition: { duration: 0.3 },
  },
};

const Subscribe = () => {
  return (
    <footer className="py-16 bg-[#050517] transition-colors duration-300">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top Section: CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
          <motion.div className="text-center lg:text-left mb-8 lg:mb-0" variants={childVariants}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Ready to Transform Your Future?
            </h2>
            <p className="text-gray-300 max-w-md mx-auto lg:mx-0">
              Connect with Orion’s team to explore tailored solutions and services for your financial goals.
            </p>
          </motion.div>
          <motion.div variants={childVariants}>
            <Link to="/application">
              <motion.button
                className="inline-block px-10 py-4 text-lg font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50"
                variants={buttonVariants}
                whileHover="hover"
                aria-label="Get Started with Orion"
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Section: Links and Newsletter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <motion.div className="text-center sm:text-left" variants={childVariants}>
            <h3 className="text-xl font-semibold text-white mb-4">Orion</h3>
            <p className="text-gray-300 mb-6">
              Stay informed with the latest market insights, wealthtech trends, and exclusive updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 mt-18">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label="Email for newsletter"
              />
              <motion.button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                aria-label="Subscribe to Newsletter"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>

          {/* Navigation Links */}
          <motion.div className="text-center sm:text-left" variants={childVariants}>
            <h3 className="text-xl font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              {[
                { label: 'Why Orion', to: '/why-orion' },
                { label: 'Trading', to: '/trading' },
                { label: 'Services', to: '/services' },
                { label: 'Careers', to: '/careers' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div className="text-center sm:text-left" variants={childVariants}>
            <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                { label: 'Contact Us', to: '/contact-us' },
                { label: 'FAQs', to: '/faqs' },
                { label: 'Privacy Policy', to: '/privacy-policy' },
                { label: 'Terms of Service', to: '/terms' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div className="text-center sm:text-left" variants={childVariants}>
            <h3 className="text-xl font-semibold text-white mb-4">Connect</h3>
            <div className="flex justify-center sm:justify-start gap-4">
              {[
                { Icon: Twitter, to: 'https://twitter.com', label: 'Twitter' },
                { Icon: Linkedin, to: 'https://linkedin.com', label: 'LinkedIn' },
                { Icon: Instagram, to: 'https://instagram.com', label: 'Instagram' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.Icon size={24} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-20 pt-8 border-t border-gray-700 text-center text-gray-400"
          variants={childVariants}
        >
          <p className='mt-10'>&copy; {new Date().getFullYear()} Orion. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Subscribe;