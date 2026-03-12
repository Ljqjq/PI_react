import React, { useState } from 'react';
import './App.css';
import StudentsPage from './components/Students/StudentsPage';
import DeleteModal from './components/Shared/DeleteModal';
import StudentsFormModal from './components/Students/StudentsFormModal'; // For Add/Edit

function App() {
  const [activePage, setActivePage] = useState('students');
  const [students, setStudents] = useState([
    { id: 1, group: 'KN-21', name: 'John Smith', gender: 'M', dob: '11.05.2004', active: true },
    { id: 2, group: 'KN-22', name: 'Ann Bond', gender: 'F', dob: '24.05.2004', active: false },
  ]);

  // Modal Visibility States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Data States for Modals
  const [selectedStudent, setSelectedStudent] = useState(null); // For Delete/Edit

  // --- Handlers ---

  const handleAddClick = () => {
    setSelectedStudent(null); // Clear selection for a "New" student
    setIsFormOpen(true);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student); // Fill the form with this student's data
    setIsFormOpen(true);
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setIsDeleteOpen(true);
  };

  const saveStudent = (studentData) => {
    if (selectedStudent) {
      // Update existing
      setStudents(students.map(s => s.id === selectedStudent.id ? { ...s, ...studentData } : s));
    } else {
      // Add new
      const newStudent = { ...studentData, id: Date.now(), active: true };
      setStudents([...students, newStudent]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="app-layout">
      {/* ... (Header and Sidebar same as before) ... */}

      <main className="main-content">
        {activePage === 'students' && (
          <StudentsPage 
            students={students} 
            onAdd={handleAddClick} 
            onEdit={handleEditClick} 
            onDelete={handleDeleteClick} 
          />
        )}
      </main>

      {/* 1. DELETE WARNING MODAL */}
      {isDeleteOpen && (
        <DeleteModal 
          name={selectedStudent?.name} 
          onClose={() => setIsDeleteOpen(false)} 
          onConfirm={() => {
            setStudents(students.filter(s => s.id !== selectedStudent.id));
            setIsDeleteOpen(false);
          }} 
        />
      )}

      {/* 2. ADD/EDIT STUDENT MODAL */}
      {isFormOpen && (
        <StudentsFormModal 
          student={selectedStudent} 
          onClose={() => setIsFormOpen(false)} 
          onSave={saveStudent} 
        />
      )}
    </div>
  );
}

// Ensure this line is exactly here at the end of the file:
export default App;
