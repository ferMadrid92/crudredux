import axios from "axios"

const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_DB_URL}`
})

export default clienteAxios