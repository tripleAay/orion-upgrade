import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import mapImage from '../assets/images/map-solo-.png';

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

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const Discovery = () => {
  return (
    <section className="py-16 bg-[#E2E8DD] dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div className="space-y-8" variants={childVariants}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Discover a World of Opportunities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              Invest globally in stocks, options, futures, currencies, bonds, and funds from a single unified platform.
              Fund your account in multiple currencies and trade assets in various denominations. Access market data 24/6.
            </p>
            <div className="flex flex-wrap gap-12">
              {[
                { value: '150', label: 'Markets' },
                { value: '34', label: 'Countries' },
                { value: '27', label: 'Currencies' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={statVariants}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</p>
                  <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            <motion.div variants={childVariants}>
              <Link to="/global-markets">
                <button
                  className="inline-block px-8 py-4 text-base font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 ease-in-out transform hover:scale-105"
                  aria-label="Explore Global Markets"
                >
                  Global Markets
                </button>
              </Link>
            </motion.div>
           
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="flex justify-center items-center"
            variants={childVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <img
              src={mapImage}
              alt="Global Markets World Map"
              className="w-full h-80 lg:h-96 object-cover "
              loading="lazy"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Discovery;