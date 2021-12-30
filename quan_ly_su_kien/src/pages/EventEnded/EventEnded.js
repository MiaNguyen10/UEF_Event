import React, { Component } from "react";
import "../HomePage/Home.css";
import axios from "axios";
import Modal from "react-modal";
import { OrganizationalUnit } from "../HomePage/OrganizationalUnit";
import { TypeOfEvent } from "../HomePage/TypeOfEvent";

class EventEnded extends Component {
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
      eventended: "",
    };
  }
  //get data
  componentDidMount() {
    axios
      .get("/api/eventended")
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
      [name]: value,
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
      typeOfEvent: item.typeOfEvent,
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
      typeOfEvent: this.state.typeOfEvent,
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
                  typeOfEvent: this.state.typeOfEvent,
                }
              : elm
          ),
        }));
      })
      .catch((error) => console.log(error));
  };

  //Restore event
  handleRestoreEvent = (item) => {
    const eventId = {
      id_event: item.id_event,
      eventended: 0,
    };
    console.log(eventId);

    axios
      .post("/restoreevent", eventId)
      .then((res) => {
        this.setState((prevState) => ({
          event: prevState.event.map((elm) =>
            elm.id_event === item.id_event
              ? {
                  ...elm,
                  eventended: 0,
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
        {/* Display event data */}
        <div className="event-des">
          <ul>
            {this.state.event.map((item) => (
              <li className="event-des-item" key={item.id_event}>
                {/* click to show edit form */}
                <button onClick={() => this.openModal(item)}>
                  <i className="far fa-edit"></i>
                </button>
                {/* Click to delete event data */}
                <button onClick={() => this.handleDelete(item)}>
                  <i class="far fa-trash-alt"></i>
                </button>
                {/* Click to restore event */}
                <button onClick={() => this.handleRestoreEvent(item)}>
                  <i class="fas fa-hourglass-start"></i>
                </button>
                <h2>
                  <b>{item.name}</b>
                </h2>
                <br />
                <div className="description">{item.description}</div>
                <br />
                <img
                  src={item.image}
                  alt="image_event"
                  className="img-fluid"
                  width={300}
                  height={100}
                />
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

export default EventEnded;
