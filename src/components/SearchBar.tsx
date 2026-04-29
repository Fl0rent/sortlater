import React from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export const SearchBar = React.forwardRef<HTMLInputElement, Props>(({ value, onChange }, ref) => (
  <input
    ref={ref}
    type="search"
    placeholder="Rechercher..."
    value={value}
    onChange={e => onChange(e.target.value)}
    className="search-bar"
  />
));
