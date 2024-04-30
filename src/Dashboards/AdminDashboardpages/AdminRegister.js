import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import './Admin.css'; // Import custom CSS file

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    history.push("/admin-dashboard");
  }

  return (
    <div className="admin-form-container">
      <div className='admin-login-form'>
      <Form className='form-container' onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail" className='admin-form-group'>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className='admin-form-group'> 
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </Form.Group>
        <div className='admin-button'>
          <Button variant="primary" type="submit">Login</Button>
        </div>
      </Form>
      </div>
    </div>
  );
};

export default AdminRegister;
