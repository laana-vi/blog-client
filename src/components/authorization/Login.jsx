import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { axiosInstance, loginUser } from "../../service"
import Error from "../basic/Error"
import { StyledForm } from "../styled/StyledForm"

const Login = () => {
    const [error, setError] = useState('')
    const [usernameLogin, setUsernameLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const history = useHistory()

    return (
        <StyledForm>
            <div className='from-wrapper'>
            <h3>LOGIN</h3>
                <label className="label-item">USERNAME: </label>
                <input className='input-item' type="text" onChange={(e) => setUsernameLogin(e.target.value)} />
                <label className="label-item">PASSWORD: </label>
                <input className='input-item' type='password' onChange={(e) => setPasswordLogin(e.target.value)} />
                <button className='button-item' onClick={() => {
                    loginUser({
                        user_name: usernameLogin,
                        password: passwordLogin
                    }).then(res => {

                        if (res.status === 200) {
                            localStorage.setItem('access_token', res.data.access)
                            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token')
                            history.push('/home')
                            window.location.reload()
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
                }}>LOG IN</button>
                <Error error={error} setError={setError} />
                <Link className="additional" to="/password-reset">Forgot your password?</Link>
            </div>
        </StyledForm>

    )
}

export default Login