import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import Popup from "reactjs-popup";
import Modal from "react-modal";
import ShowMoreText from "react-show-more-text";
import { OrganizationalUnit } from "./OrganizationalUnit";
import { TypeOfEvent } from "./TypeOfEvent";
import { BsThreeDots } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import Swal from 'sweetalert2'

const customModal = {
  content: {
    position: "fixed",
    inset: "0px",
    border: "none",
    background: "none",
    "z-index": "1000"
  },
};
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupIsOpen: false,
      modalIsOpen: false,
      event: [],
      //thêm các thuộc tính liên quan, để nhận các giá trị setState từ form
      id_event: "",
      name: "",
      description: "",
      address: "",
      image: "",
      eventDate: "",
      eventTime: "",
      organizationalUnit: "",
      typeOfEvent: "",
      eventended: "",
      searchData: "",
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
    formData.append("file", event.target.files[0]);
    axios.post("/uploadfile", formData).then((res) => {
      this.setState({ image: `${res.data}` });
    });
  };

  handleInsertSubmit = (event) => {
    event.preventDefault();

    console.log(this.state)
    //khai báo một item mới, với các giá trị là các giá trị được nhập từ form
    const newEvent = {
      id_event: "",
      name: this.state.name,
      description: this.state.description,
      address: this.state.address,
      image: this.state.image,
      organizationalUnit: this.state.organizationalUnit,
      typeOfEvent: this.state.typeOfEvent,
      eventDate: this.state.eventDate,
      eventTime: this.state.eventTime      
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
      id_event: item.id_event,
      name: item.name,
      description: item.description,
      address: item.address,
      image: item.image,
      organizationalUnit: item.organizationalUnit,
      typeOfEvent: item.typeOfEvent,
      eventDate: item.eventDate,
      eventTime: item.eventTime,
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      popupIsOpen: false,
    });
  };

  openPopup = () =>{
    this.setState({
      popupIsOpen: true,
    });
  }

  closePopup = () => {
    this.setState({
      popupIsOpen: false,
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
      address: this.state.address,
      image: this.state.image,
      organizationalUnit: this.state.organizationalUnit,
      typeOfEvent: this.state.typeOfEvent,
      eventDate: this.state.eventDate,
      eventTime: this.state.eventTime  
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
                  address: this.state.address,
                  image: this.state.image,
                  organizationalUnit: this.state.organizationalUnit,
                  typeOfEvent: this.state.typeOfEvent,
                  eventDate: this.state.eventDate,
                  eventTime: this.state.eventTime,
                }
              : elm
          ),
        }));
      })
      .catch((error) => console.log(error));
      window.location.reload();
  };

  //End event
  handleEndEvent = (item) => {
    const eventId = {
      id_event: item.id_event,
      eventended: 1,
    };
    console.log(eventId);
    Swal.fire({
      title: 'Bạn muốn kết thúc sự kiện không?',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {        
        axios
        .post("/eventended", eventId)
        .then((res) => {
          this.setState((prevState) => ({
            event: prevState.event.map((elm) =>
              elm.id_event === item.id_event
                ? {
                    ...elm,
                    eventended: 1,
                  }
                : elm
            ),
          }));
        })
        .catch((error) => console.log(error));
        Swal.fire('Đã kết thúc sự kiện', '', 'success').then((res) =>{
          if(res.isConfirmed){
            window.location.reload();
          }
        })
      } else{
        Swal.fire('Chưa kết thúc sự kiện', '', 'success')
      }
    })
  };

  //Delete event data
  handleDelete = (item) => {
    const eventId = {
      id_event: item.id_event,
    };
      Swal.fire({
        title: 'Bạn muốn xóa sự kiện không?',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Đã xóa sự kiện', '', 'info')
          axios
          .post("/api/delete", eventId)
          .then((res) => {
            this.setState((prevState) => ({
              event: prevState.event.filter((el) => el.id_event !== item.id_event),
            }));
          })
          .catch((error) => console.log(error));
          
        } else{
          Swal.fire('Không xóa sự kiện', '', 'info')
        }
      })
  };

  //Search event by name
  handleSearch = () => {
    axios
      .get(`/api/searchEvent?search=${this.state.searchData}`)
      .then((res) => {
        const event = res.data;
        this.setState({ event: event.event });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="homepage">
        {/* Insert new event */}
        <Popup
          modal
          trigger={
            <button
              className="btn-create-event fa fa-plus"
              title="Tạo sự kiện"
              
            ></button>
          }
          on='click'
          open={this.state.popupIsOpen}
          onOpen={this.openPopup}
          onRequestClose={this.closePopup}
        >
          <div className="card-container-create-event">
            <div className="card form-event">
              <div className="card-header text-center form-header">
                <p>Sự kiện mới</p>
                <p className="ic-close" ><BsFillXCircleFill id="BsFillXCircleFill" onClick={this.closePopup}/></p>
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
                    <label for="eventAddress">Địa điểm</label>
                    <textarea
                      name="address"
                      className="form-control"
                      id="eventAddress"
                      rows="2"
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
                  <div className="form-group date-time">
                    <div className="event-date">
                      <label>Ngày tổ chức:</label>
                      <input name="eventDate" type="date" onChange={this.handleInputChange} /> 
                    </div>
                    <div className="event-time">
                      <label>Giờ:</label>
                      <input name="eventTime" type="time" onChange={this.handleInputChange} />
                    </div>         
                  </div>
                  <div className="form-group">
                    <label>
                      Đơn vị tổ chức:
                      <select
                        name="organizationalUnit"
                        onChange={this.handleInputChange}
                      >
                        {OrganizationalUnit.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      Loại sự kiện:
                      <select
                        name="typeOfEvent"
                        onChange={this.handleInputChange}
                      >
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
          </div>
        </Popup>

        {/* Display event data */}
        <div className="event-des">
          <div className="search-bar">
            <input
              name="searchData"
              onChange={this.handleInputChange}
              placeholder="Tìm sự kiện..."
            />
            <BsSearch className="BsSearch" onClick={ () => this.handleSearch} />
          </div>

          {this.state.event
            .filter((u) =>
              u.organizationalUnit.includes(localStorage.getItem("unit"))
            )
            .map((item) => (
              <div className="event-des-item" key={item.id_event}>
                <div className="header-event">

                  {/*display name */}
                  <div className="event-name">{item.name}</div>

                  <Dropdown>
                    <Dropdown.Toggle variant="" className="dropdown-choose">
                      <BsThreeDots id="three-dots"></BsThreeDots>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {/* click to show edit form */}
                      <Dropdown.Item onClick={() => this.openModal(item)}>
                        <div id="drop-item">
                          <button className="far fa-edit ic-in-3-dots" />
                          <span>Chỉnh sửa</span>
                        </div>
                      </Dropdown.Item>

                      {/* Click to delete event data */}
                      <Dropdown.Item onClick={() => this.handleDelete(item)}>
                        <div id="drop-item">
                          <button className="far fa-trash-alt ic-in-3-dots" />
                          <span>Xóa</span>
                        </div>
                      </Dropdown.Item>

                      {/* Click to end event */}
                      <Dropdown.Item onClick={() => this.handleEndEvent(item)}>
                        <div id="drop-item">
                          <button className="fas fa-hourglass-end ic-in-3-dots" />
                          <span>Kết thúc sự kiện</span>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                {/* display description */}
              <ShowMoreText
                /* Default options */
                lines={3}
                more="Show more"
                less="Show less"
                expanded={false}
              >
              <div className="description">{item.description}</div>
              </ShowMoreText>
              <div className="img-unit-type">
                {/* display image */}
                <img
                  src={item.image}
                  alt="image_event"
                  className="img-fluid"
                  width={500}
                />
                {/* display widge */}
                <div id="unit-type" >
                  <p><strong>Đơn vị tổ chức:</strong> {item.organizationalUnit}</p>
                  <p><strong>Loại sự kiện:</strong> {item.typeOfEvent}</p>
                  <p><strong>Địa điểm:</strong> {item.address}</p>
                  <p><strong>Thời gian:</strong>  {new Date(Date.parse(item.eventDate)).toLocaleDateString(undefined)} lúc {new Date(Date.parse(item.eventDate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div> 
            </div>
          ))}
        </div>
                

        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customModal}>
          <div className="card">
            <div className="card-header text-center form-header">
              <p>Chỉnh sửa</p>
              <p className="ic-close" ><BsFillXCircleFill id="BsFillXCircleFill" onClick={this.closeModal}/></p>
            </div>
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
                  <label for="eventAddress">Địa điểm</label>
                  <textarea
                    name="address"
                    className="form-control"
                    id="eventAddress"
                    // rows="4"
                    value={this.state.address}
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
                <div className="form-group date-time">
                  <div className="event-date">
                    <label>Ngày tổ chức:</label>
                    <input name="eventDate" type="date" onChange={this.handleInputChange} /> 
                  </div>
                  <div className="event-time">
                    <label>Giờ:</label>
                    <input name="eventTime" type="time" onChange={this.handleInputChange} />
                  </div>         
                </div>
                <div className="form-group">
                    <label>
                      Đơn vị tổ chức:
                      <select
                        name="organizationalUnit"
                        onChange={this.handleInputChange}
                      >
                        {OrganizationalUnit.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      Loại sự kiện:
                      <select
                        name="typeOfEvent"
                        onChange={this.handleInputChange}
                      >
                        {TypeOfEvent.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </label>
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
