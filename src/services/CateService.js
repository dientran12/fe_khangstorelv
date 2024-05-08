// import axios from "axios";
import axios from "axios";

export const axiosJWT = axios.create()

export const getAllCategories = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/category/get-all`)
    return res.data
}

export const getDetailCate = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/category/get-detail`)
    return res.data
}

export const createCategory = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/category/create`, data)
    return res.data
}




