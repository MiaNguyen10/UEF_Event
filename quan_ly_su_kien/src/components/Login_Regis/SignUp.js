import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import Swal from "sweetalert2";

function required(value) {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
}

function vemail(value) {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
}

function vusername(value) {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
}

function vpassword(value) {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
}

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, setLogin] = useState(true);

  // on form submit...
  function handleFormSubmit(e) {
    e.preventDefault();

    let submitData = {email: email, password: password, name: name}
    // console.log(submitData)
    fetch("/api/register", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(submitData)
    }).then(res => res.json()).then(data => {
      // save login token to cookies
      console.log(data)
      if (data.result === "sucess") {
        Swal.fire({
          title: "Register Sucess",
          icon: "info",
          html: "Go to <a href='http://localhost:3000'>Login</a> page for sign in"
        })
      } else {
        Swal.fire("Register failed", data.result, "info")
      }
    })
  }

  // Directly to the login page
  function handleClick() {
    setLogin(!login);
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <h3>Sign Up</h3>

      <div className="form-group">
        <label>Name</label>
        <Input
          type="text"
          className="form-control"
          placeholder="Enter Full Name"
          name="name"
          onChange={(event) => setName(event.target.value)}
          validations={[required, vusername]}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <Input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(event) => setEmail(event.target.value)}
          validations={[required, vemail]}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <Input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(event) => setPassword(event.target.value)}
          validations={[required, vpassword]}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Sign Up
      </button>
      <p className="forgot-password text-right">
        Already registered{" "}
        <a href="/" onClick={handleClick}>
          log in?
        </a>
      </p>
      
    </Form>
  );
}

export default SignUp;
