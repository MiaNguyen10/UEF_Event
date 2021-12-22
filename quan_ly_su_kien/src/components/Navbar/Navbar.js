import React, { Component } from "react";
import "./Navbar.css";
import logo from "../../asset/img/logo.png";
import { DropdownMenuItems } from "./DropdownMenuItems";
import { MenuItems } from "./MenuItems";

class Navbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="NavbarItems">
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          <li className="navbar-logo">
            <img src={logo} alt="" width={50} height={50} />
          </li>
          <li className="navbar-logo">
            <a href="/">HỆ THỐNG QUẢN LÝ SỰ KIỆN</a>
          </li>
          
          <li className="dropdown nav-links">
            <a
              className="dropdown-toggle"
              href="/department"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              KHOA TỔ CHỨC
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {DropdownMenuItems.map((item, index) => {
                return (
                  <li key={index}>
                    <a className={item.cName} href={item.path}>
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>

          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.path}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
