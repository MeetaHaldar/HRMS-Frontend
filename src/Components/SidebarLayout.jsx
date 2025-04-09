import React, { useState } from 'react';
// import { Menu, X } from 'lucide-react'; // Optional icons (install `lucide-react`)
import { Link } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";


const menuItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Dashboard Listings', to: '/listings1' },
  { label: 'Dashboard Listings', to: '/listings2' },
  { label: 'Dashboard Listings', to: '/listings3' },
  { label: 'Organisations', to: '/organisations', active: true },
  { label: 'Dashboard Listings', to: '/listings4' },
  { label: 'Logs & Reports', to: '/logs' },
  { label: 'Support', to: '/support' },
  { label: 'Help', to: '/help' },
];

const SidebarLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
    
      {/* Sidebar */}
      <div className={`fixed z-30 lg:static lg:translate-x-0 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64 bg-white shadow-lg border-r`}>
        <div className="flex items-center justify-between px-4 py-4 lg:hidden">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={() => setSidebarOpen(false)}>
          <RxCross1 />
          </button>
        </div>
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition ${
                item.active ? 'bg-gray-200 font-semibold text-gray-900' : 'text-gray-600'
              }`}
            >
              <span className="w-5 h-5 bg-gray-300 rounded-full"></span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between p-4 bg-white shadow-md lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
          <IoIosMenu />
          </button>
          <span className="text-xl font-semibold">My App</span>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default SidebarLayout;
