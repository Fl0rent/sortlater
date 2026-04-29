export interface Link {
  id: number;
  url: string;
  title: string;
  addedAt: string;
}

export interface HistoryLink extends Link {
  readAt: string;
}

export interface AppSettings {
  limit: number;
  theme: 'dark' | 'light';
}
