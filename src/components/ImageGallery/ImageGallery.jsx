import { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGallery/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

export class ImageGallery extends Component {
  render() {
    const { images, onImageClick } = this.props;
    return (
      <ul className={styles.imageGallery}>
        {images.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              preview={webformatURL}
              fullSize={largeImageURL}
              onImageClick={onImageClick}
            />
          );
        })}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
