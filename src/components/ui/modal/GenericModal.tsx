import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    const handleBackdropClick = (e: { target: any; currentTarget: any; }) => {
        // Prevent closing if the click is on the modal content itself
        if (e.target === e.currentTarget) {
        // You can add a specific condition here if you want to allow closing
        // in certain scenarios, or just remove the onClose call to prevent it entirely.
        // onClose(); // Uncomment this line if you want to allow closing on backdrop click
        }
    };
    return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
            &times;
        </button>
        {children}
        </div>
    </div>
    );
};

export default Modal;