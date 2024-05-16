import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddCompanyDetails from './Dashboards/AdminDashboardpages/AddCompanyDetails';
import AdminAction from './Dashboards/AdminDashboardpages/AdminAction';
import AdminDashboard from './Dashboards/AdminDashboardpages/AdminDashboard';
import AdminRegister from './Dashboards/AdminDashboardpages/AdminRegister';
import AllowingAccess from './Dashboards/AdminDashboardpages/AllowingAccess';
import BlockAccount from './Dashboards/AdminDashboardpages/BlockAccount';
import CompanyAddedMsg from './Dashboards/AdminDashboardpages/CompanyAddedMsg';
import CompanyDetailsByAdmin from './Dashboards/AdminDashboardpages/CompanyDetailsByAdmin';
import CompanyValidation from './Dashboards/AdminDashboardpages/CompanyValidation';
import Contacts from './Dashboards/AdminDashboardpages/Contacts';
import Myprofile from './Dashboards/AdminDashboardpages/Myprofile';
import UserValidation from './Dashboards/AdminDashboardpages/UserValidation';
import AppliedSucessmsg from './Dashboards/CandidateDashboardpages/AppliedSucessmsg';
import CandiadteJobs from './Dashboards/CandidateDashboardpages/CandiadteJobs';
import CandidateDashboard from './Dashboards/CandidateDashboardpages/CandidateDashboard';
import CandidateRegisterSucessMsg from './Dashboards/CandidateDashboardpages/CandidateRegisterSucessMsg';
import CandidateSignup from './Dashboards/CandidateDashboardpages/CandidateSignup';
import CandidatesCompanies from './Dashboards/CandidateDashboardpages/CandidatesCompanies';
import DreamCompany from './Dashboards/CandidateDashboardpages/DreamCompany';
import MyApplication from './Dashboards/CandidateDashboardpages/MyApplication';
import Payment from './Dashboards/CandidateDashboardpages/Payment';
import Profile from './Dashboards/CandidateDashboardpages/Profile';
import Resume from './Dashboards/CandidateDashboardpages/Resume';
import AddJob from './Dashboards/HrDashboardpages/AddJob';
import Applications from './Dashboards/HrDashboardpages/Applications';
import HrDashboard from './Dashboards/HrDashboardpages/HrDashboard';
import HrProfile from './Dashboards/HrDashboardpages/HrProfile';
import HrRegistrationForm from './Dashboards/HrDashboardpages/HrRegistrationForm';
import HrRegistrationSuccessMsg from './Dashboards/HrDashboardpages/HrRegistrationSuccessMsg';
import HrSignin from './Dashboards/HrDashboardpages/HrSignin';
import JobAdded from './Dashboards/HrDashboardpages/JobAddSuccessful';
import Jobs from './Dashboards/HrDashboardpages/Jobs';

import People from './Dashboards/HrDashboardpages/People';
import PostedJobs from './Dashboards/HrDashboardpages/PostedJobs';
import UpdateJob from './Dashboards/HrDashboardpages/UpdateJob';
import About from './pages/About';
import CandidateSucessMsg from './pages/CandidateSucessMsg';
import Candidates from './pages/Candidates';
import Companies from './pages/Companies';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Register from './pages/Register';
import Signin from './pages/Signin';
import TermsAndConditions from './pages/TermsAndConditions';

// import Jobs from './Dashboards/HrDashboardpages/Jobs';
// import HrRegistrationSuccessMsg from './Dashboards/HrDashboardpages/HrRegistrationSuccessMsg';
// import UpdateJob from './Dashboards/HrDashboardpages/UpdateJob';
// import AddJob from './Dashboards/HrDashboardpages/AddJob';
// import JobAdded from './Dashboards/HrDashboardpages/JobAddSuccessful';
import ApplicationDetails from './Dashboards/HrDashboardpages/ApplicationDetails';
import HrLeftSide from './Dashboards/HrDashboardpages/HrLeftSide';
import ViewApplications from './Dashboards/HrDashboardpages/ViewApplications';
import CompamyPage from './Dashboards/CandidateDashboardpages/CompanyPage';
import ResumeAdd from './Dashboards/CandidateDashboardpages/ResumeAdd';
import FindCompany from './pages/FindCompany';



const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/companies" component={Companies} />
          <Route path="/candidates" component={Candidates} />
          <Route path="/register" component={Register} />
          <Route path="/signin" component={Signin} />
          <Route path='/terms-and-conditions' component={TermsAndConditions} />

          <Route path="/admin-register" component={AdminRegister} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/admin-action" component={AdminAction} />
          <Route path="/allowing-access" component={AllowingAccess} />
          <Route path="/user-validation" component={UserValidation} />
          <Route path="/company-validation" component={CompanyValidation} />
          <Route path="/add-company-details" component={AddCompanyDetails} />
          <Route path="/block-account" component={BlockAccount} />
          <Route path="/my-profile" component={Myprofile} />
          <Route path="/contacts" component={Contacts} />

          <Route path="/companyDetailsByAdmin" component={CompanyDetailsByAdmin} />
          <Route path="/companyDetailsAdded" component={CompanyAddedMsg} />
          <Route path='/candidate-sucess-msg' component={CandidateSucessMsg} />
          <Route path='/candidate-signup' component={CandidateSignup} />
          <Route path='/CandidateRegisterSucessMsg' component={CandidateRegisterSucessMsg} />
          <Route path='/candidate-dashboard' component={CandidateDashboard} />
          <Route path='/candidate-jobs'  component={CandiadteJobs} />
          <Route path='/candidate-companies' component={CandidatesCompanies}/>
          <Route path='/my-application' component={MyApplication} />
          <Route path='/payment' component={Payment} />
          <Route path='/profile' component={Profile} />
          <Route path='/resume' component={Resume}  />
          <Route path='/dream-company' component={DreamCompany} />
          <Route path='/applied-success-msg' component={AppliedSucessmsg} />


          <Route path='/hr-applications' component={Applications} />
          <Route path='/hr-registeration' component={HrRegistrationForm} />
          <Route path='/hr-signin' component={HrSignin} />
          <Route path='/hr-dashboard' component={HrDashboard} />
          <Route path='/posted-jobs' component={PostedJobs} />
          <Route path='/people' component={People} />
          <Route path='/hr-profile' component={HrProfile} />
          <Route path="/posted-jobs" component={PostedJobs} />
          <Route path="/post-jobs" component={Jobs} />
          <Route path="/hr-RegSuccess" component={HrRegistrationSuccessMsg} />
          <Route path="/update-job" component={UpdateJob}/>
          <Route path="/addJob" component={AddJob}/>
          <Route path="/jodAddSuccess" component={JobAdded}/>
          <Route path="/applicationDetails" component={ApplicationDetails} />
          <Route path='/viewApplications' component={ViewApplications} />
          <Route path='hr-leftSide' component={HrLeftSide}/>
         
          <Route path='/companyPage' component={CompamyPage} />
          <Route path='/resumeAdd' component={ResumeAdd} />
          <Route path='/findCompany' component={FindCompany} />

        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
