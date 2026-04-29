import React from 'react';

interface Props {
  limit: number;
  total: number;
  onChange: (limit: number) => void;
}

const OPTIONS = [10, 20, 50, 100];

export const LimitSetting: React.FC<Props> = ({ limit, total, onChange }) => (
  <div className="limit-setting">
    <span className="link-count">{total} / {limit} lien{limit > 1 ? 's' : ''}</span>
    <select
      value={limit}
      onChange={e => onChange(Number(e.target.value))}
      className="limit-select"
      aria-label="Limite de liens affichés"
    >
      {OPTIONS.map(o => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);
