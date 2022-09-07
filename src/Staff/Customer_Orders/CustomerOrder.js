import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { Button, Col, Container, Form, FormGroup, Offcanvas, Row, Table } from 'react-bootstrap';
import { useLoading } from '../../Context/LoadingContext';
import './CustomerOrder.scss'
import ajax from '../../Services/fechServices';
import { STATUS_ENUM } from '../../Constants/status';
export default function CustomerOrder() {
    const loading = useLoading()
    // Waiting, Packaged, Delivering, Finish
    //status chỉ button trạng thái nào cần thêm class onSelect
    const [status, setStatus] = useState('Waiting')
    //allOrders keep track list order theo 1 trạng thái
    const [allOrders, setAllOrders] = useState([])
    const [allInvoices, setAllInvoices] = useState([])

    const [currentOrder, setCurrentOrder] = useState('')
    // lưu lại giá trị Order ban đầu, phục vụ cho button Reset
    const OrderRef = useRef('')

    // Lưu lại số lượng Order theo từng status
    const [numberOrders, setNumberOrders] = useState({
        Waiting: 21000,
        Packaged: 12000,
        Delivering: 1000,
        Finish: 1000,
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        // Xóa tất cả các class onSelect đang có
        if (document.getElementsByClassName('onSelect').length)
            document.getElementsByClassName('onSelect')[0].classList.remove('onSelect')

        let prefix = 'customer-orders__status--'

        const elements = document.getElementsByClassName(`${prefix}${status}`) || []
        // Khởi tạo ban đầu cho Button Waiting được chọn
        elements[0].classList.add('onSelect')

        //fetch order theo status
        ajax('order/customerOrders', 'GET', loading.jwt).then(async response => {
            let result = await response.json()
            if (response.status === 200) {


                const filterOrder = result.orders.filter(item => item.status === status)
                let numberWaiting = 70000
                let numberPackaged = 1000
                let numberDelivering = 12000
                let numberFinish = 23000 + result.invoices.length;
                result.orders.forEach(element => {
                    if (element.status === STATUS_ENUM.waiting) {
                        numberWaiting += 1
                    } else if (element.status === STATUS_ENUM.packaged) {
                        numberPackaged += 1
                    } else if (element.status === STATUS_ENUM.delivering) {
                        numberDelivering += 1
                    }
                })
                setNumberOrders({ ...numberOrders, Waiting: numberWaiting, Packaged: numberPackaged, Delivering: numberDelivering, Finish: numberFinish })
                setAllOrders(filterOrder)
                setAllInvoices(result.invoices)
            }

        })



    }, [status]);
    const handleChangeStatus = () => {
        if (currentOrder.status === STATUS_ENUM.finish) {
            let confirmContinue = window.confirm('Đã hoàn thành đơn hàng');
            if (!confirmContinue) return;
        }

        ajax(`/order/editStatusOrder/${currentOrder.id}/${currentOrder.status}`, 'POST', loading.jwt).then(async response => {
            let result = await response.json()
            if (response.status === 200) {
                const filterOrder = result.orders.filter(item => item.status === status)
                let numberWaiting = 70000
                let numberPackaged = 1000
                let numberDelivering = 12000
                let numberFinish = 23000 + result.invoices.length
                result.orders.forEach(element => {
                    if (element.status === STATUS_ENUM.waiting) {
                        numberWaiting += 1
                    } else if (element.status === STATUS_ENUM.packaged) {
                        numberPackaged += 1
                    } else if (element.status === STATUS_ENUM.delivering) {
                        numberDelivering += 1
                    }
                })
                setNumberOrders({ ...numberOrders, Waiting: numberWaiting, Packaged: numberPackaged, Delivering: numberDelivering, Finish: numberFinish })
                setAllOrders(filterOrder)
                setAllInvoices(result.invoices)
                alert('Trạng thái đã được cập nhật')
            } else {
                alert(result.message)
            }

            handleClose()
        })

    }


    return (
        <>
            <Container className='customer-orders'>
                <Row className='customer-orders__status'>

                    <div className='customer-orders__status--Waiting' onClick={() => setStatus('Waiting')}>
                        <div>
                            {/* Đơn hàng mới */}
                            Waiting
                        </div>

                        <div>
                            {Number(numberOrders.Waiting).toLocaleString('vn')}
                        </div>
                    </div>
                    <div className='customer-orders__status--Packaged' onClick={() => setStatus('Packaged')}>
                        <div>
                            {/* Đã đóng gói */}
                            Package
                        </div>

                        <div>
                            {Number(numberOrders.Packaged).toLocaleString('vn')}

                        </div>
                    </div>
                    <div className='customer-orders__status--Delivering' onClick={() => setStatus('Delivering')}>
                        <div>
                            {/* Đang vận chuyển */}
                            Delivery
                        </div>

                        <div>
                            {Number(numberOrders.Delivering).toLocaleString('vn')}

                        </div>
                    </div>
                    <div className='customer-orders__status--Finish' onClick={() => setStatus('Finish')}>
                        <div>
                            {/* Hoàn tất */}
                            Finish
                        </div>

                        <div>
                            {Number(numberOrders.Finish).toLocaleString('vn')}

                        </div>
                    </div>


                </Row>
                <Row>
                    <Table as={Row} striped bordered hover >
                        <thead>
                            <tr>

                                <th>User</th>
                                <th>Phone</th>
                                <th>List orders</th>

                            </tr>
                        </thead>
                        <tbody >
                            {
                                allOrders.length && status !== STATUS_ENUM.finish ? allOrders.map(item => {

                                    return <tr key={item.id} value={item.id} style={{ cursor: 'pointer' }} onClick={() => {
                                        setCurrentOrder(item)
                                        OrderRef.current = item
                                        handleShow()
                                    }}>
                                        <td>{item.deliveryName}</td>
                                        <td>{item.deliveryPhone}</td>
                                    
                                        <td>
                                            <ul style={{ listStyleType: 'none'}}>
                                                {item.orderLines.map(line => {
                                                    return <li key={line.id}>
                                                        {line.product.brand.name + ' ' + line.product.model}&emsp;{'(' + line.amount + ')'}
                                                    </li>
                                                })}
                                            </ul>

                                        </td>


                                    </tr>

                                }) : allInvoices.length && status === STATUS_ENUM.finish ?
                                    allInvoices.map(item => {

                                        return <tr key={item.id} value={item.id} style={{ cursor: 'pointer' }} onClick={() => {
                                            setCurrentOrder(item)

                                            handleShow()
                                        }}>
                                            <td>{item.deliveryName}</td>
                                            <td>{item.deliveryPhone}</td>
                                           
                                            <td>
                                                <ul style={{ listStyleType: 'none' }}>
                                                    {item.invoiceLines.map(line => {
                                                        return <li key={line.id}>
                                                            {line.product.brand.name + ' ' + line.product.model}&emsp;{'(' + line.amount + ')'}
                                                        </li>
                                                    })}
                                                </ul>

                                            </td>


                                        </tr>

                                    })
                                    : <tr><td colSpan={4} style={{ textAlign: 'center', color: 'green' }}>Order đang trống</td></tr>
                            }

                        </tbody>

                    </Table>

                </Row>
            </Container>
            <Offcanvas show={show} onHide={handleClose} placement='center'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fs-2 fw-bold align-self-center '>Chi tiết đơn hàng</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form as={Row}>
                        <Form.Group as={Col} md={4} >
                            <Form.Label>Customer</Form.Label>

                            <Form.Control type="text" value={currentOrder.deliveryName} plaintext readOnly />
                        </Form.Group>
                        <Form.Group as={Col} md={3} >
                            <Form.Label>Phone</Form.Label>

                            <Form.Control type="text" value={currentOrder.deliveryPhone} plaintext readOnly />
                        </Form.Group>
                        <Form.Group as={Col} md={5} >
                            <Form.Label>Status</Form.Label>

                            <Form.Select value={status !== STATUS_ENUM.finish && currentOrder.status ?
                                currentOrder.status : status === STATUS_ENUM.finish ? STATUS_ENUM.finish.toString() : ''}
                                disabled={status === STATUS_ENUM.finish}
                                onChange={(e) => {

                                    setCurrentOrder({
                                        ...currentOrder,
                                        status: e.target.value
                                    }
                                    )

                                }
                                }>
                                <option value={STATUS_ENUM.waiting.toString()}>Đơn hàng mới</option>
                                <option value={STATUS_ENUM.packaged.toString()}>Đã đóng gói</option>
                                <option value={STATUS_ENUM.delivering.toString()}>Đang vận chuyển</option>
                                <option value={STATUS_ENUM.finish.toString()}>Hoàn tất</option>

                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md={8} >
                            <Form.Label>Address</Form.Label>

                            <Form.Control type="text" value={currentOrder.deliveryAddress} plaintext readOnly />
                        </Form.Group>
                        <Form.Group as={Col} md={12} >
                            <Form.Label>Note</Form.Label>

                            <Form.Control as="textarea" rows={4} value={currentOrder.deliveryNote ? currentOrder.deliveryNote : 'Không có ghi chú'} plaintext readOnly />
                        </Form.Group>
                        {
                            status !== STATUS_ENUM.finish ? <Form.Group className='d-flex justify-content-end mt-3'>
                                <Button variant='success' className='mx-3' onClick={() => {
                                    handleChangeStatus()
                                }}>Save Change</Button>
                                <Button variant='danger' onClick={() => {
                                    setCurrentOrder(OrderRef.current)
                                }}>Reset</Button>

                            </Form.Group> : <></>
                        }


                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
