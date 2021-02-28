import { useState } from "react"
import { useHistory } from "react-router-dom"
import { passwordReseConfirm } from "../../service"
import Error from "../basic/Error"

const PasswordResetConfirm = () => {
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()
    return (
        <div>
            <label>Enter your new password: </label>
            <input type="password" onChange={(e) => { setPassword(e.target.value) }} />
            <label>Enter token: </label>
            <input type="text" onChange={(e) => { setToken(e.target.value) }} />
            <button onClick={() => {
                passwordReseConfirm({ "password": password, "token": token }).then(res => {
                    if (res.data.password) {
                        setError(res.data.password)
                    }
                    else if (res.data.token) {
                        setError(res.data.token)
                    }
                    else if (res.status === 200) {
                        history.push('/login')
                    }
                    else if(res.status === 404){
                        setError('Token invalid.')
                    }
                })
            }}>Confirm password reset</button>
            <Error error={error} setError={setError} />
        </div>
    )
}
export default PasswordResetConfirm