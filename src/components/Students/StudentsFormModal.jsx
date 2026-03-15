import React, { useState, useEffect } from 'react';
import Modal from '../Shared/Modal';

const StudentsFormModal = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    group: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: ''
  });

  const [errors, setErrors] = useState({});

  // RegEx Patterns
  const namePattern = /^[A-Za-zА-Яа-яІіЇїЄє' ]+$/;

  useEffect(() => {
    if (student) setFormData(student);
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  // Block invalid characters during typing/pasting
  const handleKeyDown = (e, pattern) => {
    if (e.key.length === 1 && !pattern.test(e.key)) {
      e.preventDefault();
    }
  };

  const validate = () => {
    const newErrors = {};

    // 1. Group Validation
    if (!formData.group) newErrors.group = "Please select a group.";

    // 2. Name Validation (Length + Regex)
    if (!namePattern.test(formData.firstName) || formData.firstName.length < 2) {
      newErrors.firstName = "Enter a valid first name (letters only, min 2 chars).";
    }
    if (!namePattern.test(formData.lastName) || formData.lastName.length < 2) {
      newErrors.lastName = "Enter a valid last name (letters only, min 2 chars).";
    }

    // 3. Gender Validation
    if (!formData.gender) newErrors.gender = "Please select a gender.";

    // 4. Age Validation (17+ years old)
    if (!formData.dob) {
      newErrors.dob = "Birthday is required.";
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 17) {
        newErrors.dob = "Student must be at least 17 years old.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validate()) {
      // If adding a new student, ensure 'active' property exists
      const studentToSave = {
        ...formData,
        active: student ? formData.active : true // Keep old status if editing, else default true
      };
      
      const payload = JSON.stringify(studentToSave);
      console.log("Payload for server:", payload);
      onSave(studentToSave);
    }
  };

  return (
    <Modal 
      title={student ? "Edit student" : "Add student"} 
      onClose={onClose} 
      onConfirm={handleConfirm}
      confirmText={student ? "Save" : "Create"}
    >
      <div className="form-group">
        <label>Group</label>
        <select 
          name="group" 
          value={formData.group} 
          onChange={handleChange}
          className={errors.group ? 'error-border' : ''}
        >
          <option value="">Select Group</option>
          <option value="KN-21">KN-21</option>
          <option value="KN-22">KN-22</option>
        </select>
        {errors.group && <span className="error-msg">{errors.group}</span>}
      </div>

      <div className="form-group">
        <label>First name</label>
        <input 
          name="firstName" 
          type="text" 
          value={formData.firstName} 
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, namePattern)}
          className={errors.firstName ? 'error-border' : ''}
        />
        {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
      </div>

      <div className="form-group">
        <label>Last name</label>
        <input 
          name="lastName" 
          type="text" 
          value={formData.lastName} 
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, namePattern)}
          className={errors.lastName ? 'error-border' : ''}
        />
        {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select 
          name="gender" 
          value={formData.gender} 
          onChange={handleChange}
          className={errors.gender ? 'error-border' : ''}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && <span className="error-msg">{errors.gender}</span>}
      </div>

      <div className="form-group">
        <label>Birthday</label>
        <input 
          name="dob" 
          type="date" 
          value={formData.dob} 
          onChange={handleChange}
          className={errors.dob ? 'error-border' : ''}
        />
        {errors.dob && <span className="error-msg">{errors.dob}</span>}
      </div>
    </Modal>
  );
};

export default StudentsFormModal;
