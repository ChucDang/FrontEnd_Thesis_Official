import React from 'react'
import { useState } from 'react';
import { Button, Col, Form, Offcanvas, Row } from 'react-bootstrap';

export default function OffCanvasCreateRAM() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant='success' xs={4} className='editProduct__body__grp__btn' onClick={handleShow}>Create One</Button>
            <Offcanvas show={show} onHide={handleClose} placement='center'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fs-2 fw-bold align-self-center'>New RAM</Offcanvas.Title>

                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form as={Row}>

                        <Form.Group as={Col} xs={3} md={4}>
                            <Form.Label>Type</Form.Label>
                            <Form.Control type='text'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={2}>
                            <Form.Label>Storage</Form.Label>
                            <Form.Control type='number'></Form.Control>
                        </Form.Group>



                    </Form>
                    <Form as={Row}>

                        <Form.Group as={Col} xs={3} md={4}>
                            <Form.Label>Hổ trợ RAM tối đa</Form.Label>
                            <Form.Control type='number'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={3} md={2}>
                            <Form.Label>Speed</Form.Label>
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
