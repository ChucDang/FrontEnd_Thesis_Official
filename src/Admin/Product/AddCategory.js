import React, { useRef } from 'react'
import { useState } from 'react';
import { Button, Col, Form, Offcanvas, Row } from 'react-bootstrap'
import '../../Components/ErrorPage/style.css';
import ajax from '../../Services/fechServices';

export default function AddCategory({ show, handleClose, optCategory, setOptCategory, setChooseCategory, handleGetBrands }) {
    const [newCategory, setNewCategory] = useState({
        code: '',
        name: '',

    })
    const [existCategory, setExistCategory] = useState('')
    const [newBrand, setNewBrand] = useState('')
    //Brand đã được lưu thì không thể xóa được.
    //Gồm brand cũ và mới để khi add new brand thì check có hay chưa
    const [allListBrand, setAllListBrand] = useState([])
    const allListBrandRef = useRef()
    //Chỉ gồm brand mới (chưa lưu vào database) để pass đến Server yêu cầu lưu lại
    const [newListBrand, setNewListBrand] = useState([])


    const handleGetCategory = () => {

        if (newCategory.code) {
            ajax(`/categories/checkExist/${newCategory.code}`).then(async response => {
                if (response.status === 200) {
                    let result = await response.json()

                    setExistCategory(result.category)

                    setAllListBrand(result.brands)
                    allListBrandRef.current = result.brands


                }

            })

        }
    }
    const handleSaveChange = () => {


        let formData = new FormData()

        formData.append('category', JSON.stringify(newCategory))
        formData.append('brands', JSON.stringify(newListBrand))
        fetch('/categories/addNewCategory', {
            method: 'POST',
            body: formData

        }).then(async response => {


            if (response.status === 200) {
                let result = await response.json()
                console.log('result', result)
                setChooseCategory(result.code)

                let copy = [...optCategory]
                copy.push(result)
                setOptCategory(copy)
                handleGetBrands(result.code)
                alert("Thêm thành công")

            } else {
                console.log(response)
            }

            handleClose()
        })
    }

    return (
        <>
            <option style={{ color: '#e1dee6', backgroundColor: '#234c63' }} value='new'>Create One</option>
            <Offcanvas show={show} onHide={handleClose} placement='center'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fs-2 fw-bold align-self-center '>New Category</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form>
                        <Form.Group as={Col} xs={6} >

                            <Form.Text className='text-success'>Nếu mã tồn tại, hệ thống sẽ hiện lên danh sách Brand</Form.Text>

                        </Form.Group>
                        <Row>
                            <Form.Group as={Col} xs={4} >
                                <Form.Label>Code</Form.Label><br />
                                <Form.Control type="text" name='code' value={newCategory.code ? newCategory.code : ''}
                                    onChange={(e) => {
                                        setNewCategory({ ...newCategory, code: e.target.value, name: '' })
                                        setExistCategory('')
                                        setAllListBrand([])
                                    }}
                                    onBlur={() =>
                                        handleGetCategory()
                                    } />
                            </Form.Group>
                            <Form.Group as={Col} xs={4} >
                                <Form.Label>Name</Form.Label>

                                <Form.Control type="text" name='name' value={newCategory.name ? newCategory.name : existCategory.name ? existCategory.name : ''}
                                    onChange={(e) => {
                                        setNewCategory({ ...newCategory, name: e.target.value })
                                    }}
                                    readOnly={existCategory.id ? true : false} />
                            </Form.Group>


                        </Row>
                        {newCategory.name || existCategory.name ?
                            <>
                                <Row>
                                    <Form.Group as={Col} xs={4} >
                                        <Form.Label>New Brand</Form.Label><br />
                                        <Form.Control type="text" onChange={(e) => setNewBrand(
                                            e.target.value
                                        )} />
                                    </Form.Group>


                                    <Form.Group as={Col} xs={4} >

                                        <Button variant='success' style={{ width: '5rem ' }} className='mt-4' onClick={() => {
                                            let listBrandCopy = [...allListBrand]
                                            let compare = listBrandCopy.find(item => {

                                                return item.toLowerCase() === newBrand.toLowerCase()
                                            })
                                            if (compare) {

                                                alert('Brand đã tồn tại trong list')
                                            } else {

                                                listBrandCopy.push(newBrand)
                                                let listCopy = [...newListBrand];
                                                listCopy.push(newBrand)
                                                setNewListBrand(listCopy)
                                                setAllListBrand(listBrandCopy)
                                            }
                                        }} >Add</Button>

                                    </Form.Group>
                                </Row>
                                <Row className='mt-4'>
                                    <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                                        {allListBrand.map(item => <li key={item} style={{ minWidth: '25%', textTransform: 'capitalize' }}>{item}</li>)}


                                    </ul>

                                </Row>
                                <Row className='d-flex justify-content-end mt-3'>
                                    <Button style={{ width: '10rem' }}
                                        onClick={() => {



                                            handleSaveChange()
                                        }}
                                        variant='success'>Save Change</Button>
                                    <Button className='ms-3' style={{ width: '10rem' }} variant='danger'
                                        onClick={() => setAllListBrand(allListBrandRef.current)}
                                    >Reset</Button>

                                </Row>
                            </> : <></>
                        }

                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
