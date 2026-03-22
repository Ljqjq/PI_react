import React, { useState } from 'react';
import './App.css';
import StudentsPage from './components/Students/StudentsPage';
import StudentsFormModal from './components/Students/StudentsFormModal';
import DeleteModal from './components/Students/DeleteModal';

function App() {
  const [activePage, setActivePage] = useState('students');
  const [students, setStudents] = useState([
    { id: 1, group: 'KN-21', firstName: 'John', lastName: 'Smith', gender: 'Male', dob: '2004-05-11' },
    { id: 2, group: 'KN-22', firstName: 'Ann', lastName: 'Bond', gender: 'Female', dob: '2004-05-24' },
  ]);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Handlers
  const handleAdd = () => {
    setSelectedStudent(null);
    setIsFormOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setIsDeleteOpen(true);
  };

  const saveStudent = (formData) => {
    if (selectedStudent) {
      setStudents(students.map(s => s.id === selectedStudent.id ? { ...s, ...formData } : s));
    } else {
      setStudents([...students, { ...formData, id: Date.now() }]);
    }
    setIsFormOpen(false);
  };

  // src/App.jsx
// ... inside your App function:
 
  return (
    <div className="app-layout">
      <header className="top-nav">
        <div className="logo">CMS</div>
        
        {/* New Top-Right Section */}
        <div className="user-profile">
          <span className="notification-bell">🔔</span>
          <span className="user-name">James Bond</span>
          <div className="avatar">JB</div>
        </div>
      </header>
  
      <div className="body-container">
        <aside className="sidebar">
          {/* Added Dashboard button */}
          <button 
            onClick={() => setActivePage('dashboard')} 
            className={activePage === 'dashboard' ? 'active' : ''}
          >Dashboard</button>
          <button 
            onClick={() => setActivePage('students')} 
            className={activePage === 'students' ? 'active' : ''}
          >Students</button>
          <button 
            onClick={() => setActivePage('tasks')} 
            className={activePage === 'tasks' ? 'active' : ''}
          >Tasks</button>
        </aside>
  
        <main className="main-content">
          {activePage === 'dashboard' && <h2>Dashboard Overview</h2>}
          {activePage === 'students' && (
            <StudentsPage 
            students={students} 
            setStudents={setStudents} 
            onAdd={handleAdd} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            />
          )}
          {activePage === 'tasks' && <h2>Tasks Board</h2>}
        </main>
      </div>
    {/* PASTE THIS BLOCK RIGHT BEFORE THE LAST </div> */}
      {isFormOpen && (
        <StudentsFormModal 
          student={selectedStudent} 
          onClose={() => setIsFormOpen(false)} 
          onSave={saveStudent} 
        />
      )}

      {isDeleteOpen && (
        <DeleteModal 
          name={`${selectedStudent?.firstName} ${selectedStudent?.lastName}`}
          onClose={() => setIsDeleteOpen(false)} 
          onConfirm={() => {
            setStudents(students.filter(s => s.id !== selectedStudent.id));
            setIsDeleteOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
