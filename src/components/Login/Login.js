import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Input from "../Input/Input";
import "./Login.css";
import Button from "react-bootstrap/Button";
class Login extends Component {
  state = {
    userData: null,
    fname: "",
    lname: "",
    password: "",
    forms: {
      email: {
        type: "input",
        config: {
          placeholder: "Your Email",
          name: "email",
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
    const allinfo = JSON.parse(localStorage.getItem("allInfo"));
    const emailfromstate = this.state.forms.email.value;
    const passfromstate = this.state.forms.password.value;
    let check = false;
    for (let index in allinfo) {
      let i = allinfo[index];
      let info = i["UserInfo"];
      console.log(info);
      let email = info["email"];
      let fname = info["firstname"];
      let lname = info["lastname"];
      let password = info["password"];
      if (emailfromstate === email && passfromstate === password) {
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
      <div>
        <h2>User Registration and Login. </h2>
        <br />
        {formdisp}
        <br />
        <button onClick={this.match}>Login</button>
        <button onClick={this.register}>Register </button>
        <br />
        <NavLink to="/Login/ForgotPassword">
          <h5>Forgot Password ?</h5>
        </NavLink>
      </div>
    );
  }
}
export default Login;
