/**
 * Highway Delite - Footer Component
 * Copyright (c) 2025 Omkar (HiOmkarrr)
 * Author: Omkar | GitHub: @HiOmkarrr
 */

import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Highway Delite</h3>
            <p className="text-gray-400 text-sm">
              Your gateway to unforgettable travel experiences across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-primary transition">Home</a></li>
              <li><a href="#" className="hover:text-primary transition">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition">Contact</a></li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Developer</h4>
            <div className="text-gray-400 text-sm space-y-2">
              <p>Developed by <span className="text-primary font-semibold">Omkar</span></p>
              <p>GitHub: <a 
                href="https://github.com/HiOmkarrr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @HiOmkarrr
              </a></p>
              <p className="text-xs mt-3">
                Created as part of internship application - October {currentYear}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Highway Delite. Developed by Omkar (
            <a 
              href="https://github.com/HiOmkarrr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @HiOmkarrr
            </a>
            ). All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            This code is original work created for internship evaluation purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
