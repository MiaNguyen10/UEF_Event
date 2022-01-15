import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import "./Sidebar.css";
import { BsList } from "react-icons/bs";
import Cookies from "universal-cookie";
import i18next from "i18next";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      auth: "",
      titleAdmin: "Quản lý quản trị viên",
      titleAdminOfFaculty: "Quản lý tài khoản",
    };
    this.updatePredicate = this.updatePredicate.bind(this);
  }

  handleAuth = () => {
    const cookies = new Cookies();
    const lang = localStorage.getItem("lang");
    let account = cookies.get("authToken");
    if (account) {
      this.state.auth = account.role;
    }
    if (lang == "en") {
      this.state.titleAdmin = "Admin management";
      this.state.titleAdminOfFaculty = "Account management";
    }
  };

  componentDidMount() {
    this.handleAuth();
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ active: window.innerWidth > 960 });
  }

  render() {
    return (
      <div className="menu-container">
        <BsList
          className="menu-btn-small "
          onClick={() => this.setState({ active: !this.state.active })}
        />
        {this.state.active && (
          <div className="side-menu">
            <ul>
              {MenuItems.map((item, index) => {
                return (
                  <div>
                    {(this.state.auth === "student" &&
                    item.title !== this.state.titleAdmin) ? (
                      <li key={index} className={item.cName}>
                        <a href={item.path}>
                          <img src={item.icon} alt="icon" />
                          <span>{item.title}</span>
                        </a>
                      </li>
                    ) : (
                      ""
                    )}

                    {this.state.auth === "admin" ? (
                      <li key={index} className={item.cName}>
                        <a href={item.path}>
                          <img src={item.icon} alt="icon" />
                          <span>{item.title}</span>
                        </a>
                      </li>
                    ) : (
                      ""
                    )}

                    {(this.state.auth !== "student" && this.state.auth !== "admin" &&
                    item.title !== this.state.titleAdmin  && item.title !== this.state.titleAdminOfFaculty)? (
                      <li key={index} className={item.cName}>
                        <a href={item.path}>
                          <img src={item.icon} alt="icon" />
                          <span>{item.title}</span>
                        </a>
                      </li>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Sidebar;
