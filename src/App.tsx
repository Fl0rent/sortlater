import React, { useState, useEffect, useRef } from "react";
import {
  Bookmark,
  Archive,
  BarChart3,
  Sun,
  Moon,
  Settings,
} from "lucide-react";
import { Link, AppSettings } from "./types/link";
import {
  loadLinks,
  saveLinks,
  createLink,
  loadSettings,
  saveSettings,
} from "./utils/storage";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { AddLinkForm } from "./components/AddLinkForm";
import { LinkCard } from "./components/LinkCard";
import { EmptyState } from "./components/EmptyState";
import { SearchAndFilter } from "./components/SearchAndFilter";
import { ExportImport } from "./components/ExportImport";
import { KeyboardShortcuts } from "./components/KeyboardShortcuts";

type ViewType = "active" | "archived";

function App() {
  const [links, setLinks] = useState<Link[]>([]);
  const [currentView, setCurrentView] = useState<ViewType>("active");
  const [settings, setSettings] = useState<AppSettings>({
    theme: "dark",
    defaultCategory: "General",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const addLinkFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLinks = loadLinks();
    const savedSettings = loadSettings();
    setLinks(savedLinks);
    setSettings(savedSettings);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      settings.theme === "dark"
    );
  }, [settings.theme]);

  const handleAddLink = (
    url: string,
    title: string,
    category?: string,
    tags: string[] = []
  ) => {
    const newLink = createLink(url, title, category, tags);
    const updatedLinks = [newLink, ...links];
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  const handleReadLink = (id: number) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, archived: true } : link
    );
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  const handleRestoreLink = (id: number) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, archived: false } : link
    );
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  const handleDeleteLink = (id: number) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  const handleImportLinks = (importedLinks: Link[]) => {
    const mergedLinks = [...importedLinks, ...links];
    setLinks(mergedLinks);
    saveLinks(mergedLinks);
  };

  const toggleTheme = () => {
    const newSettings = {
      ...settings,
      theme: settings.theme === "dark" ? ("light" as const) : ("dark" as const),
    };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const focusSearch = () => {
    searchInputRef.current?.focus();
  };

  const focusAddLink = () => {
    addLinkFormRef.current?.scrollIntoView({ behavior: "smooth" });
    const urlInput = addLinkFormRef.current?.querySelector(
      'input[type="url"]'
    ) as HTMLInputElement;
    urlInput?.focus();
  };

  const handleExport = () => {
    const event = new CustomEvent("export-links");
    document.dispatchEvent(event);
  };

  useKeyboardShortcuts({
    onAddLink: focusAddLink,
    onToggleTheme: toggleTheme,
    onToggleView: () =>
      setCurrentView(currentView === "active" ? "archived" : "active"),
    onSearch: focusSearch,
    onExport: handleExport,
  });

  // Filter and search logic
  const filteredLinks = links.filter((link) => {
    const matchesView =
      currentView === "active" ? !link.archived : link.archived;
    const matchesSearch =
      !searchTerm ||
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (link.tags &&
        link.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    const matchesCategory =
      selectedCategory === "All" || link.category === selectedCategory;
    const matchesTags =
      selectedTags.length === 0 ||
      (link.tags && selectedTags.every((tag) => link.tags.includes(tag)));

    return matchesView && matchesSearch && matchesCategory && matchesTags;
  });

  const activeLinks = links.filter((link) => !link.archived);
  const archivedLinks = links.filter((link) => link.archived);

  // Get unique categories and tags
  const categories = [
    "General",
    ...Array.from(new Set(links.map((link) => link.category).filter(Boolean))),
  ];
  const allTags = Array.from(new Set(links.flatMap((link) => link.tags || [])));

  const isDark = settings.theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      {isDark && (
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Bookmark className="w-6 h-6 text-white" />
              </div>
              <h1
                className={`text-4xl font-bold bg-gradient-to-r ${
                  isDark
                    ? "from-blue-200 to-purple-200"
                    : "from-blue-600 to-purple-600"
                } bg-clip-text text-transparent`}
              >
                SortLater
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDark
                    ? "bg-white/10 text-white hover:bg-white/15"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
                title={`Switch to ${isDark ? "light" : "dark"} theme`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDark
                    ? "bg-white/10 text-white hover:bg-white/15"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          <p
            className={`${
              isDark ? "text-gray-300" : "text-gray-600"
            } text-lg mb-6`}
          >
            Save links now, read later. Click to read and automatically archive.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${
                  isDark ? "text-blue-200" : "text-blue-600"
                }`}
              >
                {activeLinks.length}
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Active
              </div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${
                  isDark ? "text-purple-200" : "text-purple-600"
                }`}
              >
                {archivedLinks.length}
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Archived
              </div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${
                  isDark ? "text-pink-200" : "text-pink-600"
                }`}
              >
                {links.length}
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Total
              </div>
            </div>
          </div>
        </header>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-8">
            <ExportImport
              links={links}
              onImport={handleImportLinks}
              theme={settings.theme}
            />
          </div>
        )}

        {/* Add Link Form */}
        <div ref={addLinkFormRef}>
          <AddLinkForm
            onAddLink={handleAddLink}
            categories={categories}
            theme={settings.theme}
          />
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          categories={categories}
          allTags={allTags}
          theme={settings.theme}
        />

        {/* View Toggle */}
        <div className="flex items-center justify-center space-x-1 mb-8">
          <button
            onClick={() => setCurrentView("active")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentView === "active"
                ? "bg-blue-500 text-white shadow-lg"
                : isDark
                ? "bg-white/10 text-gray-300 hover:bg-white/15"
                : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Active ({activeLinks.length})</span>
          </button>

          <button
            onClick={() => setCurrentView("archived")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentView === "archived"
                ? "bg-purple-500 text-white shadow-lg"
                : isDark
                ? "bg-white/10 text-gray-300 hover:bg-white/15"
                : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
            }`}
          >
            <Archive className="w-4 h-4" />
            <span>Archived ({archivedLinks.length})</span>
          </button>
        </div>

        {/* Links List */}
        <div className="space-y-4">
          {filteredLinks.length === 0 ? (
            <EmptyState type={currentView} theme={settings.theme} />
          ) : (
            filteredLinks.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onRead={handleReadLink}
                onRestore={handleRestoreLink}
                onDelete={handleDeleteLink}
                theme={settings.theme}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <footer
          className={`text-center ${
            isDark ? "text-gray-400" : "text-gray-500"
          } text-sm mt-16`}
        >
          <p>SortLater - Your personal read-it-later application</p>
          <p className="text-xs mt-1">
            Press{" "}
            <kbd
              className={`px-1 py-0.5 rounded text-xs ${
                isDark ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              ?
            </kbd>{" "}
            for keyboard shortcuts
          </p>
        </footer>
      </div>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcuts theme={settings.theme} />
    </div>
  );
}

export default App;
