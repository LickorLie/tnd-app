import React from 'react';
import { Sparkles, Heart, Users } from 'lucide-react';

type GameTheme = '🍍' | 'lovers' | 'friends';

interface ThemeSelectorProps {
  currentTheme: GameTheme;
  onThemeChange: (theme: GameTheme) => void;
  disabled?: boolean;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
  disabled
}) => {
  const themes = [
    { 
      id: '🍍' as GameTheme, 
      icon: Sparkles,
      emoji: '🍍🍑🍆',
      label: 'Spicy Edition',
      description: 'For open-minded swingers 💦',
      gradient: 'from-pink-400 via-rose-500 to-red-600'
    },
    { 
      id: 'lovers' as GameTheme, 
      icon: Heart,
      emoji: '👅🫦🤤',
      label: 'Lovers Edition',
      description: 'For passionate couples 💘',
      gradient: 'from-red-400 via-pink-500 to-purple-600'
    },
    { 
      id: 'friends' as GameTheme, 
      icon: Users,
      emoji: '😈😏😘',
      label: 'Friends Edition',
      description: 'For adventurous friends 🔥',
      gradient: 'from-purple-400 via-fuchsia-500 to-pink-600'
    }
  ];

  return (
    <div className="space-y-6 group ">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => !disabled && onThemeChange(theme.id)}
          
          disabled={disabled}
          className={`w-full p-8 rounded-2xl flex flex-col items-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
            currentTheme === theme.id
              ? `bg-gradient-to-r ${theme.gradient} text-white shadow-xl group-hover:bg-none group-hover:bg-white/90 group-hover:backdrop-blur-sm group-hover:text-gray-800 group-hover:bg-white border group-hover:border-white/20 hover:bg-white hover:border hover:border-white/20 group-hover:hover:bg-gradient-to-r group-hover:hover:${theme.gradient} group-hover:hover:text-white group-hover:hover:shadow-xl`
              : `bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white border border-white/20 hover:bg-gradient-to-r hover:${theme.gradient} hover:text-white hover:shadow-xl`
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className="flex items-center justify-center mb-2">
            <theme.icon size={32} className="mr-3" />
            <span className="text-2xl font-bold">{theme.label}</span>
          </div>
          <div className="text-3xl mb-2">{theme.emoji}</div>
          <p className="text-lg opacity-90">{theme.description}</p>
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;