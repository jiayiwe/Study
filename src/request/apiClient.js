import {getData} from "../utils/localstorage"

const baseURL = "http://localhost:8000/api/v1"

const method = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

const contentType = {
    JSON: "application/json;charset=UTF-8",
    FORM: "application/x-www-form-urlencoded;charset=UTF-8"
}

const getHeaders = () => {
    const token = getData("token")

    const headers = {
        "Content-Type": contentType.JSON,
        "Authorization": `Token ${token}`
    }
    return headers
}

const getRequest = async (url) => {
    const response = await fetch(baseURL + url, {
        method: method.GET,
        headers: getHeaders()
    })

    return response.json()
}

const postRequest = async (url, body) => {
    const response = await fetch(baseURL + url, {
        method: method.POST,
        headers: getHeaders(),
        body: JSON.stringify(body)
    })

    return response.json()
}
const putRequest = async (url, body) => {
    const response = await fetch(baseURL + url, {
        method: method.PUT,
        headers: getHeaders(),
        body: JSON.stringify(body)
    })

    return response.json()
}
const deleteRequest = async (url) => {
    const response = await fetch(baseURL + url, {
        method: method.DELETE,
        headers: getHeaders()
    })

    return response.json()
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get: getRequest,
    post: postRequest,
    put: putRequest,
    delete: deleteRequest
}