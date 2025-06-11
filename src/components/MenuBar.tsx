import React from 'react';
import { Home, Gift, MessageCircle } from 'lucide-react';

interface MenuBarProps {
  activeTab: 'home' | 'ads' | 'contact';
  setActiveTab: (tab: 'home' | 'ads' | 'contact') => void;
  hasUnlockedRewards?: boolean;
}

const MenuBar: React.FC<MenuBarProps> = ({ activeTab, setActiveTab, hasUnlockedRewards }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe-area z-50 shadow-lg">
      <ul className="flex justify-around items-center h-16">
        <li>
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center w-20 h-full ${
              activeTab === 'home' ? 'text-purple-600' : 'text-gray-600'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>
        </li>
        <li className="relative">
          <button
            onClick={() => setActiveTab('ads')}
            className={`flex flex-col items-center justify-center w-20 h-full ${
              activeTab === 'ads' ? 'text-purple-600' : 'text-gray-600'
            }`}
          >
            <Gift size={24} />
            <span className="text-xs mt-1">Rewards</span>
            {hasUnlockedRewards && (
              <span className="absolute top-0 right-2 w-3 h-3 bg-red-500 rounded-full"></span>
            )}
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex flex-col items-center justify-center w-20 h-full ${
              activeTab === 'contact' ? 'text-purple-600' : 'text-gray-600'
            }`}
          >
            <MessageCircle size={24} />
            <span className="text-xs mt-1">Contact</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MenuBar;