import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Offcanvas, Row } from "react-bootstrap";
import useLocationForm from "../../Services/useLocationForm";
import { useLoading } from "../../Context/LoadingContext";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { buyCartAsync } from "../../redux/cartSlice";

// Phải truyền prop localStorage thế này, vì nếu khai báo trong đây thì nó load lần đầu là null hay '',
// làm hư chương trình phía sau.
export default function ConfirmUserDetail() {
  const loading = useLoading();
  const dispatch = useDispatch();
  const cartLines = useSelector((state) => state.cartLines);
  const navigate = useNavigate()
  const [confirm, setConfirm] = useState({
    fullname: loading.user ? loading.user.fullname : "",
    phone: loading.user ? loading.user.phone : "",
    address: loading.user ? loading.user.address : null,
    note: loading.user ? loading.user.note : "",
  });
  const address = loading.user ? loading.user.address.split(", ") : null;
  const location = {
    city: address[2],
    district: address[1],
    ward: address[0],
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(location);
  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;
  const onConfirmChange = async (e) => {
    const { name, value } = e.target;
    setConfirm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // const handleBuy = async () => {
  //     // Properties cho OrderDTO
  //     const reqBody = {
  //         ...confirm,
  //         address: selectedWard.label + ', ' + selectedDistrict.label + ', ' + selectedCity.label,

  //         orderLines: cartLines,
  //     };

  //     const response = await fetch('/order/save', {
  //         headers: {
  //             "Content-Type": "application/json",
  //             "Authorization": `Bearer ${loading.jwt}`
  //         },
  //         method: "POST",
  //         body: JSON.stringify(reqBody)
  //     })

  //     if (response.status === 200) {
  //         console.log('Come here')
  //         await loading.setCount(0)
  //         await setCartLines([])
  //         navigate("/order")

  //     } else {
  //         alert('Đặt hàng không thành công, vui lòng thử lại sau!!!')
  //     }
  // }
  const handleBuy = () => {
    dispatch(
      buyCartAsync({
        jwt: loading.jwt,
        order: {
          ...confirm,
          address: selectedWard.label +", " + selectedDistrict.label +", " +selectedCity.label,
          orderLines: cartLines,
        },
      })
    );
    
    if(cartLines){
      navigate('/order')
    }
    handleClose()
  };
  return (
    <>
      <Button
        className="cart__label__btn"
        variant="success"
        onClick={() => handleShow()}
      >
        Đặt hàng
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="center"
        className="confirm"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fs-2 fw-bold align-self-center">
            Thông tin nhận hàng
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form as={Container} className="confirm__container" fluid>
            <Form.Group
              as={Row}
              controlId="formBasicEmail"
              className="confirm__container__user"
            >
              <Col xs={6} md={4}>
                <Form.Label className="fw-bold">Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  name="fullname"
                  value={confirm.fullname}
                  onChange={(e) => onConfirmChange(e)}
                />
              </Col>
              <Col xs={6} md={4}>
                <Form.Label className="fw-bold">Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={confirm.phone}
                  onChange={(e) => onConfirmChange(e)}
                />
              </Col>
            </Form.Group>
            <Form.Label className="fw-bold mb-3 mx-2">
              Địa chỉ giao hàng
            </Form.Label>
            <Form.Group
              as={Row}
              className="confirm__container__address"
              controlId="formBasicPassword"
            >
              <Col xs={12} md={4}>
                <Form.Label>Tỉnh</Form.Label>
                <Form.Select
                  value={selectedCity ? selectedCity.value : ""}
                  onChange={(e) => {
                    let selectedObject = cityOptions.find(
                      (c) => c.value === Number(e.target.value)
                    );

                    onCitySelect(selectedObject);
                  }}
                >
                  <option></option>
                  {cityOptions ? console.log() : <></>}
                  {cityOptions ? (
                    cityOptions.map((item) => {
                      return (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Form.Select>
              </Col>

              <Col xs={12} md={4}>
                <Form.Label>Huyện</Form.Label>
                <Form.Select
                  value={selectedDistrict ? selectedDistrict.value : ""}
                  onChange={(e) => {
                    let selectedObject = districtOptions.find(
                      (c) => c.value === Number(e.target.value)
                    );
                    onDistrictSelect(selectedObject);
                  }}
                  disabled={!selectedCity}
                >
                  <option></option>

                  {districtOptions ? (
                    districtOptions.map((item) => {
                      return (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Form.Select>
              </Col>
              <Col xs={12} md={4}>
                <Form.Label>Xã</Form.Label>
                <Form.Select
                  value={selectedWard ? selectedWard.value : ""}
                  onChange={(e) => {
                    let selectedObject = wardOptions.find(
                      (c) => c.value === Number(e.target.value)
                    );

                    onWardSelect(selectedObject);
                  }}
                  disabled={!selectedDistrict}
                >
                  <option></option>

                  {wardOptions ? (
                    wardOptions.map((item) => {
                      return (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formBasicEmail"
              className="confirm__container__note"
            >
              <Col xs={12}>
                <Form.Label className="fw-bold mb-2">Ghi chú</Form.Label>

                <Form.Control
                  type="text"
                  name="note"
                  value={confirm.note ? confirm.note : ""}
                  onChange={(e) => onConfirmChange(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formBasicEmail"
              className="confirm__container__btn"
            >
              <Button
                variant="success"
                className="confirm__container__btn--order"
                onClick={()=>handleBuy()}
              >
                Đặt Hàng
              </Button>
              <Button
                variant="danger"
                className="confirm__container__btn--cancel"
                onClick={() => handleClose()}
              >
                Hủy Bỏ
              </Button>
            </Form.Group>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
