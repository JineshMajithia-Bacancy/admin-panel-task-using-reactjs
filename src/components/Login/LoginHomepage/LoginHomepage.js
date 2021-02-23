import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import UserDetails from "../UserDetails/UserDetails";
import "./LoginHomepage.css";

class LoggedIn extends Component {
  render() {
    let activeFname = localStorage.getItem("activeFname");
    let activeLname = localStorage.getItem("activeLname");
    return (
      <div className="all">
        <h5>You have successfully logged in. :)</h5>
        <ul>
          <li>
            {" "}
            <NavLink to="/Login/LoginHomepage">Home </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/Login/UserDetails">User details</NavLink>
          </li>
          <li>
            <NavLink to="/Login/EducationDetails">User education </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/Login">Log out </NavLink>
          </li>
        </ul>
        <h5>
          Welcome {activeFname} {activeLname}.
        </h5>
        <Route path="/Login/UserDetails" component={UserDetails} />
      </div>
    );
  }
}
export default LoggedIn;
