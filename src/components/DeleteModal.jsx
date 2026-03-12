import React from 'react';

const DeleteModal = ({ name, onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content warning-box">
        <div className="modal-header">
          <h2>Warning</h2>
          <button onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete user {name}?</p>
        </div>
        <div className="modal-footer">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn-outline" onClick={onConfirm}>Ok</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
