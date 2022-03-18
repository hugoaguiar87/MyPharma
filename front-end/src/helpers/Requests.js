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

    const req = await axios.delete(`${Api_BASEURL}/api/category/delete?${body}`, header)
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

const getBrands = async (body = []) => {
    const req = await axios.get(`${Api_BASEURL}/api/brands?${qs.stringify(body)}`)
        .then(res => res.data)
        .catch(err => err)
    
    return req
}

const deleteBrand = async (id) => {
    let token = Cookies.get('token')
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    
    const body = qs.stringify({
        idBrand: id
    })

    const req = await axios.delete(`${Api_BASEURL}/api/brand/delete?${body}`, header)
        .then(res => res.data)
        .catch(err => err)

    return req
}

const postBrand = async (name) => {
    let token = Cookies.get('token')
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const body = qs.stringify({ name })

    const req = await axios.post(`${Api_BASEURL}/api/brand/create`, body, header)
        .then(res => res.data)
        .catch(err => err)

    return req
}

const putBrand = async (idBrand, newName) => {
    let token = Cookies.get('token')
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const body = qs.stringify({ idBrand, newName })

    const req = axios.put(`${Api_BASEURL}/api/brand/edit`, body, header)
        .then(res => res.data)
        .catch(err => err)

    return req
}

const getProducts = async (body) => {
    const req = await axios.get(`${Api_BASEURL}/api/products?${qs.stringify(body)}`)
        .then(res => res.data)
        .catch(err => err)
    
    return req
}

const deleteProduct = async (id) => {
    let token = Cookies.get('token')
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    
    const body = qs.stringify({
        idProduct: id
    })

    const req = await axios.delete(`${Api_BASEURL}/api/product/delete?${body}`, header)
        .then(res => res.data)
        .catch(err => err)

    return req
}

const postProduct = async (name, description, price, stock, category, brand) => {
    let token = Cookies.get('token')
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const body = qs.stringify({ name, description, price, stock, category, brand })

    const req = await axios.post(`${Api_BASEURL}/api/product/create`, body, header)
        .then(res => res.data)
        .catch(err => err)

    return req
}

const putProduct = async (idProduct, newName, newDescription, newPrice, newStock, newCategory, newBrand ) => {
    let token = Cookies.get('token')
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const body = qs.stringify({ idProduct, newName, newDescription, newPrice, newStock, newCategory, newBrand })

    const req = axios.put(`${Api_BASEURL}/api/product/edit`, body, header)
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
    },
    brands: (body) => {
        return getBrands(body)
    },
    delBrand: (id) => {
        return deleteBrand(id)
    },
    createBrand: (name) => {
        return postBrand(name)
    },
    editBrand: (idBrand, newName) => {
        return putBrand(idBrand, newName)
    },
    products: (body) => {
        return getProducts(body)
    },
    delProduct: (id) => {
        return deleteProduct(id)
    },
    createProduct: (name, description, price, stock, category, brand) => {
        return postProduct(name, description, price, stock, category, brand)
    },
    editProduct: (idProduct, newName, newDescription, newPrice, newStock, newCategory, newBrand ) => {
        return putProduct(idProduct, newName, newDescription, newPrice, newStock, newCategory, newBrand )
    }
}