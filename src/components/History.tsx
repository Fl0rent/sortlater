import React, { useState } from 'react';
import { HistoryLink } from '../types/link';

interface Props {
  history: HistoryLink[];
}

export const History: React.FC<Props> = ({ history }) => {
  const [open, setOpen] = useState(false);

  if (history.length === 0) return null;

  return (
    <div className="history">
      <button className="history-toggle" onClick={() => setOpen(o => !o)}>
        {history.length} lien{history.length > 1 ? 's' : ''} lu{history.length > 1 ? 's' : ''} ces dernières 24h
        {open ? ' ▲' : ' ▼'}
      </button>
      {open && (
        <ul className="history-list">
          {history.map(link => (
            <li key={link.id}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
