import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";
import logo from "../../asset/img/logo.png";

class Navbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="NavbarItems">

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>

          <li className="navbar-logo"><img  src={logo} alt="" width={50} height={50}/></li>
          <li className="navbar-logo"><a href="/">HỆ THỐNG QUẢN LÝ SỰ KIỆN</a></li>

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