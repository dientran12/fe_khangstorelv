import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllVersions = async ({ productId, accessToken }) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/version/${productId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const addVersion = async ({ productId, accessToken, ...data }) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/version/add-version/${productId}`, data, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const getDetailVersion = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/version/detail-version/${id}`)
    return res.data
}

export const updateVersion = async ({ idVersion, accessToken, ...dataUpdate }) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL_BACKEND}/version/edit-version/${idVersion}`, dataUpdate, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const deleteVersion = async ({ versionId, accessToken }) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL_BACKEND}/version/${versionId}/delete`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}
