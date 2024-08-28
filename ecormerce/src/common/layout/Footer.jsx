import React from "react";

function Footer() {
  return (
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <h1 class="text-xl font-bold">Your Company</h1>
          <p class="text-sm">© 2024 Your Company. All rights reserved.</p>
        </div>
        <div class="flex space-x-6">
          <p class="text-gray-400 hover:text-white">About Us</p>
          <p class="text-gray-400 hover:text-white">Privacy Policy</p>
          <p class="text-gray-400 hover:text-white">Contact</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
