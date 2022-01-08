import React from "react";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory({forceRefresh:true});

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
    //let { history } = this.props;
    
    e.preventDefault();
    let oldaccount = localStorage.getItem("formData");
    let oldArr = JSON.parse(oldaccount);
    oldArr.map((arr) => {
      if (
        this.state.name.length > 0 &&
        this.state.email.length > 0 &&
        this.state.password.length > 0
      ) {
        if (
          arr.name === this.state.name &&
          arr.email === this.state.email &&
          arr.password === this.state.password &&
          arr.role === "user"
        ) {
          history.push("/admin");
        } else {
          this.setState({ error: "Please check your email or password" });
        }
      }
    });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleClick = () => {
    this.setState({ signup: !this.state.signup });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <p className="error">{this.state.error}</p>
        <h2>LOGIN</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={this.state.name}
            placeholder="Enter Full Name"
            onChange={this.onChangeName}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.onChangeEmail}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.onChangePassword}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block"
        >
          Login
        </button>
        <p className="forgot-password text-right">
          Don't have account ? Please{" "}
          <a href="/sign-up" onClick={this.handleClick}>
            sign up
          </a>
        </p>
      </form>
    );
  }
}

export default Login;
