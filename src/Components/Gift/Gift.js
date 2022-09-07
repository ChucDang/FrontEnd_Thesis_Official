import React, { useEffect } from 'react'
import { useLoading } from '../../Context/LoadingContext';
import NavBarComponent from '../NavBar/NavBarComponent';
import StaffNavbar from '../../Staff/Components/StaffNavbar';
import { ROLE_ENUM } from '../../Constants/roles';
import ADNavbar from '../../Admin/Components/NavBar/ADNavbar';
import { Button, Col, Container, Form, Offcanvas, Row, Table } from 'react-bootstrap';
import { useState } from 'react';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import ajax from '../../Services/fechServices';
import './Gift.scss'
import '../ErrorPage/style.css';
import convert_vi_to_en from '../../Services/convert_vi_to_en';
import { useRef } from 'react';
import AddProductInGiftButton from './AddProductInGiftButton';



export default function Gift() {
    const loading = useLoading();
    const [showCreateGift, setShowCreateGift] = useState(false);
    const [allGift, setAllGift] = useState([]);
    //allGiftRef để lưu giá trị Gift ban đầu, phục vụ cho Search trên Navbar
    const allGiftRef = useRef([])
    const [gift, setGift] = useState({
        code: '',
        start: '',
        end: '',
        list_gifts: ''
    })
    const handleCreateGift = () => {

        ajax('/gifts/createAGift', 'POST', loading.jwt, gift).then(async response => {
            let result = await response.json()
            if (response.status === 200) {
                let allGiftCopy = [...allGift]
                allGiftCopy.push(result)
                setAllGift(allGiftCopy)
                handleCloseCreateGift()
                alert('Thêm Gift thành công')

            } else {
                alert(result.message)

            }

        })
    }

    const handleDeleteGift = (code) => {
        ajax(`/gifts/deleteAGift/${code}`, 'DELETE', loading.jwt).then(async response => {
            let result = await response.json()
            if (response.status === 200) {
                let allGiftCopy = allGift.filter(item => item.code !== code)
                setAllGift(allGiftCopy)
                alert("Xóa Gift thành công")
            
            } else {
                alert(result.message)
            }


        })
    }
    const handleSearch = (key) => {

        let allGiftsCopy = [...allGiftRef.current]

        let result = allGiftsCopy.filter(item =>
            convert_vi_to_en(JSON.stringify(Object.values(item)).toLowerCase())
                .includes(convert_vi_to_en(key.toLowerCase())) === true)

        if (result) {
            setAllGift(result)
        }

    }

    const handleCloseCreateGift = () => {
        setShowCreateGift(false)
        setGift({
            ...gift,
            code: '',
            start: '',
            end: '',
            list_gifts: ''
        })
    }
    useEffect(() => {

        ajax('/gifts', 'GET', loading.jwt).then(async response => {
            let result = await response.json()
            setAllGift(result)
            allGiftRef.current = result
        })
    }, [])
    return (
        <>
            <Button variant='success' style={{
                position: 'fixed',
                right: '3rem',
                bottom: '1rem',
            }} onClick={() => setShowCreateGift(true)}>Add Gift</Button>

            <Offcanvas show={showCreateGift} onHide={() => {
                handleCloseCreateGift()

            }} placement='center'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fs-2 fw-bold align-self-center '>New Gift</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form className='editForm'>

                        <Row>
                            <Form.Group>
                                <Form.Label>Mã chương trình</Form.Label><br />

                                <Form.Control type='text' value={gift.code ? gift.code : ''}
                                    onChange={(e) => setGift({ ...gift, code: e.target.value })}
                                    style={{ textTransform: 'uppercase' }}
                                />

                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Quà tặng kèm</Form.Label><br />
                                <Form.Text style={{ fontSize: 'smaller', color: 'red' }}>Mỗi mục quà cách nhau bằng ký tự &emsp; *</Form.Text><br />
                                <Form.Text style={{ fontSize: 'smaller', color: 'green' }}>Example: Tai nghe Bluetooth G63*Tấm lót chuột Sky Mine</Form.Text>

                                <Form.Control as="textarea" rows={2}
                                    value={gift.list_gifts ? gift.list_gifts : ''}
                                    onChange={(e) => setGift({ ...gift, list_gifts: e.target.value })}
                                />

                            </Form.Group>
                        </Row>

                        <Form.Group as={Row} className='d-flex'>
                            <Row as={Col} xs={12}>
                                <Form.Label>Start</Form.Label><br />

                                <Form.Control type="date" value={gift.start ? gift.start : ''} onChange={(e) => setGift({ ...gift, start: e.target.value })} />

                            </Row>
                            <Row as={Col} xs={12}>
                                <Form.Label>Finish</Form.Label><br />

                                <Form.Control type="date" value={gift.end ? gift.end : ''} onChange={(e) => setGift({ ...gift, end: e.target.value })} />

                            </Row>
                        </Form.Group>


                        <Row className='editFrom__btn'>
                            <Button className='editFrom__btn--save' variant='success' onClick={() => handleCreateGift()}>Save</Button>
                            <Button className='editFrom__btn--cancel' variant='danger' onClick={handleCloseCreateGift}>Cancel</Button>
                        </Row>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
            {
                loading.user && loading.user.authorities[0].authority === ROLE_ENUM.ADMIN ?
                    <ADNavbar handleSearch={handleSearch} /> : loading.user && loading.user.authorities[0].authority === ROLE_ENUM.STAFF ?
                        <StaffNavbar handleSearch={handleSearch} /> : <NavBarComponent handleSearch={handleSearch} />
            }

            <Table striped bordered hover className='allSale'>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>List Gifts</th>
                        <th>Time Remain</th>

                        <th>Task</th>
                    </tr>
                </thead>
                <tbody >

                    {allGift.length > 0 ? allGift.map(item => {
                        let today = new Date()
                        var diff = new Date(Date.parse(item.end) - today);


                        var days = diff.getUTCDate(); // Gives day count of difference  

                        const list_gifts = item.list_gifts.split("*")

                        return <tr key={item.code}>
                            <td style={{ textTransform: 'uppercase' }}>{item.code}</td>
                            <td>
                                <ul style={{ listStyleType: 'none' }}>
                                    {list_gifts.map(gift => <li key={gift}>{gift}</li>)}
                                </ul>

                            </td>

                            <td>{days + ' ngày'}</td>



                            <td>
                                <   AddProductInGiftButton gift={item} />
                                <Button variant='danger' onClick={() => handleDeleteGift(item.code)} className='mx-2'
                                >Delete</Button>
                            </td>
                        </tr>
                    }) : <></>}
                </tbody>
            </Table>


        </>
    )
}
