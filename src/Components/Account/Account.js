import React, { useRef } from 'react'
import { Container, Row, Col, Form, Button, Offcanvas } from 'react-bootstrap';
import { useLoading } from '../../Context/LoadingContext';
import useLocationForm from '../../Services/useLocationForm';
import NavBarComponent from '../NavBar/NavBarComponent';
import './Account.scss'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../ErrorPage/style.css';
import ajax from '../../Services/fechServices';
export default function Account() {
    const loading = useLoading();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [input, setInput] = useState({
        id: loading.user.id,
        fullname: loading.user.fullname,
        email: loading.user.email,
        gender: loading.user.gender,
        birthday: loading.user.birthday,
        phone: loading.user.phone,
        username: loading.user.username,
        note: loading.user.note,
        address: loading.user.address
    })
    const [passwordChange, setPasswordChange] = useState({
        password: '',
        newPassword: '',
        confirmPassword: '',
    })
    const address = loading.user ? loading.user.address.split(', ') :
        console.log('birthday', input.birthday)
    const location =
    {
        "city": address[2],
        "district": address[1],
        "ward": address[0]
    }
    const { state, onCitySelect, onDistrictSelect, onWardSelect } =
        useLocationForm(location)
    const {
        cityOptions,
        districtOptions,
        wardOptions,
        selectedCity,
        selectedDistrict,
        selectedWard,
    } = state;
    const selectedCityRef = useRef(selectedCity)
    const selectedDistrictRef = useRef(selectedDistrict)
    const selectedWardRef = useRef(selectedWard)

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));

    }
    const handleChangePassword = () => {
        if (passwordChange.newPassword !== passwordChange.confirmPassword) {
            setErrorMsg("Vui lòng nhập mật khẩu khớp nhau")
            return
        } else {


            let formData = new FormData()
            formData.append('currentPassword', passwordChange.password)
            formData.append('newPassword', passwordChange.newPassword)
            //Không dùng ajax chổ này được, vì qua ajax sẽ chuyển formdata thành json.
            fetch('/api/auth/users/changePassword', {
                method: 'post',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${loading.jwt}`
                }

            }).then(async res => {


                let result = (await res.json())
                alert(result.message)


            });
        }

    }

    const handleChangeInfoUser = () => {
        ajax('api/auth/users/changeInfoUser', 'POST', loading.jwt, input).then(async res => {
            let result = (await res.json())
            if (res.status === 200) {

                await loading.setUser(result)
                await loading.setDisplayName(result.fullname)
                alert("Thông tin đã được cập nhật")
            } else {
                alert(result)
            }

        })
    }

    return (
        <>

            {
                input.id ? <>
                    <Container className='info-user' fluid>
                        <Row className='info-user__header'> Thông tin cá nhân</Row>
                        <Form as={Row}>
                            <Form.Group as={Col} sm={4} md={4} >
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control type="text" name="fullname" onChange={onInputChange} value={input.fullname ? input.fullname : ''} />
                            </Form.Group>
                            <Form.Group as={Col}  sm={6} md={5} lg={4}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" onChange={onInputChange} value={input.email ? input.email : ''} />
                            </Form.Group>



                            <Form.Group as={Col} sm={3} md={3}>
                                <Form.Label>Ngày sinh</Form.Label>
                                <Form.Control type="date" name="birthday" onChange={onInputChange} value={input.birthday ? input.birthday : ''} />
                            </Form.Group>
                            <Form.Group as={Col} sm={3} md={3}>
                                <Form.Label>Giới tính</Form.Label>
                                <Form.Select
                                    onChange={onInputChange}
                                    value={input.gender ? true : false}

                                    name='gender'
                                >
                                    <option></option>

                                    <option value={true}>Nam</option>
                                    <option value={false}>Nữ</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} sm={3} md={4}>
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="tel" name="phone" onChange={onInputChange} value={input.phone ? input.phone : ''} />
                            </Form.Group>
                            <Form.Group as={Col} sm={10} md={4}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control name="username" onChange={onInputChange} value={input.username ? input.username : ''} />
                            </Form.Group>

                        </Form>
                        <Row className='info-user__header'>
                            Địa chỉ giao hàng
                        </Row>
                        <Form as={Row}>
                            <Form.Group as={Col} md={4}>
                                <Form.Label>Tỉnh</Form.Label>
                                <Form.Select
                                    value={selectedCity ? selectedCity.value : ''}
                                    onChange={(e) => {
                                        let selectedObject = cityOptions.find((c) => c.value === Number(e.target.value))

                                        onCitySelect(selectedObject)
                                    }}
                                >
                                    <option></option>
                                    {cityOptions ? console.log() : <></>}
                                    {cityOptions ? cityOptions.map(item => { return <option key={item.value} value={item.value}>{item.label}</option> }) : <></>}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md={4}>
                                <Form.Label>Huyện</Form.Label>
                                <Form.Select
                                    value={selectedDistrict ? selectedDistrict.value : ''}
                                    onChange={(e) => {
                                        let selectedObject = districtOptions.find((c) => c.value === Number(e.target.value))
                                        onDistrictSelect(selectedObject)
                                    }}
                                    disabled={!selectedCity}
                                >
                                    <option></option>

                                    {districtOptions ? districtOptions.map(item => { return <option key={item.value} value={item.value}>{item.label}</option> }) : <></>}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md={4}>
                                <Form.Label>Xã</Form.Label>
                                <Form.Select
                                    value={selectedWard ? selectedWard.value : ''}
                                    onChange={(e) => {
                                        let selectedObject = wardOptions.find((c) => c.value === Number(e.target.value))

                                        onWardSelect(selectedObject)
                                    }}
                                    disabled={!selectedDistrict}
                                    onBlur={() => setInput({ ...input, address: selectedWard.label + ', ' + selectedDistrict.label + ', ' + selectedCity.label })}
                                >
                                    <option></option>

                                    {wardOptions ? wardOptions.map(item => { return <option key={item.value} value={item.value}>{item.label}</option> }) : <></>}
                                </Form.Select>
                            </Form.Group>
                        </Form>

                        <Form as={Row}>


                            <Form.Group as={Col}>
                                <Form.Label>Ghi chú</Form.Label>
                                <Form.Control as="textarea" rows={4} name='note' onChange={onInputChange} value={input.note ? input.note : ''}
                                />

                            </Form.Group>


                        </Form>
                        <Row className='info-user__btn'>




                            <Button variant="success" className='info-user__btn__save' onClick={() => handleChangeInfoUser()}>
                                Save Changes
                            </Button>
                            <Button variant="success" className='info-user__btn__save' onClick={handleShow}>
                                Change Password
                            </Button>
                            <Button variant="danger" className='info-user__btn__reset' onClick={() => window.location.reload()
                            }>
                                Reset
                            </Button>
                        </Row>
                    </Container>
                </> : <></>

            }
            <Offcanvas show={show} onHide={handleClose} placement='center'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fs-2 fw-bold align-self-center '>Change Password</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form>
                        <Form.Group as={Col}>
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={(e) => setPasswordChange(prev => ({
                                ...prev,
                                password: e.target.value
                            }))} value={passwordChange.password} />
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" name="newPassword" onChange={(e) => setPasswordChange(prev => ({
                                ...prev,
                                newPassword: e.target.value
                            }))} value={passwordChange.newPassword} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Retype Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" onChange={(e) => setPasswordChange(prev => ({
                                ...prev,
                                confirmPassword: e.target.value
                            }))}
                                value={passwordChange.confirmPassword} />
                        </Form.Group >
                        {errorMsg ? (
                            <Row className="justify-content-center mb-4">
                                <Col md="8" lg="6">
                                    <div style={{ color: "red", fontWeight: "bold" }}>
                                        {errorMsg}
                                    </div>
                                </Col>
                            </Row>
                        ) : (
                            <></>
                        )}
                        <Form.Group as={Col} className='button-change-password'>
                            <Button variant='success' className='button-change-password__agree' onClick={
                                handleChangePassword
                            }>Agree</Button>
                            <Button variant='danger' className='button-change-password__clear' onClick={() => {
                                setPasswordChange({ ...passwordChange, password: '', confirmPassword: '', newPassword: '' })
                                setErrorMsg('')
                            }}>Clear</Button>
                        </Form.Group>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
