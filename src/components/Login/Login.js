import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Input from "../Input/Input";
import "./Login.css";
class Login extends Component {
  state = {
    userData: null,
    fname: "",
    lname: "",
    password: "",
    forms: {
      firstname: {
        type: "input",
        config: {
          placeholder: "Your Name",
          name: "firstname",
        },
        value: "",
      },
      password: {
        type: "input",
        config: {
          placeholder: "Your Password",
          type: "password",
          name: "password",
        },
        value: "",
      },
    },
  };
  onchangeHandler = (event, id) => {
    let newforms = { ...this.state.forms };
    let updated = { ...newforms[id] };
    updated.value = event.target.value;
    newforms[id] = updated;
    this.setState({
      forms: newforms,
    });
  };
  match = (e) => {
    e.preventDefault();
    const allinfo = JSON.parse(localStorage.getItem("allinfo"));
    const fnamefromstate = this.state.forms.firstname.value;
    const passfromstate = this.state.forms.password.value;
    let check = false;
    for (let index in allinfo) {
      let i = allinfo[index];
      let info = i["Info"];
      console.log(info);
      let fname = info["firstname"];
      let lname = info["lastname"];
      let password = info["password"];
      if (fnamefromstate === fname && passfromstate === password) {
        check = true;
        localStorage.setItem("activeFname", fname);
        localStorage.setItem("activeLname", lname);
        localStorage.setItem("activeindex", index);
        break;
      } else {
        check = false;
      }
    }
    if (check) {
      this.props.history.push("/Login/LoginHomepage");
    } else {
      alert("Please Write Correct Id & passsword");
    }
  };
  register = () => {
    this.props.history.push("Registration/RegistrationPage1");
  };
  render() {
    let formsDemo = [];
    for (let key in this.state.forms) {
      formsDemo.push({
        id: key,
        inform: this.state.forms[key],
      });
    }
    let formdisp = formsDemo.map((elem) => (
      <div>
        <Input
          inputtype={elem.inform.type}
          configuration={elem.inform.config}
          value={elem.inform.value}
          key={elem.id}
          changed={(event) => this.onchangeHandler(event, elem.id)}
        />
      </div>
    ));
    return (
      <div className="login">
        <h2>User Registration and Login</h2>
        {formdisp}
        <button onClick={this.match}>Login</button>
        <button onClick={this.register}>Register </button>
        <NavLink to="/Login/ForgotPassword">
          <h4>Forgot password?</h4>
        </NavLink>
      </div>
    );
  }
}
export default Login;
