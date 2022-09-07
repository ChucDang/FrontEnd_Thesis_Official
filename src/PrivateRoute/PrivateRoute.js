import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../Components/Loading/Loading";
import ajax from '../Services/fechServices';
import ErrorPage from '../Components/ErrorPage/ErrorPage';
import { useLoading } from "../Context/LoadingContext";
const PrivateRoute = (props) => {
    const loading = useLoading()
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);
    const { children } = props;
    useEffect(() => {
        if (loading.jwt) {
            ajax('/api/auth/validate', 'GET', loading.jwt).then(async (response) => {
                const _isValid = await response.json()
                setIsValid(_isValid);
                setIsLoading(false);
            });
        } else {

            setIsValid(false);
            setIsLoading(false);

        }
    }, [loading.jwt])


    return isLoading ? (
        <Loading />
    ) : isValid === true ? (
        children
    ) : (

        <Navigate to="/" />
    );
};

export default PrivateRoute;