import React, { useEffect, useState } from 'react'
import { Container, Row, Table } from 'react-bootstrap';
import ajax from '../../Services/fechServices';
import { useLoading } from '../../Context/LoadingContext';
import ADNavbar from '../Components/NavBar/ADNavbar';
import AddStockButton from './AddStockButton';
import { InputGroup, Input } from 'reactstrap';
import { useRef } from 'react';
import convert_vi_to_en from '../../Services/convert_vi_to_en';
import StaffNavbar from '../../Staff/Components/StaffNavbar';
import { ROLE_ENUM } from '../../Constants/roles';
import '../../Components/ErrorPage/style.css';
import { SyncOutlined } from '@mui/icons-material';

export default function StockComponent() {
    const loading = useLoading()

    const [stocks, setStocks] = useState([])
    const allStocks = useRef([])
    const handleSearch = (key) => {
        let stocksCopy = [...allStocks.current]

        let result = stocksCopy.filter(item =>
            convert_vi_to_en(JSON.stringify(Object.values(item)).toLowerCase())
                .includes(convert_vi_to_en(key.toLowerCase())) === true)

        if (result) {
            setStocks(result)
        }

    }
    useEffect(() => {
        ajax('/stock', 'GET', loading.jwt).then(async response => {
            let result = await response.json()
            result.sort(function (a, b) { return a.product.id - b.product.id })
            setStocks(result)
            allStocks.current = result;
        })
    }, [])

    return (
        <>
            {
                loading.user && loading.user.authorities[0].authority === ROLE_ENUM.ADMIN ?
                    <ADNavbar handleSearch={handleSearch} /> :
                    <StaffNavbar handleSearch={handleSearch} />
            }

            <AddStockButton stocks={stocks} setStocks={setStocks} />
            {
                stocks ? <>
                    <Container className='listUser' fluid>



                        <Table as={Row} striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Kho</th>
                                    <th>Amount</th>

                                </tr>
                            </thead>
                            <tbody>
                                {stocks ? stocks.map(item => {
                                    console.log(item)
                                    return <tr key={'product' + item.id + 'price' + item.price}>
                                        <td>{item.product.id}</td>
                                        <td>{item.product.brand.name + ' ' + item.product.model}</td>
                                        <td> {Number(item.price).toLocaleString('vn') + ' đ'}</td>
                                        <td>{item.stores.name}</td>
                                        <td>
                                            {item.amount}
                                        </td>
                                    </tr>
                                }) : <></>}


                            </tbody>
                        </Table>

                    </Container>
                </> : <></>

            }

        </>

    )
}
