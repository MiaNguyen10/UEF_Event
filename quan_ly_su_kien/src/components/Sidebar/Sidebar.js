import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import "./Sidebar.css";
import { BsList } from "react-icons/bs";
import Cookies from "universal-cookie";
import i18next from "i18next";
import axios from "axios";
import avar from "../../asset/img/user.png";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: [],
      active: true,
      auth: "",
      id: "",
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
      this.state.id = account.id;
    }
    if (lang == "en") {
      this.state.titleAdmin = "Admin management";
      this.state.titleAdminOfFaculty = "Account management";
    }
  };

  componentDidMount() {
    this.handleAuth();
    axios
      .get(`/api/accountstudent?id=${this.state.id}`)
      .then((res) => {
        const account = res.data;
        this.setState({ account: account.account });
      })
      .catch((error) => console.log(error));
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
              {this.state.account.map((item) => (
                <li key={item.id} className="nav-text nav-username">
                  <a href="/">
                    <img src={avar} alt="icon" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
              {MenuItems.map((item, index) => {
                return (
                  <div>
                    {this.state.auth === "student" &&
                    item.title !== this.state.titleAdmin ? (
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

                    {this.state.auth !== "student" &&
                    this.state.auth !== "admin" &&
                    item.title !== this.state.titleAdmin &&
                    item.title !== this.state.titleAdminOfFaculty ? (
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
