import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useLocalState } from '../util/useLocalStorage';
import ajax from './Services/fechServices';
export default function Dashboard() {
    const [jwt, setJwt] = useLocalState("", "jwt")
    const [assignments, setAssignments] = useState(null)
    // useEffect(() => {
    //     if (!jwt) {
    //         const reqBody = {
    //             "username": "chucdang",
    //             "password": "Alpha2398" 
    //         };
    //         fetch("api/auth/login", {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             method: "post",
    //             body: JSON.stringify(reqBody),
    //         }).then((response) => Promise.all([response.json(), response.headers]))
    //             .then(([body, headers]) => {
    //                 setJwt(headers.get("authorization"));
    //             });
    //     }
    // }, []);
    // useEffect(() => {
    //     console.log(`JWT value is ${jwt}`)
    // }, [jwt])
    useEffect(() => {
        ajax("api/assignments", "GET", jwt)
            .then(assignment => {
                setAssignments(assignment);
            })
    }, [])
    function createAssignment() {
        ajax("api/assignments", "POST", jwt)
            .then(assignment => {
                // window.location.href = `/assignment/${assignment.id}`
                console.log(assignment)
            });
    }
    return (
        <div>
            <h1>Dashboard is here</h1>
            <ul>
                {assignments ? assignments.map(assignment =>
                    <li>
                        <Link key={assignment.id.toString()} to={`/assignments/${assignment.id}`}>
                            Assignment ID: {assignment.id}
                        </Link>``
                    </li>



                ) : <></>}
            </ul>

            <button onClick={() => createAssignment()}>Submit new Brand</button>
        </div>

    )
}
