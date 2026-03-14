// src/components/Students/StudentsFormModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../Shared/Modal';

const StudentsFormModal = ({ student, onClose, onSave }) => {
  // Initialize state with all fields from your design
  const [formData, setFormData] = useState({
    group: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: ''
  });

  // Populate form if we are editing an existing student
  useEffect(() => {
    if (student) setFormData(student);
  }, [student]);

  // Helper to handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal 
      title={student ? "Edit student" : "Add student"} 
      onClose={onClose} 
      onConfirm={() => onSave(formData)}
    >
      <div className="form-group">
        <label>Group</label>
        <select name="group" value={formData.group} onChange={handleChange}>
          <option value="">Select Group</option>
          <option value="KN-21">KN-21</option>
          <option value="KN-22">KN-22</option>
        </select>
      </div>

      <div className="form-group">
        <label>First name</label>
        <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Last name</label>
        <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="form-group">
        <label>Birthday</label>
        <input name="dob" type="date" value={formData.dob} onChange={handleChange} />
      </div>
    </Modal>
  );
};

export default StudentsFormModal;
