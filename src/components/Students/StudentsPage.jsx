// src/components/Students/StudentsPage.jsx
import React from 'react';

const StudentsPage = ({ students, setStudents, onAdd, onEdit, onDelete }) => {
  
  // Logic to toggle active status via checkbox
  const handleCheckboxChange = (id) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, active: !student.active } : student
    ));
  };

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <h2>Students</h2>
        <button className="add-btn" onClick={onAdd}>+ Add Student</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Group</th>
            <th>Gender</th>
            <th>Birthday</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              {/* Checkbox controls the 'active' status */}
              <td>
                <input 
                  type="checkbox" 
                  checked={s.active || false} 
                  onChange={() => handleCheckboxChange(s.id)} 
                />
              </td>
              
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.group}</td>
              <td>{s.gender}</td>
              <td>{s.dob}</td>
              
              <td>
                {/* Visual Status Dot */}
                <span className={`dot ${s.active ? 'green' : 'gray'}`}></span>
              </td>
              
              <td>
                <button onClick={() => onEdit(s)}>✎</button>
                <button onClick={() => onDelete(s)}>✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsPage;
