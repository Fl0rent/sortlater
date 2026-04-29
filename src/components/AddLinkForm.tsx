import React, { useState } from 'react';

interface Props {
  onAdd: (url: string, title: string) => void;
  onCancel: () => void;
  isFull: boolean;
}

export const AddLinkForm: React.FC<Props> = ({ onAdd, onCancel, isFull }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onAdd(url.trim(), title.trim());
    setUrl('');
    setTitle('');
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="https://..."
        value={url}
        onChange={e => setUrl(e.target.value)}
        required
        autoFocus
        className="add-input"
      />
      <input
        type="text"
        placeholder="Titre (optionnel)"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="add-input"
      />
      <button type="submit" disabled={isFull} className="add-btn">
        {isFull ? 'Liste pleine' : 'Ajouter'}
      </button>
      <button type="button" className="btn-secondary" onClick={onCancel}>
        Annuler
      </button>
    </form>
  );
};
