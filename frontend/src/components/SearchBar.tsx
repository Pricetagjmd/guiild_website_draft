import { FormEvent, useId, useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  variant?: 'light' | 'dark';
}

const SearchBar = ({ placeholder = 'Search the guild', variant = 'light' }: SearchBarProps) => {
  const [value, setValue] = useState('');
  const inputId = useId();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className={`search-bar search-bar--${variant}`} onSubmit={handleSubmit} role="search">
      <label className="visually-hidden" htmlFor={inputId}>
        Search
      </label>
      <input
        id={inputId}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <button type="submit" aria-label="Submit search">
        <span aria-hidden="true">⌕</span>
      </button>
    </form>
  );
};

export default SearchBar;
