import React from 'react'
import { useState } from 'react';
import { Button, Col, Form, Offcanvas, Row } from 'react-bootstrap'
import './OffCanvas.scss'
export default function OffCanvasCreateCPU() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant='success' xs={4} className='editProduct__body__grp__btn' onClick={handleShow}>Create One</Button>
            <Offcanvas show={show} onHide={handleClose} placement='center'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fs-2 fw-bold align-self-center'>New CPU</Offcanvas.Title>

                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row className='note text-success'>
                        Cả 3 trường: Brand, Version và Type đã có trong hệ thống thì các trường còn lại sẽ tự điền.
                    </Row>
                    <Form as={Row} >

                        <Form.Group as={Col} xs={3} md={3}>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={3}>
                            <Form.Label>Version</Form.Label>
                            <Form.Control type='text'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={3}>
                            <Form.Label>Type</Form.Label>
                            <Form.Control type='text'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={2}>
                            <Form.Label>Buffer</Form.Label>
                            <Form.Control type='number'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={2}>
                            <Form.Label>Bus</Form.Label>
                            <Form.Control type='number'></Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} xs={3} md={2}>
                            <Form.Label>Core</Form.Label>
                            <Form.Control type='number'></Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} xs={3} md={2}>
                            <Form.Label>Thread</Form.Label>
                            <Form.Control type='number'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={2}>
                            <Form.Label>Speed</Form.Label>
                            <Form.Control type='text'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={3}>
                            <Form.Label>Max Speed</Form.Label>
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
