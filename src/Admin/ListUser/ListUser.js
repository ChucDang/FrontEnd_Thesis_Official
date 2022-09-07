import React, { useRef } from 'react'
import { Button, Col, Container, Overlay, Row, Table } from 'react-bootstrap';
import ADNavbar from '../Components/NavBar/ADNavbar';
import { useLoading } from '../../Context/LoadingContext';
import { useEffect } from 'react';
import ajax from '../../Services/fechServices';
import { useLocalState } from '../../Services/useLocalStorage';
import './ListUser.scss'

import EditButton from './EditButton';
import AddAnAccount from './AddAnAccount';
import { useState } from 'react';
import { InputGroup, Input } from 'reactstrap';
import convert_vi_to_en from '../../Services/convert_vi_to_en';
export default function ListUser() {
    const loading = useLoading();
    const [users, setUsers] = useLocalState('users', null)
    const allUsers = useRef([])
    useEffect(() => {
        ajax('/admin/users', 'GET', loading.jwt).then(async response => {
            const result = await response.json()
            result.sort(function (a, b) { return a.id - b.id })
            setUsers(result)
            allUsers.current = result
        })
    }, [])
    // const handleAddAnAccount = () => {
    //     ajax
    // }
    const handleDelete = async (id) => {
        ajax(`/admin/deleteAUser/${id}`, 'DELETE', loading.jwt).then(async response => {
            const msg = (await response.text()).toString()
            const usersCopy = [...users];
            const i = usersCopy.findIndex((item) => item.id === id);
            usersCopy.splice(i, 1);
            alert(msg)
            setUsers(usersCopy)
            allUsers.current = usersCopy
        })
    }
    const handleSearch = (key) => {
        let usersCopy = [...allUsers.current]

        let result = usersCopy.filter(item =>
            convert_vi_to_en(JSON.stringify(Object.values(item)).toLowerCase())
                .includes(convert_vi_to_en(key.toLowerCase())) === true)

        if (result) {
            setUsers(result)
        }

    }


    return (
        <>

            <AddAnAccount setUsers={setUsers} users={users} />
            <Container className='listUser'>


                <Table as={Row} striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fullname</th>
                            <th>Status</th>
                            <th>Authority</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users ? users.map(item => {
                       
                            return <tr key={item.id}>
                                <td>{item.id}</td>
                                <td> {item.fullname}</td>
                      
                           


                                <td>{item.enabled ? 'Enable' : 'Disable'}</td>
                                <td>
                                    {item.authorities[0].authority.split("ROLE_")[1]}
                                </td>
                                <td className='listUser__grpBtn'>
                                    <EditButton user={item} setUsers={setUsers} />
                                    <Button className='listUser__grpBtn__delete' value={item.id}
                                        variant='danger'
                                        onClick={(e) => handleDelete(e.target.value)}
                                        disabled={item.id === loading.user.id}
                                       
                                    >Delete</Button>


                                </td>
                            </tr>
                        }) : <></>}


                    </tbody>
                </Table>

            </Container>
         



        </>
    )
}

