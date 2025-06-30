import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Link as LinkType } from "../types/link";
import { SearchAndFilter } from "../components/SearchAndFilter";
import { LinkCard } from "../components/LinkCard";
import { EmptyState } from "../components/EmptyState";

interface SearchPageProps {
  links: LinkType[];
  onRead: (id: number) => void;
  onRestore: (id: number) => void;
  onDelete: (id: number) => void;
  theme: "light" | "dark";
}

export const SearchPage: React.FC<SearchPageProps> = ({
  links,
  onRead,
  onRestore,
  onDelete,
  theme,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();
  const isDark = theme === "dark";

  // Filter logic
  const filteredLinks = links.filter((link) => {
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

    return matchesSearch && matchesCategory && matchesTags;
  });

  // Get unique categories and tags
  const categories = [
    "General",
    ...Array.from(new Set(links.map((link) => link.category).filter(Boolean))),
  ];
  const allTags = Array.from(new Set(links.flatMap((link) => link.tags || [])));

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/"
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isDark
              ? "bg-white/10 text-white hover:bg-white/15"
              : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Page Title */}
      <div className="text-center mb-8">
        <h2
          className={`text-3xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          } mb-2`}
        >
          Search Links
        </h2>
        <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Find your saved links by title, URL, category, or tags
        </p>
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
        theme={theme}
      />

      {/* Results Count */}
      {(searchTerm ||
        selectedCategory !== "All" ||
        selectedTags.length > 0) && (
        <div
          className={`text-center mb-6 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Found {filteredLinks.length} link
          {filteredLinks.length !== 1 ? "s" : ""}
        </div>
      )}

      {/* Results */}
      <div className="space-y-4 mb-16">
        {filteredLinks.length === 0 ? (
          <div className="text-center py-16">
            <div
              className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                isDark ? "bg-gray-500/20" : "bg-gray-100"
              }`}
            >
              <ArrowLeft
                className={`w-8 h-8 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              />
            </div>
            <h3
              className={`text-lg font-medium ${
                isDark ? "text-white" : "text-gray-900"
              } mb-2`}
            >
              {searchTerm ||
              selectedCategory !== "All" ||
              selectedTags.length > 0
                ? "No links found"
                : "Start searching"}
            </h3>
            <p
              className={`${
                isDark ? "text-gray-300" : "text-gray-600"
              } max-w-sm mx-auto`}
            >
              {searchTerm ||
              selectedCategory !== "All" ||
              selectedTags.length > 0
                ? "Try adjusting your search criteria or filters."
                : "Use the search box above to find your saved links."}
            </p>
          </div>
        ) : (
          filteredLinks.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
              onRead={onRead}
              onRestore={onRestore}
              onDelete={onDelete}
              theme={theme}
            />
          ))
        )}
      </div>
    </div>
  );
};
