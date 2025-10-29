import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

export interface LayoutProps {
  children: React.ReactNode;
  navigation: NavItem[];
  logo: React.ReactNode;
  userMenu: React.ReactNode;
  organizationSwitcher?: React.ReactNode;
  vertical?: 'education' | 'healthcare' | 'manufacturing' | 'super-admin';
}

export const AdminLayout: React.FC<LayoutProps> = ({
  children,
  navigation,
  logo,
  userMenu,
  organizationSwitcher,
  vertical = 'super-admin',
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const verticalColors = {
    education: 'bg-authority-purple',
    healthcare: 'bg-healthcare-red',
    manufacturing: 'bg-industrial-gray',
    'super-admin': 'bg-apex-deep-blue',
  };
  
  return (
    <div className="flex h-screen bg-light-gray">
      {/* Sidebar */}
      <aside className={`w-64 ${verticalColors[vertical]} text-white flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          {logo}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigation.map((item, idx) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
              return (
                <li key={idx}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                  >
                    {item.icon && <span className="mr-3">{item.icon}</span>}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                  {item.children && (
                    <ul className="ml-8 mt-2 space-y-1">
                      {item.children.map((child, childIdx) => {
                        const isChildActive = location.pathname === child.href;
                        return (
                          <li key={childIdx}>
                            <Link
                              to={child.href}
                              className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                                isChildActive ? 'bg-white/20' : 'hover:bg-white/10'
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {/* Search Bar */}
              <div className="hidden md:block">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-apex-deep-blue"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {organizationSwitcher}
              
              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {userMenu}
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
