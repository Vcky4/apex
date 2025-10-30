import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  onClick?: () => void;
}

export interface LayoutProps {
  children: React.ReactNode;
  navigation: NavItem[];
  logo: React.ReactNode;
  userMenu: React.ReactNode;
  organizationSwitcher?: React.ReactNode;
  vertical?: 'education' | 'healthcare' | 'manufacturing' | 'super-admin';
  sidebarColor?: string; // Custom sidebar color class (e.g., 'bg-executive-gold', 'bg-authority-purple')
}

export const AdminLayout: React.FC<LayoutProps> = ({
  children,
  navigation,
  logo,
  userMenu,
  organizationSwitcher,
  vertical = 'super-admin',
  sidebarColor,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const notifications = [
    { id: 1, title: 'New grade posted', message: 'Math Quiz #5 graded', time: '2 hours ago', read: false, type: 'grade' },
    { id: 2, title: 'Attendance alert', message: 'Low attendance in Physics class', time: '5 hours ago', read: false, type: 'alert' },
    { id: 3, title: 'Parent message', message: 'Message from Mrs. Johnson', time: '1 day ago', read: true, type: 'message' },
    { id: 4, title: 'Assignment due', message: 'English essay due tomorrow', time: '1 day ago', read: true, type: 'reminder' },
    { id: 5, title: 'System update', message: 'Platform maintenance scheduled', time: '2 days ago', read: true, type: 'system' },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'grade': return '📝';
      case 'alert': return '⚠️';
      case 'message': return '💬';
      case 'reminder': return '⏰';
      case 'system': return '🔧';
      default: return '📌';
    }
  };
  
  const verticalColors = {
    education: 'bg-authority-purple',
    healthcare: 'bg-healthcare-red',
    manufacturing: 'bg-industrial-gray',
    'super-admin': 'bg-apex-deep-blue',
  };

  // Use custom sidebar color if provided, otherwise use vertical default
  const sidebarBgClass = sidebarColor || verticalColors[vertical];

  // Breadcrumbs helper with better label mapping
  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', href: '/' }];
    
    const labelMap: { [key: string]: string } = {
      'admin': 'Admin',
      'owner': 'Owner Portal',
      'principal': 'Principal Portal',
      'vice-principal': 'Vice Principal Portal',
      'operations': 'Operations Portal',
      'department': 'Department Portal',
      'student': 'Student Portal',
      'teacher': 'Teacher Portal',
      'parent': 'Parent Portal',
      'dashboard': 'Dashboard',
      'finance': 'Financial Management',
      'budget': 'Budget Planning',
      'revenue': 'Revenue Analytics',
      'investments': 'Investment Tracking',
      'academics': 'Academic Administration',
      'curriculum': 'Curriculum Oversight',
      'performance': 'Teacher Performance',
      'calendar': 'Academic Calendar',
      'discipline': 'Discipline Management',
      'support': 'Student Support',
      'activities': 'Activities Coordination',
      'facilities': 'Facilities Management',
      'transport': 'Transport Administration',
      'staff': 'Support Staff Management',
      'quality': 'Academic Quality',
      'resources': 'Resource Management',
      'student-affairs': 'Student Affairs',
    };
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      // Check if segment is a department name (dynamic route param)
      let label = labelMap[segment] || segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Handle department names specially
      if (segment === 'department' && pathSegments[index + 1]) {
        const deptName = pathSegments[index + 1];
        const deptNames: { [key: string]: string } = {
          science: 'Science',
          mathematics: 'Mathematics',
          english: 'English',
          social: 'Social Studies',
        };
        label = `${deptNames[deptName] || deptName} Department`;
      }
      
      breadcrumbs.push({ label, href: currentPath });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  
  return (
    <div className="flex h-screen bg-light-gray">
      {/* Sidebar */}
      <aside className={`w-64 ${sidebarBgClass} text-white flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          {logo}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigation.map((item, idx) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
              const NavComponent = item.onClick ? 'button' : Link;
              const navProps = item.onClick 
                ? { onClick: item.onClick, className: `flex items-center px-4 py-3 rounded-lg transition-colors w-full text-left ${
                    isActive ? 'bg-white/20' : 'hover:bg-white/10'
                  }` }
                : { to: item.href, className: `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-white/20' : 'hover:bg-white/10'
                  }` };
              return (
                <li key={idx}>
                  <NavComponent {...navProps}>
                    {item.icon && <span className="mr-3">{item.icon}</span>}
                    <span className="font-medium">{item.label}</span>
                  </NavComponent>
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
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg hover:bg-gray-100 relative"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowNotifications(false)}
                    />
                    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[600px] overflow-y-auto">
                      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                          <button className="text-sm text-authority-purple hover:text-opacity-80">
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                              !notification.read ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => setShowNotifications(false)}
                          >
                            <div className="flex items-start space-x-3">
                              <span className="text-2xl flex-shrink-0">{getNotificationIcon(notification.type)}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <p className="font-semibold text-gray-900 text-sm">{notification.title}</p>
                                  {!notification.read && (
                                    <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 ml-2 mt-1"></span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-gray-200 text-center">
                        <button className="text-sm text-authority-purple hover:text-opacity-80 font-medium">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {userMenu}
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Breadcrumbs */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.href}>
                  {index > 0 && (
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-charcoal-gray font-medium">{crumb.label}</span>
                  ) : (
                    <Link to={crumb.href} className="text-gray-600 hover:text-charcoal-gray transition">
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
