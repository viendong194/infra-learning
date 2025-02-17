// client/src/components/Register.js
import React, { useState } from 'react';
import axios from '../api/axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/register', { email, password });
      alert('User registered successfully');
    } catch (error) {
      alert('Error registering user:'+error);
    }
  };

  return (
    <div className='container'>
      <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    </div>
  );
}

export default Register;
