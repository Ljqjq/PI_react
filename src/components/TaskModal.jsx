import React from 'react';

const TaskModal = ({ onClose, taskToEdit }) => {
  return (
    <div className="custom-modal">
      <div className="modal-content task-edit-box">
        <div className="form-row">
          <label>Board</label>
          <select><option>ToDo</option><option>In process</option><option>Done</option></select>
        </div>
        <div className="form-row">
          <label>Name</label>
          <input type="text" defaultValue={taskToEdit?.name || "Task #5"} />
        </div>
        <div className="form-row">
          <label>Date</label>
          <input type="text" defaultValue={taskToEdit?.date || "20.03.2022"} />
        </div>
        <div className="form-row">
          <label>Description</label>
          <textarea defaultValue={taskToEdit?.desc || "Details..."}></textarea>
        </div>
        <div className="modal-footer">
          <button className="btn-outline" onClick={onClose}>Save</button>
          <button className="btn-outline" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
