import React from 'react'
import { Container, Row } from 'react-bootstrap'
function ForgetComponent() {
    return (

        // Các className sẽ không đúng với tên của nó, do sử dụng lại scss của RegisterComponent
        <Container className='registerForm'>
            <Row className='registerForm__title'>Quên mật khẩu? Vui lòng nhập tên đăng nhập hoặc địa chỉ email.</Row>
            <Row className='p-2'>Tên đăng nhập hoặc Email</Row>
            <input className='registerForm__button' as={Row} type="text"></input>
        </Container>
    )
}

export default ForgetComponent