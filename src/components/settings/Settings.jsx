import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useRegister } from "../../hooks/useRegister"
import { deleteUser, editUser, getUserById, parseJwt, token } from "../../service"

const Settings = () => {
    const [email, setEmail, username, setUsername, firstName, setFirstName, lastName, setLastName, dateOfBirth, setDateOfBirth, password, setPassword] = useRegister()
    const [user, setUser] = useState(null)
    const history = useHistory()
    let userId = parseJwt(token).user_id

    useEffect(() => {
        let mounted = true
        getUserById(userId).then(res => {
            if (mounted) {
                setEmail(res.data.email)
                setUsername(res.data.user_name)
                setFirstName(res.data.first_name)
                setLastName(res.data.last_name)
                setDateOfBirth(res.data.date_of_birth)
                setUser(res.data)
            }
            mounted = false
        })
    }, [userId, setEmail, setUsername, setFirstName, setLastName, setDateOfBirth])


    return (
        <div>
            <div>
                <label>Username: </label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label>Email: </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label>First Name: </label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <label>Last name: </label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <label>Date of birth: </label>
                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
                <button onClick={() => {
                    let obj = {"user_name" : username, "first_name": firstName, "last_name": lastName, "email": email, "date_of_birth": dateOfBirth, "id": userId}
                    editUser(userId, obj )
                    .then(res => console.log(res.data, obj))
                }}>Submit</button>
            </div>
            <button onClick={() => {
                deleteUser(userId).then(res => {
                    history.push('/register')
                    localStorage.removeItem('access_token')
                })
            }}>Detele Account</button>
        </div>
    )
}
export default Settings