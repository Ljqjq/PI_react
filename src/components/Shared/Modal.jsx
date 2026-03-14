// src/components/Shared/Modal.jsx
import React from 'react';
import './Modal.css'; // We'll create this CSS file next

const Modal = ({ title, onClose, onConfirm, children, confirmText = "Ok", cancelText = "Cancel", showCancel = true }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Header */}
        <div className="modal-header">
          <span>{title}</span>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Dynamic Body Content */}
        <div className="modal-body">
          {children}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          {showCancel && (
            <button className="btn-secondary" onClick={onClose}>{cancelText}</button>
          )}
          <button className="btn-primary" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
