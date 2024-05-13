import { faBuilding, faCreditCard, faFile, faFileLines, faGlobe, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faPaperclip, faUser,faSearch,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CandidateDashboard.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import CandidateLeftSide from './CandidateLeftSide';

const Payment = () => {

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };


  const location = useLocation();
  const userName=location.state?.userName;
  const userEmail=location.state?.userEmail;
  const user = {
    userName: userName,
    
     userEmail: userEmail,
   };

  return (
    <div className='candidate-dashboard-container'>
    <div className='left-side'>
   <CandidateLeftSide user={user} />
 </div>

      <div className='rightside'>
                           <div className='payment-div' >
                              <div className="candidate-search">
                                    {/* <input type='text' placeholder='serach'></input>
                                    <button>
                                      <FontAwesomeIcon icon={faSearch} className='button' style={{color:'skyblue'}}/>
                                    </button> */}
                                    <div><FontAwesomeIcon icon={faUser} id="user" className='icon' style={{color:'black'}} onClick={toggleSettings}/></div>
                                  
                              </div>
                                
                            
                            </div>
                                {showSettings && (
                                <div id="settings-container">
                                  {/* Your settings options here */}
                                  <ul>
                                    <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sing out</Link></li>
                                    <li>Setting 2</li>
                                    {/* Add more settings as needed */}
                                  </ul>
                                </div>
                              )}

 
     

        <div className="payment-container">
          <div>
            <h2>Payment Via</h2>
            <section className="payment-options">
              <h2 className='payment-option'><FontAwesomeIcon icon={faCreditCard}  /> Credit/Debit card</h2>
              <h2 className='payment-option'><FontAwesomeIcon icon={faPaperclip} /> UPI payments</h2>
              <h2 className='payment-option'><FontAwesomeIcon icon={faGlobe} /> Net Banking</h2>
            </section>
          </div>

          <div>
            <h2>Payment History</h2>
            <p style={{textAlign:'center'}}>Payments Details</p>
            {/* Add payment history details here */}
          </div>
        </div>
        </div>
        </div>
        
  );
}

export default Payment;
