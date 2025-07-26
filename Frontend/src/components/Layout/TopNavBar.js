import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const TopNavBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="flex justify-end items-center bg-white border-b border-gray-200 p-4 shadow-sm sticky top-0 z-30">
      {/* Notification Bell */}
      <button
        className="relative mr-6 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Notifications"
      >
        <BellIcon className="h-6 w-6 text-gray-600" />
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
          3
        </span>
      </button>

      {/* User Info */}
      <div
        className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-100 transition"
        title="User Profile"
      >
        <UserCircleIcon className="h-8 w-8 text-gray-700" />
        <span className="font-medium text-gray-800 select-none">
          {user?.username || 'Admin'}
        </span>
      </div>
    </header>
  );
};

export default TopNavBar;
