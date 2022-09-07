
import React from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap';

export default function ProductTab({ product }) {
    let features
    if (product) {
        features = product.feature.split('*')
    }
    return (
        <Container className='product-tab'>
            {product ?
                <>
                    <Row className='product-tab__2col' >
                        <label className='product-tab__2col--item'>Thương hiệu: {product.brand.name}</label>
                        <label className='product-tab__2col--item'>Xuất xứ: {product.origin}</label>
                        <label className='product-tab__2col--item'>Bảo hành : {product.warranty} tháng</label>
                        <label className='product-tab__2col--item'>Thời điểm ra mắt: {product.release_date}</label>
                    </Row>
                    <div className='product-tab--head'>Bộ xử lý</div>
                    <Row className='product-tab__1col'>
                        <Col>
                            <Table >
                                <tbody>
                                    <tr>
                                        <td className='product-tab__1col--item'>Hãng</td>
                                        <td className='product-tab__1col--item'>{product.cpu.brand}</td>
                                    </tr>
                                    <tr>
                                        <td className='product-tab__1col--item'>Công nghệ</td>
                                        <td className='product-tab__1col--item'>{product.cpu.version}</td>
                                    </tr>
                                    <tr>
                                        <td className='product-tab__1col--item'>Loại</td>
                                        <td className='product-tab__1col--item'>{product.cpu.type}</td>
                                    </tr>
                                    <tr>
                                        <td className='product-tab__1col--item'>Số nhân</td>
                                        <td className='product-tab__1col--item'>{product.cpu.core}</td>
                                    </tr>
                                    <tr>
                                        <td className='product-tab__1col--item'>Số luồng</td>
                                        <td className='product-tab__1col--item'>{product.cpu.thread}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <Table >
                                <tbody>
                                    <tr>
                                        <td className='product-tab__1col--item'>Tốc độ</td>
                                        <td className='product-tab__1col--item'>{product.cpu.speed}  GHz</td>
                                    </tr>
                                    <tr>
                                        <td className='product-tab__1col--item'>Tốc độ tối đa</td>
                                        <td className='product-tab__1col--item'>{product.cpu.max_speed}  GHz</td>
                                    </tr>
                                    <tr>
                                        <td className='product-tab__1col--item'>Hổ trợ 64bit</td>
                                        <td className='product-tab__1col--item'>{product.cpu.sp_64bits ? 'Có' : 'Không'}</td>
                                    </tr>
                                    <tr>
                                        <td className='product-tab__1col--item'>Bộ nhớ đệm</td>
                                        <td className='product-tab__1col--item'>{product.cpu.buffer} MB</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>


                    </Row>
                    <div className='product-tab--head'>RAM</div>
                    <Row className='product-tab__1col'>
                        <Col>
                            <Table >
                                <tbody>
                                    <tr>
                                        <td className='product-tab__1col--item'>Loại</td>
                                        <td className='product-tab__1col--item'>{product.ram.type}</td>
                                    </tr>
                                    <tr>
                                        <td className='product-tab__1col--item'>Dung Lượng</td>
                                        <td className='product-tab__1col--item'>{product.ram.storage} GB</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <Table >
                                <tbody>
                                    <tr>
                                        <td className='product-tab__1col--item'>Tốc độ</td>
                                        <td className='product-tab__1col--item'>{product.ram.speed} MHz</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>


                    </Row>
                    <div className='product-tab--head'>Bộ nhớ trong</div>
                    <Row className='product-tab__1col'>
                        <Col>
                            <Table >
                                <tbody>
                                    <tr>
                                        <td className='product-tab__1col--item'>Loại</td>
                                        <td className='product-tab__1col--item'>{product.storage.type}</td>
                                    </tr>
                                    <tr>
                                        <td className='product-tab__1col--item'>Phiên bản</td>
                                        <td className='product-tab__1col--item'>{product.storage.code}</td>
                                    </tr>
                                    <tr>
                                        <td className='product-tab__1col--item'>Dung lượng</td>
                                        <td className='product-tab__1col--item'>{product.storage.storage}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <Table >
                                <tbody>
                                    <tr>
                                        <td className='product-tab__1col--item'>Số khe cắm</td>
                                        <td className='product-tab__1col--item'>{product.slot}</td>
                                    </tr>
                                    <tr>
                                        <td className='product-tab__1col--item'>Còn lại</td>
                                        <td className='product-tab__1col--item'>{product.remainSlot}</td>
                                    </tr>  <tr>
                                        <td className='product-tab__1col--item'>Hổ trợ Optane</td>
                                        <td className='product-tab__1col--item'>{product.storage.optane ? 'Có' : 'Không'}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>


                    </Row>
                    <div className='product-tab--head'>Tính năng</div>
                    <Row className='product-tab__2col' >
                        {
                            features.map(feature => {
                                return <label className='product-tab__2col--item'> {feature}</label>
                            }
                            )
                        }
                    </Row>
                </> : <></>
            }
            {/* <Row Row className='product-tab__2col' >
                <p> Thương hiệu: {product.brand}</p>
                <p> Xuất xứ: {product.origin}</p>
                <p>Bảo hành : {product.warranty} tháng</p>
                <p>Thời điểm ra mắt: {product.release_date}</p>
            </Row> */}

        </ Container >

    )
}
