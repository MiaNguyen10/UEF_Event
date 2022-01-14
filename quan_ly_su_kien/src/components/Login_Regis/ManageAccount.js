import React, { Component } from "react";
import "../../pages/HomePage/Home.css";
import axios from "axios";
import Popup from "reactjs-popup";
import Modal from "react-modal";
import { OrganizationalUnit } from "../../pages/HomePage/OrganizationalUnit";
import { BsFillXCircleFill } from "react-icons/bs";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

const customModal = {
  content: {
    position: "fixed",
    inset: "0px",
    border: "none",
    background: "none",
    "z-index": "1000",
  },
};
class ManageAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupIsOpen: false,
      modalIsOpen: false,
      account: [],
      //thêm các thuộc tính liên quan, để nhận các giá trị setState từ form
      id: "",
      email: "",
      name: "",
      password: "",
      role: "",
      auth: "",
    };
  }

  handleAuth = () => {
    const cookies = new Cookies();
    let account = cookies.get("authToken");
    if (account) {
      this.state.auth = account.role;
      this.state.username = account.name;
    }
  };
  //get data
  componentDidMount() {
    axios
      .get("/api/account")
      .then((res) => {
        const account = res.data;
        this.setState({ account: account.account });
      })
      .catch((error) => console.log(error));
    this.handleAuth();
  }

  //handle data input
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleInsertSubmit = (event) => {
    event.preventDefault();
    //khai báo một item mới, với các giá trị là các giá trị được nhập từ form
    let newAccount = {
      id: "",
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      role: this.state.role,
    };
    fetch("/api/registeradmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccount),
    })
      .then((res) => res.json())
      .then((data) => {
        // save login token to cookies
        console.log(data);
        if (data.result === "sucess") {
          Swal.fire({
            title: "Thêm tài khoản thành công",
            icon: "info",
          });
        } else {
          Swal.fire("Thêm tài khoản thất bại", data.result, "info");
        }
      });
    this.closePopup();
  };

  //open and close modal
  componentWillMount() {
    Modal.setAppElement("body");
  }

  //khi click vào button Edit của item nào thì nội dung của item đó sẽ hiển thị trong modal tương ứng.
  openModal = (item) => {
    this.setState({
      modalIsOpen: true,
      id: item.id,
      email: item.email,
      name: item.name,
      password: item.password,
      role: item.role,
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      popupIsOpen: false,
    });
  };

  openPopup = () => {
    this.setState({
      popupIsOpen: true,
    });
  };

  closePopup = () => {
    this.setState({
      popupIsOpen: false,
    });
  };

  //Edit
  handleEditSubmit = (event) => {
    event.preventDefault();

    //khai báo giá trị để truyền theo phương thức post
    const newUpdate = {
      id: this.state.id,
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      role: this.state.role,
    };
    console.log(newUpdate);

    axios
      .post("/api/editaccount", newUpdate)
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
                  role: this.state.role,
                }
              : elm
          ),
        }));
      })
      .catch((error) => console.log(error));
    window.location.reload();
  };

  //Delete event data
  handleDelete = (item) => {
    const accountId = {
      id: item.id,
    };
    Swal.fire({
      title: "Bạn muốn xóa tài khoản này?",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Đã xóa tài khoản", "", "info");
        axios
          .post("/api/deleteaccount", accountId)
          .then((res) => {
            this.setState((prevState) => ({
              account: prevState.account.filter((el) => el.id !== item.id),
            }));
          })
          .catch((error) => console.log(error));
      } else {
        Swal.fire("Không xóa tài khoản", "", "info");
      }
    });
  };

  render() {
    return this.state.auth === "admin" ? (
      <div className="homepage">
        {/* Insert new event */}
        <Popup
          modal
          trigger={
            <button
              className="btn-create-event fa fa-plus"
              title="Thêm tài khoản"
            ></button>
          }
          on="click"
          open={this.state.popupIsOpen}
          onOpen={this.openPopup}
        >
          <div className="card-container-create-event">
            <div className="card">
              <div className="card-header text-center form-header">
                <p>TẠO TÀI KHOẢN</p>
                <p className="ic-close">
                  <BsFillXCircleFill
                    id="BsFillXCircleFill"
                    onClick={this.closePopup}
                  />
                </p>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleInsertSubmit}>
                  <div className="form-group">
                    <label for="email">Email</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      id="email"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="name">Name</label>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      id="name"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="password">Mật khẩu</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      id="password"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Admin khoa:
                      <select name="role" onChange={this.handleInputChange}>
                        {OrganizationalUnit.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="card-footer text-right">
                    <button>Thêm tài khoản</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Popup>

        {/* Display account data */}
        <div className="event-des">
          <div className="table-item">
            <h2 className="heading">Danh sách admin các khoa</h2>
            <br />
            <table className="table table-bordered ">
              <thead>
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Mật khẩu</th>
                  <th scope="col">Khoa</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.account.map((item) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{item.email}</th>
                      <td>{item.name}</td>
                      {/* <td>{item.password}</td> */}
                      <td>*******</td>
                      <td>{item.role}</td>
                      <td>
                        <button
                          className="far fa-edit ic-in-3-dots"
                          onClick={() => this.openModal(item)}
                        />
                        <button
                          className="far fa-trash-alt ic-in-3-dots"
                          onClick={() => this.handleDelete(item)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customModal}
        >
          <div className="card">
            <div className="card-header text-center form-header">
              <p>Chỉnh sửa</p>
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
                  <label for="eventName">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label for="eventName">Name</label>
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
                  <label for="eventName">Mật khẩu</label>
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
                  <label>
                    Admin khoa:
                    <select name="role" onChange={this.handleInputChange}>
                      {OrganizationalUnit.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="card-footer text-right">
                  <button>Cập nhật tài khoản</button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    ) : ("");
  }
}

export default ManageAccount;
