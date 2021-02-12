import React, { Component } from "react";
import Input from "../../Input/Input";
class ForgotPassword extends Component {
  state = {
    forms: {
      email: {
        type: "input",
        config: {
          placeholder: "email",
          type: "text",
          name: "email",
        },
        value: "",
        data: true,
        valid: false,
        touched: false,

        validation: {
          required: true,
        },
      },
      newPassword: {
        type: "input",
        config: {
          placeholder: "New Password",
          type: "password",
          name: "newPassword",
        },
        value: "",
        check: true,
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },
    },
    formisValid: false,
  };
  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      isValid = true;
    }
    return isValid;
  };
  onchangeHandler = (event, id) => {
    let newforms = { ...this.state.forms };
    let updated = { ...newforms[id] };
    updated.value = event.target.value;
    updated.valid = this.checkValidity(updated.value, updated.validation);
    updated.touched = true;
    let formisValid = true;
    newforms[id] = updated;
    for (let id in newforms) {
      formisValid = newforms[id].valid && formisValid;
    }
    this.setState({
      forms: newforms,
      formisValid: formisValid,
    });
  };
  check = (e) => {
    e.preventDefault();
    let emailfromstate = this.state.forms.email.value;
    let newPassfromstate = this.state.forms.newPassword.value;
    if (newPassfromstate.trim() === "" || emailfromstate.trim() === "") {
      alert("Enter some input in both fields");
    } else {
      let allinfo = JSON.parse(localStorage.getItem("allinfo"));
      for (let index in allinfo) {
        let i = allinfo[index];
        let j = i["Info"];
        let email = j["email"];
        console.log("Email = ", email);
        let oldpass = j["password"];
        if (emailfromstate === email) {
          console.log(j);
          j["password"] = newPassfromstate;
          console.log(j["password"]);
          alert("Password changed successfully!!");
          localStorage.setItem("allinfo", JSON.stringify(allinfo));
        }
        this.props.history.push("/");
      }
    }
  };
  render() {
    let formsKeys = [];
    for (let key in this.state.forms) {
      formsKeys.push({
        id: key,
        para: this.state.forms[key],
      });
    }
    return (
      <div>
        <h2>Change Your Password</h2>
        <form>
          {formsKeys.map((elem) => (
            <div>
              <Input
                inputtype={elem.para.type}
                configuration={elem.para.config}
                value={elem.para.value}
                key={elem.id}
                valid={!elem.para.valid}
                shouldvalidate={elem.para.validation}
                touched={elem.para.touched}
                changed={(event) => this.onchangeHandler(event, elem.id)}
              />
            </div>
          ))}
          <button onClick={this.check}>Submit</button>
        </form>
      </div>
    );
  }
}
export default ForgotPassword;
