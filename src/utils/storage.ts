import { Link, HistoryLink, AppSettings } from '../types/link';

const LINKS_KEY = 'sortlater-links';
const HISTORY_KEY = 'sortlater-history';
const SETTINGS_KEY = 'sortlater-settings';
const HISTORY_TTL_MS = 24 * 60 * 60 * 1000;

export const loadLinks = (): Link[] => {
  try {
    const stored = localStorage.getItem(LINKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveLinks = (links: Link[]): void => {
  try {
    localStorage.setItem(LINKS_KEY, JSON.stringify(links));
  } catch {}
};

export const loadHistory = (): HistoryLink[] => {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) return [];
    const all: HistoryLink[] = JSON.parse(stored);
    const cutoff = Date.now() - HISTORY_TTL_MS;
    return all.filter(l => new Date(l.readAt).getTime() > cutoff);
  } catch {
    return [];
  }
};

export const saveHistory = (history: HistoryLink[]): void => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {}
};

export const loadSettings = (): AppSettings => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : { limit: 20, theme: 'light' };
  } catch {
    return { limit: 20, theme: 'light' };
  }
};

export const saveSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {}
};
