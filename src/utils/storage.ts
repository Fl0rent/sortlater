import { Link, AppSettings } from "../types/link";

const STORAGE_KEY = "sortlater-links";
const SETTINGS_KEY = "sortlater-settings";

export const loadLinks = (): Link[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading links from localStorage:", error);
    return [];
  }
};

export const saveLinks = (links: Link[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  } catch (error) {
    console.error("Error saving links to localStorage:", error);
  }
};

export const loadSettings = (): AppSettings => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored
      ? JSON.parse(stored)
      : { theme: "dark", defaultCategory: "General" };
  } catch (error) {
    console.error("Error loading settings from localStorage:", error);
    return { theme: "dark", defaultCategory: "General" };
  }
};

export const saveSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving settings to localStorage:", error);
  }
};

export const createLink = (
  url: string,
  title: string,
  category?: string,
  tags: string[] = []
): Link => {
  return {
    id: Date.now(),
    url,
    title: title || extractTitleFromUrl(url),
    archived: false,
    createdAt: new Date().toISOString(),
    tags,
    category: category || "General",
  };
};

export const exportLinks = (links: Link[]): string => {
  return JSON.stringify(links, null, 2);
};

export const importLinks = (jsonData: string): Link[] => {
  try {
    const parsed = JSON.parse(jsonData);
    if (Array.isArray(parsed)) {
      return parsed.map((link) => ({
        ...link,
        tags: link.tags || [],
        category: link.category || "General",
      }));
    }
    throw new Error("Invalid format");
  } catch (error) {
    throw new Error("Invalid JSON format");
  }
};

const extractTitleFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace("www.", "");
  } catch {
    return url;
  }
};
