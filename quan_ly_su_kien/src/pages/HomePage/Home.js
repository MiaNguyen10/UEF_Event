import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import Popup from "reactjs-popup";
import Modal from "react-modal";
import { OrganizationalUnit } from "./OrganizationalUnit";
import { TypeOfEvent } from "./TypeOfEvent";

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
      typeOfEvent: ""
    };
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleInsertSubmit = this.handleInsertSubmit.bind(this);
    // this.handleEditSubmit = this.handleEditSubmit.bind(this);
    // this.handleEndEvent = this.handleEndEvent.bind(this);
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

    const newUpdate = {
      id_event: this.state.id_event,
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
      organizationalUnit: this.state.organizationalUnit,
      typeOfEvent: this.state.typeOfEvent
    };
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

  //End event
  handleEndEvent = (event) => {
    event.preventDefault();

    axios.post('/eventended')
    .then(res => {
      let key = this.state.id_event;
        this.setState((prevState) => ({
          event: prevState.event.map((elm) =>
            elm.id_event === key
              ? {
                  ...elm,
                  eventEnded: 1
                }
              : elm
          ),
        }));
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="homepage">
        {/* Insert new event */}
        <Popup modal trigger={<button>Tạo sự kiện</button>}>
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
                    <select name="insertunit" onChange={this.handleInputChange} id="insertunit">
                      {OrganizationalUnit.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    Loại sự kiện:
                    <select name="inserttype" onChange={this.handleInputChange} id="inserttype">
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
        <div className="event_des">
          <ul>
            {this.state.event.map((item) => (
              <li key={item.id_event}>
                {/* click to show edit form */}
                <button onClick={() => this.openModal(item)}>
                  <i className="far fa-edit"></i>
                </button>
                {/* Click to delete event data */}
                <button onClick={() => this.handleDelete(item)}>
                  <i class="far fa-trash-alt"></i>
                </button>
                {/* Click to end event */}
                <button onClick={()=> this.handleEndEvent}>
                  <i class="fas fa-hourglass-end"></i>
                </button>
                <h2>
                  <b>{item.name}</b>
                </h2>
                <br />
                <div className="description">{item.description}</div> <br />
                <img src={item.image} alt="image_event" className="img-fluid" />
              </li>
            ))}
          </ul>
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
                    name="unit"
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
                    name="type"
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
