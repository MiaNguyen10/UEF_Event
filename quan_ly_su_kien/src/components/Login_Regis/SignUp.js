import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";

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

  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);

  // on form submit...
  function handleFormSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      setFlag(true);
    } else {
      let account = {
        name: name,
        email:email,
        password: password,
        role:"user",
      }
      let oldaccount = localStorage.getItem("formData");
      if(oldaccount == null){
        oldaccount = []
        oldaccount.push(account)
        localStorage.setItem("formData", JSON.stringify(oldaccount))
      }else{
        let oldArr = JSON.parse(oldaccount)
        oldArr.push(account)
        localStorage.setItem("formData",JSON.stringify(oldArr))
      }
      console.log("Saved in Local Storage");

      setLogin(!login);
    }
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
        <a href="/sign-in" onClick={handleClick}>
          log in?
        </a>
      </p>
      {flag && (
        <Alert color="primary" variant="danger">
          I got it you are in hurry! But every Field is important!
        </Alert>
      )}
    </Form>
  );
}

export default SignUp;
