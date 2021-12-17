import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import Popup from "reactjs-popup";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
    };
  }

  componentDidMount() {
    axios
      .get("/api/event")
      .then((res) => {
        const event = res.data;
        this.setState({ event: event.event });
      })
      .catch((error) => console.log(error));
  }

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

    let formData = new FormData();
    formData.append()

    const newEvent = {
      id: "",
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

  render() {
    return (
      <div className="homepage">
        <Popup modal trigger={<button>Tạo sự kiện</button>}>
          <div class="card form-event">
            <div class="card-header text-center form-header">Sự kiện mới</div>
            <div class="card-body">
              <form onSubmit={this.handleInsertSubmit}>
                <div>
                  <div class="form-group">
                    <label for="eventName">Tên sự kiện</label>
                    <input
                      name="name"
                      type="text"
                      class="form-control"
                      id="eventName"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="eventDescription">Mô tả</label>
                    <textarea
                      name="description"
                      class="form-control"
                      id="eventDescription"
                      rows="4"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="eventImage">Chọn hình ảnh</label>
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      class="form-control-file"
                      id="eventImage"
                      onChange={(e)=>setImage(e.target.files)}
                    />
                  </div>
                </div>
                <div class="card-footer text-right">
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
                <h2>
                  <b>{item.name}</b>
                </h2>
                <br />
                <div className="description">{item.description}</div> <br />
                <img src={item.image} alt="image_event" class="img-fluid" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
