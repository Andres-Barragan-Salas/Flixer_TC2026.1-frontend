import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

const Modal = ({ active, onDismiss, children }) => {
    useEffect(() => {
        if (active) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = '';
        }
    }, [active]);

    

    return ReactDOM.createPortal(
        <div onClick={onDismiss} className="modal" aria-hidden={active ? 'false' : 'true'}>
            <div className="modal-container" aria-hidden={active ? 'false' : 'true'}>
                {children}
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;