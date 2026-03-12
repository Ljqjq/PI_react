import React, { useState } from 'react';
import TaskModal from './TaskModal';

const TasksPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task #1', date: '10.03', board: 'In process', description: 'Part 1' },
    { id: 2, name: 'Task #2', date: '20.03', board: 'ToDo', description: 'Part 2' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleSave = (data) => {
    // Функція формування рядка для сервера
    const dataString = JSON.stringify(data);
    console.log("Saving data string to server:", dataString);

    if (data.id) {
      setTasks(tasks.map(t => t.id === Number(data.id) ? { ...data, id: Number(data.id) } : t));
    } else {
      setTasks([...tasks, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <section className="view-section">
      <h1>Tasks</h1>
      <div className="kanban-board">
        {['ToDo', 'In process', 'Done'].map(status => (
          <div key={status} className="kanban-col">
            <div className="col-header">{status}</div>
            <div className="col-body">
              {tasks.filter(t => t.board === status).map(task => (
                <div key={task.id} className="task-card" onClick={() => { setEditingTask(task); setIsModalOpen(true); }}>
                  <div className="task-info">
                    <strong>{task.name}</strong>
                    <span>{task.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="add-task-btn" onClick={() => { setEditingTask(null); setIsModalOpen(true); }}>+ Add task</button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <TaskModal 
          task={editingTask} 
          onSave={handleSave} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </section>
  );
};

export default TasksPage;
