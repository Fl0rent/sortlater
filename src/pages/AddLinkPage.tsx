import React, { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AddLinkForm } from "../components/AddLinkForm";

interface AddLinkPageProps {
  onAddLink: (
    url: string,
    title: string,
    category?: string,
    tags?: string[]
  ) => void;
  categories: string[];
  theme: "light" | "dark";
}

export const AddLinkPage: React.FC<AddLinkPageProps> = ({
  onAddLink,
  categories,
  theme,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAddedTitle, setLastAddedTitle] = useState("");
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const handleAddLink = (
    url: string,
    title: string,
    category?: string,
    tags?: string[]
  ) => {
    onAddLink(url, title, category, tags);
    setLastAddedTitle(title || url);
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

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
          Add New Link
        </h2>
        <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Save a link to read later with optional categorization and tags
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            isDark
              ? "bg-green-500/20 border-green-500/30 text-green-200"
              : "bg-green-50 border-green-200 text-green-800"
          }`}
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Link saved successfully!</span>
          </div>
          <p className="text-sm mt-1 opacity-90">
            "{lastAddedTitle}" has been added to your reading list.
          </p>
        </div>
      )}

      {/* Add Link Form */}
      <div className="max-w-2xl mx-auto">
        <AddLinkForm
          onAddLink={handleAddLink}
          categories={categories}
          theme={theme}
        />
      </div>

      {/* Tips */}
      <div
        className={`max-w-2xl mx-auto mt-8 p-6 rounded-lg ${
          isDark ? "bg-white/5" : "bg-gray-50"
        }`}
      >
        <h3
          className={`font-semibold ${
            isDark ? "text-white" : "text-gray-900"
          } mb-3`}
        >
          💡 Tips for better organization:
        </h3>
        <ul
          className={`space-y-2 text-sm ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <li>• Use descriptive titles to make links easier to find later</li>
          <li>• Choose appropriate categories to group related content</li>
          <li>• Add relevant tags for flexible filtering and search</li>
          <li>• You can always edit or reorganize links later</li>
        </ul>
      </div>
    </div>
  );
};
