import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useRegister } from "../../hooks/useRegister"
import { regiserUser } from "../../service"
import Error from "../basic/Error"
import { StyledForm } from "../styled/StyledForm"



const Register = () => {
    const [email, setEmail, username, setUsername, firstName, setFirstName, lastName, setLastName, dateOfBirth, setDateOfBirth, password, setPassword] = useRegister()
    const [error, setError] = useState('')
    const history = useHistory()

    return (
        <StyledForm>
            <div className='from-wrapper'>
                <h3>REGISTER</h3>
                <label className="label-item">EMAIL: </label>
                <input className='input-item' type="email" onChange={(e) => { setEmail(e.target.value.trim()) }} />
                <label className="label-item">USERNAME: </label>
                <input className='input-item' type="text"  onChange={(e) => { setUsername(e.target.value.trim()) }} />
                <label className="label-item">FIRST NAME : </label>
                <input className='input-item' type="text"  onChange={(e) => { setFirstName(e.target.value.trim()) }} />
                <label className="label-item">LAST NAME: </label>
                <input className='input-item' type="text"  onChange={(e) => { setLastName(e.target.value.trim()) }} />
                <label className="label-item">DATE OF BIRTH: </label>
                <input className='input-item date' type="date" onChange={(e) => { setDateOfBirth(e.target.value.trim()) }} />
                <label className="label-item">PASSWORD: </label>
                <input className='input-item' type="password" onChange={(e) => { setPassword(e.target.value.trim()) }} />
                <button className='button-item' onClick={() => {
                    regiserUser({
                        email: email,
                        user_name: username,
                        first_name: firstName,
                        last_name: lastName,
                        date_of_birth: dateOfBirth,
                        password: password
                    }).then(res => {
                        if (res.status === 201) {
                            history.push('/login')
                        }
                        else if (res.data.email) {
                            setError(res.data.email[0])
                        }
                        else if (res.data.user_name) {
                            setError(res.data.user_name[0])
                        }
                        else if (res.data.first_name) {
                            setError(res.data.first_name[0])
                        }
                        else if (res.data.last_name) {
                            setError(res.data.last_name[0])
                        }
                        else if (res.data.password) {
                            setError(res.data.password[0])
                        }
                    })
                }}>SIGN UP</button>
                <div>
                    <Error error={error} setError={setError} />
                </div>
            </div>
        </StyledForm>
    )
}
export default Register