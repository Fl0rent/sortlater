import React, { useRef } from "react";
import { Download, Upload, FileText } from "lucide-react";
import { Link } from "../types/link";
import { exportLinks, importLinks } from "../utils/storage";

interface ExportImportProps {
  links: Link[];
  onImport: (links: Link[]) => void;
  theme: "light" | "dark";
}

export const ExportImport: React.FC<ExportImportProps> = ({
  links,
  onImport,
  theme,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDark = theme === "dark";

  const handleExport = () => {
    const jsonData = exportLinks(links);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sortlater-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        const importedLinks = importLinks(jsonData);
        onImport(importedLinks);
        alert(`Successfully imported ${importedLinks.length} links!`);
      } catch (error) {
        alert("Error importing file. Please check the file format.");
      }
    };
    reader.readAsText(file);

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={`${
        isDark
          ? "bg-gray-900 border border-green-500/20"
          : "bg-white shadow-lg border border-gray-200"
      } backdrop-blur-sm rounded-xl p-4`}
    >
      <div className="flex items-center space-x-2 mb-4">
        <FileText
          className={`w-5 h-5 ${isDark ? "text-green-400" : "text-gray-600"}`}
        />
        <h3
          className={`font-semibold ${
            isDark ? "text-green-400" : "text-gray-900"
          }`}
        >
          Backup & Restore
        </h3>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleExport}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isDark
              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
              : "bg-green-100 text-green-800 hover:bg-green-200"
          }`}
          title="Export all links to JSON file"
        >
          <Download className="w-4 h-4" />
          <span>Export ({links.length})</span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isDark
              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
          }`}
          title="Import links from JSON file"
        >
          <Upload className="w-4 h-4" />
          <span>Import</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </div>
    </div>
  );
};
