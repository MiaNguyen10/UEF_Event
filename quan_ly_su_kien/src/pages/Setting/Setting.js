import React, { Component } from "react";
import './Setting.css';
import '../HomePage/Home.css';
import axios from "axios";
import Cookies from "universal-cookie";
import "../HomePage/Home.css";
import Modal from "react-modal";
import { BsFillXCircleFill } from "react-icons/bs";
import { withTranslation } from "react-i18next";
import i18next from 'i18next';

const customModal = {
  content: {
    position: "fixed",
    inset: "0px",
    border: "none",
    background: "none",
    "z-index": "1000"
  },
};
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
      studentCode: "",
      userclass: "",
      faculty: "",
      // role: "",
    };
  }

  handleAuth = () => {
    const cookies = new Cookies();
    let account = cookies.get("authToken");
    if (account) {
      this.state.auth = account.role;
      this.state.id = account.id;
    }
  };

  componentDidMount() {
    this.handleAuth();
    axios
      .get(`/api/accountstudent?id=${this.state.id}`)
      .then((res) => {
        const account = res.data;
        this.setState({ account: account.account });
      console.log('uuuuu', account.account);
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
      studentCode: item.studentCode,
      userclass: item.userclass,
      faculty: item.faculty,
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
      studentCode: this.state.studentCode,
      userclass: this.state.userclass,
      faculty: this.state.faculty,
      role: this.state.auth,
    };

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
                  studentCode: this.state.studentCode,
                  userclass: this.state.userclass,
                  faculty: this.state.faculty,
                  role:this.state.auth,
                }
              : elm
          ),
        }));
      })
      .catch((error) => console.log(error));
      if(this.state.auth === "admin"){
        window.location.reload();
      }
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
              <h3 className="acc_header"><strong>{t("Home.heading_setting")}</strong></h3>
              <div className="profile-container">

                <div className="profile-item">
                  {t("Home.name")}: 
                </div>
                <div className="profile-item">
                  <strong>{item.name}</strong> 
                </div>

                <div className="profile-item">
                  Email:
                </div>
                <div className="profile-item">
                  <strong> {item.email}</strong>
                </div>

                <div className="profile-item">
                  {t("Login.lb_pass")}:
                </div>
                <div className="profile-item">
                  <strong>*****</strong> 
                </div>
                <div className="profile-item">
                  {t("Login.std_id")}:
                </div>
                <div className="profile-item">
                  <strong>{item.studentCode}</strong> 
                </div>
                
                <div className="profile-item">
                {t("Login.class")} 
                </div>
                <div className="profile-item">
                  <strong> {item.userclass}</strong>
                </div>

                <div className="profile-item">
                  {t("Login.department")}:
                </div>
                <div className="profile-item">
                  <strong> {item.faculty}</strong>
                </div>
              </div>
              <div className="btn-fix">
                <button
                className="btn btn-primary"
                onClick={() => this.openModal(item)}
                >{t('Home.fix')}</button>
              </div>
              
              
            </div>
          ))}
        </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customModal}
          >
            <div className="card">
            <div className="card-header text-center form-header">
              <div className="lb-header">{t("Form.title_account")}</div>
              <div className="ic-close">
                <BsFillXCircleFill
                  id="BsFillXCircleFill"
                  onClick={this.closeModal}
                />
              </div>
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
                  <label for="password">{t('Login.lb_pass')}</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </div>

                
                <div className="form-group">
                  <label for="studentCode">{t('Login.std_id')}</label>
                  <input
                    name="studentCode"
                    type="number"
                    className="form-control"
                    id="studentCode"
                    value={this.state.studentCode}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label for="userclass">{t('Login.class')}</label>
                  <input
                    name="userclass"
                    type="text"
                    className="form-control"
                    id="userclass"
                    value={this.state.userclass}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label for="faculty">{t('Login.department')}</label>
                  <input
                    name="faculty"
                    className="form-control"
                    id="faculty"
                    value={this.state.faculty}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="card-footer text-right">
                  <button>{t("Form.btn_fix")}</button>
                </div>
              </form>
            </div>            
          </div>
        </Modal>
      </div> 
    ) : (<div className="homepage" style={{textAlign: "center"}}>You have no right to check your account</div>);
  }
}

export default withTranslation()(Setting);
