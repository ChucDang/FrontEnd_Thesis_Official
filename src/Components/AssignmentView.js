// import React, { useState, useEffect } from 'react'
// import { useLocalState } from '../util/useLocalStorage'
// import ajax from './Services/fechServices';
// export default function AssignmentView() {
//     const [jwt, setJwt] = useLocalState("", "jwt")
//     const assignmentId = window.location.href.split("/assignments/")[1]
//     const [assignment, setAssignment] = useState(null)
//     function updateAssignment(prop, value) {
//         // Nếu không có dòng này thì input sẽ ko thể đổi giá trị
//         const newAssignment = { ...assignment };
//         newAssignment[prop] = value;
//         setAssignment(newAssignment)
//         // console.log(a)
//     }
//     function save() {
//         ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment)
//             .then(assignmentData => {
//                 setAssignment(assignmentData)
//             })
//     }
//     useEffect(() => {
//         ajax(`/api/assignments/${assignmentId}`, "GET", jwt)
//             .then(assignmentData => {
//                 setAssignment(assignmentData);
//             })
//     }, [])
//     return (
//         <>
//             <div>Assignment ID is {assignmentId}</div>
//             {assignment ?
//                 <>
//                     <h2>Brand code is {assignment.code}</h2>
//                     <h3> Brand name: <input type="text" id='nameBrand'
//                         onChange={(e) => updateAssignment("name", e.target.value)}
//                         value={assignment.name}></input> </h3>
//                     <button onClick={() => save()}>Submit assigment</button>
//                 </> :
//                 <></>
//             }
//         </>

//     )
// }
