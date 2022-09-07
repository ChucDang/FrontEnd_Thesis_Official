import React, { useEffect } from 'react'
import { useLoading } from '../../../Context/LoadingContext';
import { Badge, Dropdown, DropdownButton, Form, FormControl, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { useLocalState } from '../../../Services/useLocalStorage';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { ROLE_ENUM } from '../../../Constants/roles';
import convert_vi_to_en from '../../../Services/convert_vi_to_en';
export default function ADNavbar({ handleSearch }) {
  const loading = useLoading();
  const navigate = useNavigate()
  async function handle_Logout() {

    await loading.setUser(null)
    await loading.setDisplayName('')
    await loading.setJwt('')
    window.localStorage.clear()
    navigate('/')
    alert("Đăng xuất thành công")
  }


  return (
    <>
      <Navbar bg="dark" variant="dark" expand="xl" sticky="top">
        <Navbar.Brand href="/" className='d-flex'>
          <img
            alt="Không load được hình"
            src="/icons/ic_store.png"
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{' '}
          <span className="mx-3 fs-2 fw-bold align-self-center" style={{ color: '#e1dee6' }}>Hi-Tech</span>
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


              <Nav.Link href="/">Users</Nav.Link>
              <Nav.Link href="/">Dashboard</Nav.Link>
              <Nav.Link href="/sale">GiftCode</Nav.Link>
              <Nav.Link href="/gift">Gift</Nav.Link>

              <Nav.Link href="/stock">Stocks</Nav.Link>
              <Nav.Link href="/admin/product">Products</Nav.Link>

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
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <div >


          {loading.displayName ? <>
            <DropdownButton
              variant="outline-secondary"
              title={loading.displayName}
              id="input-group-dropdown-2"
              align="end"
            >
              <Dropdown.Item href="/account">Account</Dropdown.Item>

              <Dropdown.Item href="/">Users</Dropdown.Item>
              <Dropdown.Item href="/stock">Stocks</Dropdown.Item>

              <Dropdown.Item href="#">Doashboard</Dropdown.Item>
              <Dropdown.Item href="/sale">GiftCode</Dropdown.Item>
              <Dropdown.Item href="/gift">Gift</Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item onClick={() => handle_Logout()}>Logout</Dropdown.Item>
            </DropdownButton>
          </> : <></>
          }
        </div>
      </Navbar>

    </>


  )
}
