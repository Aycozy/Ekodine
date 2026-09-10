import { Link, useLocation } from 'react-router-dom';
import { 
  Home, BookOpen, Clock, Target, Calendar, BarChart2, 
  Bot, Compass, Settings, LogOut
} from 'lucide-react';
import React from 'react';

const navItems = [
  { section: 'Reading', items: [
    { label: 'Dashboard', path: '/', icon: Home },
    { label: 'Library', path: '/library', icon: BookOpen },
    { label: 'Session', path: '/reading/session', icon: Clock },
  ]},
  { section: 'Growth', items: [
    { label: 'Goals', path: '/goals', icon: Target },
    { label: 'Journal', path: '/journal', icon: Calendar },
    { label: 'Analytics', path: '/analytics', icon: BarChart2 },
  ]},
  { section: 'AI Coach', items: [
    { label: 'Chat', path: '/ai-coach', icon: Bot, badge: 'New' },
    { label: 'Discover', path: '/discover', icon: Compass },
  ]},
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[90] md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <BookOpen size={20} color="white" />
          </div>
          <div>
            <h1>PageMind</h1>
            <span>Life OS for Readers</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((section, idx) => (
            <React.Fragment key={idx}>
              <div className="sidebar-section-title">{section.section}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                               (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      if (window.innerWidth <= 768) onClose();
                    }}
                  >
                    <Icon />
                    <span>{item.label}</span>
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                  </Link>
                );
              })}
            </React.Fragment>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link 
            to="/settings" 
            className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
          >
            <Settings />
            <span>Settings</span>
          </Link>
          <button className="nav-item w-full text-left mt-2" onClick={() => console.log('logout')}>
            <LogOut />
            <span>Sign out</span>
          </button>
          
          <div className="sidebar-user mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <div className="sidebar-user-avatar">
              AR
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">Alex Reader</div>
              <div className="sidebar-user-level">Level 12 Scholar</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
