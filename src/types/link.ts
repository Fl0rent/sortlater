export interface Link {
  id: number;
  url: string;
  title: string;
  archived: boolean;
  createdAt: string;
  tags: string[];
  category?: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  defaultCategory: string;
}