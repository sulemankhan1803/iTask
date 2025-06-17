import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-violet-800 text-white shadow-md px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-semibold tracking-tight">
          iTask
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-base font-medium">
          <li className="cursor-pointer hover:underline underline-offset-4 transition-all duration-200">
            Home
          </li>
          <li className="cursor-pointer hover:underline underline-offset-4 transition-all duration-200">
            Your Tasks
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
