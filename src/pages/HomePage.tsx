import React, { useState } from "react";
import {
  Bookmark,
  Archive,
  List,
  Grid,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Zap,
} from "lucide-react";
import { Link } from "../types/link";
import { LinkCard } from "../components/LinkCard";
import { EmptyState } from "../components/EmptyState";
import { SimpleLinkCard } from "../components/SimpleLinkCard";

type ViewType = "active" | "archived";
type DisplayMode = "detailed" | "simple";

interface HomePageProps {
  links: Link[];
  onRead: (id: number) => void;
  onRestore: (id: number) => void;
  onDelete: (id: number) => void;
  theme: "light" | "dark";
}

const LINKS_PER_PAGE = 5;

export const HomePage: React.FC<HomePageProps> = ({
  links,
  onRead,
  onRestore,
  onDelete,
  theme,
}) => {
  const [currentView, setCurrentView] = useState<ViewType>("active");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("simple");
  const [currentPage, setCurrentPage] = useState(1);
  const [isBulkReading, setIsBulkReading] = useState(false);
  const isDark = theme === "dark";

  const activeLinks = links.filter((link) => !link.archived);
  const archivedLinks = links.filter((link) => link.archived);
  const filteredLinks = currentView === "active" ? activeLinks : archivedLinks;

  // Pagination calculations
  const totalPages = Math.ceil(filteredLinks.length / LINKS_PER_PAGE);
  const startIndex = (currentPage - 1) * LINKS_PER_PAGE;
  const endIndex = startIndex + LINKS_PER_PAGE;
  const currentLinks = filteredLinks.slice(startIndex, endIndex);

  // Reset to page 1 when switching views
  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of links section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBulkRead = async () => {
    if (currentView !== "active" || currentLinks.length === 0) return;

    setIsBulkReading(true);

    try {
      // Open all current page links in background tabs
      currentLinks.forEach((link, index) => {
        setTimeout(() => {
          window.open(link.url, "_blank");
        }, index * 100); // Small delay between opens to prevent browser blocking
      });

      // Archive all current page links after a short delay
      setTimeout(() => {
        currentLinks.forEach((link) => {
          onRead(link.id);
        });
        setIsBulkReading(false);

        // Show success message
        const notification = document.createElement("div");
        notification.className = `fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300`;
        notification.innerHTML = `
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span>Opened and archived ${currentLinks.length} links!</span>
          </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
          notification.remove();
        }, 3000);
      }, 500);
    } catch (error) {
      setIsBulkReading(false);
      console.error("Error during bulk read:", error);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition-all duration-200 ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : isDark
              ? "bg-gray-900 text-green-400 hover:bg-gray-800 border border-green-500/20"
              : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
          }`}
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-1">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === page
                  ? isDark
                    ? "bg-green-500 text-black shadow-lg shadow-green-500/25"
                    : "bg-blue-500 text-white shadow-lg"
                  : isDark
                  ? "bg-gray-900 text-gray-300 hover:bg-gray-800 border border-green-500/20"
                  : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition-all duration-200 ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : isDark
              ? "bg-gray-900 text-green-400 hover:bg-gray-800 border border-green-500/20"
              : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
          }`}
          title="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      {/* Bulk Read Button - Only show for active links */}
      {currentView === "active" && currentLinks.length > 0 && (
        <div className="flex justify-center mb-6">
          <button
            onClick={handleBulkRead}
            disabled={isBulkReading}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              isBulkReading
                ? "opacity-50 cursor-not-allowed"
                : isDark
                ? "bg-gradient-to-r from-green-500 to-green-400 text-black hover:from-green-400 hover:to-green-300 shadow-lg shadow-green-500/25"
                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl"
            }`}
            title={`Open all ${currentLinks.length} links in background tabs and archive them`}
          >
            {isBulkReading ? (
              <>
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                <span>Opening links...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Bulk Read ({currentLinks.length} links)</span>
                <ExternalLink className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Links List */}
      <div
        className={`mb-8 ${
          displayMode === "simple" ? "space-y-2" : "space-y-4"
        }`}
      >
        {filteredLinks.length === 0 ? (
          <EmptyState type={currentView} theme={theme} />
        ) : (
          <>
            {currentLinks.map((link) =>
              displayMode === "simple" ? (
                <SimpleLinkCard
                  key={link.id}
                  link={link}
                  onRead={onRead}
                  onRestore={onRestore}
                  onDelete={onDelete}
                  theme={theme}
                />
              ) : (
                <LinkCard
                  key={link.id}
                  link={link}
                  onRead={onRead}
                  onRestore={onRestore}
                  onDelete={onDelete}
                  theme={theme}
                />
              )
            )}

            {/* Pagination Info */}
            {totalPages > 1 && (
              <div
                className={`text-center text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                } mt-4`}
              >
                Showing {startIndex + 1}-
                {Math.min(endIndex, filteredLinks.length)} of{" "}
                {filteredLinks.length} links
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination Controls */}
      {renderPagination()}

      {/* Stats */}
      <div className="flex items-center justify-center space-x-8 mb-6 mt-8">
        <div className="text-center">
          <div
            className={`text-2xl font-bold ${
              isDark ? "text-green-400" : "text-blue-600"
            }`}
          >
            {activeLinks.length}
          </div>
          <div
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Active
          </div>
        </div>
        <div className="text-center">
          <div
            className={`text-2xl font-bold ${
              isDark ? "text-green-300" : "text-purple-600"
            }`}
          >
            {archivedLinks.length}
          </div>
          <div
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Archived
          </div>
        </div>
        <div className="text-center">
          <div
            className={`text-2xl font-bold ${
              isDark ? "text-green-200" : "text-pink-600"
            }`}
          >
            {links.length}
          </div>
          <div
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Total
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-center space-x-1 mb-6">
        <button
          onClick={() => handleViewChange("active")}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            currentView === "active"
              ? isDark
                ? "bg-green-500 text-black shadow-lg shadow-green-500/25"
                : "bg-blue-500 text-white shadow-lg"
              : isDark
              ? "bg-gray-900 text-gray-300 hover:bg-gray-800 border border-green-500/20"
              : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Active ({activeLinks.length})</span>
        </button>

        <button
          onClick={() => handleViewChange("archived")}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            currentView === "archived"
              ? isDark
                ? "bg-green-500 text-black shadow-lg shadow-green-500/25"
                : "bg-purple-500 text-white shadow-lg"
              : isDark
              ? "bg-gray-900 text-gray-300 hover:bg-gray-800 border border-green-500/20"
              : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
          }`}
        >
          <Archive className="w-4 h-4" />
          <span>Archived ({archivedLinks.length})</span>
        </button>
      </div>

      {/* Display Mode Toggle */}
      <div className="flex items-center justify-center space-x-1 mb-16">
        <button
          onClick={() => setDisplayMode("simple")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            displayMode === "simple"
              ? isDark
                ? "bg-green-500 text-black shadow-lg shadow-green-500/25"
                : "bg-green-500 text-white shadow-lg"
              : isDark
              ? "bg-gray-900 text-gray-300 hover:bg-gray-800 border border-green-500/20"
              : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
          }`}
          title="Simple view - links only"
        >
          <List className="w-4 h-4" />
          <span>Simple</span>
        </button>

        <button
          onClick={() => setDisplayMode("detailed")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            displayMode === "detailed"
              ? isDark
                ? "bg-green-500 text-black shadow-lg shadow-green-500/25"
                : "bg-green-500 text-white shadow-lg"
              : isDark
              ? "bg-gray-900 text-gray-300 hover:bg-gray-800 border border-green-500/20"
              : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
          }`}
          title="Detailed view - with metadata"
        >
          <Grid className="w-4 h-4" />
          <span>Detailed</span>
        </button>
      </div>

      {/* Footer */}
      <footer
        className={`text-center ${
          isDark ? "text-gray-500" : "text-gray-500"
        } text-sm mt-16 pb-8`}
      >
        <p>SortLater - Your personal read-it-later application</p>
        <p className="text-xs mt-1">
          Press{" "}
          <kbd
            className={`px-1 py-0.5 rounded text-xs ${
              isDark
                ? "bg-gray-800 text-green-400 border border-green-500/20"
                : "bg-gray-200"
            }`}
          >
            ?
          </kbd>{" "}
          for keyboard shortcuts
        </p>
      </footer>
    </div>
  );
};
