import React, { useEffect } from 'react'
import { useLocalState } from '../util/useLocalStorage';
export default function HomePage() {
    const [jwt, setJwt] = useLocalState("", "jwt")
    useEffect(() => {
        if (!jwt) {
            const reqBody = {
                "username": "chucdang",
                "password": "Alpha2398"
            };
            fetch("api/auth/login", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "post",
                body: JSON.stringify(reqBody),
            }).then((response) => Promise.all([response.json(), response.headers]))
                .then(([body, headers]) => {
                    setJwt(headers.get("Authorization"));
                });
        }
    }, []);
    useEffect(() => {
        console.log(`JWT value is ${jwt}`)
    }, [jwt])
    return (
        <div>HomePage is here</div>
    )
}
