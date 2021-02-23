import React, { Component } from "react";
import Input from "../Input/Input";
import "./RegistrationPage2.css";
import { NavLink } from "react-router-dom";

class RegistrationPage2 extends Component {
  state = {
    form2: {
      sclname: {
        type: "input",
        config: {
          placeholder: "Institute/School Name",
          name: "sclname",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },
      percent: {
        type: "input",
        config: {
          placeholder: "Percentage/CGPA",
          name: "percent",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          isNumeric: true,
          minLength: 1,
          isPercent: true,
        },
      },
      course: {
        type: "input",
        config: {
          placeholder: "Course/Stream",
          name: "course",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },
      sdate: {
        type: "date",
        config: {
          name: "start date",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },
      edate: {
        type: "date",
        config: {
          name: "end date",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          echeck: true,
        },
      },
    },
    formisValid: false,
    addData: [],
    pushData: [],
  };
  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.isPercent) {
      let pattern = /^([0-9]){1,2}(\.[0-9]{1,2})?$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.echeck) {
      let edate = value;
      let sdate = this.state.form2.sdate.value;
      if (edate < sdate) {
        isValid = !isValid;
      }
    }
    return isValid;
  };
  onchangeHandler = (event, id) => {
    let newforms = { ...this.state.form2 };
    let updated = { ...newforms[id] };
    updated.value = event.target.value;
    updated.valid = this.checkValidity(updated.value, updated.validation);
    updated.touched = true;
    newforms[id] = updated;
    let formValid = true;

    for (let id in newforms) {
      formValid = newforms[id].valid && formValid;
    }
    this.setState({
      form2: newforms,
      formisValid: formValid,
    });
  };
  back = () => {
    this.props.history.goBack();
  };
  submitted = (e) => {
    e.preventDefault();
    this.addmore();
    let info = JSON.parse(localStorage.getItem("info"));
    let eduinfo = JSON.parse(localStorage.getItem("eduinfo"));
    let allinfos = JSON.parse(localStorage.getItem("allinfo"));
    let pushData = [];
    if (allinfos) {
      pushData = allinfos;
    }
    pushData.push({ Info: info, EduInfo: eduinfo });
    localStorage.setItem("allinfo", JSON.stringify(pushData));
    localStorage.removeItem("info");
    localStorage.removeItem("eduinfo");
    this.props.history.push("/");
  };

  addmore = () => {
    let formData = {};
    for (let formElement in this.state.form2) {
      formData[formElement] = this.state.form2[formElement].value;
    }
    const updatedform2 = { ...this.state.form2 };
    const addCopyData = [...this.state.addData];
    addCopyData.push(formData);
    console.log("Updated Form", updatedform2);
    console.log("Add Copy Data", addCopyData);
    localStorage.setItem("eduinfo", JSON.stringify(addCopyData));
    for (let id in updatedform2) {
      updatedform2[id].touched = false;
      updatedform2[id].value = "";
      updatedform2[id].valid = false;
    }
    this.setState({
      form2: updatedform2,
      addData: addCopyData,
      formisValid: false,
    });
  };
  render() {
    let loadform = [];
    for (let key in this.state.form2) {
      loadform.push({
        id: key,
        info: this.state.form2[key],
      });
    }
    const allinfo = JSON.parse(localStorage.getItem("allinfo"));
    let i = allinfo[0];
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
      <div>
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

        <div className="rpage2">
          <form>
            <h3>Please enter your education details.</h3>
            <h3>Step 2</h3>
            {loadform.map((elem) => (
              <Input
                inputtype={elem.info.type}
                configuration={elem.info.config}
                value={elem.info.value}
                key={elem.id}
                valid={!elem.info.valid}
                shouldvalidate={elem.info.validation}
                touched={elem.info.touched}
                changed={(event) => this.onchangeHandler(event, elem.id)}
              />
            ))}
          </form>
          <button onClick={this.addmore} disabled={!this.state.formisValid}>
            Add more education
          </button>
          <button onClick={this.back}>Previous</button>
          <button disabled={!this.state.formisValid} onClick={this.submitted}>
            Register Me
          </button>
        </div>
      </div>
    );
  }
}
export default RegistrationPage2;
