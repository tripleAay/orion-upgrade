import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase/Firebase'; // Adjust path if needed
import { doc, updateDoc } from 'firebase/firestore';
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

const inputVariants = {
  focus: { scale: 1.02, transition: { duration: 0.2 } },
  error: { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } },
};

const ApplicationProcess = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip: '',
    phone_type: 'Mobile',
    location: 'United States',
    phone_number: '',
    mailingAddress: false,
    birthOutsideUS: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const showSuccessToast = () => {
    toast.success('Form Submission Successful!', {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requiredFields = ['first_name', 'last_name', 'address_line1', 'city', 'state', 'zip', 'phone_number'];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setError('Please fill out all required fields.');
      showErrorToast('Please fill out all required fields.');
      setLoading(false);
      return;
    }

    const docId = localStorage.getItem('userDocId');
    if (!docId) {
      setError('User not found. Please sign up again.');
      showErrorToast('User not found. Please sign up again.');
      setLoading(false);
      navigate('/signup');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', docId);
      await updateDoc(userDocRef, {
        ...formData,
        address_line2: formData.address_line2 || null,
      });

      showSuccessToast();
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 2000);

      setFormData({
        first_name: '',
        last_name: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        zip: '',
        phone_type: 'Mobile',
        location: 'United States',
        phone_number: '',
        mailingAddress: false,
        birthOutsideUS: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setError('An error occurred. Please try again.');
      showErrorToast('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <motion.section
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-100 to-gray-200 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-300 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 sm:p-10 my-14">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header */}
            <motion.div className="text-center" variants={childVariants}>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
                Personal Information
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Fill out the form below with accurate information.
              </p>
            </motion.div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Section */}
              <motion.div className="space-y-6" variants={childVariants}>
                <motion.div variants={inputVariants} animate={error ? 'error' : ''} whileFocus="focus">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Required"
                    className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200"
                    required
                    aria-describedby={error ? 'firstName-error' : undefined}
                  />
                </motion.div>
                <motion.div variants={inputVariants} animate={error ? 'error' : ''} whileFocus="focus">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Required"
                    className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200"
                    required
                    aria-describedby={error ? 'lastName-error' : undefined}
                  />
                </motion.div>
                <motion.div variants={inputVariants} animate={error ? 'error' : ''} whileFocus="focus">
                  <label
                    htmlFor="address1"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Address Line One
                  </label>
                  <input
                    id="address1"
                    name="address_line1"
                    type="text"
                    value={formData.address_line1}
                    onChange={handleChange}
                    placeholder="Building Number and Street Name"
                    className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200"
                    required
                    aria-describedby={error ? 'address1-error' : undefined}
                  />
                </motion.div>
              </motion.div>
              {/* Right Section */}
              <motion.div className="space-y-6" variants={childVariants}>
                <motion.div variants={inputVariants} animate={error ? 'error' : ''} whileFocus="focus">
                  <label
                    htmlFor="address2"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Address Line Two
                  </label>
                  <input
                    id="address2"
                    name="address_line2"
                    type="text"
                    value={formData.address_line2}
                    onChange={handleChange}
                    placeholder="Apt, Suite, Floor, etc."
                    className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200"
                  />
                </motion.div>
                <motion.div variants={inputVariants} animate={error ? 'error' : ''} whileFocus="focus">
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Required"
                    className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200"
                    required
                    aria-describedby={error ? 'city-error' : undefined}
                  />
                </motion.div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div variants={inputVariants} animate={error ? 'error' : ''} whileFocus="focus">
                    <label
                      htmlFor="state"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      State
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Required"
                      className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200"
                      required
                      aria-describedby={error ? 'state-error' : undefined}
                    />
                  </motion.div>
                  <motion.div variants={inputVariants} animate={error ? 'error' : ''} whileFocus="focus">
                    <label
                      htmlFor="zip"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Zip Code
                    </label>
                    <input
                      id="zip"
                      name="zip"
                      type="text"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="Required"
                      className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200"
                      required
                      aria-describedby={error ? 'zip-error' : undefined}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
            {/* Checkboxes */}
            <motion.div className="space-y-4" variants={childVariants}>
              <div className="flex items-center">
                <input
                  id="mailingAddress"
                  name="mailingAddress"
                  type="checkbox"
                  checked={formData.mailingAddress}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="mailingAddress"
                  className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Different mailing address
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="birthOutsideUS"
                  name="birthOutsideUS"
                  type="checkbox"
                  checked={formData.birthOutsideUS}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="birthOutsideUS"
                  className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Born outside of the U.S.
                </label>
              </div>
            </motion.div>
            {/* Phone Section */}
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" variants={childVariants}>
              <motion.div variants={inputVariants} animate={error ? 'error' : ''} whileFocus="focus">
                <label
                  htmlFor="phoneType"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Phone Type
                </label>
                <select
                  id="phoneType"
                  name="phone_type"
                  value={formData.phone_type}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200 appearance-none"
                >
                  <option value="Mobile">Mobile</option>
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                </select>
              </motion.div>
              <motion.div variants={inputVariants} animate={error ? 'error' : ''} whileFocus="focus">
                <label
                  htmlFor="location"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200 appearance-none"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Other">Other</option>
                </select>
              </motion.div>
            </motion.div>
            {/* Phone Number */}
            <motion.div variants={inputVariants} animate={error ? 'error' : ''} whileFocus="focus">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Required"
                className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-gray-200"
                required
                aria-describedby={error ? 'phoneNumber-error' : undefined}
              />
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
            <motion.div className="flex justify-end mt-6" variants={childVariants}>
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-300 relative overflow-hidden disabled:opacity-50"
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
                  'Submit'
                )}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.section>
      <Subscribe />
    </>
  );
};

export default ApplicationProcess;