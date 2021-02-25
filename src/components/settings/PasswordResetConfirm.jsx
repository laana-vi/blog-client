import { useState } from "react"
import { useHistory } from "react-router-dom"
import { passwordReseConfirm } from "../../service"

const PasswordResetConfirm = () => {
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const history = useHistory()
    return (
        <div>
            <label>Enter your new password: </label>
            <input type="password" onChange={(e) => { setPassword(e.target.value) }} />
            <label>Enter token: </label>
            <input type="text" onChange={(e) => { setToken(e.target.value) }} />
            <button onClick={() => {
                 passwordReseConfirm({ "password": password, "token": token }).then(res => console.log(res))
                history.push('/login')
            }}>Confirm password reset</button>
        </div>
    )
}
export default PasswordResetConfirm