import React from "react";
import {
  ExternalLink,
  Archive,
  RotateCcw,
  Trash2,
  Clock,
  Tag,
  Folder,
} from "lucide-react";
import { Link } from "../types/link";

interface LinkCardProps {
  link: Link;
  onRead: (id: number) => void;
  onRestore: (id: number) => void;
  onDelete: (id: number) => void;
  theme: "light" | "dark";
}

export const LinkCard: React.FC<LinkCardProps> = ({
  link,
  onRead,
  onRestore,
  onDelete,
  theme,
}) => {
  const isDark = theme === "dark";

  const handleReadClick = () => {
    window.open(link.url, "_blank");
    onRead(link.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        date.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
    });
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  return (
    <div
      className={`group relative ${
        isDark ? "bg-white/10" : "bg-white shadow-lg"
      } backdrop-blur-sm border ${
        isDark ? "border-white/20" : "border-gray-200"
      } rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
        link.archived ? "opacity-75" : ""
      } ${isDark ? "hover:bg-white/15" : "hover:shadow-2xl"}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-lg mb-2 cursor-pointer transition-colors duration-200 ${
              link.archived
                ? isDark
                  ? "text-gray-300 hover:text-gray-100"
                  : "text-gray-600 hover:text-gray-800"
                : isDark
                ? "text-white hover:text-blue-200"
                : "text-gray-900 hover:text-blue-600"
            }`}
            onClick={link.archived ? undefined : handleReadClick}
            title={link.archived ? link.title : `Click to read: ${link.title}`}
          >
            {link.title}
          </h3>
          <div
            className={`flex items-center space-x-2 text-sm ${
              isDark ? "text-gray-300" : "text-gray-600"
            } mb-3`}
          >
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
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  isDark
                    ? "bg-purple-500/20 text-purple-200"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                <Folder className="w-3 h-3 mr-1" />
                {link.category}
              </span>
            )}
            {link.tags &&
              link.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    isDark
                      ? "bg-blue-500/20 text-blue-200"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
          </div>
        </div>

        <div
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            link.archived
              ? isDark
                ? "bg-gray-500/20 text-gray-300"
                : "bg-gray-200 text-gray-600"
              : isDark
              ? "bg-blue-500/20 text-blue-200"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {link.archived ? "Archived" : "Active"}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {!link.archived && (
            <button
              onClick={handleReadClick}
              className={`flex items-center space-x-1 ${
                isDark
                  ? "text-blue-200 hover:text-blue-100"
                  : "text-blue-600 hover:text-blue-800"
              } transition-colors duration-200`}
              title="Read and Archive"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Read</span>
            </button>
          )}

          {link.archived && (
            <button
              onClick={() => onRestore(link.id)}
              className={`flex items-center space-x-1 ${
                isDark
                  ? "text-green-200 hover:text-green-100"
                  : "text-green-600 hover:text-green-800"
              } transition-colors duration-200`}
              title="Restore to Active"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm">Restore</span>
            </button>
          )}
        </div>

        <button
          onClick={() => onDelete(link.id)}
          className={`flex items-center space-x-1 ${
            isDark
              ? "text-red-200 hover:text-red-100"
              : "text-red-500 hover:text-red-700"
          } transition-colors duration-200 opacity-0 group-hover:opacity-100`}
          title="Delete permanently"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
