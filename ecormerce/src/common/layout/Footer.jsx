import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-bold">Your Company</h1>
          <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <p className="text-gray-400 hover:text-white">About Us</p>
          <p className="text-gray-400 hover:text-white">Privacy Policy</p>
          <p className="text-gray-400 hover:text-white">Contact</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
