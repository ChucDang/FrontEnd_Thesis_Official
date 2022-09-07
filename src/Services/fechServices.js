
function ajax(url, requestmethod, jwt, requestBody) {

    const fetchData = {
        headers: {
            "Content-Type": "application/json"
        },
        method: requestmethod,

    }
    if (jwt) {
        fetchData.headers.Authorization = `Bearer ${jwt}`
    }
    if (requestBody) {
        fetchData.body = JSON.stringify(requestBody)
    }
    return fetch(url, fetchData).then(response => {

        return response
    })
}
export default ajax