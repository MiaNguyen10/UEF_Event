import React, { Component } from "react";
import "../HomePage/Home.css";
import axios from "axios";
import Modal from "react-modal";
import ShowMoreText from "react-show-more-text";
import { OrganizationalUnit } from "./OrganizationalUnit";
import { TypeOfEvent } from "./TypeOfEvent";
import { BsThreeDots } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import Swal from 'sweetalert2';
import { Button } from "react-bootstrap";
import Cookies from 'universal-cookie';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

const customModal = {
  content: {
    position: "fixed",
    inset: "0px",
    border: "none",
    background: "none",
    "z-index": "1000"
  },
};
class FavoriteEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      id:""
    };
  }

  handleId = () => {
    const cookies = new Cookies()
    let account = cookies.get('authToken');  
    if (account){
      this.state.id = account.id;
      console.log('account', this.state.id)  ;
    }
  }

  
  getData = () => {
    axios
      .get(`/api/favorite/get?id=${this.state.id}`)
      .then((res) => {
        const event = res.data;
        this.setState({event: event.event})
      })
      .catch((error) => console.log(error));
  }

  //get data
  componentDidMount() {
    this.handleId();
    this.getData()
    const lang = localStorage.getItem('lang');
    this.handleLanguage(lang);
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
    });
  };

  handleSearch = () => {
    axios
      .get(`/api/searchFavEvent?search=${this.state.searchData}`)
      .then((res) => {
        const event = res.data;
        this.setState({ event: event.event });
      })
      .catch((error) => console.log(error));
  };

  deleteFromFavortite = (id_event) => {
    fetch(`/api/favorite/delele?id_account=${this.state.id}&id_event=${id_event}`, {method: "DELETE"})
    this.getData()
  }

  handleLanguage = (lang) => {
    i18next.changeLanguage(lang)
  };

  render() {
    const { t } = this.props;
    return (
      <div className="homepage">
        {/* Display event data */}
        <div className="event-des">

          <div className="search-bar">
            <input
              name="searchData"
              onChange={this.handleInputChange}
              placeholder={t('Home.search')}
            />
            <BsSearch className="BsSearch" onClick={this.handleSearch} />
          </div>

          {this.state.event.map((item) => (
            <div className="event-des-item" key={item.id_event}>
              <div className="header-event">
                <div className="event-name">{item.name}</div>
              </div>

              {/* display description */}
              <ShowMoreText
                /* Default options */
                lines={2}
                more="Show more"
                less="Show less"
                expanded={false}
                width={1000}
                truncatedEndingComponent={"... "}
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
                  <p><strong>{t('Home.unit')}</strong> {item.organizationalUnit}</p>
                  <p><strong>{t('Home.type_event')}</strong> {item.typeOfEvent}</p>
                  <p><strong>{t('Home.venue')}</strong> {item.address}</p>
                  <p><strong>{t('Home.time')}</strong>  {new Date(Date.parse(item.eventDate)).toLocaleDateString(undefined)} lúc {new Date(Date.parse(item.eventDate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <Button onClick={() => this.deleteFromFavortite(item.id_event)}>{t('Home.btn_undo_fav')}</Button>
                </div>
              </div> 
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withTranslation() (FavoriteEvent);
