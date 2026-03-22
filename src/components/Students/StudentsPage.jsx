import React, { useState } from 'react';

const StudentsPage = ({ students, onAdd, onEdit, onDelete }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  
  // --- Pagination Logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5; // How many rows to show per page
  
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(students.length / studentsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="students-container">
      <div className="table-header-row">
        <h2>Students</h2>
        <button className="add-square-btn" onClick={onAdd}>+</button>
      </div>

      <table className="students-table">
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
          {currentStudents.map((s) => (
            <tr key={s.id}>
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(s.id)} 
                  onChange={() => toggleSelect(s.id)} 
                />
              </td>
              <td className="bold">{s.group}</td>
              <td className="bold">{s.firstName} {s.lastName}</td>
              <td className="bold">{s.gender === 'Male' ? 'M' : 'F'}</td>
              <td className="bold">{s.dob}</td>
              <td>
                <span className={`dot ${s.active ? 'green' : 'gray'}`}></span>
              </td>
              <td>
                <div className="options-cell">
                  <button className="icon-btn" onClick={() => onEdit(s)}>✎</button>
                  <button className="icon-btn" onClick={() => onDelete(s)}>✕</button>
                </div>
              </td>
            </tr>
          ))}
          
          {/* Fill empty rows if page isn't full to keep table height consistent */}
          {currentStudents.length < studentsPerPage && 
            [...Array(studentsPerPage - currentStudents.length)].map((_, i) => (
              <tr key={`empty-${i}`} className="empty-row">
                <td><input type="checkbox" disabled /></td>
                <td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)}>&lt;</button>
        
        {[...Array(totalPages)].map((_, i) => (
          <button 
            key={i + 1} 
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        
        <button onClick={() => paginate(currentPage + 1)}>&gt;</button>
      </div>
    </div>
  );
};

export default StudentsPage;
