import React, { useEffect } from 'react'
import { Navbar, Nav, Form, Badge } from 'react-bootstrap'
import { FormControl, NavDropdown, Offcanvas } from 'react-bootstrap'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LoginComponent from '../Login/LoginComponent';
import "./NavBar.scss"
import '../ErrorPage/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCartAsync } from '../../redux/cartSlice';
import { useLoading } from '../../Context/LoadingContext';


export default function NavBarComponent({ handleSearch }) {
    const dispatch = useDispatch()
    const loading = useLoading()
    const cartLines = useSelector((state) =>{ 
        if(state.cartLines)
        return state.cartLines.length
        return 0});
    useEffect(() => {
        if(loading.jwt)
		dispatch(getCartAsync({jwt: loading.jwt}));
	}, [dispatch]); 
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="xl" sticky="top">
                <Navbar.Brand href="/" className='d-flex flex-wrap'>
                    <img
                        alt="Không load được hình"
                        src="/icons/ic_store.png"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />{' '}
                    <span style={{ color: 'whitesmoke' }}>Hi-Tech</span>
                </Navbar.Brand>

                <Navbar.Toggle id="offcanvasNavbarLabel-expand-sm" />
                {/* Test Offcanvas */}
                <Navbar.Offcanvas
                    id='offcanvasNavbar-expand-sm'
                    aria-labelledby='offcanvasNavbarLabel-expand-sm'
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id='offcanvasNavbarLabel-expand-sm'>
                            Offcanvas
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/products/category/phone">Điện Thoại</Nav.Link>
                            <Nav.Link href="/products/category/laptop">Laptop</Nav.Link>
                            <Nav.Link href="/products/category/clock">Đồng Hồ</Nav.Link>
                            <NavDropdown
                                title="Phụ kiện khác"
                                id='offcanvasNavbarDropdown-expand-sm'
                            >
                                <NavDropdown.Item href="#action3">Tai nghe</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Sạc dự phòng
                                </NavDropdown.Item>

                                <NavDropdown.Item href="#action5">
                                    Dây sạc
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </Form>
                        <div className='grpiconSmall'>
                    <a href="/cart" className='grpicon__item' >
                        <LocalMallIcon />
                        <Badge bg="light" text="dark" className='grpicon__item--badge'>
                            {cartLines? cartLines: '0'}
                            
                        </Badge>
                    </a>
                    <a href="/cart" className='grpicon__item' >
                        <NotificationsIcon />
                        <Badge bg="light" text="dark" className='grpicon__item--badge'>
                            10
                        </Badge>
                    </a>
                    <a href="#link" className='grpicon__item' >
                        <MailIcon />
                        <Badge bg="light" text="dark" className='grpicon__item--badge'>
                            10
                        </Badge>
                    </a>
                    <button className='p-2' style={{ backgroundColor: 'inherit', border: 'none' }}>  <LoginComponent /></button>
                    {/* <LoginComponent /> */}
                </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

                <div className='grpicon'>
                <a href="/cart" className='grpicon__item' >
                        <LocalMallIcon />
                        <Badge bg="light" text="dark" className='grpicon__item--badge'>
                            {cartLines ? cartLines: '0'}
                            
                        </Badge>
                    </a>
                    <a href="/cart" className='grpicon__item' >
                        <NotificationsIcon />
                        <Badge bg="light" text="dark" className='grpicon__item--badge'>
                            10
                        </Badge>
                    </a>
                    <a href="#link" className='grpicon__item' >
                        <MailIcon />
                        <Badge bg="light" text="dark" className='grpicon__item--badge'>
                            10
                        </Badge>
                    </a>
                    {/* <LoginComponent /> */}
                </div>
                    <button style={{ backgroundColor: 'inherit', border: 'none' }}>  <LoginComponent /></button>
            </Navbar>

        </>


    )
}
