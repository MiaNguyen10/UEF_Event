import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import './Sidebar.css';
import logo from "../../asset/img/logo.png";

class Sidebar extends Component {
  render() {
    return (
      <div className='side-menu'>
        <ul >
          {MenuItems.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <img src={item.icon}/>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
