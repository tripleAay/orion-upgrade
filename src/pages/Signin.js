import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/images/logocopy.png';
import { auth, db } from '../firebase/Firebase'; // Adjusted import path
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Subhead from '../components/Subhead'; // Adjusted import path

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const inputVariants = {
  focus: { scale: 1.02, transition: { duration: 0.2 } },
  error: { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } },
};

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const showSuccessToast = () => {
    toast.success('Sign-In Successful!', {
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

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        localStorage.setItem('userDocId', userId);
      } else {
        console.log('No such document!');
      }

      showSuccessToast();
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error signing in:', error.code, error.message);
      let errorMessage = 'An error occurred. Please try again.';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please try again later.';
          break;
        default:
          errorMessage = 'Invalid credentials. Please try again.';
      }
      setError(errorMessage);
      showErrorToast(errorMessage);
      setLoading(false);
    }
  };

  return (
    <>
      <Subhead />
      <motion.section
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-100 to-gray-200 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-300 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl max-w-md w-full p-8 sm:p-10"
          variants={containerVariants}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.img
              src={logo}
              alt="Orion Logo"
              className="w-28 mx-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <motion.div
              className="relative"
              variants={inputVariants}
              animate={error ? 'error' : ''}
              whileFocus="focus"
            >
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 dark:text-gray-300">
                  <Mail size={20} />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200"
                  required
                  aria-describedby={error ? 'email-error' : undefined}
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              className="relative"
              variants={inputVariants}
              animate={error ? 'error' : ''}
              whileFocus="focus"
            >
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 dark:text-gray-300">
                  <Lock size={20} />
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200"
                  required
                  aria-describedby={error ? 'password-error' : undefined}
                />
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

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/email"
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold transition-colors"
              >
                Reset Password
              </Link>
            </div>

            {/* Submit Button */}
            <motion.div>
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
                  'Sign In'
                )}
              </button>
            </motion.div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </motion.section>
    </>
  );
};

export default SignIn;