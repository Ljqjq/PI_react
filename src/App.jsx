import React, { useState, useEffect } from 'react';
import './App.css';
import StudentsPage from './components/Students/StudentsPage';
import StudentsFormModal from './components/Students/StudentsFormModal';
import DeleteModal from './components/Students/DeleteModal';

function App() {
  const [activePage, setActivePage] = useState('students');

  // --- PERSISTENCE LOGIC ---
  // Load from localStorage on initialization
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('cms_students');
    return saved ? JSON.parse(saved) : [
      { id: 1, group: 'KN-21', firstName: 'John', lastName: 'Smith', gender: 'Male', dob: '2004-05-11', active: true },
      { id: 2, group: 'KN-22', firstName: 'Ann', lastName: 'Bond', gender: 'Female', dob: '2004-05-24', active: false },
    ];
  });

  // Save to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem('cms_students', JSON.stringify(students));
  }, [students]);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // --- USERNAME FORMATTING ---
  const rawUserName = "james bond"; // This could eventually come from an input
  
  const formatName = (name) => {
    return name.split(' ')
      .filter(word => word.length > 0)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const displayName = formatName(rawUserName);
  // Get initials for the avatar circle (e.g., "James Bond" -> "JB")
  const initials = displayName.split(' ').map(n => n[0]).join('');

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

  const cleanName = (str) => {
     return str
       .trim()               // 1. Remove start/end spaces
       .replace(/\s+/g, ' ') // 2. Turn multiple spaces into one
       .split(' ')           // 3. Prepare for capitalization
       .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
       .join(' ');           // 4. Join back
  };

  const saveStudent = (formData) => {
      // Clean names before they hit the state
      const cleanedFirstName = cleanName(formData.firstName);
      const cleanedLastName = cleanName(formData.lastName);

      // Validation: Ensure we actually have characters left after cleaning
      if (cleanedFirstName.length === 0 || cleanedLastName.length === 0) {
        alert("Name cannot be empty or just spaces!");
        return;
      }

      const finalData = {
        ...formData,
        firstName: cleanedFirstName,
        lastName: cleanedLastName,
        active: formData.active ?? true
      };

      if (selectedStudent) {
        setStudents(students.map(s => s.id === selectedStudent.id ? { ...s, ...finalData } : s));
      } else {
        setStudents([...students, { ...finalData, id: Date.now() }]);
      }
      setIsFormOpen(false);
  };


  return (
    <div className="app-layout">
      <header className="top-nav">
        <div className="logo">CMS</div>
        
        <div className="user-profile">
          <div className="notification-bell">
            🔔<span className="bell-dot"></span>
          </div>
          <span className="user-name">{displayName}</span>
          <div className="avatar">{initials}</div>
        </div>
      </header>

      <div className="body-container">
        <aside className="sidebar">
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
