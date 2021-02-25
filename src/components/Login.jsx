import { useState } from "react"
import { useHistory } from "react-router-dom"
import { axiosInstance, loginUser } from "../service"

const Login = ({ user }) => {
    const [error, setError] = useState('')
    const [usernameLogin, setUsernameLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const history = useHistory()
    return (
        <div>
            <input type="text" placeholder="username" onChange={(e) => setUsernameLogin(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setPasswordLogin(e.target.value)} />
            <button onClick={() => {
                loginUser({
                    user_name: usernameLogin,
                    password: passwordLogin
                }).then(res => {
                    if (res.status === 200) {
                        localStorage.setItem('access_token', res.data.access)
                        axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token')
                        history.push('/')
                    }
                    else if (res.status === 401) {
                        setError('information not valid')
                    }
                    else if (res.status === 500) {
                        setError('server error')
                    }
                    

                })
            }}>Login</button>
            <p>{error}</p>
        </div>
    )
}

export default Login