import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Container, Form, FormControl, Offcanvas, Row } from 'react-bootstrap'
import Select from 'react-select';
import { ROLE_ENUM } from '../../Constants/roles';
import ajax from '../../Services/fechServices';
import { useLoading } from '../../Context/LoadingContext';
export default function EditButton({ user, setUsers }) {
    const loading = useLoading();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editValue, setEditValue] = useState({
        authority: user.authorities[0].authority,
        enabled: user.enabled,
    })
    const handleSave = async () => {
        ajax(`admin/editAUser/${user.id}`, 'POST', loading.jwt, editValue).then(async response => {

            let result = (await response.json())
            result.sort(function (a, b) { return a.id - b.id })
            await setUsers(result);
        })

        alert("Nhân viên đã được chỉnh sửa")
        handleClose()
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
            <Button variant='success'
                className='listUser__grpBtn__edit'
                onClick={handleShow}
                disabled={user.id === loading.user.id}
               
            >Edit</Button>
            <Offcanvas show={show} onHide={handleClose} placement='center'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fs-2 fw-bold align-self-center '>Edit User</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form className='editForm'>
                        <Row className='editForm__label'> Account</Row>
                        <Row>

                            <Form.Text className="editForm__info text-success">
                                Bạn không thể chỉnh sửa ở vùng này
                            </Form.Text>

                        </Row>
                        <Row>
                            <Form.Group as={Col} xs={4} >
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control type="text" value={user.fullname} plaintext readOnly />
                            </Form.Group>
                            <Form.Group as={Col} xs={4} >
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="text" value={user.phone} plaintext readOnly />
                            </Form.Group>

                        </Row>
                        <Row>
                            <Form.Group as={Col} xs={6} >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" value={user.email} plaintext readOnly />
                            </Form.Group>
                            <Form.Group as={Col} xs={2} >
                                <Form.Label>Giới tính</Form.Label>
                                <Form.Control type="text" value={user.gender ? 'Nam' : 'Nữ'} plaintext readOnly />
                            </Form.Group>

                        </Row>
                        <Row className="editForm__label">

                            Authority and status

                        </Row>
                        <Row>
                            <Form.Group as={Col} xs={4}>
                                <Form.Label>Authority</Form.Label>
                                <Select as={FormControl}
                                    key="role"

                                    options={roles}
                                    onChange={(option) => setEditValue({
                                        ...editValue,
                                        authority: option.value
                                    })}
                                    defaultValue={roles.filter(item => item.value === user.authorities[0].authority)}

                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" xs={3}>
                                <Form.Label className="text-dark ">
                                    Trạng thái hoạt động
                                </Form.Label>
                                <Select as={FormControl}

                                    key='status'
                                    options={status}

                                    onChange={(option) => setEditValue({
                                        ...editValue,
                                        enabled: option.value
                                    })}
                                    defaultValue={status.filter(item => item.value === user.enabled)}
                                // value={user.status}
                                />

                            </Form.Group>

                        </Row>
                        <Row className='editFrom__btn'>
                            <Button className='editFrom__btn--save' variant='success' onClick={() => handleSave()}>Save</Button>
                            <Button className='editFrom__btn--cancel' variant='danger' onClick={handleClose}>Cancel</Button>
                        </Row>



                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
