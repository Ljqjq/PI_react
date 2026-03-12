import React, { useState, useEffect } from 'react';

const StudentsFormModal = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState({ group: '', name: '', gender: '', dob: '' });

  useEffect(() => {
    if (student) setFormData(student); // Populate if editing
  }, [student]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{student ? 'Edit Student' : 'Add Student'}</h2>
          <button onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
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
          {/* Add gender and dob inputs here... */}
        </div>
        <div className="modal-footer">
          <button className="btn-outline" onClick={() => onSave(formData)}>Save</button>
          <button className="btn-outline" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default StudentsFormModal;
