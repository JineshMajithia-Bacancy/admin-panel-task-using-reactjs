import React, { Component } from "react";
import RegistrationPage1 from "../Registration/RegistrationPage1";
import RegistrationPage2 from "../Registration/RegistrationPage2";
import Login from "../Login/Login";
import Demo from "../../demo";
import LoginHomepage from "../Login/LoginHomepage/LoginHomepage";
import UserDetails from "../Login/UserDetails/UserDetails";
import UserEducation from "../Login/EducationDetails/EducationDetails";
import ForgotPassword from "../Login/ForgotPassword/ForgotPassword";
import Edit from "../Login/EducationDetails/EducationDetailsEdit";
import { Route, Switch } from "react-router-dom";

class Form extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/Login/UserDetails" component={UserDetails} />
          <Route path="/Login/EducationDetails" component={UserEducation} />
          <Route path="/Login/EducationDetailsEdit" component={Edit} />
          <Route path="/Login/LoginHomepage" component={LoginHomepage} />
          <Route path="/Login/ForgotPassword" component={ForgotPassword} />
          <Route path="/demo" component={Demo} />
          <Route
            path="/Registration/RegistrationPage1"
            component={RegistrationPage1}
          />
          <Route
            path="/Registration/RegistrationPage2"
            component={RegistrationPage2}
          />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    );
  }
}
export default Form;
