import React from 'react';
import { ExternalLink, Archive, RotateCcw, Trash2, Clock, Tag, Folder } from 'lucide-react';
import { Link } from '../types/link';

interface LinkCardProps {
  link: Link;
  onRead: (id: number) => void;
  onRestore: (id: number) => void;
  onDelete: (id: number) => void;
  theme: 'light' | 'dark';
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, onRead, onRestore, onDelete, theme }) => {
  const isDark = theme === 'dark';

  const handleReadClick = () => {
    window.open(link.url, '_blank');
    onRead(link.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() === new Date().getFullYear() ? undefined : 'numeric'
    });
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <div className={`group relative ${isDark ? 'bg-gray-900 border border-green-500/10 hover:border-green-500/20' : 'bg-white shadow-lg border border-gray-200'} backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] ${
      link.archived ? 'opacity-75' : ''
    } ${isDark ? 'hover:bg-gray-800 shadow-lg shadow-green-500/5' : 'hover:shadow-2xl'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 
            className={`font-semibold text-lg mb-2 cursor-pointer transition-colors duration-200 ${
              link.archived 
                ? isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
                : isDark ? 'text-green-400 hover:text-green-300' : 'text-gray-900 hover:text-blue-600'
            }`}
            onClick={link.archived ? undefined : handleReadClick}
            title={link.archived ? link.title : `Click to read: ${link.title}`}
          >
            {link.title}
          </h3>
          <div className={`flex items-center space-x-2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-3`}>
            <span className="truncate">{getDomain(link.url)}</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatDate(link.createdAt)}</span>
            </div>
          </div>

          {/* Category and Tags */}
          <div className="flex items-center flex-wrap gap-2 mb-3">
            {link.category && (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isDark ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-purple-100 text-purple-800'
              }`}>
                <Folder className="w-3 h-3 mr-1" />
                {link.category}
              </span>
            )}
            {link.tags && link.tags.map(tag => (
              <span
                key={tag}
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  isDark ? 'bg-gray-800 text-green-400 border border-green-500/30' : 'bg-blue-100 text-blue-800'
                }`}
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          link.archived 
            ? isDark ? 'bg-gray-800 text-gray-400 border border-gray-700' : 'bg-gray-200 text-gray-600'
            : isDark ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-blue-100 text-blue-800'
        }`}>
          {link.archived ? 'Archived' : 'Active'}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {!link.archived && (
            <button
              onClick={handleReadClick}
              className={`flex items-center space-x-1 ${isDark ? 'text-green-400 hover:text-green-300' : 'text-blue-600 hover:text-blue-800'} transition-colors duration-200`}
              title="Read and Archive"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Read</span>
            </button>
          )}
          
          {link.archived && (
            <button
              onClick={() => onRestore(link.id)}
              className={`flex items-center space-x-1 ${isDark ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'} transition-colors duration-200`}
              title="Restore to Active"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm">Restore</span>
            </button>
          )}
        </div>

        <button
          onClick={() => onDelete(link.id)}
          className={`flex items-center space-x-1 ${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'} transition-colors duration-200 opacity-0 group-hover:opacity-100`}
          title="Delete permanently"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};