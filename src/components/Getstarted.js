import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import bannerImage from '../assets/images/pagebanner.jpg';

// Animation variants for smooth entrance
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const GetStarted = () => {
  return (
    <motion.section
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-b from-indigo-950 to-purple-950 overflow-hidden"
      style={{ backgroundImage: `url(${bannerImage})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-purple-900/60"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-wide"
          variants={childVariants}
        >
          Empower Your Business <br className="sm:hidden" />
          <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Your Way
          </span>
        </motion.h1>
        <motion.p
          className="mt-6 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-light tracking-wide"
          variants={childVariants}
        >
          Cutting-edge technology and investment solutions tailored to your firm's vision.
        </motion.p>
        <motion.div className="mt-10" variants={childVariants}>
          <Link to="/application">
            <button
              className="inline-block px-12 py-5 text-lg font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50"
              aria-label="Get Started with Your Business"
            >
              Get Started
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default GetStarted;