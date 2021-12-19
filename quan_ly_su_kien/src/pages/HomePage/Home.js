import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import Popup from "reactjs-popup";
import Modal from "react-modal";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      event: [],
      id_event: "",
      name: "",
      description: "",
      image: "",
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
      [name]: value,
    });
  };

  setImage = async (event) => {
    const formData = new FormData();
    console.log(event.target.files);
    formData.append("file", event.target.files[0]);
    axios.post("/uploadfile", formData).then((res) => {
      this.setState({ image: `${res.data}` });
    });
  };

  handleInsertSubmit = (event) => {
    event.preventDefault();

    const newEvent = {
      id_event: "",
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
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

  openModal = (item) => {
    this.setState({
      modalIsOpen: true,
      id_event: item.id_event,
      name: item.name,
      description: item.description,
      image: item.image,
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
        <Popup modal trigger={<button>Tạo sự kiện</button>}>
          <div className="card form-event">
            <div className="card-header text-center form-header">
              Sự kiện mới
            </div>
            <div className="card-body">
              <form onSubmit={this.handleInsertSubmit}>
                <div>
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
                <div>
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
                </div>
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
