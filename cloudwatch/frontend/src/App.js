// client/src/App.js
import React from 'react';
import './App.css';
import { Route, Routes,Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TaskList from './components/TaskList';
import useAuth from './hooks/useAuth';

function App() {
  const isAuthenticated = useAuth();
  return (
    <div className='App'>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/tasks" /> : <Login />}/>
        <Route path="/tasks" element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />}/>
        <Route path="/" element={<Navigate to="/login"/>}/>
      </Routes>
    </div>
  );
}

export default App;