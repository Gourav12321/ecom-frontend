import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-10 px-4 z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Gourav Maurya</h1>
          <p className="text-gray-400 md:ml-6 md:mt-2 mt-0">
            MERN Stack Developer
          </p>
        </div>

        {/* Center Section (Social Links) */}
        <div className="flex space-x-6 mt-6 md:mt-0">
          <a href="https://github.com/Gourav12321" className="text-gray-400 hover:text-white  " target='blank'>
            <FaGithub size={25} />
          </a>
          <a href="https://www.linkedin.com/in/gourav-maurya-1b516a303/" className="text-gray-400 hover:text-white " target='blank'>
            <FaLinkedin size={25} />
          </a>
          <a href="https://www.instagram.com/gourav_maurya426/" className="text-gray-400 hover:text-white " target='blank'>
            <FaInstagram size={25} />
          </a>
        </div>

        {/* Right Section */}
        <div className="mt-6 md:mt-0 text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Gourav Maurya. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
