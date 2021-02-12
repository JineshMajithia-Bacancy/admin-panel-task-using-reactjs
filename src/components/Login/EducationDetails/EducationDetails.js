import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class UserEducation extends Component {
  edit = (data, index) => {
    let confirm = window.confirm("Are you sure to want to edit this record?");
    if (confirm) {
      let sclname = data["sclname"];
      let course = data["course"];
      let percent = data["percent"];
      let sdate = data["sdate"];
      let edate = data["edate"];
      let editData = {
        sclname: sclname,
        course: course,
        percent: percent,
        sdate: sdate,
        edate: edate,
        id: index,
      };
      localStorage.setItem("editData", JSON.stringify(editData));
      this.props.history.push("/Login/EducationDetailsEdit");
    } else {
      return;
    }
  };
  delete = (index) => {
    const allinfo = JSON.parse(localStorage.getItem("allinfo"));
    const activeindex = JSON.parse(localStorage.getItem("activeindex"));
    let i = allinfo[activeindex];
    let j = i["EduInfo"];
    let confirm = window.confirm("Are you sure to delete this record?");
    if (confirm) {
      j.splice(index, 1);
      i["EduInfo"] = j;
      localStorage.setItem("allinfo", JSON.stringify(allinfo));
      window.location.reload();
    } else {
      return;
    }
  };
  render() {
    const allinfo = JSON.parse(localStorage.getItem("allinfo"));
    const activeindex = localStorage.getItem("activeindex");
    let i = allinfo[activeindex];
    let j = i["EduInfo"];
    console.log(j);
    let showinfo = j.map((data, index) => {
      return (
        <tr>
          <td> {data["sclname"].value}</td>
          <td>{data["course"].value}</td>
          <td>{data["percent"].value}</td>
          <td>{data["sdate"].value}</td>
          <td>{data["edate"].value}</td>
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
        <h3>
          <NavLink to="/Login/LoginHomepage"> Go to Home Page</NavLink>
        </h3>
      </div>
    );
  }
}
export default UserEducation;
