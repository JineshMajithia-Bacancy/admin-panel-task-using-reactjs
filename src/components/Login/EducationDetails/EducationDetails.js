import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import LoginHomepage from "../LoginHomepage/LoginHomepage";
class UserEducation extends Component {
  edit = (data, index) => {
    let confirm = window.confirm("Are you sure to want to edit this record?");
    if (confirm) {
      let sclname = data["institute"];
      let course = data["course"];
      let percent = data["percentage"];
      let sdate = data["startDate"];
      let edate = data["endDate"];
      let editData = {
        institute: sclname,
        course: course,
        percentage: percent,
        startDate: sdate,
        endDate: edate,
        id: index,
      };
      console.log("data", editData);
      localStorage.setItem("editData", JSON.stringify(editData));
      this.props.history.push("/Login/EducationDetailsEdit");
    } else {
      return;
    }
  };
  delete = (index) => {
    const allinfo = JSON.parse(localStorage.getItem("allInfo"));
    const activeindex = JSON.parse(localStorage.getItem("activeindex"));
    let i = allinfo[activeindex];
    let j = i["EduInfo"];
    let confirm = window.confirm("Are you sure to delete this record?");
    if (confirm) {
      j.splice(index, 1);
      i["EduInfo"] = j;
      localStorage.setItem("allInfo", JSON.stringify(allinfo));
      window.location.reload();
    } else {
      return;
    }
  };
  render() {
    const allinfo = JSON.parse(localStorage.getItem("allInfo"));
    const activeindex = localStorage.getItem("activeindex");
    let i = allinfo[activeindex];
    let j = i["EduInfo"];
    console.log(j);
    let showinfo = j.map((data, index) => {
      return (
        <tr>
          <td>{data["institute"]}</td>
          <td>{data["course"]}</td>
          <td>{data["percentage"]}</td>
          <td>{data["startDate"]}</td>
          <td>{data["endDate"]}</td>
          <td>
            <button
              onClick={() => {
                this.edit(data, index);
              }}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              className="danger"
              onClick={() => {
                this.delete(index);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

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
              <th>School/College</th>
              <th>Course</th>
              <th>Percentage</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th colSpan="2">EDIT | DELETE</th>
            </tr>
          </thead>
          <tbody>{showinfo}</tbody>
        </table>
        {/*<h5>
          <NavLink to="/Login/LoginHomepage"> Go to Home Page</NavLink>
        </h5>*/}
      </div>
    );
  }
}
export default UserEducation;
