import axios from 'axios'

axios.defaults.withCredentials = true // 在跨域的时候携带cookie

const request = axios.create({
    baseURL:'http://localhost:5000',
})

export default request
