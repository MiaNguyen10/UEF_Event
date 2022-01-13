import React, { Component } from "react";
import "./Navbar.css";
import logo from "../../asset/img/logo.png";
import { DropdownMenuItems } from "./DropdownMenuItems";
import { MenuItems } from "./MenuItems";
import { NavDropdown } from 'react-bootstrap';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class Navbar extends Component {

  componentDidMount() {
    const lang = localStorage.getItem('lang');
    this.handleLanguage(lang);
  };

  handleLanguage = (lang) => {
    i18next.changeLanguage(lang)
  };

  handleUnit = (props) => {
    localStorage.setItem('unit', props);
  };

  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    const { t } = this.props;
    return (
      <nav className="NavbarItems">
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          <li className="navbar-logo">
            <img src={logo} alt="" width={50} height={50} />
          </li>
          <li className="navbar-logo">
            <a href="/">{t('Navbar.logo')}</a>
          </li>
          
          <li className="dropdown ">
            <NavDropdown className="nav-links" title={t('Navbar.department')}>
              {DropdownMenuItems.map((item, index) => {
                  return (
                    <div key={index} >
                      <NavDropdown.Item className={item.cName} href={item.path} onClick={() =>this.handleUnit(item.label)}>
                        {item.title}
                      </NavDropdown.Item>
                    </div>
                  );
                })}
            </NavDropdown>
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

export default withTranslation() (Navbar);
