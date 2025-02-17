// client/src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('/tasks', {
      headers: { 'x-access-token': token }
    });
    setTasks(response.data);
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    const token = localStorage.getItem('token');
    if (!title || !description || !dueDate) {
      alert('Please fill in all fields');
      return;
  }

 
    await axios.post('/tasks', { title, description, duedate: dueDate, status:'todotodo' }, {
      headers: { 'x-access-token': token }
    });
    setTitle('');
    setDescription('');
    setDueDate('');
    fetchTasks();
  };

  const updateTaskStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    await axios.put('/tasks', { id, status }, {
      headers: { 'x-access-token': token }
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete('/tasks', {
      headers: { 'x-access-token': token },
      data: { id }
    });
    fetchTasks();
  };

  return (
    <div className="container">
    <h1>Task List</h1>
    <input type="text" value={title} required onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
    <input type="text" value={description} required onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
    <input type="date" value={dueDate} required onChange={(e) => setDueDate(e.target.value)} />
    <button onClick={addTask}>Add Task</button>
    <ul>
        {tasks.map(task => (
            <li key={task.id}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>Due Date: {task.duedate}</p>
                <p>Status: {task.status}</p>
                <button onClick={() => updateTaskStatus(task.id, 'Todo')}>Todo</button>
                <button onClick={() => updateTaskStatus(task.id, 'in-progress')}>In Progress</button>
                <button onClick={() => updateTaskStatus(task.id, 'Done')}>Done</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
        ))}
    </ul>
</div>

  );
}

export default TaskList;
