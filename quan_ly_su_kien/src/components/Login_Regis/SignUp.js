import React, { useState, useEffect } from "react";
import "./Login.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Swal from "sweetalert2";
import Logo from "../../asset/img/logo_login.png";
import bg from "../../asset/img/background_login.png";
import i18next from "i18next";
import { withTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";

class SignUp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      login: true,
    };
  }

  componentDidMount() {
    const lang = localStorage.getItem('lang');
    this.handleLanguage(lang);
  };

  handleLanguage = (lang) => {
    i18next.changeLanguage(lang);
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    let submitData = {
        id:"",
        email: this.state.email,
        name: this.state.name,
        password: this.state.password,
        studentCode: this.state.studentCode,
        userclass: this.state.userclass,
        faculty: this.state.faculty,
      };
      // console.log(submitData)
      fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      })
        .then((res) => res.json())
        .then((data) => {
          // save login token to cookies
          console.log(data);
          if (data.result === "sucess") {
            Swal.fire({
              title: "Register Sucess",
              icon: "info",
              html: "Go to <a href='http://localhost:3000'>Login</a> page for sign in",
            });
          } else {
            Swal.fire("Register failed", data.result, "info");
          }
        });
  };

  handleClick = () => {
    this.setState({ login: !this.state.login });
  };

  render() {
    const { t } = this.props;
    return (
      <div className="bg">

        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            {t('Login.lang')}
          </Dropdown.Toggle>

          <Dropdown.Menu className="lg_drop_menu">
            <Dropdown.Item className="lg_drop_item" onClick={() => this.handleLanguage('vi')}>{t('Login.lang_vi')}</Dropdown.Item>
            <Dropdown.Item className="lg_drop_item" onClick={() => this.handleLanguage('en')}>{t('Login.lang_en')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <img src={bg} id="bg" alt="" />
      <Form onSubmit={this.handleFormSubmit} className="container-login">
        <div className="form-lg-header logo_signup">
          <img src={Logo} alt="Logo" />
        </div>

        <div className="container_signup_body">
          <div className="form-lg-group">
            <label>{t("Login.name")}</label>
            <Input
              type="text"
              className="form-lg-control"
              placeholder={t("Login.placeholder_name")}
              name="name"
              onChange={this.handleInputChange}
              required
            />
          </div>



          <div className="form-lg-group">
            <label>Email</label>
            <Input
              type="email"
              name="email"
              className="form-lg-control"
              placeholder={t("Login.placeholder_email")}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-lg-group">
            <label>{t("Login.std_id")}</label>
            <Input
              type="text"
              className="form-lg-control"
              placeholder={t("Login.placeholder_std_id")}
              name="studentCode"
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="form-lg-group">
            <label>{t("Login.lb_pass")}</label>
            <Input
              type="password"
              className="form-lg-control"
              name="password"
              placeholder={t("Login.placeholder_pass")}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="form-lg-group">
            <label>{t("Login.class")}</label>
            <Input
              type="text"
              className="form-lg-control"
              placeholder={t("Login.placeholder_class")}
              name="userclass"
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="form-lg-group">
            <label>{t("Login.department")}</label>
            <Input
              type="text"
              className="form-lg-control"
              placeholder={t("Login.placeholder_depart")}
              name="faculty"
              onChange={this.handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-lg-footer">
          <button type="submit" className="btn btn-primary btn-block">
            {t("Login.btn_signup")}
          </button>
          <p className="forgot-password text-right">
            {t("Login.login1")}{" "}
            <a href="/" onClick={this.handleClick}>
              {t("Login.login2")}
            </a>
          </p>
        </div>
      </Form>
      </div>
    );
  }
}

export default withTranslation() (SignUp);
