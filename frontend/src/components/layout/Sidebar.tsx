import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  FileText,
  Tags,
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { setSidebarOpen } from '../../lib/redux/uiSlice';

export const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  const navItems = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { name: 'Invoices', path: ROUTES.INVOICES, icon: FileText },
    { name: 'Products', path: ROUTES.PRODUCTS, icon: Package },
    { name: 'Customers', path: ROUTES.CUSTOMERS, icon: Users },
    { name: 'Categories', path: ROUTES.CATEGORIES, icon: Tags },
    { name: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-surface border-r border-white/10 z-50 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
            <NavLink to={ROUTES.DASHBOARD} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyber-yellow flex items-center justify-center font-black text-dark-text text-xl">
                B
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Billora <span className="text-[10px] text-cyber-yellow font-mono uppercase tracking-widest px-1.5 py-0.5 bg-cyber-yellow/10 rounded border border-cyber-yellow/20">POS</span>
              </span>
            </NavLink>
            <button
              onClick={() => dispatch(setSidebarOpen(false))}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === ROUTES.DASHBOARD}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                      isActive
                        ? 'bg-cyber-yellow text-dark-text shadow-lg shadow-cyber-yellow/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer User & Logout */}
        <div className="p-4 border-t border-white/10 space-y-3">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-xl border border-white/5">
              <div className="w-9 h-9 rounded-full bg-cyber-yellow text-dark-text font-black flex items-center justify-center text-xs">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-cyber-yellow font-mono uppercase font-semibold">{user.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-xs text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
