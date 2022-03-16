import axios from "axios";
import qs from "qs";

const Api_BASEURL = "http://localhost:5000"

const postSingIn = async (email, password) => {
    const body = qs.stringify({
        email,
        password
    })

    const req = await axios.post(`${Api_BASEURL}/api/singin`, body)
        .then(res => res.data)
        .catch(err => err)

    return req
}

export const requestApi = {
    login: (email, password) => {
        return postSingIn(email, password)
    }
}