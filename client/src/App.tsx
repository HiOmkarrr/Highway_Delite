/**
 * Highway Delite - Travel Experiences Booking Platform
 * Copyright (c) 2025 Omkar (HiOmkarrr)
 * 
 * This software was developed as part of an internship application.
 * All rights reserved. Unauthorized use, reproduction, or distribution 
 * of this code without express written permission is strictly prohibited.
 * 
 * Author: Omkar
 * GitHub: @HiOmkarrr
 * Created: October 2025
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ExperienceDetails from './pages/ExperienceDetails';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience/:id" element={<ExperienceDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
};

export default App;
