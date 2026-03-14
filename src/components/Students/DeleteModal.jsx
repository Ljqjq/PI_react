import React from 'react';
import Modal from '../Shared/Modal';

const DeleteModal = ({ name, onClose, onConfirm }) => {
  return (
    <Modal 
      title="Warning" 
      onClose={onClose} 
      onConfirm={onConfirm}
      confirmText="Ok"
    >
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Are you sure you want to delete user {name} ?
        </p>
      </div>
    </Modal>
  );
};

export default DeleteModal;
