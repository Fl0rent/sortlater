import React from 'react';
import { BookOpen, Archive } from 'lucide-react';

interface EmptyStateProps {
  type: 'active' | 'archived';
  theme: 'light' | 'dark';
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, theme }) => {
  const isActive = type === 'active';
  const isDark = theme === 'dark';
  
  return (
    <div className="text-center py-16">
      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
        isActive 
          ? isDark ? 'bg-green-500/20 border border-green-500/30' : 'bg-blue-100'
          : isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100'
      }`}>
        {isActive ? (
          <BookOpen className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-blue-600'}`} />
        ) : (
          <Archive className={`w-8 h-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        )}
      </div>
      
      <h3 className={`text-lg font-medium ${isDark ? 'text-green-400' : 'text-gray-900'} mb-2`}>
        {isActive ? 'No active links yet' : 'No archived links yet'}
      </h3>
      
      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-sm mx-auto`}>
        {isActive 
          ? 'Add your first link above to get started with your reading list.'
          : 'Links you\'ve read will appear here. Click on any active link to read and archive it automatically.'
        }
      </p>
    </div>
  );
};