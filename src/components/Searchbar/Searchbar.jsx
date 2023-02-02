import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    keyWord: '',
  };

  handleInput = e => {
    this.setState({ keyWord: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.keyWord);
    this.setState({ keyWord: '' });
  };

  render() {
    const { handleInput, handleSubmit } = this;
    const { keyWord } = this.state;

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
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
