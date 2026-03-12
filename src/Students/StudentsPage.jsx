import React from 'react';

const StudentsPage = ({ students, onEdit, onDelete }) => {
  return (
    <section>
      <h1>Students</h1>
      <div className="table-wrapper">
        <button className="add-square-btn" onClick={() => onEdit(null)}>+</button>
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Group</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Birthday</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, index) => (
              <tr key={index}>
                <td><input type="checkbox" checked={s.active} readOnly /></td>
                <td>{s.group}</td>
                <td>{s.name}</td>
                <td>{s.gender}</td>
                <td>{s.dob}</td>
                <td><span className={`dot ${s.active ? 'green' : 'gray'}`}></span></td>
                <td>
                  <button className="opt-icon" onClick={() => onEdit(s)}>✎</button>
                  <button className="opt-icon" onClick={() => onDelete(s)}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StudentsPage;
