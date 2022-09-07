
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { Button, Col, Container, Form, Offcanvas, Row } from 'react-bootstrap';
import ajax from '../../Services/fechServices';
import { useLoading } from '../../Context/LoadingContext';
import '../ErrorPage/style.css';

export default function AddProductInGiftButton({ gift }) {
    const loading = useLoading()
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [optID, setOptID] = useState('')
    const listProductRef = useRef([])
    const [tempProduct, setTempProduct] = useState('')
    const [listProduct, setListProduct] = useState([])
    const handleCloseAddProduct = () => {
        setShowAddProduct(false)
        setTempProduct('')
        setOptID('')
    }
    const handleGetProduct = (id) => {
        if(id){
            ajax(`/api/products/product/${id}`).then(async response => {
                let result = await response.json()
                if (response.status === 200) {
                    setTempProduct(result)
    
                } else {
                    alert(result.message)
                    setOptID('')
                    setTempProduct('')
                }
    
    
            })
        }
       


    }

    const handleSaveListProduct = () => {
        
            ajax(`/gifts/addProductsInGift/${gift.code}`, 'POST', loading.jwt, listProduct).then(async response => {
                let result = await response.json()
    
                alert(result.message)
                handleCloseAddProduct()
            })
        
      
    }
    useEffect(() => {
        if (gift.id) {
            ajax(`/gifts/getProductsByGift/${gift.id}`, 'GET', loading.jwt).then(async response => {
                let result = await response.json()
                if (response.status === 200) {
                    setListProduct(result)
                    listProductRef.current = result
                }
                else alert(result.message)

            })

        }
    }, [])
    return (
        <>
            <Button variant='success' onClick={() => setShowAddProduct(true)} className='mx-2' >Products</Button>

            <Offcanvas show={showAddProduct} onHide={() => {
                handleCloseAddProduct()

            }} placement='center'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fs-2 fw-bold align-self-center ' >Products apply this Gift</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container>
                        <Row>
                            <Form.Group as={Col} xs={6} md={3} >
                                <Form.Label>Input ID</Form.Label><br />


                                <Form.Control type="number" value={optID ? optID : ''}
                                    onChange={(e) => setOptID(e.target.value)}
                                    onBlur={(e) => handleGetProduct(e.target.value)}
                                />

                            </Form.Group>
                            <Form.Group as={Col} xs={6} >
                                <br />


                                <Button variant='success' onClick={async () => {
                                    if(optID){
                                        let exist = listProduct.filter(item => item.id === tempProduct.id)

                                        if (exist.length === 0) {
                                            setListProduct([...listProduct, tempProduct])
    
                                        } else {
                                            alert('Product đang có trong danh sách')
                                        }
                                    }else{
                                        alert('Vui lòng nhập ID')
                                    }
                                    

                                }}>Add to List</Button>

                            </Form.Group>
                            <Form.Group as={Col} xs={12} >
                                <Form.Label>Product</Form.Label><br />


                                <Form.Control type="text" value={tempProduct ? tempProduct.brand.name + ' ' + tempProduct.model : ''} plaintext readOnly
                                />

                            </Form.Group>
                           
                        </Row>
                        <Row>
                            <Form.Group as={Col} xs={12} >
                                <Form.Label>List Product in Sale</Form.Label><br />
                                {
                                    listProduct ? listProduct.map(item => <ul key={item.id} value={item.id} onClick={() => {
                                        let copyList = [...listProduct]
                                        let result = copyList.filter(itm => itm.id !== item.id)
                                        setListProduct(result)

                                    }
                                    }>
                                        {item.brand.name + ' ' + item.model}
                                    </ul>) : <></>
                                }



                            </Form.Group>
                        </Row>
                        {
                            listProduct.length ? <Form.Group className='d-flex justify-content-end mt-3'>
                                <Button variant='success' className='mx-3'
                                    onClick={handleSaveListProduct}
                                >Save Change</Button>
                                <Button variant='danger' onClick={() => setListProduct(listProductRef.current)}>Reset</Button>

                            </Form.Group> : <></>
                        }

                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
