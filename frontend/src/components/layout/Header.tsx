import React from 'react';
import { Menu, Plus, Building2, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { toggleSidebar } from '../../lib/redux/uiSlice';
import { useOrganization } from '../../hooks/useOrganization';
import { ROUTES } from '../../constants/routes';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name: orgName } = useOrganization();

  return (
    <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300">
          <Building2 size={14} className="text-cyber-yellow" />
          <span className="truncate max-w-[150px] sm:max-w-[250px]">{orgName}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(ROUTES.INVOICE_CREATE)}
          className="px-4 py-2 bg-cyber-yellow text-dark-text font-extrabold text-xs rounded-xl hover:scale-105 transition-transform flex items-center gap-1.5 shadow-lg shadow-cyber-yellow/10"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">New Invoice</span>
        </button>

        <button
          className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyber-yellow" />
        </button>
      </div>
    </header>
  );
};
