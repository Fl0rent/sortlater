import React, { useState, useEffect } from 'react';
import { Link, HistoryLink } from './types/link';
import {
  loadLinks, saveLinks,
  loadHistory, saveHistory,
  loadSettings, saveSettings,
} from './utils/storage';
import { AddLinkForm } from './components/AddLinkForm';
import { SearchBar } from './components/SearchBar';
import { LinkList } from './components/LinkList';
import { LimitSetting } from './components/LimitSetting';
import { History } from './components/History';
import { ImportPanel } from './components/ImportPanel';

function extractTitle(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

type Mode = 'normal' | 'add' | 'export' | 'import';

function App() {
  const [links, setLinks] = useState<Link[]>([]);
  const [history, setHistory] = useState<HistoryLink[]>([]);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(20);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [mode, setMode] = useState<Mode>('normal');
  const [undoItem, setUndoItem] = useState<{ link: Link; index: number } | null>(null);
  const undoTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLinks(loadLinks());
    setHistory(loadHistory());
    const settings = loadSettings();
    setLimit(settings.limit);
    setTheme(settings.theme ?? 'dark');
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const handleAdd = (url: string, title: string) => {
    if (links.length >= limit) return;
    const newLink: Link = {
      id: Date.now(),
      url,
      title: title || extractTitle(url),
      addedAt: new Date().toISOString(),
    };
    const updated = [newLink, ...links];
    setLinks(updated);
    saveLinks(updated);
    setMode('normal');
  };

  // clic sur le titre : retire la liste + ajoute à l'historique
  const handleOpen = (link: Link) => {
    const updated = links.filter(l => l.id !== link.id);
    setLinks(updated);
    saveLinks(updated);
    const historyLink: HistoryLink = { ...link, readAt: new Date().toISOString() };
    const updatedHistory = [historyLink, ...history];
    setHistory(updatedHistory);
    saveHistory(updatedHistory);
  };

  // ✕ : retire avec possibilité d'annuler pendant 4s
  const handleDelete = (id: number) => {
    const index = links.findIndex(l => l.id === id);
    const link = links[index];
    const updated = links.filter(l => l.id !== id);
    setLinks(updated);
    saveLinks(updated);
    const historyLink: HistoryLink = { ...link, readAt: new Date().toISOString() };
    const updatedHistory = [historyLink, ...history];
    setHistory(updatedHistory);
    saveHistory(updatedHistory);

    if (undoTimer.current) clearTimeout(undoTimer.current);
    setUndoItem({ link, index });
    undoTimer.current = setTimeout(() => setUndoItem(null), 4000);
  };

  const handleUndo = () => {
    if (!undoItem) return;
    if (undoTimer.current) clearTimeout(undoTimer.current);
    const restored = [...links];
    restored.splice(undoItem.index, 0, undoItem.link);
    setLinks(restored);
    saveLinks(restored);
    setUndoItem(null);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    saveSettings({ limit: newLimit, theme });
  };

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    saveSettings({ limit, theme: next });
  };

  const handleToggleSelect = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleExport = () => {
    const toExport = links.filter(l => selected.has(l.id));
    const text = toExport.map(l => `${l.title}\n${l.url}`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sortlater.txt';
    a.click();
    URL.revokeObjectURL(url);

    const updatedLinks = links.filter(l => !selected.has(l.id));
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
    setSelected(new Set());
    setMode('normal');
  };

  const handleImport = (items: Omit<Link, 'id' | 'addedAt'>[]) => {
    const newLinks: Link[] = items.map((item, i) => ({
      ...item,
      id: Date.now() + i,
      addedAt: new Date().toISOString(),
    }));
    const updated = [...newLinks, ...links].slice(0, limit);
    setLinks(updated);
    saveLinks(updated);
  };

  const filtered = search.trim()
    ? links.filter(l => l.title.toLowerCase().includes(search.toLowerCase()))
    : links;

  const isFull = links.length >= limit;

  return (
    <div className="app">
      <header className="app-header">
        <h1>SortLater</h1>
        <div className="header-right">
          <LimitSetting limit={limit} total={links.length} onChange={handleLimitChange} />
          <button className="theme-toggle" onClick={handleToggleTheme} title="Changer le thème">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </header>

      <SearchBar value={search} onChange={setSearch} />

      {mode === 'add' && (
        <AddLinkForm onAdd={handleAdd} isFull={isFull} onCancel={() => setMode('normal')} />
      )}

      {mode === 'export' && selected.size > 0 && (
        <div className="export-bar">
          <span>{selected.size} lien{selected.size > 1 ? 's' : ''} sélectionné{selected.size > 1 ? 's' : ''}</span>
          <div className="export-actions">
            <button className="btn-secondary" onClick={() => { setMode('normal'); setSelected(new Set()); }}>Annuler</button>
            <button className="btn-export" onClick={handleExport}>Exporter .txt</button>
          </div>
        </div>
      )}

      <LinkList
        links={filtered}
        onOpen={handleOpen}
        onDelete={handleDelete}
        exportMode={mode === 'export'}
        selected={selected}
        onToggleSelect={handleToggleSelect}
      />

      {mode === 'import' && (
        <ImportPanel onImport={handleImport} onClose={() => setMode('normal')} />
      )}

      {mode === 'normal' && (
        <div className="bottom-actions">
          <button className="action-link" onClick={() => setMode('add')}>ajouter</button>
          <span className="action-sep">|</span>
          <button className="action-link" onClick={() => setMode('import')}>importer</button>
          <span className="action-sep">|</span>
          <button className="action-link" onClick={() => setMode('export')}>exporter</button>
        </div>
      )}

      {mode === 'export' && selected.size === 0 && (
        <div className="bottom-actions">
          <span className="action-hint">Sélectionne des liens à exporter</span>
          <span className="action-sep">|</span>
          <button className="action-link" onClick={() => setMode('normal')}>annuler</button>
        </div>
      )}

      <History history={history} />

      <footer className="app-footer">
        <a
          href="https://github.com/Fl0rent/sortlater"
          target="_blank"
          rel="noopener noreferrer"
          className="action-link"
        >
          à propos
        </a>
      </footer>

      {undoItem && (
        <div className="undo-toast">
          <span>Lien supprimé</span>
          <button className="undo-btn" onClick={handleUndo}>Annuler</button>
        </div>
      )}
    </div>
  );
}

export default App;
