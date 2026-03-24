import React, { useState } from 'react';

const StudentsPage = ({ students, onAdd, onEdit, onDelete }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Pagination Math
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentItems = students.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(students.length / studentsPerPage);

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="students-view">
      <div className="table-header-row">
        <h2>Students</h2>
        <button className="add-square-btn" onClick={onAdd}>+</button>
      </div>

      <table className="custom-table">
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
          {currentItems.map((s) => (
            <tr key={s.id}>
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(s.id)} 
                  onChange={() => toggleSelect(s.id)} 
                />
              </td>
              <td className="text-bold">{s.group}</td>
              <td className="text-bold">{s.firstName} {s.lastName}</td>
              <td className="text-bold">{s.gender === 'Male' ? 'M' : 'F'}</td>
              <td className="text-bold">{s.dob}</td>
              <td>
                <span className={`status-dot ${s.active ? 'active-green' : 'inactive-gray'}`}></span>
              </td>
              <td>
                <div className="action-buttons">
                  <button className="square-icon-btn" onClick={() => onEdit(s)}>✎</button>
                  <button className="square-icon-btn" onClick={() => onDelete(s)}>✕</button>
                </div>
              </td>
            </tr>
          ))}
          
          {/* Fill remaining space with empty rows to keep table height fixed */}
          {currentItems.length < studentsPerPage && 
            [...Array(studentsPerPage - currentItems.length)].map((_, i) => (
              <tr key={`empty-${i}`} className="empty-row">
                <td><input type="checkbox" disabled /></td>
                {Array(6).fill(0).map((_, j) => <td key={j}></td>)}
              </tr>
            ))
          }
        </tbody>
      </table>

      <div className="pagination-bar">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>&lt;</button>
        {[...Array(totalPages || 1)].map((_, i) => (
          <button 
            key={i + 1} 
            className={currentPage === i + 1 ? 'page-active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>&gt;</button>
      </div>
    </div>
  );
};

export default StudentsPage;
