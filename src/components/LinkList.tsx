import React from 'react';
import { Link } from '../types/link';

interface Props {
  links: Link[];
  onOpen: (link: Link) => void;
  onDelete: (id: number) => void;
  exportMode: boolean;
  selected: Set<number>;
  onToggleSelect: (id: number) => void;
}

function dayLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (sameDay(date, today)) return "Aujourd'hui";
  if (sameDay(date, yesterday)) return 'Hier';
  return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}

function groupByDay(links: Link[]): { label: string; links: Link[] }[] {
  const groups: { label: string; links: Link[] }[] = [];
  for (const link of links) {
    const label = dayLabel(link.addedAt);
    const last = groups[groups.length - 1];
    if (last && last.label === label) {
      last.links.push(link);
    } else {
      groups.push({ label, links: [link] });
    }
  }
  return groups;
}

export const LinkList: React.FC<Props> = ({ links, onOpen, onDelete, exportMode, selected, onToggleSelect }) => {
  if (links.length === 0) {
    return <p className="empty">Aucun lien enregistré.</p>;
  }

  const groups = groupByDay(links);

  return (
    <div className="link-groups">
      {groups.map(group => (
        <div key={group.label} className="link-group">
          <p className="day-label">{group.label}</p>
          <ul className="link-list">
            {group.links.map(link => (
              <li key={link.id} className={selected.has(link.id) ? 'selected' : ''}>
                {exportMode && (
                  <input
                    type="checkbox"
                    checked={selected.has(link.id)}
                    onChange={() => onToggleSelect(link.id)}
                    className="link-checkbox"
                  />
                )}
                {!exportMode && (
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(link.id)}
                    title="Supprimer"
                  >
                    ✕
                  </button>
                )}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={exportMode ? undefined : () => onOpen(link)}
                  className="link-title"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
