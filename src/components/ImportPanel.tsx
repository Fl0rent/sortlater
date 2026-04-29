import React, { useState } from 'react';
import { Link } from '../types/link';

interface Props {
  onImport: (links: Omit<Link, 'id' | 'addedAt'>[]) => void;
  onClose: () => void;
}

function extractTitle(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

function parseInput(raw: string): Omit<Link, 'id' | 'addedAt'>[] {
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  const result: Omit<Link, 'id' | 'addedAt'>[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const isUrl = /^https?:\/\//i.test(line);

    if (!isUrl && i + 1 < lines.length && /^https?:\/\//i.test(lines[i + 1])) {
      // format export : titre puis URL
      result.push({ url: lines[i + 1], title: line });
      i += 2;
    } else if (isUrl) {
      result.push({ url: line, title: extractTitle(line) });
      i++;
    } else {
      i++;
    }
  }

  return result;
}

export const ImportPanel: React.FC<Props> = ({ onImport, onClose }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInput(text);
    if (parsed.length === 0) return;
    onImport(parsed);
    onClose();
  };

  const count = parseInput(text).length;

  return (
    <div className="import-panel">
      <form onSubmit={handleSubmit}>
        <textarea
          className="import-textarea"
          placeholder={'Colle des URLs (une par ligne) :\nhttps://exemple.com\nhttps://autre.com'}
          value={text}
          onChange={e => setText(e.target.value)}
          rows={5}
          autoFocus
        />
        <div className="import-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>Annuler</button>
          <button type="submit" className="btn-export" disabled={count === 0}>
            {count > 0 ? `Importer ${count} lien${count > 1 ? 's' : ''}` : 'Importer'}
          </button>
        </div>
      </form>
    </div>
  );
};
