import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './Admin.css';

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    history.push("/admin-dashboard"); // Fix: replace pushState with push
  }

  return (
    <div className="admin-from-container">
    <form className='form-container' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='form-group'>
        <label>Password:</label>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className='admin-button'>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
  );
};

export default AdminRegister;
