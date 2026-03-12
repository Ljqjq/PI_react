import React, { useState, useEffect } from 'react';

const TaskModal = ({ task, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: '', // Приховане поле
    board: 'ToDo',
    name: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    if (task) setFormData(task);
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Формуємо рядок даних для передачі на сервер
    const dataToSend = JSON.stringify(formData);
    console.log("String for server:", dataToSend);
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="task-edit-box">
        <input type="hidden" name="id" value={formData.id} />
        
        <div className="form-row">
          <label>Board</label>
          <select name="board" value={formData.board} onChange={handleChange}>
            <option value="ToDo">ToDo</option>
            <option value="In process">In process</option>
            <option value="Done">Done</option>
          </select>
        </div>
        
        <div className="form-row">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>Date</label>
          <input type="text" name="date" value={formData.date} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>

        <div className="modal-footer">
          <button className="btn-save" onClick={handleSubmit}>
            {formData.id ? 'Save' : 'Add'}
          </button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
