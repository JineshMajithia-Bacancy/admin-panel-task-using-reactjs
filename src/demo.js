import React, { Component } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { NavLink } from "react-router-dom";
import "./components/Registration/RegistrationPage1.css";

class demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      validations: {
        institute: {
          required: true,
        },
        course: {
          required: true,
        },
        percentage: {
          required: true,
          regex: /^([0-9]){1,2}(\.[0-9]{1,2})?$/,
        },
        startDate: {
          required: true,
        },
        endDate: {
          required: true,
        },
      },
      isFormValid: false,
      isValidForSubmit: false,
      message: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createUI = () => {
    let style = {
      color: "white",
      backgroundColor: "#ff2f3c",
      fontSize: "large",
      fontWeight: "bold",
      position: "relative",
      left: "500px",
    };
    return this.state.values.map((el, i) => (
      <div key={i}>
        <table>
          <tr>
            <th>Institute:</th>
            <td>
              <input
                type="text"
                name="institute"
                value={el.institute ? el.institute.value : ""}
                onChange={this.handleChange.bind(this, i)}
              />
            </td>
          </tr>
          <tr>
            <th>Course:</th>
            <td>
              <input
                type="text"
                name="course"
                value={el.course ? el.course.value : ""}
                onChange={this.handleChange.bind(this, i)}
              />
            </td>
          </tr>
          <tr>
            <th>Percentage/CGPA:</th>
            <td>
              <input
                type="text"
                name="percentage"
                value={el.percentage ? el.percentage.value : ""}
                onChange={this.handleChange.bind(this, i)}
              />
            </td>
          </tr>
          <tr>
            <th>Start Date:</th>
            <td>
              <input
                type="date"
                name="startDate"
                value={el.startDate ? el.startDate.value : ""}
                onChange={this.handleChange.bind(this, i)}
              />
            </td>
          </tr>
          <tr>
            <th>End Date:</th>
            <td>
              <input
                type="date"
                name="endDate"
                value={el.endDate ? el.endDate.value : ""}
                onChange={this.handleChange.bind(this, i)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="button"
                style={style}
                value="remove"
                onClick={this.removeClick.bind(this, i)}
              />
            </td>
          </tr>
        </table>
      </div>
    ));
  };

  checkValidity = (rules, value) => {
    // console.log("Rules", rules);
    //console.log("Values", value);
    let valid = true;
    if (rules.required) {
      if (value === "") valid = valid && false;
    }
    if (rules.regex) {
      valid = rules.regex.test(value) && valid;
    }
    return valid;
  };

  handleChange(i, event) {
    let values = [...this.state.values];
    let valueOb = values[i];
    valueOb[event.target.name] = {
      value: event.target.value,
      touched: false,
      valid: false,
    };

    let validations = this.state.validations;
    let validation = validations[event.target.name];
    valueOb[event.target.name].touched = true;
    valueOb[event.target.name].valid = this.checkValidity(
      validation,
      event.target.value
    );

    if (event.target.name === "endDate") {
      if (event.target.value && valueOb["startDate"].value) {
        if (event.target.value < valueOb["startDate"].value) {
          this.setState({
            message: "End date should be greater than start date..",
          });
          valueOb[event.target.name].valid =
            valueOb[event.target.name].valid && false;
        } else {
          this.setState({ message: "" });
        }
      }
    }
    values[i] = valueOb;
    console.log(valueOb);
    this.setState({ values: values });
    //form validity assigning
    let isFormValid = true;
    for (let j in values) {
      for (let ele in values[j]) {
        isFormValid = isFormValid && values[j][ele].valid;
        console.log("Boolean", isFormValid);
        console.log("Value", values[j][ele].value);
      }
    }
    this.setState({ isFormValid: isFormValid });
    console.log("formValid", this.state.isFormValid);
  }

  addClick() {
    this.setState((prevState) => ({
      values: [
        ...prevState.values,
        {
          institute: {
            value: "",
            touched: false,
            valid: false,
          },
          course: {
            value: "",
            touched: false,
            valid: false,
          },
          percentage: {
            value: "",
            touched: false,
            valid: false,
          },
          startDate: {
            value: "",
            touched: false,
            valid: false,
          },
          endDate: {
            value: "",
            touched: false,
            valid: false,
          },
        },
      ],
    }));
  }

  removeClick(i) {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("Registered Successfully...");
    const educationInfo = [];
    const values = this.state.values;
    for (let i in values) {
      educationInfo[i] = {};
      for (let ele in values[i]) educationInfo[i][ele] = values[i][ele].value;
    }

    let userInfo = JSON.parse(localStorage.getItem("info"));

    let localUserInfo = JSON.parse(localStorage.getItem("allInfo"));
    if (localUserInfo) {
      localUserInfo.push({ UserInfo: userInfo, EduInfo: educationInfo });
      localStorage.setItem("allInfo", JSON.stringify(localUserInfo));
    } else {
      localStorage.setItem(
        "allInfo",
        JSON.stringify([{ UserInfo: userInfo, EduInfo: educationInfo }])
      );
    }
    localStorage.removeItem("info");
    localStorage.removeItem("EduInfo");
    this.props.history.push("/");
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Please enter your educational details.</h3>
        <h3>Step 2</h3>
        {this.createUI()}
        <input
          type="button"
          value="Add Education"
          onClick={this.addClick.bind(this)}
        />
        <input
          disabled={!this.state.isFormValid}
          type="submit"
          value="Submit"
        />
      </form>
    );
  }
}

export default demo;
