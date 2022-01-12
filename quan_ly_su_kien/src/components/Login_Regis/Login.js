import React from "react";
import './Login.css'
import Cookies from 'universal-cookie';
import Logo from '../../asset/img/logo_login.png'
import bg from '../../asset/img/background_login.png'
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

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onSubmit = (e) => {
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
        this.setState({ error: "Please check your email or password" });
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
    return (
      <div className="bg">
        <img src={bg} id="bg" alt=""/>    
        <form onSubmit={this.onSubmit} className="container-login">
          <p className="error">{this.state.error}</p>
          <div className="form-lg-header">
            <img src={Logo} alt="Logo"/>
            {/* <p>Hệ thống quản lý sự kiện</p> */}
          </div>          
          <div className="form-lg-group">
            <label>Email</label>
            <input
              type="text"
              className="form-lg-control"
              placeholder="Nhập email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
          </div>
          <div className="form-lg-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              className="form-lg-control"
              placeholder="Nhập mật khẩu"
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
              Đăng nhập
            </button>
            <p className="forgot-password text-right">
              Bạn chưa có tài khoản ? Hãy{" "}  
              <a href="/sign-up" onClick={this.handleClick}>
                đăng ký
              </a>
            </p>
          </div>
          
        </form>  
      </div>
    );
  }
}

export default Login;
