import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import chartImage from '../assets/images/photo-1553729459-efe14ef6055d.jpg';

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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: {
    scale: 1.03,
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
    transition: { duration: 0.3 },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)',
    transition: { duration: 0.2 },
  },
};

const ForecastTrader = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 overflow-hidden">
      {/* Full-Width Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-50 dark:opacity-60"
        style={{ backgroundImage: `url(${chartImage})` }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-indigo-900/50 dark:from-black/80 dark:to-purple-900/60"></div>

      {/* Content with 15% Side Padding */}
      <motion.div
        className="relative z-10 px-[15%] py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-12" variants={childVariants}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Trade Economic & Climate Trends
          </h1>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            With IBKR ForecastTrader, trade your predictions on economic and climate indicators using exchange-listed Forecast Contracts. Earn{' '}
            <span className="font-bold text-indigo-400">4.33% APY</span> with an incentive coupon.
          </p>
        </motion.div>

        {/* Forecast Card */}
        <motion.div
          className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-900/60 dark:bg-gray-800/80 backdrop-blur-md"
          variants={cardVariants}
          whileHover="hover"
        >
          {/* Card Content */}
          <div className="p-8 sm:p-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6">
              Will the US Consumer Price Index exceed 2.5% this month?
            </h3>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
              <div className="flex items-center gap-4">
                <motion.button
                  className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  aria-label="Vote Yes"
                >
                  Yes
                </motion.button>
                <span className="text-gray-200 text-lg">$0.62 (62%)</span>
              </div>
              <div className="flex items-center gap-4">
                <motion.button
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  aria-label="Vote No"
                >
                  No
                </motion.button>
                <span className="text-gray-200 text-lg">$0.38 (38%)</span>
              </div>
            </div>
            {/* Chart Placeholder */}
            <motion.div
              className="w-full h-48 bg-gray-800/50 rounded-lg flex items-center justify-center overflow-hidden"
              variants={childVariants}
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-gray-400 text-sm">Interactive Chart Preview</span>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div className="text-center mt-12" variants={childVariants}>
          <Link to="/forecast-trader">
            <motion.button
              className="inline-block px-12 py-5 text-lg font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50"
              variants={buttonVariants}
              whileHover="hover"
              aria-label="Learn More about ForecastTrader"
            >
              Learn More
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ForecastTrader;