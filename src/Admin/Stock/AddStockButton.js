import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Col, Form, Offcanvas, Row } from 'react-bootstrap';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import ajax from '../../Services/fechServices';
import { useLoading } from '../../Context/LoadingContext';
import '../../Components/ErrorPage/style.css';

export default function AddStockButton({ stocks, setStocks }) {
    const loading = useLoading()
    const [stores, setStores] = useState([])
    const [chooseStore, setChooseStore] = useState('')
    const [stock, setStock] = useState({
        id: '',
        price: '',
        amount: 0,
        product: '',
        remains: ''
    })
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setStock({
            ...stock,
            id: '',
            price: '',
            amount: 0,
            product: '',
            remains: ''
        })
    };
    const handleShow = () => setShow(true);
    const handleDisplayProduct = () => {
        ajax(`/api/products/product/${stock.id}`, "GET")
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    setStock({
                        ...stock,
                        product: data,
                        remains: data.amount,
                    })
                } else {
                    alert(data.message)
                    setStock({
                        id: '',
                        price: '',
                        amount: 0,
                        product: '',
                        remains: ''
                    })
                }

            }).catch()
    }
    const handleAddStock = async () => {


        ajax(`/stock/${chooseStore}`, 'POST', loading.jwt, stock).then(async response => {
            let newStocks = await response.json()
            newStocks.sort(function (a, b) { return a.id - b.id })
            setStocks(newStocks)
            alert('Nhập kho thành công')
        })
        handleClose()
    }
    useEffect(() => {
        ajax('/stock/getAllStore').then(async response => {
            let result = await response.json()
            console.log(result)
            setStores(result)
        })
    }, [])

    return (
        <>
            <Button variant='success' style={{
                position: 'fixed',
                right: '3rem',
                bottom: '1rem',
            }} onClick={handleShow}>Nhập Kho</Button>
            <Offcanvas show={show} onHide={handleClose} placement='center'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fs-2 fw-bold align-self-center '>Nhập Kho</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form className='editForm'>
                        <Row>
                            <Form.Group as={Col} xs={12} md={6}>
                                <Form.Label>ID Input</Form.Label><br />
                                <Form.Text className="text-success">
                                    Product will auto display if ID exist
                                </Form.Text>
                                <Form.Control type="number" onChange={(e) => setStock({ ...stock, id: Number(e.target.value) })} onBlur={handleDisplayProduct} />
                            </Form.Group>

                        </Row>
                        <Row>
                            <Form.Group as={Col} xs={9} >
                                <Form.Label>Product</Form.Label><br />

                                <Form.Control type="text" plaintext readOnly value={stock.product ? stock.product.brand.name + ' ' + stock.product.model : ''} />
                            </Form.Group>
                            <Form.Group as={Col} xs={3} >
                                <Form.Label>Stock</Form.Label><br />

                                <Form.Control type="number" plaintext readOnly value={stock.remains} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} xs={12} md={4}>
                                <Form.Label>Import Price</Form.Label><br />
                                <InputGroup>
                                    <Input type="number" onChange={(e) => setStock({
                                        ...stock,
                                        price: e.target.value * 1000
                                    })} />
                                    <InputGroupText>
                                        ,000 đ
                                    </InputGroupText>
                                </InputGroup>

                            </Form.Group>
                            <Form.Group as={Col} xs={12} md={4}>
                                <Form.Label>Amount</Form.Label><br />

                                <Form.Control type="number"
                                    value={stock.amount}
                                    onChange={(e) => {
                                        setStock({
                                            ...stock,
                                            amount: e.target.value
                                        })

                                    }} />
                            </Form.Group>
                            <Form.Group as={Col} xs={12} md={4}>
                                <Form.Label>Warehouse
</Form.Label><br />

                                <Form.Select

                                    onChange={(e) => {
                                        setChooseStore(e.target.value)
                                    }}>
                                    <option></option>
                                    {
                                        stores.length ? stores.map(item => <option key={item.id} value={item.id}>{item.name}</option>) : <></>
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className='editFrom__btn'>
                            <Button className='editFrom__btn--save' variant='success' onClick={handleAddStock}>Save</Button>
                            <Button className='editFrom__btn--cancel' variant='danger' onClick={handleClose}>Cancel</Button>
                        </Row>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>

    )
}
