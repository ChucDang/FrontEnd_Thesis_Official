import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import NavBarComponent from '../NavBar/NavBarComponent'
import ajax from '../../Services/fechServices';
import './OrderPage.scss'
import Loading from '../Loading/Loading';
import { useLoading } from '../../Context/LoadingContext';
import DeleteIcon from '@mui/icons-material/Delete';
export default function OrderPage() {
    const loading = useLoading();
    const [orders, setOrders] = useState([])
    useEffect(() => {
        ajax('/order', 'GET', loading.jwt).then(async (response) => {
            const result = await response.json()
            
            setOrders(result)
            loading.setIsLoading(false)
        })
    }, [])

    const handleDeleteOrder = async (idOrder) => {
        ajax(`/order/delete/${idOrder}`, 'DELETE', loading.jwt).then(async res => {
            let result = (await res.json())
            setOrders(orders.filter(item => item.id !== idOrder))
            alert(result.message)
        })
    }
    return (loading.isLoading ? (
        <Loading />
    ) : <>
        <NavBarComponent />
        <Container>
            {orders.length ? orders.map(item => {
                let total = 0
           
                return <Card as={Row} className="orderitem" key={item.id}>

                    <Card.Header className='orderitem__header'>
                        <div className='orderitem__header--name'>{item.deliveryName}</div>

                        <div className='orderitem__header--status'><Badge bg="success">{item.status}</Badge></div>

                        < DeleteIcon className='orderitem__header--icon' onClick={() => handleDeleteOrder(item.id)} />
                    </Card.Header>
                    <Card.Body className='orderitem__body'>
                        <div className='orderitem__body__deliveryInfo'>{"Địa chỉ giao: " + item.deliveryAddress} &emsp;&emsp; {'Phone: ' + item.deliveryPhone}</div>
                        {item.deliveryNote ? <div className='orderitem__body__deliveryInfo'>{'Note: ' + item.deliveryNote}</div> : <></>}


                        {item.orderLines.map(line => {

                            total = total + line.product.new_price * line.amount
                            return <>

                                <div className='orderitem__body__nameproduct'>{line.product.brand.name + ' ' + line.product.model}</div>
                                <div className='orderitem__body__info'>Số lượng: {line.amount}</div>
                                <div className='orderitem__body__info'>Tổng tiền:
                                    {' ' + Number(line.product.new_price * line.amount).toLocaleString('vn') + ' đ'}
                                </div>
                                <Card.Text className='orderitem__body__sale'>
                                    Đã áp dụng mã giảm giá 20%
                                </Card.Text>
                            </>
                        }



                        )}

                        <Row className='.d-flex justify-content-end px-5 pt-2'>Tổng cộng: {Number(total*0.8).toLocaleString('vn') + ' đ'}</Row>
                    </Card.Body>
                </Card>
            }
            )


                :
                <div className='noticeNoneValue'>Hiện tại bạn chưa có Order nào trên hệ thống</div>}
        </Container>
    </>

    )
}
