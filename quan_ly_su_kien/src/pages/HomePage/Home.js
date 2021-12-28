import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import Popup from "reactjs-popup";
import Modal from "react-modal";
import { OrganizationalUnit } from "./OrganizationalUnit";
import { TypeOfEvent } from "./TypeOfEvent";
import { BsThreeDots } from "react-icons/bs";
import { Dropdown } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      event: [],
      //thêm các thuộc tính liên quan, để nhận các giá trị setState từ form
      id_event: "",
      name: "",
      description: "",
      image: "",
      organizationalUnit: "",
      typeOfEvent: "",
      eventended:""
    };
  }
  //get data
  componentDidMount() {
    axios
      .get("/api/event")
      .then((res) => {
        const event = res.data;
        this.setState({ event: event.event });
      })
      .catch((error) => console.log(error));
  }

  //handle data input
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  setImage = async (event) => {
    const formData = new FormData();
    //console.log(event.target.files);
    formData.append("file", event.target.files[0]);
    axios.post("/uploadfile", formData).then((res) => {
      this.setState({ image: `${res.data}` });
    });
  };

  handleInsertSubmit = (event) => {
    event.preventDefault();

    //khai báo một item mới, với các giá trị là các giá trị được nhập từ form
    const newEvent = {
      id_event: "",
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
      organizationalUnit: this.state.organizationalUnit,
      typeOfEvent: this.state.typeOfEvent
  
    };
    console.log(newEvent);
    axios
      .post("/api/insert", newEvent)
      .then((res) => {
        let event = this.state.event; //goi lai data event
        event = [newEvent, ...event];
        this.setState({ event: event });
      })
      .catch((error) => console.log(error));
  };

  //open and close modal
  componentWillMount() {
    Modal.setAppElement("body");
  }

  //khi click vào button Edit của item nào thì nội dung của item đó sẽ hiển thị trong modal tương ứng.
  openModal = (item) => {
    this.setState({
      modalIsOpen: true,
      id_event: item.id_event,
      name: item.name,
      description: item.description,
      image: item.image,
      organizationalUnit: item.organizationalUnit,
      typeOfEvent: item.typeOfEvent
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
      id_event: this.state.id_event,
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
      organizationalUnit: this.state.organizationalUnit,
      typeOfEvent: this.state.typeOfEvent
    };
    console.log(newUpdate);
    
    axios
      .post("/api/edit", newUpdate)
      .then((res) => {
        let key = this.state.id_event;
        this.setState((prevState) => ({
          event: prevState.event.map((elm) =>
            elm.id_event === key
              ? {
                  ...elm,
                  name: this.state.name,
                  description: this.state.description,
                  image: this.state.image,
                  organizationalUnit: this.state.organizationalUnit,
                  typeOfEvent: this.state.typeOfEvent 
                }
              : elm
          ),
        }));
      })
      .catch((error) => console.log(error));
  };

  //End event
  handleEndEvent = (item) => {
    const eventId = {
      id_event: item.id_event,
      eventended: 1
    };
    console.log(eventId)

    axios
      .post("/eventended", eventId)
      .then((res) => {
        this.setState((prevState) => ({
          event: prevState.event.map((elm) =>
            elm.id_event === item.id_event
              ? {
                  ...elm,
                  eventended:1
                }
              : elm
          ),
        }));
      })
      .catch((error) => console.log(error));
  };

  //Delete event data
  handleDelete = (item) => {
    const eventId = {
      id_event: item.id_event,
    };

    axios
      .post("/api/delete", eventId)
      .then((res) => {
        this.setState((prevState) => ({
          event: prevState.event.filter((el) => el.id_event !== item.id_event),
        }));
      })
      .catch((error) => console.log(error));
  };

  

  render() {
    return (
      <div className="homepage">
        {/* Insert new event */}
        <Popup modal trigger={<button className="btn-create-event fa fa-plus" title="Tạo sự kiện"></button>}>
          {/* <span className="btn-create-event des-btn">Tạo sự kiện</span> */}
          <div className="card form-event">
            <div className="card-header text-center form-header">
              Sự kiện mới
            </div>
            <div className="card-body">
              <form onSubmit={this.handleInsertSubmit}>
                <div className="form-group">
                  <label for="eventName">Tên sự kiện</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    id="eventName"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label for="eventDescription">Mô tả</label>
                  <textarea
                    name="description"
                    className="form-control"
                    id="eventDescription"
                    rows="4"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label for="eventImage">Chọn hình ảnh</label>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    className="form-control-file"
                    id="eventImage"
                    multiple
                    onChange={this.setImage}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Đơn vị tổ chức:
                    <select name="organizationalUnit" onChange={this.handleInputChange}>
                      {OrganizationalUnit.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    Loại sự kiện:
                    <select name="typeOfEvent" onChange={this.handleInputChange}>
                      {TypeOfEvent.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="card-footer text-right">
                  <button>Đăng sự kiện</button>
                </div>
              </form>
            </div>
          </div>
        </Popup>

        {/* Display event data */}
        <div className="event-des">
          {this.state.event.map((item) => (
            <div className="event-des-item" key={item.id_event}>
              <div className="header-event">
                
                <div className="event-name">{item.name}</div>

                <Dropdown >
                  <Dropdown.Toggle variant="" className="dropdown-choose">
                    <BsThreeDots id="three-dots"></BsThreeDots>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                      {/* click to show edit form */}
                    <Dropdown.Item onClick={() => this.openModal(item)}>
                    <div id="drop-item">
                      <button className="far fa-edit ic-in-3-dots"/>
                      <span>Chỉnh sửa</span>
                    </div>
                    </Dropdown.Item>

                      {/* Click to delete event data */}
                    <Dropdown.Item onClick={() => this.handleDelete(item)}>
                    <div id="drop-item">
                      <button className="far fa-trash-alt ic-in-3-dots"/>
                      <span>Xóa</span>
                    </div>
                    </Dropdown.Item>

                      {/* Click to end event */}
                    <Dropdown.Item  onClick={() => this.handleEndEvent(item)}>
                      <div id="drop-item">
                        <button className="fas fa-hourglass-end ic-in-3-dots"/>
                        <span>Kết thúc sự kiện</span>
                      </div>
                      
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              
                <div className="description">{item.description}</div> 
              <img src={item.image} alt="image_event" className="img-fluid" width={500}/>
            </div>
          ))}
        </div>

        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
          <button onClick={this.closeModal}>
            <i className="fas fa-times"></i>
          </button>
          <div className="card">
            <div className="card-header text-center form-header">Sự kiện</div>
            <div className="card-body">
              <form onSubmit={this.handleEditSubmit}>
                <div className="form-group">
                  <label for="eventName">Tên sự kiện</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    id="eventName"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label for="eventDescription">Mô tả</label>
                  <textarea
                    name="description"
                    className="form-control"
                    id="eventDescription"
                    rows="4"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label for="eventImage">Chọn hình ảnh</label>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    className="form-control-file"
                    id="eventImage"
                    onChange={this.setImage}
                  />
                </div>
                <label>
                  Đơn vị tổ chức:
                  <select
                    name="organizationalUnit"
                    onChange={this.handleInputChange}
                    value={this.state.organizationalUnit}
                  >
                    {OrganizationalUnit.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>
                <br />

                <label>
                  Loại sự kiện:
                  <select
                    name="typeOfEvent"
                    onChange={this.handleInputChange}
                    value={this.state.typeOfEvent}
                  >
                    {TypeOfEvent.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>
                <br />
                <div className="card-footer text-right">
                  <button>Cập nhật sự kiện</button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Home;
