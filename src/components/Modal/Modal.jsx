import { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as SC from './Modal.styled';
import { createPortal } from 'react-dom';

const ModalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <SC.Overlay onClick={handleBackdropClick}>
      <SC.Modal>{children}</SC.Modal>
    </SC.Overlay>,
    ModalRoot
  );
}

Modal.propTypes = {
  handleBackdropClick: PropTypes.func,
};
