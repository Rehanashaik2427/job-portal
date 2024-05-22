import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const UserDetailsModal = ({ show, handleClose, user }) => {
  return (
    <Modal show={show} onHide={handleClose}>
   
        <Modal.Title><h4 style={{textAlign:'center'}}>User Details</h4></Modal.Title>
      
      <Modal.Body>
        <p><strong>Name:</strong> {user?.userName}</p>
        <p><strong>Email:</strong> {user?.userEmail}</p>
        <p><strong>Phone Number:</strong> {user?.phone}</p>
        <p><strong>Company Name:</strong> {user?.companyName}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailsModal;
