import React from 'react'
import { Carousel } from 'react-bootstrap'
export default function CarouselComponent() {
    return (
        <Carousel className='mb-5'>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/imgs/watch_men.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    src="/imgs/watch_3.jpg"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/imgs/watch.jpg"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}
