import React, { useState } from "react";
import './Login.css'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import Swal from "sweetalert2";
import Logo from '../../asset/img/logo_login.png'
import bg from '../../asset/img/background_login.png'
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';

// const lang = 'vi';
function handleDrop(lang){
  localStorage.setItem('lang', lang);
  window.location.reload();
}

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

function vstudentcode(value) {
  if (value.length != 9) {
    return (
      <div className="alert alert-danger" role="alert">
        The student code must be 9 characters.
      </div>
    );
  }
}

function SignUp() {
  const lang = 'vi';
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [password, setPassword] = useState("");
  const [userclass, setClassCode] = useState("");
  const [faculty, setFaculty] = useState("");

  const [login, setLogin] = useState(true);

  const lang1 = localStorage.getItem('lang');
  i18next.changeLanguage(lang1);
  const { t, i18n } = useTranslation();

  // on form submit...
  function handleFormSubmit(e) {
    e.preventDefault();

    let submitData = {email: email, password: password, name: name, studentCode: studentCode, userclass: userclass, faculty: faculty}
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
    <div className="gb">

        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            {t('Login.lang')}
          </Dropdown.Toggle>

          <Dropdown.Menu className="lg_drop_menu">
            <Dropdown.Item className="lg_drop_item" onClick={ () => handleDrop('vi')}>{t('Login.lang_vi')}</Dropdown.Item>
            <Dropdown.Item className="lg_drop_item" onClick={ () => handleDrop('en')}>{t('Login.lang_en')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      <img src={bg} id="bg" alt=""/>   
      <Form onSubmit={handleFormSubmit} className="container-login">
        <div className="form-lg-header logo_signup">
          <img src={Logo} alt="Logo"/>
        </div>

        <div className="container_signup_body">

        

        <div className="form-lg-group">
          <label>{t('Login.name')}</label>
          <Input
            type="text"
            className="form-lg-control"
            placeholder={t('Login.placeholder_name')}
            name="name"
            onChange={(event) => setName(event.target.value)}
            validations={[required, vusername]}
          />
        </div>

        <div className="form-lg-group">
          <label>Email</label>
          <Input
            type="email"
            className="form-lg-control"
            placeholder={t('Login.placeholder_email')}
            onChange={(event) => setEmail(event.target.value)}
            validations={[required, vemail]}
          />
        </div>
        <div className="form-lg-group">
          <label>{t('Login.std_id')}</label>
          <Input
            type="text"
            className="form-lg-control"
            placeholder={t('Login.placeholder_std_id')}
            name="name"
            onChange={(event) => setName(event.target.value)}
            validations={[required, vstudentcode]}
          />
        </div>

        <div className="form-lg-group">
          <label>{t('Login.lb_pass')}</label>
          <Input
            type="password"
            className="form-lg-control"
            placeholder={t('Login.placeholder_pass')}
            onChange={(event) => setPassword(event.target.value)}
            validations={[required, vpassword]}
          />
        </div>


        <div className="form-lg-group">
          <label>{t('Login.class')}</label>
          <Input
            type="text"
            className="form-lg-control"
            placeholder={t('Login.placeholder_class')}
            name="name"
            onChange={(event) => setClassCode(event.target.value)}
            validations={[required, vusername]}
          />
        </div>

        <div className="form-lg-group">
          <label>{t('Login.department')}</label>
          <Input
            type="text"
            className="form-lg-control"
            placeholder={t('Login.placeholder_depart')}
            name="name"
            onChange={(event) => setFaculty(event.target.value)}
            validations={[required, vusername]}
          />
        </div>
        </div>

        <div className="form-lg-footer">
          <button type="submit" className="btn btn-primary btn-block">
          {t('Login.btn_signup')}
          </button>
          <p className="forgot-password text-right">
          {t('Login.login1')} {" "}
            <a href="/" onClick={handleClick}>
            {t('Login.login2')}
            </a>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
