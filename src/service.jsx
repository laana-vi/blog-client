import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api'
const POSTS = 'posts/'
const CATEGORIES = 'categories/'
const USERS = 'users/'
const TOKEN = 'token'
const ADMIN = 'admin'
const ADD_POST = `${ADMIN}/create/`
const EDIT_POST = `${ADMIN}/edit/`
const DELETE_POST = `${ADMIN}/delete/`
const GET_POST_TO_EDIT = `${ADMIN}/edit/postdetail/`
const GET_USER_DETAIL = `${USERS}user/edit/userdetail/`
const EDIT_USER = `${USERS}user/edit/`
const DELETE_USER = `${USERS}user/delete/`
const PASSWORD_RESET = 'password_reset/'
const PASSWORD_RESET_CONFIRM = 'password_reset/confirm/'

export const token = localStorage.getItem('access_token')

export const parseJwt = (token) => {
    if (token !== undefined) {
        let base64Url = token?.split('.')[1];
        let base64 = base64Url?.replace('-', '+')?.replace('_', '/');
        if (base64 !== undefined) {
            return JSON.parse(window.atob(base64));
        }
        else return undefined
    }
    else return undefined
}

const isValidToken = () => {
    const expTime = parseJwt(token)?.exp
    const timeNow = Math.ceil(new Date() / 1000)
    return timeNow > expTime && localStorage.removeItem('access_token')
}

isValidToken()

export const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/`,
    validateStatus: () => true,
    headers: { Authorization: localStorage.getItem('access_token') ? 'JWT ' + localStorage.getItem('access_token') : null, 'Content-Type': 'application/json', accept: 'application/json', },
})

export const axiosInstanceForFiles = axios.create({
    baseURL: `${BASE_URL}/`,
    validateStatus: () => true,
    headers: { Authorization: localStorage.getItem('access_token') ? 'JWT ' + localStorage.getItem('access_token') : null, 'Content-Type': 'multipart/form-data' },
})



export const getAllPosts = () => {
    return axiosInstance.get(POSTS)
}

export const getPostBySlug = (slug) => {
    return axiosInstance.get(`${POSTS}${slug}`)
}

export const getAllCategories = () => {
    return axiosInstance.get(CATEGORIES)
}

export const getAllUsers = () => {
    return axiosInstance.get(USERS)
}


export const regiserUser = (user) => {
    return axiosInstance.post(USERS, user)
}

export const loginUser = (user) => {
    return axiosInstance.post(TOKEN, user)
}

export const addPost = (post) => {
    return axiosInstanceForFiles.post(ADD_POST, post)
}

export const editPost = (id, post) => {
    return axiosInstanceForFiles.put(`${EDIT_POST}${id}/`, post)
}        

export const getPostById = (id) => {
    return axiosInstance.get(`${GET_POST_TO_EDIT}${id}`)
}

export const deletePost = (id) => {
    return axiosInstance.delete(`${DELETE_POST}${id}/`)
}

export const getUserById = (id) => {
    return axiosInstance.get(`${GET_USER_DETAIL}${id}/`)
}

export const editUser = (id, user) => {
    return axiosInstance.put(`${EDIT_USER}${id}/`, user)
}

export const deleteUser = (id) => {
    return axiosInstance.delete(`${DELETE_USER}${id}/`)
}

export const resetPassword = (email) => {
    return axiosInstance.post(PASSWORD_RESET, email)
}

export const passwordReseConfirm = (token, password) => {
    return axiosInstance.post(PASSWORD_RESET_CONFIRM, token, password)
}

