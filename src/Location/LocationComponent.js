import React from 'react'
import Select from 'react-select';
import useLocationForm from './../Services/useLocationForm';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
function LocationComponent() {
    const { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } =
        useLocationForm()

    const {
        cityOptions,
        districtOptions,
        wardOptions,
        selectedCity,
        selectedDistrict,
        selectedWard,
    } = state;
    return (
        <Container className='registerForm'>
            <Row className='registerForm__title'> Thông tin cá nhân</Row>
            <Form as={Row}>
                <Form.Group as={Col} xs={4}>
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group as={Col} xs={4}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>

                <Form.Group as={Col} xs={3}>
                    <Form.Label>Giới tính</Form.Label>
                    <Form.Check type="checkbox" label="Nam" />
                    <Form.Check type="checkbox" label="Nữ" />
                </Form.Group>
                <Row>
                    <Form.Group as={Col} xs={4}>
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                    <Form.Group as={Col} xs={4}>
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                </Row>
                <Row className='registerForm__title'>
                    Thông tin tài khoản
                </Row>
                <Row>
                    <Form.Group as={Col} xs={3}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group as={Col} xs={4}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Form.Group as={Col} xs={4}>
                        <Form.Label>Nhập lại Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>


                </Row>
                <Row className='registerForm__title'>Địa chỉ giao hàng</Row>
                <Row>
                    <Col xs={3}>
                        <Select
                            name="cityId"
                            key={`cityId_${selectedCity?.value}`}
                            isDisabled={cityOptions.length === 0}
                            options={cityOptions}
                            onChange={(option) => onCitySelect(option)}
                            placeholder="Tỉnh/Thành"
                            defaultValue={selectedCity}
                        />
                    </Col>
                    <Col>
                        <Select
                            name="districtId"
                            key={`districtId_${selectedDistrict?.value}`}
                            isDisabled={districtOptions.length === 0}
                            options={districtOptions}
                            onChange={(option) => onDistrictSelect(option)}
                            placeholder="Quận/Huyện"
                            defaultValue={selectedDistrict}
                        />
                    </Col>
                    <Col>
                        <Select
                            name="wardId"
                            key={`wardId_${selectedWard?.value}`}
                            isDisabled={wardOptions.length === 0}
                            options={wardOptions}
                            placeholder="Phường/Xã"
                            onChange={(option) => onWardSelect(option)}
                            defaultValue={selectedWard}
                        />
                    </Col>

                </Row>
                <Row>
                    <Form.Group as={Col} xs={7}>
                        <Form.Label>Số nhà, tên đường</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                </Row>
                {/* 
                <Button variant="primary" type="submit">
                    Submit
                </Button> */}
            </Form>
        </Container>

    );
}


export default LocationComponent