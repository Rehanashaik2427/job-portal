import React from 'react';

const AdminAction = () => {
    const approveRequest = () => {
        // Handle approve logic here, such as sending a request to the server
        console.log('Request Approved');
      };
    
      const rejectRequest = () => {
        // Handle reject logic here, such as sending a request to the server
        console.log('Request Rejected');
      };
  return (
    <div>
    <header>
      <h1>Admin Dashboard</h1>
    </header>
    <main>
      <div className="request">
        <p>Join request for John Doe as Myntra HR</p>
        <button className="approve-btn" onClick={approveRequest}>
          Approve
        </button>
        <button className="reject-btn" onClick={rejectRequest}>
          Reject
        </button>
      </div>
    </main>
  </div>
  )
}

export default AdminAction
