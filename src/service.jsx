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
const TOKEN_TO_BLAKLIST = `${USERS}logout/blacklist`

export const token = localStorage.getItem('access_token')


//gets token from LS and returns user informations
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

export const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/`,
    validateStatus: () => true,
    headers: { Authorization: localStorage.getItem('access_token') ? 'JWT ' + localStorage.getItem('access_token') : null, 'Content-Type': 'application/json', accept: 'application/json', },
})

axiosInstance.interceptors.response.use(
    (response) => { return response },
    async (error) => {
        const originalRequest = error.config
        if (typeof error.response === 'undefined') {
            window.alert('A server/network error occurred. ')
            return Promise.reject(error)
        }
        if (
            error.response.status === 401 && originalRequest.url === BASE_URL + 'token/refresh') {
            //REDIRECT TO LOGIN
            window.alert('You must login first. ')
            return Promise.reject(error)
        }
        if (error.response.data.code === 'token_not_valid' && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
            const refreshToken = localStorage.getItem('refresh_token')
            if (refreshToken) {
                const tokenExpDate = parseJwt(refreshToken)?.exp
                const now = Math.ceil(Date.now() / 1000)
                if (tokenExpDate > now) {
                    return axiosInstance.post('/token/refresh', { refresh: refreshToken }).then((response) => {
                        console.log(response.data)
                        localStorage.setItem('access_token', response.data.access)
                        axiosInstance.defaults.headers['Authorization'] = 'JWT ' + response.data.access
                        originalRequest.headers['Authorization'] = 'JWT ' + response.data.access
                        return axiosInstance(originalRequest)
                    })
                }
                else {
                    //REDIRECT TO LOGIN
                    window.alert('You must login first. ')
                }
            }
            else {
                //REDIRECT TO LOGIN
                window.alert('You must login first. ')
            }
        }
        return Promise.reject(error)
    }
)


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
    return axiosInstance.post(ADD_POST, post)
}

export const editPost = (id, post) => {
    return axiosInstance.put(`${EDIT_POST}${id}/`, post)
}

export const getPostById = (id) => {
    return axiosInstance.get(`${GET_POST_TO_EDIT}${id}`)
}

export const deletePost = (id) => {
    return axiosInstance.delete(`${DELETE_POST}${id}/`)
}

export const addTokenToBlacklist = (refresh_token) => {
    return axiosInstance.post(TOKEN_TO_BLAKLIST, refresh_token)
}