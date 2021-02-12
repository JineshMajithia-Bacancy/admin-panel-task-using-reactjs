import React, { Component } from "react";
import Input from "../../Input/Input";
import "../../Registration/RegistrationPage2.css";
class EducationDetailsEdit extends Component {
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
    id: null,
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
      formValid = newforms[id].valid;
    }
    this.setState({
      form2: newforms,
      formisValid: formValid,
    });
  };
  submitted = (e) => {
    e.preventDefault();
    let allinfos = JSON.parse(localStorage.getItem("allinfo"));
    let userId = localStorage.getItem("activeindex");
    let info = allinfos[userId];
    let d1 = info["EduInfo"];
    let d2 = d1[this.state.id];
    d2["sclname"].value = this.state.form2["sclname"].value;
    d2["course"].value = this.state.form2["course"].value;
    d2["percent"].value = this.state.form2["percent"].value;
    d2["sdate"].value = this.state.form2["sdate"].value;
    d2["edate"].value = this.state.form2["edate"].value;

    localStorage.setItem("allinfo", JSON.stringify(allinfos));
    localStorage.removeItem("editData");
    this.props.history.push("/Login/EducationDetails");
  };
  componentDidMount() {
    let editData = JSON.parse(localStorage.getItem("editData"));
    if (editData) {
      let form2 = { ...this.state.form2 };
      form2["sclname"] = editData.sclname;
      form2["course"] = editData.course;
      form2["percent"] = editData.percent;
      form2["sdate"] = editData.sdate;
      form2["edate"] = editData.edate;
      let id = editData["id"];
      this.setState({ form2: form2, formisValid: true, id: id });
    }
  }
  render() {
    let loadform = [];
    for (let key in this.state.form2) {
      loadform.push({
        id: key,
        info: this.state.form2[key],
      });
    }
    return (
      <div className="rpage2">
        <form>
          <h2>Please enter your new details.</h2>
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
        <button disabled={!this.state.formisValid} onClick={this.submitted}>
          Save
        </button>
      </div>
    );
  }
}
export default EducationDetailsEdit;
