import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "../HomePage/Home.css";
import Modal from "react-modal";
import { BsFillXCircleFill } from "react-icons/bs";
import { withTranslation } from "react-i18next";
import i18next from 'i18next';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      account: [],
      auth: "",
      id: "",
      email: "",
      name: "",
      password: "",
    };
  }

  handleAuth = () => {
    const cookies = new Cookies();
    let account = cookies.get("authToken");
    if (account) {
      this.state.auth = account.role;
      this.state.name = account.name;
    }
  };

  componentDidMount() {
    this.handleAuth();
    axios
      .get(`/api/accountstudent?name=${this.state.name}`)
      .then((res) => {
        const account = res.data;
        this.setState({ account: account.account });
      })
      .catch((error) => console.log(error));
    
    const lang = localStorage.getItem('lang');
    this.handleLanguage(lang);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  componentWillMount() {
    Modal.setAppElement("body");
  }

  openModal = (item) => {
    this.setState({
      modalIsOpen: true,
      id: item.id,
      email: item.email,
      name: item.name,
      password: item.password,
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };

  //Edit event data
  handleEditSubmit = (event) => {
    event.preventDefault();

    //khai báo giá trị để truyền theo phương thức post
    const newUpdate = {
      id: this.state.id,
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      role: 'student',
    };
    console.log(newUpdate);

    axios
      .post("/api/editAccount", newUpdate)
      .then((res) => {
        let key = this.state.id;
        this.setState((prevState) => ({
          account: prevState.account.map((elm) =>
            elm.id === key
              ? {
                  ...elm,
                  email: this.state.email,
                  name: this.state.name,
                  password: this.state.password,
                  role:'student'
                }
              : elm
          ),
        }));
      })
      .catch((error) => console.log(error));
    window.location.reload();
  };

  handleLanguage = (lang) => {
    i18next.changeLanguage(lang)
  };

  render() {
    const { t } = this.props;
    return (this.state.auth === "student" || this.state.auth === "admin") ? (
      <div className="homepage">
        <div className="event-des">
          
          {this.state.account.map((item) => (
            <div className="event-des-item" key={item.id}>
              <h3><strong>{t("Home.heading_setting")}</strong></h3>
              <div>
                <button
                  className="far fa-edit ic-in-3-dots"
                  onClick={() => this.openModal(item)}
                ></button>
              </div>
              <div>
                <strong>Email:</strong> {item.email}
              </div>
              <div>
                <strong>{t("Home.name")}:</strong> {item.name}
              </div>
              <div>
                <strong>Password:</strong> {item.password}
              </div>
            </div>
          ))}
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          // style={customModal}
        >
          <div className="card-header text-center form-header">
            <p>{t("Form.title_account")}</p>
            <p className="ic-close">
              <BsFillXCircleFill
                id="BsFillXCircleFill"
                onClick={this.closeModal}
              />
            </p>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleEditSubmit}>
              <div className="form-group">
                <label for="name">{t("Form.lb_name")}</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  id="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label for="email">Email</label>
                <input
                  name="email"
                  type="text"
                  className="form-control"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label for="password">Password:</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="card-footer text-right">
                <button>{t("Form.btn_fix")}</button>
              </div>
            </form>
          </div>
        </Modal>
      </div> 
    ) : ('');
  }
}

export default withTranslation()(Setting);
