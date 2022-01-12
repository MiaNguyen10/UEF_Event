import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import './Sidebar.css';
import { BsList } from "react-icons/bs";
import Cookies from 'universal-cookie';

class Sidebar extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: true,
    }
    this.updatePredicate = this.updatePredicate.bind(this);
  }

  componentDidMount() {
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
        <BsList className="menu-btn-small " onClick={() => this.setState({active: !this.state.active})}/>
        {this.state.active && 
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
        }
      </div>
    );
  }
}

export default Sidebar;
