import { useState } from "react"
import { useHistory } from "react-router-dom"
import { resetPassword } from "../../service"

const PasswordReset = () => {
    const [email, setEmail] = useState('')
    const history = useHistory()
    return (
        <div>
            <label>Please enter your email address: </label>
            <input type="email" onChange={(e) => { setEmail(e.target.value) }} />
            <button onClick={() => {
                resetPassword({ "email": email }).then(res => console.log(res))
                history.push('/password-reset-confirm')
            }}>Send token</button>
            <p>Make sure to check your spam folder too.</p>

        </div>
    )
}
export default PasswordReset