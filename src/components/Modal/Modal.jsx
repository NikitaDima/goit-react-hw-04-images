import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, onClick, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackDropClick}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
