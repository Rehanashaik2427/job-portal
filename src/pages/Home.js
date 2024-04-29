
import React from 'react';
import { Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      <div className="navbar">
        <img
          src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png"
          alt="JobBox Logo"
          className="logo"
        />
        <ul className="nav-links">
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
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/Register">Register</Link>
          </li>
          <li>
            <Link to="/Signin">Signin</Link>
          </li>
        </ul>
      </div>


      <Container style={{ width: 700 }} className='top-heading'>
        <Row>
          <Col xs={12} md={6} className='heading-info'>
            <div style={{ width: 400}}>
              <h1>The best way to find your dream job</h1>
              <p>Forget the endless job boards and filters. Get personalized career recommendations and autofill your applications with our extension.</p>
              <Button variant="info" className='home-button'>
                <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>It's 100% free - signup</Link>
              </Button>
            </div>
          </Col>

          <Col xs={12} md={6} className="d-flex justify-content-end align-items-end">
            <div className="home" style={{width:300}}>
              <div className="head">
                <Row className="justify-content-start align-items-start">
                  <h3 className="animate-text" >5000+ JOBS</h3>
                </Row>

                <Row className="justify-content-end align-items-end">
                  <h3 className="animate-text">2000+ COMPANIES</h3>
                </Row>

                <Row className="justify-content-end align-items-end">
                  <h3 className="animate-text">100000+ students</h3>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="info" >
        <Row className="row-row1">
          <Col>
            <h2 className="text-center" style={{ fontSize: '50px' ,textAlign:'center'}}>There Are 102,256 Postings Here For you!</h2>
            <p className="text-center">Find Jobs, Employment & Career Opportunities</p>
          </Col>
        </Row>
        <Row className='search'>
        <Col>
          <InputGroup>
            <FormControl type="text" placeholder="Keywords: role-developer, analyst..." />
            <FormControl type="text" placeholder="Location" />
            <FormControl type="text" placeholder="Experience" />
            
            {/* <InputGroup.Append>
              <Button variant="primary">Search</Button>
            </InputGroup.Append> */}
          </InputGroup>
        </Col>
      </Row>
        <Row className="column-text">
          <Col>
            <p className="text-center"><b>Popular Searches:</b> Designer, Web Developer, IOS, Developer, PHP, Senior Developer, Engineer</p>
          </Col>
        </Row>
      </Container>

      <div className="browse">
        <h1 className="text-center">Browse by category</h1>
        <p className="text-center">Find the job that’s perfect for you. about 800+ new jobs everyday</p>
      </div>

      <Container className="carousel-container">
        <Row className="row row1">
          <Col md={6} className="box box1">
            <img src="https://cdn-icons-png.flaticon.com/128/3242/3242120.png" alt="Developer Icon" />
            <h4 className="text-center">Developer</h4>
          </Col>
          <Col md={6} className="box box2">
            <img src="https://cdn-icons-png.flaticon.com/128/3079/3079928.png" alt="Content Writer Icon" />
            <h4 className="text-center">Content Writer</h4>
          </Col>
        </Row>
        <Row className="row row2">
          <Col md={6} className="box box3">
            <img src="https://cdn-icons-png.flaticon.com/128/1688/1688502.png" alt="Web Developer Icon" />
            <h4 className="text-center">Web Developer</h4>
          </Col>
          <Col md={6} className="box box4">
            <img src="https://cdn-icons-png.flaticon.com/128/3141/3141158.png" alt="Marketing Icon" />
            <h4 className="text-center">Marketing</h4>
          </Col>
        </Row>
        <Row className="row row2">
          <Col md={6} className="box box5">
            <img src="https://cdn-icons-png.flaticon.com/128/11476/11476545.png" alt="Finance Icon" />
            <h4 className="text-center">Finance</h4>
          </Col>
          <Col md={6} className="box box6">
            <img src="https://cdn-icons-png.flaticon.com/128/5696/5696360.png" alt="Software Developer Icon" />
            <h4 className="text-center">Software Developer</h4>
          </Col>
        </Row>
        <Row className="row">
          <Col md={6} className="box box9">
            <img src="https://cdn-icons-png.flaticon.com/128/4230/4230869.png" alt="Customer Help Icon" />
            <h4 className="text-center">Customer Help</h4>
          </Col>
          <Col md={6} className="box box10">
            <img src="https://cdn-icons-png.flaticon.com/128/1283/1283342.png" alt="Management Icon" />
            <h4 className="text-center">Management</h4>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home;
