import React from 'react';

const StudentsPage = ({ students, setStudents, onAskDelete }) => {
  
  // Logic to toggle the green/gray status dot
  const toggleStatus = (id) => {
    const updated = students.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    );
    setStudents(updated);
  };

  // Logic to ensure we always show at least 5 rows to match your design
  const displayRows = [...students];
  while (displayRows.length < 5) {
    displayRows.push({ id: `empty-${displayRows.length}`, empty: true });
  }

  return (
    <section className="view-section">
      <h1>Students</h1>
      
      <div className="table-wrapper">
        {/* The floating black square add button from your design */}
        <button className="add-square-btn" title="Add Student">+</button>
        
        <table id="studentTable">
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
            {displayRows.map((s) => (
              <tr key={s.id}>
                {s.empty ? (
                  <>
                    <td><input type="checkbox" disabled /></td>
                    <td></td><td></td><td></td><td></td><td></td><td></td>
                  </>
                ) : (
                  <>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={s.active} 
                        onChange={() => toggleStatus(s.id)} 
                      />
                    </td>
                    <td>{s.group}</td>
                    <td>{s.name}</td>
                    <td>{s.gender}</td>
                    <td>{s.dob}</td>
                    <td>
                      {/* Status dot: Green for active, Gray for inactive */}
                      <span className={`dot ${s.active ? 'green' : 'gray'}`}></span>
                    </td>
                    <td>
                      <button className="opt-icon">✎</button>
                      <button 
                        className="opt-icon" 
                        onClick={() => onAskDelete(s)}
                      >
                        ✕
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination bar from your design */}
      <div className="pagination">
        <button>&lt;</button>
        <button className="pg-num active">1</button>
        <button className="pg-num">2</button>
        <button className="pg-num">3</button>
        <button className="pg-num">4</button>
        <button>&gt;</button>
      </div>
    </section>
  );
};

export default StudentsPage;
