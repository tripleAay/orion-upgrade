import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Eye, EyeOff, Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from '../firebase/Firebase'; // Fixed import path
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Header from '../components/Subhead';
import Subscribe from '../components/Subscribe';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const tabVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const inputVariants = {
  focus: { scale: 1.02, transition: { duration: 0.2 } },
  error: { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } },
};

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('individuals');
  const navigate = useNavigate();

  const showSuccessToast = () => {
    toast.success('Account Created Successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: { background: 'linear-gradient(to right, #00b09b, #96c93d)' },
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: { background: 'linear-gradient(to right, #ff0000, #ff6347)' },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      showErrorToast('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      showErrorToast('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email,
        username,
        country,
        currentBalance: 905000.0,
        brokerage: -48000.5,
        dividend: 21720.0,
        transactionPin: '0000', // Security note: Avoid storing sensitive data
      });

      localStorage.setItem('userDocId', user.uid);
      showSuccessToast();

      setTimeout(() => {
        setLoading(false);
        navigate('/applicationprocess');
      }, 3000);
    } catch (error) {
      console.error('Error creating account:', error.code, error.message);
      let errorMessage = 'An error occurred. Please try again.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak.';
          break;
        default:
          errorMessage = error.message;
      }
      setError(errorMessage);
      showErrorToast(errorMessage);
      setLoading(false);
    }
  };

  const individualItems = [
    'Personal and contact information',
    'Income and tax residency information',
    'Trading experience and objectives',
    'Bank account information',
  ];

  const institutionItems = [
    'Institutional and authorized signatory details',
    'Financial statements and corporate tax residency',
    'Institutional trading experience and investment goals',
    'Corporate bank account information',
  ];

  return (
    <>
      <Header />
      <motion.section
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-100 to-gray-200 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-300 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden my-14">
          {/* Left Side (Information) */}
          <motion.div
            className="p-8 sm:p-10 bg-indigo-900 dark:bg-gray-900 text-white"
            variants={childVariants}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              variants={childVariants}
            >
              Open an Orion Account
            </motion.h2>
            <motion.p
              className="mt-4 text-lg font-light"
              variants={childVariants}
            >
              It's easy. Here's how to get started:
            </motion.p>
            <ul className="mt-6 space-y-4">
              {[
                'Create a username and password',
                'Confirm your email address',
                'Complete the application',
              ].map((step, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  variants={childVariants}
                >
                  <span className="inline-block w-8 h-8 text-center font-bold bg-indigo-700 dark:bg-indigo-600 text-white rounded-full">
                    {index + 1}
                  </span>
                  <p className="ml-4 text-lg">{step}</p>
                </motion.li>
              ))}
            </ul>
            <motion.div className="mt-8" variants={childVariants}>
              <div className="flex space-x-4 border-b border-gray-400 pb-2">
                <motion.button
                  onClick={() => setActiveTab('individuals')}
                  className={`text-sm font-bold uppercase tracking-wide border-b-2 ${
                    activeTab === 'individuals'
                      ? 'border-white text-white'
                      : 'border-transparent text-gray-300 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Individuals
                </motion.button>
                <motion.button
                  onClick={() => setActiveTab('institutions')}
                  className={`text-sm uppercase tracking-wide ${
                    activeTab === 'institutions'
                      ? 'border-white text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Institutions
                </motion.button>
              </div>
              <AnimatePresence mode="wait">
                <motion.ul
                  key={activeTab}
                  className="mt-4 space-y-2 text-gray-300 text-sm"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {(activeTab === 'individuals' ? individualItems : institutionItems).map(
                    (item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        variants={childVariants}
                      >
                        <CheckCircle size={16} className="text-white mr-2" />
                        {item}
                      </motion.li>
                    )
                  )}
                </motion.ul>
              </AnimatePresence>
              <motion.p
                className="mt-6 text-sm"
                variants={childVariants}
              >
                Already have an account?{' '}
                <Link
                  to="/signin"
                  className="text-indigo-200 hover:text-white underline font-semibold"
                >
                  Sign In
                </Link>
              </motion.p>
            </motion.div>
          </motion.div>
          {/* Right Side (Form) */}
          <motion.div
            className="p-8 sm:p-10"
            variants={childVariants}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white"
              variants={childVariants}
            >
              Create a Username and Password
            </motion.h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* Email */}
              <motion.div
                variants={inputVariants}
                animate={error ? 'error' : ''}
                whileFocus="focus"
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <div className="relative mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200"
                    placeholder="Email"
                    aria-describedby={error ? 'email-error' : undefined}
                  />
                </div>
              </motion.div>
              {/* Username */}
              <motion.div
                variants={inputVariants}
                animate={error ? 'error' : ''}
                whileFocus="focus"
              >
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </label>
                <div className="relative mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200"
                    placeholder="Username"
                    aria-describedby={error ? 'username-error' : undefined}
                  />
                </div>
              </motion.div>
              {/* Password */}
              <motion.div
                variants={inputVariants}
                animate={error ? 'error' : ''}
                whileFocus="focus"
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200"
                    placeholder="Password"
                    aria-describedby={error ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </motion.div>
              {/* Confirm Password */}
              <motion.div
                variants={inputVariants}
                animate={error ? 'error' : ''}
                whileFocus="focus"
              >
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200"
                    placeholder="Confirm Password"
                    aria-describedby={error ? 'confirm-password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </motion.div>
              {/* Country */}
              <motion.div
                variants={inputVariants}
                animate={error ? 'error' : ''}
                whileFocus="focus"
              >
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Country
                </label>
                <div className="relative mt-1">
                  <select
                    id="country"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200 appearance-none"
                  >
                    <option value="">Select a country</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                  <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500 dark:text-gray-300">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>
                </div>
              </motion.div>
              {/* Error Message */}
              {error && (
                <motion.p
                  id="form-error"
                  className="text-red-500 text-sm text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.p>
              )}
              {/* Submit Button */}
              <motion.div variants={childVariants}>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-300 relative overflow-hidden disabled:opacity-50"
                  aria-busy={loading}
                >
                  {loading ? (
                    <motion.span
                      className="flex justify-center items-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Loader size={20} />
                    </motion.span>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.section>
      <Subscribe />
    </>
  );
};

export default Signup;