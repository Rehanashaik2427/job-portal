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
import About from './pages/About';
import Candidates from './pages/Candidates';
import Companies from './pages/Companies';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Register from './pages/Register';
import Signin from './pages/Signin';

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
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
