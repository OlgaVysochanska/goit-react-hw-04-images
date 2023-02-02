import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, close }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  });

  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired,
};
