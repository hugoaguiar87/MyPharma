import axios from "axios";
import qs from "qs";
import Cookies from "js-cookie";

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

const getCategories = async (body = []) => {
    const req = await axios.get(`${Api_BASEURL}/api/categories?${qs.stringify(body)}`)
        .then(res => res.data)
        .catch(err => err)
    
    return req
}

const deleteCategory = async (id) => {
    let token = Cookies.get('token')
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    
    const body = qs.stringify({
        idCategory: id
    })

    const req = await axios.delete(`${Api_BASEURL}/api/category/delete`, body, header)
        .then(res => res.data)
        .catch(err => err)

    return req
}

const putCategory = async (idCategory = null, newName = null, newDescription = null) => {
    let token = Cookies.get('token')
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const body = qs.stringify({ idCategory, newName, newDescription })

    const req = axios.put(`${Api_BASEURL}/api/category/edit`, body, header)
        .then(res => res.data)
        .catch(err => err)

    return req
}

const postCategory = async (name, description) => {
    let token = Cookies.get('token')
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const body = qs.stringify({
        name, description
    })

    const req = await axios.post(`${Api_BASEURL}/api/category/create`, body, header)
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
    },
    categories: (body) => {
        return getCategories(body)
    },
    delCategory: (id) => {
        return deleteCategory(id)
    },
    editCategory: (idCategory, newName, newDescription) => {
        return putCategory(idCategory, newName, newDescription)
    },
    createCategory: (name, description) => {
        return postCategory(name, description)
    }
}