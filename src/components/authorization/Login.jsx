import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { axiosInstance, loginUser } from "../../service"
import Error from "../basic/Error"

const Login = () => {
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
                        window.location.reload()
                        history.push('/')

                    }
                    else if (res.data.user_name) {
                        setError(res.data.user_name[0])
                    }
                    else if (res.data.password) {
                        setError(res.data.password[0])
                    }
                    else if (res.status === 401) {
                        setError(res.data.detail)
                    }
                })
            }}>Login</button>
            <Error error={error} setError={setError} />
            <Link to="/password-reset">Forgot your password?</Link>
        </div>
    )
}

export default Login