import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link, AppSettings } from './types/link';
import { loadLinks, saveLinks, loadSettings, saveSettings } from './utils/storage';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { AddLinkPage } from './pages/AddLinkPage';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';

function App() {
  const [links, setLinks] = useState<Link[]>([]);
  const [settings, setSettings] = useState<AppSettings>({ theme: 'dark', defaultCategory: 'General' });

  useEffect(() => {
    const savedLinks = loadLinks();
    const savedSettings = loadSettings();
    setLinks(savedLinks);
    setSettings(savedSettings);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
  }, [settings.theme]);

  const handleAddLink = (url: string, title: string, category?: string, tags: string[] = []) => {
    const newLink = {
      id: Date.now(),
      url: url.trim(),
      title: title.trim() || extractTitleFromUrl(url),
      archived: false,
      createdAt: new Date().toISOString(),
      tags,
      category: category || 'General',
    };
    const updatedLinks = [newLink, ...links];
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  const handleReadLink = (id: number) => {
    const updatedLinks = links.map(link =>
      link.id === id ? { ...link, archived: true } : link
    );
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  const handleRestoreLink = (id: number) => {
    const updatedLinks = links.map(link =>
      link.id === id ? { ...link, archived: false } : link
    );
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  const handleDeleteLink = (id: number) => {
    const updatedLinks = links.filter(link => link.id !== id);
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  const handleImportLinks = (importedLinks: Link[]) => {
    const mergedLinks = [...importedLinks, ...links];
    setLinks(mergedLinks);
    saveLinks(mergedLinks);
  };

  const toggleTheme = () => {
    const newSettings = { ...settings, theme: settings.theme === 'dark' ? 'light' as const : 'dark' as const };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleExport = () => {
    const event = new CustomEvent('export-links');
    document.dispatchEvent(event);
  };

  useKeyboardShortcuts({
    onAddLink: () => window.location.href = '/add',
    onToggleTheme: toggleTheme,
    onToggleView: () => {},
    onSearch: () => window.location.href = '/search',
    onExport: handleExport,
  });

  const extractTitleFromUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const isDark = settings.theme === 'dark';

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-black' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        {isDark && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black opacity-50"></div>
        )}
        
        <div className="relative z-10">
          <Header 
            theme={settings.theme} 
            onToggleTheme={toggleTheme}
            links={links}
            onImport={handleImportLinks}
          />
          
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  links={links}
                  onRead={handleReadLink}
                  onRestore={handleRestoreLink}
                  onDelete={handleDeleteLink}
                  theme={settings.theme}
                />
              } 
            />
            <Route 
              path="/search" 
              element={
                <SearchPage 
                  links={links}
                  onRead={handleReadLink}
                  onRestore={handleRestoreLink}
                  onDelete={handleDeleteLink}
                  theme={settings.theme}
                />
              } 
            />
            <Route 
              path="/add" 
              element={
                <AddLinkPage 
                  onAddLink={handleAddLink}
                  categories={['General', ...Array.from(new Set(links.map(link => link.category).filter(Boolean)))]}
                  theme={settings.theme}
                />
              } 
            />
          </Routes>
        </div>

        <KeyboardShortcuts theme={settings.theme} />
      </div>
    </Router>
  );
}

export default App;