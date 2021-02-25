import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useRegister } from "../hooks/useRegister"
import { regiserUser } from "../service"

const Register = () => {
    const [email, setEmail, username, setUsername, firstName, setFirstName, lastName, setLastName, dateOfBirth, setDateOfBirth, password, setPassword] = useRegister()
    const [error, setError] = useState('')
    const history = useHistory()
    return (
        <div>
            <input type="email" placeholder="email" onChange={(e) => { setEmail(e.target.value.trim()) }} />
            <input type="text" placeholder="username" onChange={(e) => { setUsername(e.target.value.trim()) }} />
            <input type="text" placeholder="first name" onChange={(e) => { setFirstName(e.target.value.trim()) }} />
            <input type="text" placeholder="last name" onChange={(e) => { setLastName(e.target.value.trim()) }} />
            <input type="date" onChange={(e) => { setDateOfBirth(e.target.value.trim()) }} />
            <input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value.trim()) }} />
            <button onClick={() => {
                regiserUser({
                    email: email,
                    user_name: username,
                    first_name: firstName,
                    last_name: lastName,
                    date_of_birth: dateOfBirth,
                    password: password
                }).then(res => {
                    if (res.status === 201) {
                        setError('success')
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
            }}>Register</button>
            <p>{error}</p>
        </div>
    )
}

export default Register