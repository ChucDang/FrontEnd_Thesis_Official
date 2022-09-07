
import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import './ProductItem.scss'
export default function ProductItem(props) {

    const type_display = props.type_display;
    const product = props.productProps;
    let optrender
    if (type_display === "Card") {
        optrender =
            <Card className='card_item'>
                <Card.Img className='card_item__img' variant="top" src={product.image ? `data:image/png;base64,${product.image.data}` : '/imgs/computer.png'} alt='Lỗi tải ảnh' />
                <Card.Body>
                    <Card.Title>{product.brand.name + ' ' + product.model}</Card.Title>
                    <div className='card_item__icons'>
                        <p className='card_item__icons__icon'><img src='/icons/ic_cpu.png' alt="Lỗi tải icon" className='card_item__icons__icon--width'></img> {product.cpu.version} </p>
                        <p className='card_item__icons__icon'><img src='/icons/ic_weight.png' alt="Lỗi tải icon" className='card_item__icons__icon--width'></img> {product.weight} </p>
                        <p className='card_item__icons__icon'><img src='/icons/ic_memory.png' alt="Lỗi tải icon" className='card_item__icons__icon--width'></img> {product.storage.storage} </p>
                        <p className='card_item__icons__icon'><img src='/icons/ic_size.png' alt="Lỗi tải icon" className='card_item__icons__icon--width'></img> {product.screen.size + ' inch'} </p>
                        <p className='card_item__icons__icon'><img src='/icons/ic_monitor.png' alt="Lỗi tải icon" className='card_item__icons__icon--width'></img> {product.screen.tech + ' ' + product.screen.standard} </p>
                    </div>

                    <div className='card_item__price'>
                        <p className='card_item__price--new'> {Number(product.new_price).toLocaleString('vn') + ' đ'}</p>
                        <p className='card_item__price--old'>
                            {Number(product.original_price).toLocaleString('vn') + ' đ'}
                            <label
                                className='card_item__price--old--badge'>-{Math.floor((1 - Number(product.new_price) / Number(product.original_price)) * 100)}%</label>
                        </p>

                    </div>
                    {product.gift ?
                        <>
                            <div className='card_item__gift mt-3'>
                                <ul style={{ listStyleType: 'none' }}>
                                    <li>Tặng kèm</li>
                                    {product.gift.list_gifts.split('*').map(item => <li key={item}>{item}</li>)}

                                </ul>
                            </div>
                        </> : <></>}

                    <div className='cart_item__amount'>{product.amount > 10 ? '' : product.amount <= 10 && product.amount > 0 ? `Còn ${product.amount} sản phẩm` : 'Tạm hết hàng'}</div>

                    <a href={`/products/product/${product.id}`} className="stretched-link"> </a>
                </Card.Body>

            </Card>;
    }
    else {

        optrender =
            <>
                <div className='Stack'>

                    <img src={product.image ? `data:image/png;base64,${product.image.data}` : '/imgs/computer.png'} alt="Không tải được ảnh" className='Stack__img' />
                    <div className='Stack__info'>
                        <p className='Stack__info__model'>
                            {product.brand.name + ' ' + product.model}
                        </p>
                        <p className='Stack__info__price'>
                            <p className='Stack__info__price--new'>
                                {Number(product.new_price).toLocaleString('vn') + 'đ'}
                            </p>
                            <p className='Stack__info__price--old'>
                                {Number(product.original_price).toLocaleString('vn') + 'đ'}
                            </p>
                        </p>
                    </div>
                    <a href={`/products/product/${product.id}`} className="stretched-link"> </a>

                </div>

            </>

    }
    return (
        <>{optrender}</>
    )
}
