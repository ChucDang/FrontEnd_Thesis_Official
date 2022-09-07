
import React, { useEffect, useState } from 'react'
import useLocationForm from '../../Services/useLocationForm';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './RegisterComponent.scss'
import { useNavigate } from 'react-router-dom';
function RegisterComponent() {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        gender: '',
        birthday: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: '',
        note: '',
        address: '',

    })

    const [errorMsg, setErrorMsg] = useState(null);
    // Các state xử lý địa chỉ hành chính
    const { state, onCitySelect, onDistrictSelect, onWardSelect } =
        useLocationForm()
    const {
        cityOptions,
        districtOptions,
        wardOptions,
        selectedCity,
        selectedDistrict,
        selectedWard,
    } = state;

    const genders = [
        {
            label: "Nam",
            value: true,
        },
        {
            label: "Nữ",
            value: false,
        }
    ];

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));

    }

    function createAndLoginUser() {
        if (input.password !== input.confirmPassword) {
            setErrorMsg("Vui lòng nhập mật khẩu khớp nhau")
            return    
        }
       
        const reqBody = {
            username: input.username,
            password: input.password,
            fullname: input.fullname,
            birthday: input.birthday,
            phone: input.phone,
            gender: input.gender,
            note: input.note,
            email: input.email,
            address: state.selectedWard.label + ", " + state.selectedDistrict.label + ", " + state.selectedCity.label
        };
        fetch("/api/auth/users/register", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then(async (response) => {
                if (response.status === 200){
                    alert("Đăng ký thành công");
                    navigate("/");
                }else{
                    let result = await response.json()
                    alert(result.message)
                }
            })
    }
    return (
        <Container className='registerForm'>
            <Row className='registerForm__title'> Thông tin cá nhân</Row>
            <Form as={Row}>
                <Form.Group as={Col} sm={4} >
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control type="text" name="fullname" value={input.fullname} onChange={onInputChange} />
                </Form.Group>
                <Form.Group as={Col} sm={6}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={input.email} onChange={onInputChange} />
                </Form.Group>

                <Form.Group as={Col} sm={2} >
                    <Form.Label>Giới tính</Form.Label>
                    <Form.Select
                        value={input.gender !== null ? input.gender : ''}
                        name='gender'
                        onChange={onInputChange}
                    >
                        <option></option>
                        <option value='true'>Nam</option> <option value='false'>Nữ</option>
                    </Form.Select>

                </Form.Group>
               
                    <Form.Group as={Col} sm={4}>
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control type="date" name="birthday" value={input.birthday} onChange={onInputChange} />
                    </Form.Group>
                    <Form.Group as={Col} sm={4}>
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control type="tel" name="phone" value={input.phone} onChange={onInputChange} />
                    </Form.Group>
                
                <Row className='registerForm__title'>
                    Thông tin tài khoản
                </Row>


               
                    <Form.Group as={Col} sm={3}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={input.username} name="username" onChange={onInputChange} />
                    </Form.Group>
                    <Form.Group as={Col} sm={4}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={input.password} name="password" onChange={onInputChange} />
                    </Form.Group>
                    <Form.Group as={Col} sm={4}>
                        <Form.Label>Nhập lại Password</Form.Label>
                        <Form.Control type="password" value={input.confirmPassword} name="confirmPassword" onChange={onInputChange} />
                    </Form.Group>
               



                {errorMsg ? (
                    <Row className="justify-content-center mb-4">
                        <Col sm="8" lg="6">
                            <div className="" style={{ color: "red", fontWeight: "bold" }}>
                                {errorMsg}
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <></>
                )}
                <Row className='registerForm__title'>Địa chỉ giao hàng</Row>
                <Form as={Row}>
                    <Form.Group as={Col} sm={4}>
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
                    <Form.Group as={Col} sm={4}>
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
                    <Form.Group as={Col} sm={4}>
                        <Form.Label>Xã</Form.Label>
                        <Form.Select
                            value={selectedWard ? selectedWard.value : ''}
                            onChange={(e) => {

                                let selectedObject = wardOptions.find((c) => c.value === Number(e.target.value))

                                onWardSelect(selectedObject)
                            }}
                            disabled={!selectedDistrict}
                        >
                            <option></option>

                            {wardOptions ? wardOptions.map(item => { return <option key={item.value} value={item.value}>{item.label}</option> }) : <></>}
                        </Form.Select>
                    </Form.Group>
                </Form>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Ghi chú</Form.Label>
                        <Form.Control type="text" value={input.note} name="note" onChange={onInputChange} />
                    </Form.Group>
                </Row>
                <Row className='registerForm__button'>
                    <Button variant="success" type="submit" onClick={() =>{ 
                        if(input.username&&input.password){
                            if(selectedCity&&selectedDistrict&&selectedWard){
                                createAndLoginUser()
                            }else{
                                setErrorMsg("Vui lòng nhập địa chỉ giao hàng")
                            }
                        }else{
                            setErrorMsg("Vui lòng nhập Username và password")

                        }
                        
                       }
                        } className='mx-3'>
                        Submit
                    </Button>
                    <Button variant="danger" type="submit" onClick={() => {
                        setInput({
                            fullname: '',
                            email: '',
                            gender: '',
                            birthday: '',
                            phone: '',
                            username: '',
                            password: '',
                            confirmPassword: '',
                            note: '',
                            address: '',
                            authorities: ''
                        })
                    }}>
                        Clear
                    </Button>
                </Row>

            </Form>
        </Container>

    );
}

export default RegisterComponent