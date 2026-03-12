import React, { useState } from 'react';
import TaskModal from './TaskModal';

const TasksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task #1', date: '10.03', status: 'In process' },
    { id: 2, name: 'Task #2', date: '20.03', status: 'ToDo' },
    { id: 3, name: 'Beginning...', date: '10.03', status: 'Done' }
  ]);

  const columns = ['ToDo', 'In process', 'Done'];

  return (
    <section className="view-section">
      <h1>Tasks</h1>
      <div className="kanban-board">
        {columns.map(col => (
          <div key={col} className="kanban-col">
            <div className="col-header">{col}</div>
            <div className="col-body">
              {tasks.filter(t => t.status === col).map(task => (
                <div key={task.id} className="task-card">
                  <span>{task.name}</span>
                  <span>{task.date}</span>
                </div>
              ))}
            </div>
            <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>+ Add task</button>
          </div>
        ))}
      </div>

      {isModalOpen && <TaskModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};

export default TasksPage;
