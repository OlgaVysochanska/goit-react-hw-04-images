import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ preview, fullSize, onImageClick }) => {
  return (
    <li
      onClick={() => {
        onImageClick(fullSize);
      }}
      className={styles.imageGalleryItem}
    >
      <img src={preview} className={styles.imageGalleryImage} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  preview: PropTypes.string.isRequired,
  fullSize: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
