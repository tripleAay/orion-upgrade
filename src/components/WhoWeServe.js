import React from 'react';
import { motion } from 'framer-motion';
import financialAdvisorsImg from '../assets/images/photo-1542744173-8e7e53415bb0 (1).jpg';
import businessOwnersImg from '../assets/images/photo-1557426272-fc759fdf7a8d.jpg';
import ccosImg from '../assets/images/premium_photo-1661775434014-9c0e8d71de03.jpg';

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
    scale: 1.05,
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    transition: { duration: 0.3 },
  },
};

const WhoWeServe = () => {
  const cards = [
    {
      title: 'Financial Advisors',
      image: financialAdvisorsImg,
      description: 'Empower your clients with cutting-edge investment tools and insights.',
    },
    {
      title: 'Business Owners',
      image: businessOwnersImg,
      description: 'Grow your enterprise with tailored financial strategies and global access.',
    },
    {
      title: 'CCOs',
      image: ccosImg,
      description: 'Streamline compliance and risk management with our unified platform.',
    },
  ];

  return (
    <section className="py-20 bg-[#E2E8DD] transition-colors duration-300">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-12 tracking-tight"
          variants={childVariants}
        >
          Who We Serve
        </motion.h1>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg bg-gray-900/50 dark:bg-gray-800/50 group"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Image with Overlay */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-72 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm opacity-90">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhoWeServe;