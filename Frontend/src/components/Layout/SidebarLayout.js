import React, { useContext } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import { AuthContext } from '../../context/AuthContext';

const SidebarLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/add-expense', label: 'Add Expense' },
    { path: '/analytics', label: 'Analytics' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <TopNavBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between shadow-lg">
          <div>
            <h2 className="text-3xl font-extrabold mb-8 text-indigo-700 select-none cursor-default">
              Expense Tracker
            </h2>
            <nav className="space-y-3">
              {navItems.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`block rounded-lg px-4 py-3 text-lg font-medium transition-colors
                    ${
                      location.pathname === path
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                    }`}
                  aria-current={location.pathname === path ? 'page' : undefined}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 rounded-lg text-red-600 font-semibold hover:bg-red-100 transition"
            aria-label="Logout"
          >
            Logout <span className="font-normal text-gray-600">({user?.username || 'User'})</span>
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
