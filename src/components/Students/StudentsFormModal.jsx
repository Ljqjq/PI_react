// src/components/Students/StudentsFormModal.jsx
import React, { useState, useEffect } from 'react';

const StudentsFormModal = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState({ group: '', name: '', gender: '', dob: '' });

  useEffect(() => {
    if (student) setFormData(student);
  }, [student]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{student ? 'Edit Student' : 'Add Student'}</h2>
        <input 
          placeholder="Group" 
          value={formData.group} 
          onChange={(e) => setFormData({...formData, group: e.target.value})} 
        />
        <input 
          placeholder="Name" 
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
        />
        <div className="modal-footer">
          <button onClick={() => onSave(formData)}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default StudentsFormModal; // <--- THIS FIXES YOUR ERROR
