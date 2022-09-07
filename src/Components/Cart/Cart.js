import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./style.scss";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useLoading } from "../../Context/LoadingContext";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmUserDetail from "./ConfirmUserDetail";
import "../ErrorPage/style.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartAsync } from "../../redux/cartSlice";
export default function Cart() {
  const dispatch = useDispatch();
  const loading = useLoading();
  const cartLines = useSelector((state) => state.cartLines);
  const totalPrice = useMemo(() => {
    let total = 0;
    cartLines.forEach((item) => {
      total += Number(item.product.new_price * item.amount);
    });
    return total
  });

  const handleDelete = async (id) => {
    dispatch(deleteCartAsync({ id: id, jwt: loading.jwt }));
  };

  return (
    <>
      <Container fluid className="cart">
        <Row className="cart__label">
          <Col>Product</Col>
          <Col> Image</Col>
          <Col>New Price</Col>
          <Col>Old Price</Col>
          <Col>Amount</Col>
          <Col>Task</Col>
        </Row>
        {cartLines.length > 0 ? (
          cartLines.map((item) => {
            //Row và return phải cùng hàng, xuống hàng thì sẽ lỗi
            return (
              <Row className="cart__row" key={item.id}>
                <Col>{item.product.brand.name + " " + item.product.model}</Col>
                <Col>
                  <img
                    className="cart__row__img"
                    src="/imgs/computer.png"
                    alt="Nothing to display"
                  />
                </Col>
                <Col>
                  {Number(item.product.new_price).toLocaleString("vn") + " đ"}
                </Col>
                <Col className="cart__row--strikethrough">
                  {Number(item.product.original_price).toLocaleString("vn") +
                    " đ"}
                </Col>
                <Col>{item.amount}</Col>
                {/* <Col>{Number(item.product.new_price * item.amount).toLocaleString('vn') + ' đ'}</Col> */}
                <Col className="cart__row__grpbtn">
                  <DeleteIcon
                    className="cart__row__grpbtn__icon"
                    value={item.id}
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  />
                </Col>
              </Row>
            );
          })
        ) : (
          <Row className="cart__noneValue">
            {" "}
            Bạn chưa có Order nào trong giỏ hàng{" "}
          </Row>
        )}

        {totalPrice !== 0 && (
          <Row className="cart__label">
            <Col></Col>
            <Col> </Col>
            <Col></Col>
            <Col></Col>
            <Col>Tổng cộng</Col>
            <Col>{Number(totalPrice).toLocaleString("vn") + " đ"}</Col>
            <Col>
              {/* <Button className='cart__label__btn' variant="success" onClick={() => handleBuy()}>Đặt hàng</Button> */}
              <ConfirmUserDetail cartLines={cartLines} />
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
