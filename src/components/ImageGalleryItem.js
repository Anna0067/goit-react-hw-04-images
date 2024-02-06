import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const ImageGalleryItem = ({ imageUrl, onImageClick }) => {
  return (
    <li className={styles.ImageGalleryItem} onClick={onImageClick}>
      <img className={styles.ImageGalleryItemImage} src={imageUrl} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
