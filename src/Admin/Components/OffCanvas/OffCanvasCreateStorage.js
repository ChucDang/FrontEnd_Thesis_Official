import React from 'react'
import { useState } from 'react';
import { Button, Col, Form, Offcanvas, Row } from 'react-bootstrap'
import './OffCanvas.scss'
export default function OffCanvasCreateStorage() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant='success' xs={4} className='editProduct__body__grp__btn' onClick={handleShow}>Create One</Button>
            <Offcanvas show={show} onHide={handleClose} placement='center'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fs-2 fw-bold align-self-center'>New Storage</Offcanvas.Title>

                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form as={Row} >

                        <Form.Group as={Col} xs={3} md={3}>
                            <Form.Label>Type</Form.Label>
                            <Form.Select

                            >
                                <option></option>
                                <option value="HDD">HDD</option>
                                <option value="SSD">SSD</option>



                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={3}>
                            <Form.Label>Code</Form.Label>
                            <Form.Control type='text'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={3}>
                            <Form.Label>Support Optane</Form.Label>
                            <Form.Select

                            >
                                <option></option>
                                <option value="true">Support</option>
                                <option value="false">No</option>



                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={5}>
                            <Form.Label>Dung lượng lưu trữ</Form.Label>
                            <Form.Control type='number'></Form.Control>
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
