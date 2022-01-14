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
import Swal from 'sweetalert2'
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

  //get data
  componentDidMount() {
    this.handleId();
    axios
      .get(`/api/favorite/get?id=${this.state.id}`)
      .then((res) => {
        const event = res.data;
        this.setState({event: event.event})
        console.log("AAAAAAAAAAAAA")
      })
      .catch((error) => console.log(error));
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

  // setImage = async (event) => {
  //   const formData = new FormData();
  //   formData.append("file", event.target.files[0]);
  //   axios.post("/uploadfile", formData).then((res) => {
  //     this.setState({ image: `${res.data}` });
  //   });
  // };

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

  //Edit event data
  // handleEditSubmit = (event) => {
  //   event.preventDefault();

    //khai báo giá trị để truyền theo phương thức post
    // const newUpdate = {
    //   id_event: this.state.id_event,
    //   name: this.state.name,
    //   description: this.state.description,
    //   address: this.state.address,
    //   image: this.state.image,
    //   organizationalUnit: this.state.organizationalUnit,
    //   typeOfEvent: this.state.typeOfEvent,
    //   eventDate: this.state.eventDate,
    //   eventTime: this.state.eventTime  
    // };
    // console.log(newUpdate);

  //   axios
  //     .post("/api/edit", newUpdate)
  //     .then((res) => {
  //       let key = this.state.id_event;
  //       this.setState((prevState) => ({
  //         event: prevState.event.map((elm) =>
  //           elm.id_event === key
  //             ? {
  //                 ...elm,
  //                 name: this.state.name,
  //                 description: this.state.description,
  //                 address: this.state.address,
  //                 image: this.state.image,
  //                 organizationalUnit: this.state.organizationalUnit,
  //                 typeOfEvent: this.state.typeOfEvent,
  //                 eventDate: this.state.eventDate,
  //                 eventTime: this.state.eventTime   
  //               }
  //             : elm
  //         ),
  //       }));
  //     })
  //     .catch((error) => console.log(error));
  //     window.location.reload();
  // };

  //Restore event
  // handleRestoreEvent = (item) => {
  //   const eventId = {
  //     id_event: item.id_event,
  //     eventended: 0,
  //   };
  //   const { t } = this.props;
  //   Swal.fire({
  //     title: t('Popup.restore_event'),
  //     showCancelButton: true,
  //     confirmButtonText: t('Popup.yes'),
  //     cancelButtonText: t('Popup.no')
  //   }).then((result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {        
  //       axios
  //       .post("/restoreevent", eventId)
  //       .then((res) => {
  //         this.setState((prevState) => ({
  //           event: prevState.event.map((elm) =>
  //             elm.id_event === item.id_event
  //               ? {
  //                   ...elm,
  //                   eventended: 0,
  //                 }
  //               : elm
  //           ),
  //         }));
  //       })
  //       .catch((error) => console.log(error));
  //       Swal.fire(t('Popup.restored_event'), '', 'info').then((res) =>{
  //         if(res.isConfirmed){
  //           window.location.reload();
  //         }
  //       })
  //     } else{
  //       Swal.fire(t('Popup.no_restore_event'), '', 'info')
  //     }
  //   })
  // };

  //Delete event data
  // handleDelete = (item) => {
  //   const eventId = {
  //     id_event: item.id_event,
  //   };
  //   const { t } = this.props;
  //     Swal.fire({
  //       title: t('Popup.delete_event'),
  //       showCancelButton: true,
  //       confirmButtonText: t('Popup.yes'),
  //       cancelButtonText: t('Popup.no')
  //     }).then((result) => {
  //       /* Read more about isConfirmed, isDenied below */
  //       if (result.isConfirmed) {
  //         Swal.fire(t('Popup.deleted_event'), '', 'info')
  //         axios
  //         .post("/api/delete", eventId)
  //         .then((res) => {
  //           this.setState((prevState) => ({
  //             event: prevState.event.filter((el) => el.id_event !== item.id_event),
  //           }));
  //         })
  //         .catch((error) => console.log(error));
          
  //       } else{
  //         Swal.fire(t('Popup.no_delete_event'), '', 'info')
  //       }
  //     })
  // };

  handleSearch = () => {
    axios
      .get(`/api/searchEvent?search=${this.state.searchData}`)
      .then((res) => {
        const event = res.data;
        this.setState({ event: event.event });
      })
      .catch((error) => console.log(error));
  };

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
                  <p><strong>{t('Home.unit')}</strong> {item.organizationalUnit}</p>
                  <p><strong>{t('Home.type_event')}</strong> {item.typeOfEvent}</p>
                  <p><strong>{t('Home.venue')}</strong> {item.address}</p>
                  <p><strong>{t('Home.time')}</strong>  {new Date(Date.parse(item.eventDate)).toLocaleDateString(undefined)} lúc {new Date(Date.parse(item.eventDate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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
