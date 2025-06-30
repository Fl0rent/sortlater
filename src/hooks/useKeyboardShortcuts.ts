import { useEffect } from 'react';

interface KeyboardShortcuts {
  onAddLink: () => void;
  onToggleTheme: () => void;
  onToggleView: () => void;
  onSearch: () => void;
  onExport: () => void;
}

export const useKeyboardShortcuts = ({
  onAddLink,
  onToggleTheme,
  onToggleView,
  onSearch,
  onExport,
}: KeyboardShortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if user is typing in an input field
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      const { key, ctrlKey, metaKey, shiftKey } = event;
      const cmdOrCtrl = ctrlKey || metaKey;

      switch (true) {
        case cmdOrCtrl && key === 'k':
          event.preventDefault();
          onAddLink();
          break;
        case cmdOrCtrl && key === 'd':
          event.preventDefault();
          onToggleTheme();
          break;
        case key === 'Tab' && !shiftKey:
          event.preventDefault();
          onToggleView();
          break;
        case cmdOrCtrl && key === 'f':
          event.preventDefault();
          onSearch();
          break;
        case cmdOrCtrl && key === 'e':
          event.preventDefault();
          onExport();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onAddLink, onToggleTheme, onToggleView, onSearch, onExport]);
};