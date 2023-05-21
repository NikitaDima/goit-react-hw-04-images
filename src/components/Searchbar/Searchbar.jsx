import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [valueInput, setValueInput] = useState('');

  const handleValueChange = event => {
    setValueInput(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(valueInput);
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={css['SearchForm-input']}
          value={valueInput}
          name="valueInput"
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          onChange={handleValueChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
