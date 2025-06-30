import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bookmark, Sun, Moon, Settings, Search, Plus } from "lucide-react";
import { Link as LinkType } from "../types/link";
import { ExportImport } from "./ExportImport";

interface HeaderProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  links: LinkType[];
  onImport: (links: LinkType[]) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  links,
  onImport,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();
  const isDark = theme === "dark";

  return (
    <>
      <header className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 ${
                isDark
                  ? "bg-gradient-to-r from-green-400 to-green-500"
                  : "bg-gradient-to-r from-blue-500 to-purple-600"
              } rounded-xl flex items-center justify-center shadow-lg ${
                isDark ? "shadow-green-500/25" : ""
              }`}
            >
              <Bookmark className="w-6 h-6 text-black" />
            </div>
            <h1
              className={`text-4xl font-bold ${
                isDark
                  ? "text-green-400"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              }`}
            >
              SortLater
            </h1>
          </Link>

          <div className="flex items-center space-x-2">
            <Link
              to="/search"
              className={`p-2 rounded-lg transition-all duration-200 ${
                location.pathname === "/search"
                  ? isDark
                    ? "bg-green-500 text-black shadow-lg shadow-green-500/25"
                    : "bg-blue-500 text-white"
                  : isDark
                  ? "bg-gray-900 text-green-400 hover:bg-gray-800 border border-green-500/20"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
              title="Search links"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              to="/add"
              className={`p-2 rounded-lg transition-all duration-200 ${
                location.pathname === "/add"
                  ? isDark
                    ? "bg-green-500 text-black shadow-lg shadow-green-500/25"
                    : "bg-green-500 text-white"
                  : isDark
                  ? "bg-gray-900 text-green-400 hover:bg-gray-800 border border-green-500/20"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
              title="Add new link"
            >
              <Plus className="w-5 h-5" />
            </Link>

            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? "bg-gray-900 text-green-400 hover:bg-gray-800 border border-green-500/20"
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
                showSettings
                  ? isDark
                    ? "bg-green-500 text-black shadow-lg shadow-green-500/25"
                    : "bg-purple-500 text-white"
                  : isDark
                  ? "bg-gray-900 text-green-400 hover:bg-gray-800 border border-green-500/20"
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
            isDark ? "text-gray-400" : "text-gray-600"
          } text-lg mb-6 text-center`}
        >
          Sauvegarder des liens pour les lire plus tard. 1 clic pour lire et
          archiver automatiquement.
        </p>
        <p
          className={`${
            isDark ? "text-gray-400" : "text-gray-600"
          } text-lg mb-6 text-center`}
        >
          En savoir +
        </p>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-8">
            <ExportImport links={links} onImport={onImport} theme={theme} />
          </div>
        )}
      </header>
    </>
  );
};
