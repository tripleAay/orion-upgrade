import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Getstarted from './components/Getstarted';
import Discovery from './components/Discovery';
import WhoWeServe from './components/WhoWeServe';
import ForecastTrader from './components/ForecastTrader';
import Subscribe from './components/Subscribe';
import SignIn from './pages/Signin';
import Signup from './pages/Signup';

function Home() {
  return (
    <>
      <Header />
      <Getstarted />
      <Discovery />
      <WhoWeServe />
      <ForecastTrader />
      <Subscribe />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
