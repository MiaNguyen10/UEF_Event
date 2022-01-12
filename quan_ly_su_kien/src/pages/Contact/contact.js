import React from "react";
import "./contact.css";
import { menuItems } from "./menuItems";
import { Container, Row, Col } from "react-bootstrap";

const handleUnit = (props) => {
  localStorage.setItem("unit", props);
  console.log("ii");
};

const contact = () => {
  return (
    <div className="contact">
      <div className="row">
        <div className="table-item">
          <h2 className="heading">Thông tin liên lạc của các khoa</h2>
          <br />
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên đơn vị</th>
                <th scope="col">Số gọi vào</th>
                <th scope="col">Số nội bộ</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{item.stt}</th>
                    <td>
                      <a href={item.path} onClick={() => handleUnit(item.unit)}>
                        {item.unit}
                      </a>
                    </td>
                    <td>{item.number}</td>
                    <td>{item.internalNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Container className="table-item container">
          <Row>
            <Col sm={8}>
              <p>
                Trường Đại học Kinh tế - Tài chính thành phố Hồ Chí Minh (UEF)
              </p>
              <p>
                Địa chỉ: 141 - 145 Điện Biên Phủ, Phường 15, Q. Bình Thạnh,
                TP.HCM
              </p>
            </Col>
            <Col sm={4}>
              <p>Điện thoại: (028) 5422 6666</p>
              <p>Email: info@uef.edu.vn </p>
              <p>Giờ làm việc: Thứ Hai - Thứ Sáu, từ 7:30 đến 17:00</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default contact;
