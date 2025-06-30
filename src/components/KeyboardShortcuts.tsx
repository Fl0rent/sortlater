import React, { useState } from 'react';
import { Keyboard, X } from 'lucide-react';

interface KeyboardShortcutsProps {
  theme: 'light' | 'dark';
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDark = theme === 'dark';

  const shortcuts = [
    { key: 'Ctrl/Cmd + K', description: 'Add new link' },
    { key: 'Ctrl/Cmd + D', description: 'Toggle theme' },
    { key: 'Tab', description: 'Switch between Active/Archived' },
    { key: 'Ctrl/Cmd + F', description: 'Focus search' },
    { key: 'Ctrl/Cmd + E', description: 'Export links' },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 p-3 rounded-full ${isDark ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} backdrop-blur-sm border ${isDark ? 'border-white/20' : 'border-gray-200'} transition-all duration-200 shadow-lg`}
        title="Keyboard shortcuts"
      >
        <Keyboard className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-xl p-6 max-w-md w-full shadow-2xl`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Keyboard Shortcuts
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className={`p-1 rounded ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {shortcut.description}
              </span>
              <kbd className={`px-2 py-1 rounded text-sm font-mono ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};