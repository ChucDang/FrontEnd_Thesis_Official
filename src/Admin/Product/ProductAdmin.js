import React, { useEffect, useRef } from 'react'
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap'
import { Input } from 'reactstrap'
import ADNavbar from '../Components/NavBar/ADNavbar'
import './ProductAdmin.scss'
import ajax from '../../Services/fechServices';
import { useState } from 'react'
import convert_vi_to_en from '../../Services/convert_vi_to_en'
import EditProductAdmin from './EditProductAdmin'
import { Navigate, useNavigate } from 'react-router-dom'
import { useLoading } from '../../Context/LoadingContext';
import { Link } from '@mui/icons-material';
import { ResetTvOutlined } from '@mui/icons-material'
export default function ProductAdmin() {
    const loading = useLoading()
    const navigate = useNavigate()
    const [allProducts, setAllProducts] = useState([])
    const allProductsRef = useRef([])
    // Lưu ý, price, amortization,amortization,display khi onChange không nên chuyển sang Boolean
    // Vì giá trị false và null hay '' .. là như nhau.
    const [filter, setFilter] = useState({
        category: '',
        brand: '',
        price: '',
        amortization: null,
        display: null,
        remains: null
    })
    //Đây là giá trị cho filters
    const filterRef = useRef()
    useEffect(() => {
        if (Object.keys(filter).some(k => filter[k])) {
            let allProductCopy = [...allProductsRef.current]
            let result = []
            result = allProductCopy
                //Lọc theo category
                .filter(item =>
                    (filter.category && item.brand.category.code === filter.category)
                    || !filter.category)
                //Lọc theo brand
                .filter(item =>
                    (filter.brand && item.brand.name === filter.brand)
                    || !filter.brand)
                //Lọc theo hiển thị
                .filter(item =>
                    (filter.display !== null && item.display === JSON.parse(filter.display))
                    || filter.display === null)
                //Lọc theo hổ trợ trả góp
                .filter(item =>
                    (filter.amortization !== null && item.amortization === JSON.parse(filter.amortization))
                    || filter.amortization === null)
                //Lọc theo còn hàng
                .filter(item =>
                    (filter.remains !== null && Boolean(item.amount) === JSON.parse(filter.remains))
                    || filter.remains === null)
            //Lọc theo giá tăng giảm
            if (filter.price === 'true') {

                result.sort(function (a, b) { return a.new_price - b.new_price })
            } else if (filter.price === 'false') {

                result.sort(function (a, b) { return b.new_price - a.new_price })

            }
            setAllProducts(result)


        }
        //Phải có những dependency sau, nếu không sẽ gây ra vòng lặp vô tận
        //trong một useEffect, chỉ được sử dụng duy nhất một setAllProducts
        // Vì set giá trị xong nó sẽ bị rerender, gây ra lỗi ở set thứ 2
    }, [filter.brand, filter.category, filter.display, filter.price, filter.remains, filter.amortization, allProducts.length])

    //optBrands là danh sách brand theo category
    const [optBrands, setOptBrands] = useState([])
    const handleSearch = (key) => {
        let listCopy = [...allProductsRef.current]

        let result = listCopy.filter(item =>
            convert_vi_to_en(JSON.stringify(Object.values(item)).toLowerCase())
                .includes(convert_vi_to_en(key.toLowerCase())) === true)

        if (result) {
            setAllProducts(result)
        }

    }
    useEffect(() => {
        ajax('/api/products/allProducts', 'GET').then(async response => {
            let result = await response.json()
            console.log('result', result)
            setAllProducts(result)
            allProductsRef.current = result
            loading.setIsLoading(false)
        })
    }, [])

    const handleGetBrand = (code) => {
        ajax(`/categories/${code}`, 'GET').then(async response => {
            let result = await response.json()
            setOptBrands(result.brands)
        })
    }


    return (
        <>
            <ADNavbar handleSearch={handleSearch} />

            <Button variant='success' onClick={() => navigate(`/admin/product/create/new`)}
                style={{
                    position: 'fixed',
                    right: '3rem',
                    bottom: '1rem',
                }}
            >Add Product</Button>
            <Container className='listProducts' fluid>
                <Row className='listProducts__nav my-2'>
                    <Form.Group as={Col} sm={4} md={2}>
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            key={`category`}
                            value={filter.category}
                            onChange={(e) => {
                                setFilter({ ...filter, category: e.target.value })
                                handleGetBrand(e.target.value)
                            }}>
                            <option></option>
                            <option value="phone">Phone</option>
                            <option value="laptop">Laptop</option>
                            <option value="clock">Đồng hồ</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} sm={4} md={2} >
                        <Form.Label>Brand</Form.Label>
                        <Form.Select
                            disabled={optBrands === []}
                            value={filter.brand}
                            onChange={(e) => {
                                setFilter({ ...filter, brand: e.target.value })
                            }}
                        >
                            <option></option>
                            {optBrands ? optBrands.map(item => <option key={item.name} value={item.name}>{item.name}</option>)
                                : <></>}

                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} sm={4} md={2}>
                        <Form.Label>Price</Form.Label>
                        <Form.Select
                            onChange={async (e) => {
                                setFilter({ ...filter, price: e.target.value })
                            }}
                            value={filter.price}>
                            <option></option>

                            <option value={true}>Tăng dần</option>
                            <option value={false}>Giảm dần</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} sm={4} md={3}>
                        <Form.Label>Filters</Form.Label>
                        <Form.Select

                            onChange={async (e) => {
                                // Lưu ý cú pháp { ...filter } do filter là object nên không gán là [{ ...filter }]

                                let FilterCopy = { ...filter }
                                FilterCopy['display'] = null
                                FilterCopy['remains'] = null
                                FilterCopy['amortization'] = null
                                let [key, value] = e.target.value.split('_')
                                filterRef.current = key
                                FilterCopy[key] = value
                                setFilter({ ...FilterCopy })

                            }}


                        >
                            <option></option>

                            <option key='display' value='display_true'
                            >Hiển thị</option>
                            <option value='display_false'>Ẩn</option>
                            <option value='amortization_true'>Trả góp</option>
                            <option value='amortization_false'>Không trả góp</option>
                            <option value='remains_true'>Còn hàng</option>
                            <option value='remains_false'>Hết hàng</option>
                        </Form.Select>

                    </Form.Group>
                    <Form.Group as={Col} xs={3}>

                        <Button variant='secondary' className='mt-4' onClick={() => {
                            // dùng reload window chứ không setFilter lại là vì chỉ set được trừ Fitlers thôi
                            // Không thêm value vào Select của Filters được
                            window.location.reload()

                        }

                        }>Clear</Button>

                    </Form.Group>

                </Row>
                {
                    allProducts ?

                        <Table as={Row} striped bordered hover >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product</th>
                                    <th>Image</th>

                                    <th>Price</th>
                                    <th>Display</th>
                                    <th>Amortization</th>
                                    <th>Tasks</th>

                                </tr>
                            </thead>
                            <tbody >
                                {allProducts.map(item => {

                                    return <tr key={'product' + item.id + 'price' + item.price}>
                                        <td>{item.id}</td>
                                        <td>{item.brand.name + ' ' + item.model + ' ' + item.cpu.version + ' ' +
                                            item.ram.storage + 'GB'}</td>
                                        <td>
                                            {
                                                item.image ? <img src={`data:image/png;base64,${item.image.data}`} alt='Loading' width={150} />
                                                    : <img src='/imgs/computer.png' width={150} />
                                            }

                                        </td>
                                        {/* <td> {Number(item.original_price).toLocaleString('vn') + ' đ'}</td> */}
                                        <td> {Number(item.new_price).toLocaleString('vn') + ' đ'}</td>
                                        <td>{item.display ? 'Yes' : 'No'}</td>
                                        <td>{item.amortization ? 'Support' : 'No'}</td>
                                        <td>
                                            <Button variant='success' onClick={() => navigate(`/admin/product/create/${item.id}`)}>Edit</Button>
                                        </td>
                                    </tr>
                                })}


                            </tbody>
                        </Table>



                        : <></>
                }
            </Container>
        </>
    )
}
