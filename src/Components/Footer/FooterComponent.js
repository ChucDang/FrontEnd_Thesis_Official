
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Footer.scss'
function FooterComponent() {
    return (
        <Container fluid className='footer'>
            <Row >
                <Col md={3} className="footer__header"> ĐIỀU HƯỚNG</Col>
                <Col xs={12} md={6} className='footer__body'>
                    <div className="footer__body__logo" >
                        <img
                            alt="Không load được hình"
                            src="/icons/ic_store.png"
                            className='footer__body__logo--img'
                        />
                        <span className="footer__body__logo--brand">Hi-Tech</span>
                    </div>
                    <div className='footer__body__slogan'>Hãy tận hưởng những tiện ích từ hệ sinh thái của chúng tôi</div>
                    <input type='email' placeholder='Email' className='footer__body__email'></input>
                </Col>
                <Col md={3} className='footer__info'>
                    <div className="footer__info__header">SINH VIÊN THỰC HIỆN</div>
                    <div>Đặng Văn Chức</div>
                    <div>B1706677</div>
                    <div>Giảng viên hướng dẫn</div>
                    <div>Ths.Vũ Duy Linh | MSCB: 01042</div>
                </Col>
            </Row>
        </Container>
    )

}
export default FooterComponent