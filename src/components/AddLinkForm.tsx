import React, { useState } from 'react';
import { Plus, Link as LinkIcon, Tag, Folder } from 'lucide-react';

interface AddLinkFormProps {
  onAddLink: (url: string, title: string, category?: string, tags?: string[]) => void;
  categories: string[];
  theme: 'light' | 'dark';
}

export const AddLinkForm: React.FC<AddLinkFormProps> = ({ onAddLink, categories, theme }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const isDark = theme === 'dark';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    
    setTimeout(() => {
      onAddLink(url.trim(), title.trim(), category, tags);
      setUrl('');
      setTitle('');
      setCategory('General');
      setTags([]);
      setTagInput('');
      setIsLoading(false);
      setIsExpanded(false);
    }, 300);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const isFormValid = url.trim() && isValidUrl(url.trim());

  return (
    <form onSubmit={handleSubmit} className={`${isDark ? 'bg-gray-900 border border-green-500/20' : 'bg-white shadow-lg border border-gray-200'} backdrop-blur-sm rounded-xl p-6 mb-8`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <LinkIcon className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-blue-600'}`} />
          <h2 className={`text-xl font-semibold ${isDark ? 'text-green-400' : 'text-gray-900'}`}>Add New Link</h2>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`text-sm ${isDark ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
        >
          {isExpanded ? 'Simple' : 'Advanced'}
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="url-input" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            URL *
          </label>
          <input
            type="url"
            id="url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className={`w-full px-4 py-3 ${isDark ? 'bg-gray-800 border-green-500/30 text-green-400 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-lg focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-green-400 focus:border-green-400' : 'focus:ring-blue-400 focus:border-transparent'} transition-all duration-200`}
          />
        </div>
        
        <div>
          <label htmlFor="title-input" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            Title (optional)
          </label>
          <input
            type="text"
            id="title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a custom title"
            className={`w-full px-4 py-3 ${isDark ? 'bg-gray-800 border-green-500/30 text-green-400 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-lg focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-green-400 focus:border-green-400' : 'focus:ring-blue-400 focus:border-transparent'} transition-all duration-200`}
          />
        </div>

        {isExpanded && (
          <>
            <div>
              <label htmlFor="category-select" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                <Folder className="w-4 h-4 inline mr-1" />
                Category
              </label>
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-4 py-3 ${isDark ? 'bg-gray-800 border-green-500/30 text-green-400' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-green-400 focus:border-green-400' : 'focus:ring-blue-400 focus:border-transparent'} transition-all duration-200`}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tags-input" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                <Tag className="w-4 h-4 inline mr-1" />
                Tags (press Enter or comma to add)
              </label>
              <input
                type="text"
                id="tags-input"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add tags..."
                className={`w-full px-4 py-3 ${isDark ? 'bg-gray-800 border-green-500/30 text-green-400 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-lg focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-green-400 focus:border-green-400' : 'focus:ring-blue-400 focus:border-transparent'} transition-all duration-200`}
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-blue-100 text-blue-800'}`}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className={`ml-1 ${isDark ? 'text-green-300 hover:text-green-100' : 'text-blue-600 hover:text-blue-800'}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
        
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
            isFormValid && !isLoading
              ? isDark ? 'bg-green-500 hover:bg-green-400 text-black shadow-lg shadow-green-500/25' : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className={`w-5 h-5 border-2 ${isDark ? 'border-black/30 border-t-black' : 'border-white/30 border-t-white'} rounded-full animate-spin`} />
          ) : (
            <>
              <Plus className="w-5 h-5" />
              <span>Add Link</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};