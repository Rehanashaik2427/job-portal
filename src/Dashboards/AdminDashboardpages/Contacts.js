import React from 'react';
import './AdminDashboard.css';
import AdminleftSide from './AdminleftSide';
const Contacts = () => {
  const userData = [
   
  ];
  return (
    <div className='body'>
         <div className='leftside'>
          <AdminleftSide />
        </div>

    <div className="rightSide">
      <h2 style={{textAlign:'center'}}>Request from the Users</h2>
      <div className="help">
      <div className='contacts-table'>
      <table id="user-table" className="user-table">

    <tr>
      <th>User</th>
      <th>Email</th>
      <th>Message</th>
      <th>Replying To Users</th>
    </tr>
 
    {userData.map((data, index) => (
      <tr key={index}>
        <td>{data.user}</td>
        <td>{data.email}</td>
        <td>{data.message}</td>
        <td>{data.reply}</td>
      </tr>
    ))}
  
</table>

      </div>
      </div>
    </div>
</div>
  )
}

export default Contacts
