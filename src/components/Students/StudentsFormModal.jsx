import React, { useState, useEffect } from 'react';

const StudentsFormModal = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    group: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) setFormData(student);
  }, [student]);

  // The "System Admin" Clean Logic: No leading spaces, collapse internal ones
  const cleanInput = (val) => {
    return val.replace(/^\s+/, '').replace(/\s{2,}/g, ' ').replace(/-{2,}/g, '-');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = (name === 'firstName' || name === 'lastName') ? cleanInput(value) : value;
    setFormData({ ...formData, [name]: cleanedValue });
    setError('');
  };

  const handleSubmit = () => {
    const fName = formData.firstName.trim();
    const lName = formData.lastName.trim();
    
    // Regex: Supports Cyrillic/Latin, hyphens, and single internal spaces
    const nameRegex = /^[а-щьюяіїєґА-ЩЬЮЯІЇЄҐA-Za-z]+(?:[ \-][а-щьюяіїєґА-ЩЬЮЯІЇЄҐA-Za-z]+)*$/;

    if (!nameRegex.test(fName) || !nameRegex.test(lName)) {
      setError("Please check the name format (e.g. Ольга-Єлизавета).");
      return;
    }

    if (!formData.group || !formData.gender || !formData.dob) {
      setError("All fields are mandatory.");
      return;
    }

    onSave({ ...formData, firstName: fName, lastName: lName });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-wide-container">
        <div className="modal-header-wide">
          <h2 className="modal-title-wide">Add student</h2>
          <button className="close-box-wide" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body-wide">
          <div className="wide-input-row">
            <label>Group</label>
            <select name="group" value={formData.group} onChange={handleChange}>
              <option value="">Select Group</option>
              <option value="KN-21">KN-21</option>
              <option value="KN-22">KN-22</option>
            </select>
          </div>

          <div className="wide-input-row">
            <label>First name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>

          <div className="wide-input-row">
            <label>Last name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>

          <div className="wide-input-row">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="wide-input-row">
            <label>Birthday</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          </div>

          {error && <div className="error-text-wide">{error}</div>}
        </div>

        <div className="modal-footer-wide">
          <button className="footer-btn-wide" onClick={onClose}>Cancel</button>
          <button className="footer-btn-wide" onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default StudentsFormModal;
