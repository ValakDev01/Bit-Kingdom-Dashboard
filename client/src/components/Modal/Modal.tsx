import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

import './Modal.scss';

type ModalProps = PropsWithChildren<{
  onModal: () => void;
}>;

const Modal: FC<ModalProps> = ({ children, onModal }) => {
  return createPortal(
    <div className='overlay'>
      <div className='modal'>
        <button className='modal__close-button' onClick={onModal}>
          <HiXMark />
        </button>
        <div className='modal__content'>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
