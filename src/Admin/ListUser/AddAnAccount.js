import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, Offcanvas, Row } from 'react-bootstrap';
import { useLoading } from '../../Context/LoadingContext';
import Select from 'react-select';
import { ROLE_ENUM } from '../../Constants/roles';
import ajax from '../../Services/fechServices';
export default function AddAnAccount({ setUsers, users }) {
    const loading = useLoading();
    const [errorMsg, setErrorMsg] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [newUser, setNewUser] = useState({
        fullname: '',
        phone: '',
        email: '',
        gender: '',
        username: '',
        password: '',
        repassword: '',
        authority: '',
        enabled: ''
    })

    const onInputChange = e => {
        const { name, value } = e.target
        setNewUser(prev => ({
            ...prev,
            [name]: value
        }));

    }
    const handleRepassword = () => {
        if (newUser.password !== newUser.repassword) {
            setErrorMsg('Mật khẩu nhập lại không khớp')
            console.log('msg', errorMsg)
            setNewUser(prev => ({
                ...prev,
                repassword: '',
                password: ''
            }));

        } else {
            setErrorMsg(null)
        }

    }
    const handleRegister = () => {

        ajax('/admin/addAUser', 'Post', loading.jwt, newUser).then(async response => {
            let result = (await response.json())
           
            if (response.status === 200) {
                const usersCopy = [...result];
                usersCopy.sort(function (a, b) { return a.id - b.id })
                setUsers(usersCopy)
                alert('Thêm User thành công')
            }else{
                alert(result.message)

            }

        })
        handleClose();
    }

    const roles = [
        {
            label: "Quản trị viên",
            value: ROLE_ENUM.ADMIN,
        },
        {
            label: "Nhân Viên",
            value: ROLE_ENUM.STAFF,
        }
    ];
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
    const status = [
        {
            label: "Enable",
            value: true,
        },
        {
            label: "Disable",
            value: false,
        },
    ]
    return (
        <>
            <Button variant='success' style={{
                position: 'fixed',
                right: '3rem',
                bottom: '1rem',
            }} onClick={handleShow}>Add an account</Button>

            <Offcanvas show={show} onHide={handleClose} placement='center'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fs-2 fw-bold align-self-center '>New Account</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form className='editForm'>
                        <Row>
                            <Form.Group as={Col} xs={12} md={6}>
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control type="text" name='fullname' value={newUser.fullname} onChange={onInputChange} />
                            </Form.Group>
                            <Form.Group as={Col} xs={12} md={5}>
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="text" name='phone' onChange={onInputChange} value={newUser.phone} />
                            </Form.Group>

                        </Row>
                        <Row>
                            <Form.Group as={Col} xs={12} md={8}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name='email' onChange={onInputChange} value={newUser.email} />
                            </Form.Group>
                            <Form.Group as={Col} xs={5} md={3}>
                                <Form.Label>Giới tính</Form.Label>
                                <Select as={FormControl}
                                    key="gender"
                                    name='gender'


                                    options={genders}
                                    onChange={(e) => {
                                        setNewUser(prev => ({
                                            ...prev,
                                            gender: e.value
                                        }));
                                    }}
                                    value={genders.filter(option => option.value === newUser.gender)}

                                />
                            </Form.Group>
                            
                            <Form.Group as={Col} xs={7} md={5}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name='username' onChange={onInputChange} value={newUser.username} />
                            </Form.Group>
                        </Row>
                        <Row>

                            <Form.Group as={Col} xs={6}  md={6}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' onChange={onInputChange} value={newUser.password} />
                            </Form.Group>
                            <Form.Group as={Col} xs={6} md={6}>
                                <Form.Label>Retype Password</Form.Label>
                                <Form.Control type="password" name='repassword'
                                    onChange={onInputChange}
                                    value={newUser.repassword}
                                    onBlur={handleRepassword}
                                />
                            </Form.Group>
                        </Row>
                        {errorMsg ? (
                            <Row className="justify-content-center my-3">
                                <Col md="8" lg="6">
                                    <div className="" style={{ color: "red", fontWeight: "bold" }}>
                                        {errorMsg}
                                    </div>
                                </Col>
                            </Row>
                        ) : (
                            <></>
                        )}
                        <Row>
                            <Form.Group as={Col} xs={12} md={4}>
                                <Form.Label>Authority</Form.Label>
                                <Select as={FormControl}
                                    key="authority"
                                    name='authority'
                                    options={roles}
                                    onChange={(e) => {
                                        setNewUser(prev => ({
                                            ...prev,
                                            authority: e.value
                                        }));
                                    }}
                                    value={roles.filter(option => option.value === newUser.authority)}




                                />
                            </Form.Group>
                            <Form.Group as={Col} xs={12} md={4}>
                                <Form.Label>Status</Form.Label>
                                <Select as={FormControl}
                                    key="enabled"
                                    name='enabled'
                                    options={status}
                                    onChange={(e) => {
                                        setNewUser(prev => ({
                                            ...prev,
                                            enabled: e.value
                                        }));
                                    }}

                                    value={status.filter(option => option.value === newUser.enabled)}




                                />
                            </Form.Group>

                        </Row>
                        <Row className='editFrom__btn'>
                            <Button className='editFrom__btn--save' variant='success' onClick={handleRegister}>Register</Button>
                            <Button className='editFrom__btn--cancel' variant='danger' onClick={handleClose}>Cancel</Button>
                        </Row>

                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>

    )
}
