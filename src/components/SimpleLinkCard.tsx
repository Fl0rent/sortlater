import React from "react";
import { ExternalLink, RotateCcw, Trash2, Clock } from "lucide-react";
import { Link } from "../types/link";

interface SimpleLinkCardProps {
  link: Link;
  onRead: (id: number) => void;
  onRestore: (id: number) => void;
  onDelete: (id: number) => void;
  theme: "light" | "dark";
}

export const SimpleLinkCard: React.FC<SimpleLinkCardProps> = ({
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
      className={`group flex items-center justify-between p-3 ${
        isDark
          ? "bg-gray-900 hover:bg-gray-800 border border-green-500/10 hover:border-green-500/20"
          : "bg-gray-50 hover:bg-gray-100"
      } rounded-lg transition-all duration-200 ${
        link.archived ? "opacity-75" : ""
      }`}
    >
      <div className="flex-1 min-w-0 mr-4">
        <div className="flex items-center space-x-3">
          <h3
            className={`font-medium cursor-pointer transition-colors duration-200 truncate ${
              link.archived
                ? isDark
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-600 hover:text-gray-800"
                : isDark
                ? "text-green-400 hover:text-green-300"
                : "text-gray-900 hover:text-blue-600"
            }`}
            onClick={link.archived ? undefined : handleReadClick}
            title={link.archived ? link.title : `Click to read: ${link.title}`}
          >
            {link.title}
          </h3>

          <div
            className={`flex items-center space-x-2 text-xs ${
              isDark ? "text-gray-500" : "text-gray-500"
            }`}
          >
            <span className="truncate max-w-32">{getDomain(link.url)}</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatDate(link.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Status Badge */}
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            link.archived
              ? isDark
                ? "bg-gray-800 text-gray-400 border border-gray-700"
                : "bg-gray-200 text-gray-600"
              : isDark
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {link.archived ? "Archived" : "Active"}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!link.archived && (
            <button
              onClick={handleReadClick}
              className={`p-1.5 rounded ${
                isDark
                  ? "text-green-400 hover:text-green-300 hover:bg-green-500/20"
                  : "text-blue-600 hover:text-blue-800 hover:bg-blue-100"
              } transition-all duration-200`}
              title="Read and Archive"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}

          {link.archived && (
            <button
              onClick={() => onRestore(link.id)}
              className={`p-1.5 rounded ${
                isDark
                  ? "text-green-400 hover:text-green-300 hover:bg-green-500/20"
                  : "text-green-600 hover:text-green-800 hover:bg-green-100"
              } transition-all duration-200`}
              title="Restore to Active"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => onDelete(link.id)}
            className={`p-1.5 rounded ${
              isDark
                ? "text-red-400 hover:text-red-300 hover:bg-red-500/20"
                : "text-red-500 hover:text-red-700 hover:bg-red-100"
            } transition-all duration-200`}
            title="Delete permanently"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
