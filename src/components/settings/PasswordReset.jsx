import { useState } from "react"
import { useHistory } from "react-router-dom"
import { resetPassword } from "../../service"
import Error from "../basic/Error"
import { StyledForm } from "../styled/StyledForm"

const PasswordReset = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()
    return (
        <StyledForm>
            <div className='from-wrapper'>
                <label className="label-item">Please enter your email address: </label>
                <input className='input-item' type="email" onChange={(e) => { setEmail(e.target.value) }} />
                <button className='button-item' onClick={() => {
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
                <p className="additional">Make sure to check your spam folder too.</p>
            </div>
        </StyledForm>

    )
}
export default PasswordReset