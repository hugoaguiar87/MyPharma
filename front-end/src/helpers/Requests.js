import axios from "axios";
import qs from "qs";
import Cookies from "js-cookie"

const Api_BASEURL = "http://localhost:5000"

const postSingIn = async (email, password) => {
    const body = qs.stringify({ email, password })

    const req = await axios.post(`${Api_BASEURL}/api/signin`, body)
        .then(res => res.data)
        .catch(err => err)

    return req
}

const postSignup = async (name, email, password) => {
    const body = qs.stringify({ name, email, password })

    const req = await axios.post(`${Api_BASEURL}/api/signup`, body)
        .then(res => res.data)
        .catch(err => err)
    
    return req
}

const getUserInfos = async () => {
    const token = Cookies.get('token')

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const req = await axios.get(`${Api_BASEURL}/api/me`, header)
        .then(res => res.data)
        .catch(err => err)
    
    return req
}

const putEditUser = async (name = null, email = null, password = null) => {
    let token = Cookies.get('token')
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const body = qs.stringify({
        name, email, password
    })

    const req = await axios.put(`${Api_BASEURL}/api/me/edit`, body, header)
        .then(res => res.data)
        .catch(err => err)

    return req
}

export const requestApi = {
    login: (email, password) => {
        return postSingIn(email, password)
    },
    signup: (name, email, password) => {
        return postSignup(name, email, password)
    },
    userInfos: () => {
        return getUserInfos()
    },
    editUser: (name, email, password) => {
        return putEditUser(name, email, password)
    }
}