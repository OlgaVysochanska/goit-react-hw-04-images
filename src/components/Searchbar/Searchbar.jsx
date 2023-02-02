import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [keyWord, setKeyWord] = useState('');

  const handleInput = e => {
    setKeyWord(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(keyWord);
    setKeyWord('');
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.searchInput}
          type="text"
          name="keyWord"
          value={keyWord}
          onChange={handleInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
