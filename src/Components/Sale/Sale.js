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
import './Sale.scss'
import '../ErrorPage/style.css';
import convert_vi_to_en from '../../Services/convert_vi_to_en';
import { useRef } from 'react';



export default function Sale() {
    const loading = useLoading();
    const [showCreateSale, setShowCreateSale] = useState(false);
    const [applyAll, setApplyAll] = useState(true)
    const [largerThan, setLargerThan] = useState(false)



    const [allSale, setAllSale] = useState([]);
    //allSaleRef để lưu giá trị sale ban đầu, phục vụ cho Search trên Navbar
    const allSaleRef = useRef([])
    const [sale, setSale] = useState({
        code: '',
        percentOff: '',
        larger_than: '',
        apply_all: '',
        start: '',
        end: '',

    })
    const handleCreateSale = () => {

        ajax('/sales/createSale', 'POST', loading.jwt, sale).then(async response => {
            let result = await response.json()
            if (response.status === 200) {
                setAllSale(result)
                handleCloseCreateSale()
                alert('Thêm thành công')
            } else {
                alert(result.message)
                setSale({
                    ...sale,
                    code: '',
                    percentOff: '',
                    larger_than: '',
                    apply_all: '',
                    start: '',
                    end: '',
                })
            }


        })
    }

    const handleDeleteSale = (code) => {
        ajax(`/sales/deleteSale/${code}`, 'DELETE', loading.jwt).then(async response => {
            let result = await response.json()
            if (response.status === 200) {

                setAllSale(result)
                alert('Xóa thành công')
            } else {
                alert(result.message)
            }

        })
    }
    const handleSearch = (key) => {
        console.log('key', key)
        let allSalesCopy = [...allSaleRef.current]

        let result = allSalesCopy.filter(item =>
            convert_vi_to_en(JSON.stringify(Object.values(item)).toLowerCase())
                .includes(convert_vi_to_en(key.toLowerCase())) === true)

        if (result) {
            setAllSale(result)
        }

    }
    const handleCloseCreateSale = () => {
        setShowCreateSale(false)
        setSale({
            ...sale,
            code: '',
            percentOff: '',
            larger_than: '',
            apply_all: '',
            start: '',
            end: '',


        })

    }
    useEffect(() => {
        ajax('/sales', 'GET', loading.jwt).then(async response => {
            let result = await response.json()
            setAllSale(result)
            allSaleRef.current = result
        })
    }, [])
    useEffect(() => {
        if (applyAll)
            setSale({ ...sale, apply_all: applyAll, larger_than: null })
        else
            setSale({ ...sale, apply_all: applyAll })
    }, [applyAll])
    return (
        <>
            <Button variant='success' style={{
                position: 'fixed',
                right: '3rem',
                bottom: '1rem',
            }} onClick={() => setShowCreateSale(true)}>Add Sale</Button>

            <Offcanvas show={showCreateSale} onHide={() => {
                handleCloseCreateSale()
                setSale({
                    ...sale,
                    code: '',
                    percentOff: '',
                    larger_than: '',
                    apply_all: '',
                    start: '',
                    end: '',

                })
            }} placement='center'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fs-2 fw-bold align-self-center '>New Sale</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form className='editForm'>
                        <Row>
                            <Form.Group as={Col} xs={12} md={6}>
                                <Form.Label>GiftCode</Form.Label><br />


                                <Form.Control type="text" style={{ textTransform: 'uppercase' }}
                                    value={sale.code}
                                    onChange={(e) => setSale({ ...sale, code: e.target.value })}
                                />

                            </Form.Group>

                            <Form.Group as={Col} xs={6} md={4} >
                                <Form.Label>Percent Off</Form.Label><br />
                                <InputGroup>
                                    <Input type="number" value={sale.percentOff} onChange={(e) => setSale({ ...sale, percentOff: e.target.value })} />
                                    <InputGroupText>
                                        %
                                    </InputGroupText>
                                </InputGroup>

                            </Form.Group>

                        </Row>

                        <Row>
                            <Form.Group as={Col} xs={3} md={2}>
                                <Form.Label>Enable</Form.Label><br />
                                <Form.Switch className='mt-2' checked={applyAll} onChange={(e) => {

                                    setApplyAll(e.target.checked)
                                    setLargerThan(!e.target.checked)
                                }} />
                            </Form.Group>
                            <Form.Group as={Col} xs={7} md={6}>
                                <Form.Label>Policy</Form.Label><br />
                                <Form.Control type='text' value="Apply all Order" plaintext readOnly />
                            </Form.Group>

                        </Row>
                        <Row>
                            <Form.Group as={Col} xs={3} md={2}>

                                <Form.Switch className='mt-2' checked={largerThan} onChange={(e) => {

                                    setApplyAll(!e.target.checked)
                                    setLargerThan(e.target.checked)

                                }} />
                            </Form.Group>
                            <Form.Group as={Col} xs={7} md={6} >

                                <Form.Control type='text' value="Total Bill Larger" plaintext readOnly />
                            </Form.Group>
                            {
                                largerThan ? <Form.Group as={Col} xs={12} md={4} >

                                    <InputGroup>
                                        <Input type="number"
                                            value={sale.larger_than ? sale.larger_than / 1000 : ''}
                                            onChange={(e) => {

                                                setSale({ ...sale, apply_all: false, larger_than: 1000 * Number(e.target.value) })
                                            }}
                                        />
                                        <InputGroupText>
                                            ,000 vnđ
                                        </InputGroupText>
                                    </InputGroup>
                                </Form.Group> : <></>
                            }

                        </Row>

                        <Form.Group as={Row} className='d-flex'>
                            <Row as={Col} xs={4}>
                                <Form.Label>Start</Form.Label><br />

                                <Form.Control type="date" value={sale.start ? sale.start : ''} onChange={(e) => setSale({ ...sale, start: e.target.value })} />

                            </Row>
                            <Row as={Col} xs={4}>
                                <Form.Label>Finish</Form.Label><br />

                                <Form.Control type="date" value={sale.end ? sale.end : ''} onChange={(e) => setSale({ ...sale, end: e.target.value })} />

                            </Row>
                        </Form.Group>


                        <Row className='editFrom__btn'>
                            <Button className='editFrom__btn--save' variant='success' onClick={() => handleCreateSale()}>Save</Button>
                            <Button className='editFrom__btn--cancel' variant='danger' onClick={handleCloseCreateSale}>Cancel</Button>
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

                        <th>GiftCode</th>
                        <th>Policy</th>
                        <th>Time Remain</th>

                        <th>Task</th>
                    </tr>
                </thead>
                <tbody >
                    {allSale ? allSale.map(item => {
                        let today = new Date()
                        var diff = new Date(Date.parse(item.end) - today);


                        var days = diff.getUTCDate(); // Gives day count of difference  

                        return <tr key={item.code}>
                            <td style={{ textTransform: 'uppercase' }}>{item.code}</td>
                            <td>
                                {item.larger_than ? 'Hóa đơn từ ' + Number(item.larger_than).toLocaleString('vn') + ' đ' : 'Hóa đơn từ 0đ'}

                            </td>
                            <td>{'Còn ' + days + ' ngày'}</td>

                            <td>

                                <Button variant='danger' onClick={() => handleDeleteSale(item.code)}>Delete</Button>
                            </td>
                        </tr>
                    }) : <></>}
                </tbody>
            </Table>


        </>
    )
}
