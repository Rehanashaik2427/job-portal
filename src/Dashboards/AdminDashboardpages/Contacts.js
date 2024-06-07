import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { FaBuilding, FaComments, FaHome, FaPlus, FaUniversalAccess, FaUser, FaUserCheck, FaUserLock } from 'react-icons/fa'; // Import the icons you need from React Icons
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './AdminDashboard.css';
import axios from 'axios';
const Contacts = () => {
  
  const BASE_API_URL = "http://localhost:8082/api/jobbox";
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
   const [showModal, setShowModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contactId, setContactId] = useState();
  useEffect(() => {
    fetchContacts();
  }, [page, pageSize]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/getContactMessages?page=${page}&size=${pageSize}`);
      setContacts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSendMessage = async (message) => {
    try {
      // Send message using API
      // Use selectedEmail and message state variables
      const response = await axios.put(`${BASE_API_URL}/sendReplyMessages?replyMessage=${message}&replyTo=${selectedEmail}&contactId=${contactId}`);
      console.log('Sending message to:', selectedEmail);
      console.log('Message:', message);
      // After sending the message, you can close the modal
      setShowModal(false);
      if(response)
      alert("Reply send successfully");
      // Optionally, you can update the UI to indicate that the message has been sent

      fetchContacts();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const openModal = (email,contactId) => {
    setSelectedEmail(email);
    setContactId(contactId);
    setShowModal(true);
  
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmail('');
    setMessage('');
  };

  return (
    <div className='body'>
    <div className='leftside'>
      <nav id='logo'>
        <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
      </nav>
      <div className="admin-details">
  <nav>
    <h2>AdminName</h2>
  </nav>
  <section id="dashboard">
    <FaHome /> <Link to="/admin-dashboard">Dashboard</Link>
  </section>
  <section id="userValidation">
    <FaUserCheck /> <Link to="/user-validation">Validation User</Link>
  </section>
  <section id="companyValidation">
    <FaBuilding />  <Link to="/company-validation">Validation Company</Link>
  </section>
  <section id="allowingAccess">
    <FaUniversalAccess /> <Link to="/allowing-access">Acess</Link>
  </section>
  <section id="blockAccount">
    <FaUserLock /> <Link to="/block-account">Block Account</Link>
  </section>
  <section id="addCompanyDetails">
    <FaPlus /> <Link to="/add-company-details">Company Details</Link>
  </section>
  <section id="my-profile">
    <FaUser /> <Link to="/my-profile">My Profile</Link>
  </section>
  <section id="contacts">
    <FaComments /> <Link to="/contacts">Contacts</Link>
  </section>
  <section>
          <FontAwesomeIcon icon={faHome} /> <Link to='/'>Home</Link>
        </section>  
</div>
    </div>

    <div className="rightSide">
        <h2 style={{ textAlign: 'center' }}>Request from the Users</h2>
        <div className="help">
          <div className='contacts-table'>
            <table id="user-table" className="user-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Subject</th>
                   <th>Message</th>
                  <th>Replying To Users</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(contact => (
                  <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.subject}</td>
                    <td>{contact.message}</td>
                    <td>
      {contact.reply === null ? (
        <button onClick={() => openModal(contact.email,contact.contactId)}>Reply</button>
      ) : (
        <h3>Replied</h3>
      )}
    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Compose Message</h2>
            <p>To: {selectedEmail}</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
            ></textarea>
          <button onClick={() => handleSendMessage(message)}>Send</button>
          </div>
        </div>
      )}
        </div>
        <nav>
          <ul className='pagination'>
            <li>
              <button className='page-button' onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
            </li>
            {[...Array(totalPages).keys()].map((pageNumber) => (
              <li key={pageNumber} className={pageNumber === page ? 'active' : ''}>
                <button className='page-link' onClick={() => handlePageChange(pageNumber)}>{pageNumber + 1}</button>
              </li>
            ))}
            <li>
              <button className='page-button' onClick={handleNextPage} disabled={page === totalPages - 1}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Contacts
