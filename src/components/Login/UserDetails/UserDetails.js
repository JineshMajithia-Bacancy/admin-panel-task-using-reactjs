import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./UserDetails.css";
import LoginHomepage from "../LoginHomepage/LoginHomepage";

class UserDetails extends Component {
  render() {
    const allinfo = JSON.parse(localStorage.getItem("allInfo"));
    let data = allinfo.map((user) => (
      <tr>
        <td>{user.UserInfo.firstname}</td>
        <td>{user.UserInfo.lastname}</td>
        <td>{user.UserInfo.gender}</td>
        <td>{user.UserInfo.email}</td>
        <td>{user.UserInfo.phone}</td>
      </tr>
    ));
    return (
      <div className="details">
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
            <NavLink to="/Login/EducationDetails">User education</NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/Login">Log out</NavLink>
          </li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone no</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        {/*<h5>
          <NavLink to="/Login/LoginHomepage"> Go to Home Page</NavLink>
        </h5>*/}
      </div>
    );
  }
}
export default UserDetails;
