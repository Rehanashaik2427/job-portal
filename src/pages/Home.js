import React from 'react';
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div>

      <div className="navbar">
          <img
            src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png"
            alt="JobBox Logo"
            className="logo"
          />
          <ul className="nav-links"> {/* Use an unordered list for navigation links */}
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/About">About Us</Link>
            </li>
            <li>
                <Link to="/admin-register">Admin</Link>
            </li>
            <li>
              <Link to="/Companies">Companies</Link>
            </li>
            <li>
              <Link to="/Candidates">Candidates</Link>
            </li>
            <li>
              <Link to="/Register">Register</Link>
            </li>
            <li>
              <Link to="/Signin">Signin</Link>
            </li>
          </ul>
      </div>

      <div>
          <h1 style={{textAlign:'center'}}>The best way to find your dream job</h1>
      </div>

      <div className="home">
          <div className="head">
              <h3>5000+ JOBS</h3>
              <h3>2000+ COMPANIES</h3>
              <h3>100000+ students</h3>
            </div>
      </div>

      <div className='info'>
        <div className="row row1">
          <div className="column">
            <h2 style={{ textAlign: 'center', fontSize: '50px' }}>There Are 102,256 Postings Here For you!</h2>
            <p style={{ textAlign: 'center' }}>Find Jobs, Employment & Career Opportunities</p>
          </div>

          <div className="search">
            <input type="text" placeholder="Keywords:role-developer,analyst...." />
            <input type="text" placeholder="Location" />
            <input type="text" placeholder="Experience" />
            {/* <button className='home-button'>Search</button> */}
            {/* <button className='search-button' style={{backgroundColor:'#062a3f',color:'white',fontSize:'18px',width:'120px',height:'45px'}}><FaSearch />search</button><br /> */}
          </div>
        </div>
          <div className="column text">
            <p style={{ textAlign: 'center' }}><b>Popular Searches:</b> Designer, Web Developer, IOS, Developer, PHP, Senior Developer, Engineer</p>
          </div>
      </div>

      <div className="browse">
        <h1>Browse by category</h1>
        <p>Find the job that’s perfect for you. about 800+ new jobs everyday</p>
      </div>
      <div className="carousel-container">
      <div className="row row1">
        <div className="box box1">
          <img src="https://cdn-icons-gif.flaticon.com/13470/13470965.gif" alt="Developer Icon" />
          <h4>Developer</h4>
        </div>
        <div className="box box2">
          <img src="https://cdn-icons-png.flaticon.com/128/3079/3079976.png" alt="Content Writer Icon" />
          <h4>Content Writer</h4>
        </div>
      </div>
      <div className="row row2">
        <div className="box box3">
          <img src="https://cdn-icons-gif.flaticon.com/14447/14447697.gif" alt="Web Developer Icon" />
          <h4>Web Developer</h4>
        </div>
        <div className="box box4">
          <img src="https://cdn-icons-gif.flaticon.com/12764/12764368.gif" alt="Marketing Icon" />
          <h4>Marketing</h4>
        </div>
      </div>
      <div className="row row2">
        <div className="box box5">
          <img src="https://cdn-icons-gif.flaticon.com/9908/9908555.gif" alt="Finance Icon" />
          <h4>Finance</h4>
        </div>
        <div className="box box6">
          <img src="https://cdn-icons-png.flaticon.com/128/1589/1589641.png" alt="Software Developer Icon" />
          <h4>Software Developer</h4>
        </div>
      </div>
      <div className="row">
        <div className="box box9">
          <img src="https://cdn-icons-gif.flaticon.com/15370/15370749.gif" alt="Customer Help Icon" />
          <h4>Customer Help</h4>
        </div>
        <div className="box box10">
          <img src="https://cdn-icons-png.flaticon.com/128/1283/1283342.png" alt="Management Icon" />
          <h4>Management</h4>
        </div>
      </div>
    </div>

      
    </div>
    
  )
}

export default Home
