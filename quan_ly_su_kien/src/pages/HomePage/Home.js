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

    const newEvent = {
      id: "",
      name: this.state.name,
      description: this.state.description,
    };

    axios
      .post("/api/insert", newEvent)
      .then((res) => {
        let event = this.state.event;
        event = [newEvent, ...event];
        this.setState({ event: event });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="homepage">
        <Popup modal trigger={<button>Tạo sự kiện</button>}>
          <form onSubmit={this.handleInsertSubmit}>
            <div className="new-expense__controls">
              <div className="new-expense__control">
                <label>Tên sự kiện</label>
                <input
                  name="name"
                  type="text"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="new-expense__control">
                <label>Mô tả</label>
                <textarea
                  name="description"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="new-expense__actions">
                <button type="submit">Đăng sự kiện</button>
              </div>
            </div>
          </form>
        </Popup>

        <div className="event_des"> 
          <ul>
            {this.state.event.map((item) => (
              <li key={item.id_event}>
                <h2><b>{item.name}</b></h2> <br />
                <div className="description">{item.description}</div> <br />
                <img src={item.image} alt="image_event"/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
