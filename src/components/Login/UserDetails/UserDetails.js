import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./UserDetails.css";

class UserDetails extends Component {
  render() {
    const allinfo = JSON.parse(localStorage.getItem("allinfo"));
    let data = allinfo.map((user) => (
      <tr>
        <td>{user.Info.firstname}</td>
        <td>{user.Info.lastname}</td>
        <td>{user.Info.gender}</td>
        <td>{user.Info.email}</td>
        <td>{user.Info.phone}</td>
      </tr>
    ));
    return (
      <div className="details">
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
        <h3>
          <NavLink to="/Login/LoginHomepage"> Go to Home Page</NavLink>
        </h3>
      </div>
    );
  }
}
export default UserDetails;
