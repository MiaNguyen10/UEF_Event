import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <div className='side-menu'>
        <ul >
          {MenuItems.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <a href={item.path}>
                  <img src={item.icon} alt="icon"/>
                  <span>{item.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
