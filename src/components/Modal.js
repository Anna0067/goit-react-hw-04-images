import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Modal = ({ imageUrl, onClose }) => {
  return (
    <div className={styles.Overlay} onClick={onClose}>
      <div className={styles.Modal}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
