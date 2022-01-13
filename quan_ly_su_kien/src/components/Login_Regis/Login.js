import React from "react";
import './Login.css'
import Cookies from 'universal-cookie';
import Logo from '../../asset/img/logo_login.png'
import bg from '../../asset/img/background_login.png'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      role: "",
      signup: true,
    };
  }

  componentDidMount() {
    const lang = localStorage.getItem('lang');
    this.handleLanguage(lang);
  };

  handleLanguage = (lang) => {
    i18next.changeLanguage(lang);
  };

  handleDropdown = (lang) => {
    localStorage.setItem('lang', lang);
    this.handleLanguage(lang);
  };

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onSubmit = (e) => {
    const { t } = this.props;
    e.preventDefault();
    let submitData = {email: this.state.email, password: this.state.password}
    fetch("/api/auth", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(submitData)
    }).then(res => res.json()).then(data => {
      // save login token to cookies
      if (data[0]) {
        const cookies = new Cookies();
        cookies.set('authToken', JSON.stringify(data[0]), { path: '/' });
        window.location.reload()
      } else {
        this.setState({ error: t('Login.error') });
      }
    })
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleClick = () => {
    this.setState({ signup: !this.state.signup });
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

        <img src={bg} id="bg" alt=""/>    
        <Form onSubmit={this.onSubmit} className="container-login">
          <p className="error">{this.state.error}</p>
          <div className="form-lg-header">
            <img src={Logo} alt="Logo"/>
          </div>          
          <div className="form-lg-group">
            <label>Email</label>
            <Input
              type="text"
              className="form-lg-control"
              placeholder={t('Login.placeholder_email')}
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
          </div>
          <div className="form-lg-group">
            <label>{t('Login.lb_pass')}</label>
            <Input
              type="password"
              className="form-lg-control"
              placeholder={t('Login.placeholder_pass')}
              value={this.state.password}
              onChange={this.onChangePassword}
              required
            />
          </div>
          <div className="form-lg-footer">
            <button
              type="submit"
              className="btn btn-primary btn-block"
            >
              {t('Login.btn_login')}
            </button>
            <p className="forgot-password text-right">
              {t('Login.signup1')} {" "}  
              <a href="/sign-up" onClick={this.handleClick}>
              {t('Login.signup2')}
              </a>
            </p>
          </div>
          
        </Form>  
      </div>
    );
  }
}

export default withTranslation() (Login);
