import React from 'react'
import { useState } from 'react';
import { Button, Col, Form, Offcanvas, Row } from 'react-bootstrap'
import './OffCanvas.scss'
export default function OffCanvasCreateSCREEN() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant='success' xs={4} className='editProduct__body__grp__btn' onClick={handleShow}>Create One</Button>
            <Offcanvas show={show} onHide={handleClose} placement='center'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fs-2 fw-bold align-self-center'>New Screen</Offcanvas.Title>

                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form as={Row} >
                        <Form.Group as={Col} xs={3} md={3}>
                            <Form.Label>Technology</Form.Label>
                            <Form.Control type='text'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={3}>
                            <Form.Label>Standard</Form.Label>
                            <Form.Control type='text'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={3}>
                            <Form.Label>Kích thước</Form.Label>
                            <Form.Control type='text'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={3}>
                            <Form.Label>Độ phân giải</Form.Label>
                            <Form.Control type='text'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={3}>
                            <Form.Label>Số lượng màu</Form.Label>
                            <Form.Control type='text'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={2}>
                            <Form.Label>Tần số quét</Form.Label>
                            <Form.Control type='number'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={7}>
                            <Form.Label>Chất liệu</Form.Label>
                            <Form.Control type='text'></Form.Control>
                        </Form.Group>

                    </Form>
                    <Row className='grpbtn'>
                        <Button className='grpbtn__save' variant='success'>Save</Button>
                        <Button className='grpbtn__clear' variant='danger'>Clear All</Button>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
