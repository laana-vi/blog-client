import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useRegister } from "../../hooks/useRegister"
import { deleteUser, editUser, getUserById, parseJwt, token } from "../../service"
import { StyledForm } from "../styled/StyledForm"

const Settings = () => {
    const [email, setEmail, username, setUsername, firstName, setFirstName, lastName, setLastName, dateOfBirth, setDateOfBirth] = useRegister()
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
            }
        })
        return () => { mounted = false }
    }, [userId, setEmail, setUsername, setFirstName, setLastName, setDateOfBirth])

    return (
        <StyledForm>
            <div className='from-wrapper'>
            <h3>UPDATE YOUR ACCOUNT</h3>
                <label className="label-item">USERNAME: </label>
                <input className='input-item' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label className="label-item">EMAIL: </label>
                <input className='input-item' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="label-item">FIRST NAME: </label>
                <input className='input-item' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <label className="label-item">LAST NAME: </label>
                <input className='input-item' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <label className="label-item">DATE OF BIRTH: </label>
                <input className='input-item' type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                <button className='button-item' onClick={() => {
                    let obj = { "user_name": username, "first_name": firstName, "last_name": lastName, "email": email, "date_of_birth": dateOfBirth, "id": userId }
                    editUser(userId, obj)
                        .then(res => {
                            history.push('/home')
                        })
                }}>SUBMIT</button>
                <button className="delete-account" onClick={() => {
                    deleteUser(userId).then(res => {
                        history.push('/register')
                        localStorage.removeItem('access_token')
                    })
                }}>DELETE ACCOUNT</button>
            </div>

        </StyledForm>

    )
}
export default Settings