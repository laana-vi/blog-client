import { useState } from "react"
import { useHistory } from "react-router-dom"
import { resetPassword } from "../../service"
import Error from "../basic/Error"

const PasswordReset = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()
    return (
        <div>
            <label>Please enter your email address: </label>
            <input type="email" onChange={(e) => { setEmail(e.target.value) }} />
            <button onClick={() => {
                resetPassword({ "email": email }).then(res => {
                    if (res.data.email) {
                        setError(res.data.email)
                    }
                    else if (res.status === 200) {
                        history.push('/password-reset-confirm')
                    }
                })

            }}>Send token</button>
            <Error error={error} setError={setError} />
            <p>Make sure to check your spam folder too.</p>

        </div>
    )
}
export default PasswordReset