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

  return (
    <div className="app-layout">
      <header className="top-nav">
        <div className="logo">CMS</div>
        <div>James Bond</div>
      </header>

      <div className="body-container">
        <aside className="sidebar">
          <button onClick={() => setActivePage('students')} className={activePage === 'students' ? 'active' : ''}>Students</button>
          <button onClick={() => setActivePage('tasks')} className={activePage === 'tasks' ? 'active' : ''}>Tasks</button>
        </aside>

        <main className="main-content">
          {activePage === 'students' && (
            <StudentsPage 
              students={students}
              setStudents={setStudents}
              onAdd={handleAdd} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          )}
        </main>
      </div>

      {/* Modals */}
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
